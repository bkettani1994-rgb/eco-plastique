import { Product } from "@/data/products";

interface HowToUseProps {
  product: Product;
}

export function HowToUse({ product }: HowToUseProps) {
  if (!product.howToUse || product.howToUse.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray sm:text-3xl">
          Comment l&apos;utiliser
        </h2>
        <ol className="space-y-4">
          {product.howToUse.map((step, index) => (
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
