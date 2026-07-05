import { NextResponse } from "next/server";

/* Transmet la commande au Web App Google Apps Script (Google Sheets).
   Configurer la variable d'environnement GOOGLE_SHEETS_WEBHOOK_URL avec
   l'URL de déploiement du script (voir docs/google-sheets-commandes.md). */

const VALID_PRODUCTS = new Set([
  "nappe-pvc",
  "protege-matelas",
  "oreiller-cervical",
  "oreiller-memoire",
]);

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const order = payload as {
    product?: string;
    customer?: { fullName?: string; phone?: string; city?: string; address?: string };
    details?: string;
    total?: number;
    lang?: string;
  };

  if (!order.product || !VALID_PRODUCTS.has(order.product) || !order.customer?.phone) {
    return NextResponse.json({ ok: false, error: "invalid order" }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    // Pas encore configuré : on ne bloque pas le site.
    console.warn("[order] GOOGLE_SHEETS_WEBHOOK_URL is not set — order not forwarded");
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        product: order.product,
        fullName: order.customer.fullName ?? "",
        phone: order.customer.phone ?? "",
        city: order.customer.city ?? "",
        address: order.customer.address ?? "",
        details: order.details ?? "",
        total: order.total ?? 0,
        lang: order.lang ?? "fr",
      }),
      // Apps Script répond par une redirection 302 vers le résultat
      redirect: "follow",
    });
    return NextResponse.json({ ok: res.ok, forwarded: true });
  } catch (error) {
    console.error("[order] failed to forward order to Google Sheets", error);
    return NextResponse.json({ ok: false, forwarded: false }, { status: 502 });
  }
}
