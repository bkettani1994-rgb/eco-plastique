import Link from "next/link";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export function FeaturedProducts() {
  return (
    <section className="bg-light-gray py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">Nos produits</h2>
          <p className="mt-2 text-gray-600">Sélectionnés pour leur qualité et leur confort</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              <div className="p-4 pb-0">
                <ImagePlaceholder aspect="square" />
              </div>
              <CardContent className="flex flex-1 flex-col gap-2">
                <h3 className="font-semibold text-dark-gray">{product.name}</h3>
                <p className="line-clamp-2 text-sm text-gray-500">{product.shortDescription}</p>
                <div className="mt-auto flex items-center gap-2 pt-2">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.oldPrice ? (
                    <span className="text-sm text-gray-400 line-through">
                      {formatPrice(product.oldPrice)}
                    </span>
                  ) : null}
                </div>
                <Link
                  href={`/produits/${product.slug}`}
                  className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                >
                  Voir le produit
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
