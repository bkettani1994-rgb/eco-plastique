/* Envoi des commandes vers Google Sheets (via /api/order → Apps Script).
   L'échec d'envoi ne bloque jamais le parcours client. */

export type ProductKey =
  | "nappe-pvc"
  | "protege-matelas"
  | "oreiller-cervical"
  | "oreiller-memoire"
  | "oreiller-combo";

export interface OrderSubmission {
  product: ProductKey;
  orderId: string;
  customer: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
  };
  details: string; // récapitulatif complet (secours / lecture rapide)
  total: number;   // MAD
  lang: "fr" | "ar";
  /* Colonnes structurées pour les produits à offres (offre + variante) */
  fields?: {
    offer?: string;   // ex. "2 pièces"
    variant?: string; // ex. "140×190 cm, 160×200 cm" / "17 cm"
  };
  /* Nappes : une ligne par nappe configurée */
  rows?: Array<{
    type: string;       // Transparente / Mate / Dorée
    shape: string;      // Carré, Cercle…
    thickness: string;  // 1,5 mm / 2 mm
    dimensions: string; // Côté 100 cm · …
    qty: number;
    price: number;      // prix de la ligne (unitaire × qté)
  }>;
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
