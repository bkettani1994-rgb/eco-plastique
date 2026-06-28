import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { products } from "@/data/products";

export function Categories() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">Nos catégories</h2>
          <p className="mt-2 text-gray-600">Des produits pensés pour le confort de votre foyer</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/produits/${product.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-gray-100 bg-white p-5 shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <ImagePlaceholder aspect="square" />
              <div>
                <h3 className="font-semibold text-dark-gray">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.shortDescription}</p>
              </div>
              <span className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-transform group-hover:translate-x-1">
                Découvrir
                <ArrowRight size={16} />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
