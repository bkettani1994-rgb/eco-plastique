import { CheckCircle2 } from "lucide-react";
import { Product } from "@/data/products";

interface FeaturesProps {
  product: Product;
}

export function Features({ product }: FeaturesProps) {
  return (
    <section className="bg-light-gray py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray sm:text-3xl">
          Caractéristiques
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {product.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm"
            >
              <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-primary" />
              <span className="text-sm text-dark-gray">{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
