"use client";

import { Product } from "@/data/products";
import { useLang } from "@/lib/language-context";

interface SpecificationsProps {
  product: Product;
}

export function Specifications({ product }: SpecificationsProps) {
  const { t, tr } = useLang();

  return (
    <section className="bg-light-gray py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray sm:text-3xl">
          {t("Spécifications techniques", tr.product_blocks.specifications)}
        </h2>
        <div className="overflow-hidden rounded-2xl bg-white shadow-md">
          {product.specifications.map((spec, index) => (
            <div
              key={spec.label}
              className={`flex items-center justify-between px-6 py-4 text-sm ${
                index % 2 === 0 ? "bg-white" : "bg-light-gray/50"
              }`}
            >
              <span className="font-medium text-dark-gray">{spec.label}</span>
              <span className="text-gray-600">{spec.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
