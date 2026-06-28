import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { WhatsappOrder } from "@/components/product-blocks/whatsapp-order";

interface ProductCtaProps {
  product: Product;
}

export function ProductCta({ product }: ProductCtaProps) {
  return (
    <section className="bg-primary py-12 sm:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">Intéressé par ce produit ?</h2>
        <p className="text-white/90">
          Contactez-nous dès maintenant pour commander {product.name} et obtenir une réponse
          rapide.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <WhatsappOrder product={product} />
          <Link
            href="/produits"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-primary"
          >
            Voir tous nos produits
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
