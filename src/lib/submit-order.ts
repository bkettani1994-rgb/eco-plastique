/* Envoi des commandes vers Google Sheets (via /api/order → Apps Script).
   L'échec d'envoi ne bloque jamais le parcours client. */

export type ProductKey =
  | "nappe-pvc"
  | "protege-matelas"
  | "oreiller-cervical"
  | "oreiller-memoire";

export interface OrderSubmission {
  product: ProductKey;
  customer: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
  };
  details: string; // récapitulatif complet (offre, tailles, dimensions…)
  total: number;   // MAD
  lang: "fr" | "ar";
}

export async function submitOrder(order: OrderSubmission): Promise<void> {
  try {
    await fetch("/api/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(order),
      keepalive: true,
    });
  } catch {
    // On n'empêche jamais la confirmation de commande côté client.
  }
}
