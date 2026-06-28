import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Product } from "@/data/products";
import { whatsappLink } from "@/data/site";
import { formatPrice } from "@/lib/utils";

interface WhatsappOrderProps {
  product: Product;
}

export function WhatsappOrder({ product }: WhatsappOrderProps) {
  const message = `Bonjour, je suis intéressé par ${product.name} (${formatPrice(
    product.price,
  )}). Pouvez-vous me donner plus d'informations ?`;

  return (
    <Link
      href={whatsappLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
    >
      <MessageCircle size={18} />
      Commander sur WhatsApp
    </Link>
  );
}
