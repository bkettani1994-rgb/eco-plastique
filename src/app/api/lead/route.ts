import { NextResponse } from "next/server";

/* Transmet les messages de contact et inscriptions newsletter au même
   Web App Google Apps Script que les commandes (GOOGLE_SHEETS_WEBHOOK_URL).
   Le script route vers les feuilles « Messages contact » / « Newsletter »
   selon le champ `type`. */

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid json" }, { status: 400 });
  }

  const lead = payload as {
    type?: string;
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };

  if (lead.type !== "contact" && lead.type !== "newsletter") {
    return NextResponse.json({ ok: false, error: "invalid type" }, { status: 400 });
  }
  if (!lead.email) {
    return NextResponse.json({ ok: false, error: "email required" }, { status: 400 });
  }

  const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  if (!webhookUrl) {
    console.warn("[lead] GOOGLE_SHEETS_WEBHOOK_URL is not set — lead not forwarded");
    return NextResponse.json({ ok: true, forwarded: false });
  }

  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        type: lead.type,
        name: lead.name ?? "",
        email: lead.email ?? "",
        phone: lead.phone ?? "",
        message: lead.message ?? "",
      }),
      redirect: "follow",
    });
    return NextResponse.json({ ok: true, forwarded: true });
  } catch (error) {
    console.error("[lead] failed to forward lead to Google Sheets", error);
    return NextResponse.json({ ok: false, forwarded: false }, { status: 502 });
  }
}
