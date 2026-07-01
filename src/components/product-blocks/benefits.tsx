"use client";

import { Sparkles } from "lucide-react";
import { Product } from "@/data/products";
import { useLang } from "@/lib/language-context";

interface BenefitsProps {
  product: Product;
}

export function Benefits({ product }: BenefitsProps) {
  const { t, tr, isAr } = useLang();
  const benefitList = isAr && product.benefitsAr ? product.benefitsAr : product.benefits;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray sm:text-3xl">
          {t("Avantages", tr.product_blocks.benefits)}
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefitList.map((benefit) => (
            <div
              key={benefit}
              className="flex flex-col items-center gap-3 rounded-2xl bg-light-gray p-6 text-center shadow-sm"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-white">
                <Sparkles size={22} />
              </div>
              <p className="text-sm font-medium text-dark-gray">{benefit}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
