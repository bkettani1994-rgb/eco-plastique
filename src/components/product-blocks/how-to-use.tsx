"use client";

import { Product } from "@/data/products";
import { useLang } from "@/lib/language-context";

interface HowToUseProps {
  product: Product;
}

export function HowToUse({ product }: HowToUseProps) {
  const { t, tr, isAr } = useLang();

  const steps = isAr && product.howToUseAr ? product.howToUseAr : product.howToUse;

  if (!steps || steps.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray sm:text-3xl">
          {t("Comment l'utiliser", tr.product_blocks.how_to_use)}
        </h2>
        <ol className="space-y-4">
          {steps.map((step, index) => (
            <li key={step} className="flex items-start gap-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {index + 1}
              </span>
              <p className="pt-1 text-sm text-gray-600">{step}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
