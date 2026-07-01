"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/data/products";
import { WhatsappOrder } from "@/components/product-blocks/whatsapp-order";
import { useLang } from "@/lib/language-context";

interface ProductCtaProps {
  product: Product;
}

export function ProductCta({ product }: ProductCtaProps) {
  const { t, tr } = useLang();

  return (
    <section className="bg-primary py-12 sm:py-16">
      <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t("Intéressé par ce produit ?", tr.product_blocks.interested)}
        </h2>
        <p className="text-white/90">
          {t(
            `Contactez-nous dès maintenant pour commander ${product.name} et obtenir une réponse rapide.`,
            `${tr.product_blocks.contact_us} ${product.name} ${tr.product_blocks.contact_suffix}`,
          )}
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <WhatsappOrder product={product} />
          <Link
            href="/produits"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-primary"
          >
            {t("Voir tous nos produits", tr.product_blocks.view_all)}
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
