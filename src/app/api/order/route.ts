import { NextResponse } from "next/server";
import { createHash } from "crypto";
import { META_PIXEL_ID } from "@/lib/meta-pixel";

/* Traitement serveur d'une commande :
   1. Transmission à Google Sheets (Apps Script) — GOOGLE_SHEETS_WEBHOOK_URL
   2. Envoi de l'événement Purchase à la Conversions API Meta — META_CAPI_ACCESS_TOKEN
   Les deux sont indépendants : l'échec de l'un ne bloque pas l'autre ni le client. */

export const runtime = "nodejs";

const VALID_PRODUCTS = new Set([
  "nappe-pvc",
  "protege-matelas",
  "oreiller-cervical",
  "oreiller-memoire",
]);

interface OrderPayload {
  product?: string;
  orderId?: string;
  customer?: { fullName?: string; phone?: string; city?: string; address?: string };
  details?: string;
  total?: number;
  lang?: string;
  fields?: { offer?: string; variant?: string };
  rows?: Array<Record<string, string | number>>;
}

function sha256(value: string): string {
  return createHash("sha256").update(value).digest("hex");
}

/** Numéro marocain → format E.164 sans "+" (2126XXXXXXXX) puis haché. */
function hashPhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("00")) digits = digits.slice(2);
  if (digits.startsWith("0")) digits = "212" + digits.slice(1);
  else if (!digits.startsWith("212")) digits = "212" + digits;
  return sha256(digits);
}

function normalizeHash(value?: string): string | undefined {
  if (!value) return undefined;
  const clean = value.trim().toLowerCase();
  return clean ? sha256(clean) : undefined;
}

async function forwardToSheets(order: OrderPayload) {
  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[order] GOOGLE_SHEETS_WEBHOOK_URL is not set — order not forwarded");
    return;
  }
  await fetch(webhookUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      product: order.product,
      orderId: order.orderId ?? "",
      fullName: order.customer?.fullName ?? "",
      phone: order.customer?.phone ?? "",
      city: order.customer?.city ?? "",
      address: order.customer?.address ?? "",
      details: order.details ?? "",
      total: order.total ?? 0,
      lang: order.lang ?? "fr",
      offer: order.fields?.offer ?? "",
      variant: order.fields?.variant ?? "",
      rows: order.rows ?? [],
    }),
    redirect: "follow",
  });
}

async function sendMetaPurchase(order: OrderPayload, request: Request) {
  const token = process.env.META_CAPI_ACCESS_TOKEN;
  if (!token) return; // CAPI non configurée : on ne fait rien

  const firstName = order.customer?.fullName?.trim().split(/\s+/)[0];
  const userData: Record<string, string[]> = {};
  if (order.customer?.phone) userData.ph = [hashPhone(order.customer.phone)];
  const fn = normalizeHash(firstName);
  if (fn) userData.fn = [fn];
  const ct = normalizeHash(order.customer?.city);
  if (ct) userData.ct = [ct];
  userData.country = [sha256("ma")];

  // Signaux techniques pour améliorer la correspondance
  const ua = request.headers.get("user-agent");
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    undefined;

  const body = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: order.orderId || undefined, // déduplication avec le pixel navigateur
        action_source: "website",
        user_data: {
          ...userData,
          ...(ua ? { client_user_agent: ua } : {}),
          ...(ip ? { client_ip_address: ip } : {}),
        },
        custom_data: {
          currency: "MAD",
          value: order.total ?? 0,
        },
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/v21.0/${META_PIXEL_ID}/events?access_token=${token}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    },
  );
  if (!res.ok) {
    console.error("[order] Meta CAPI error", res.status, await res.text());
  }
}

export async function POST(request: Request) {
  let order: OrderPayload;
  try {
    order = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  if (!order.product || !VALID_PRODUCTS.has(order.product) || !order.customer?.phone) {
    return NextResponse.json({ ok: false, error: "invalid order" }, { status: 400 });
  }

  // Les deux envois sont indépendants ; on n'échoue jamais le client.
  const results = await Promise.allSettled([
    forwardToSheets(order),
    sendMetaPurchase(order, request),
  ]);

  results.forEach((r) => {
    if (r.status === "rejected") console.error("[order] task failed", r.reason);
  });

  return NextResponse.json({ ok: true });
}
