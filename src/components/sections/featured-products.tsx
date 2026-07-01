"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { useLang } from "@/lib/language-context";

export function FeaturedProducts() {
  const { t, tr } = useLang();

  return (
    <section className="bg-light-gray py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
            {t("Nos produits", tr.products.heading)}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("Sélectionnés pour leur qualité et leur confort", tr.products.subheading)}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover"
                />
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
                <div className="mt-2 flex flex-col gap-2">
                  <Link
                    href={`/produits/${product.slug}`}
                    className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                  >
                    {t("Voir le produit", tr.products.view)}
                  </Link>
                  <AddToCartButton product={product} className="w-full px-4 py-2.5" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
