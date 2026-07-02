"use client";

import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";

export function FeaturedProducts() {

  return (
    <section className="bg-light-gray py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
            Nos produits
          </h2>
          <p className="mt-2 text-gray-600">
            Sélectionnés pour leur qualité et leur confort
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <Card key={product.id} className="flex flex-col overflow-hidden">
              <Link href={`/produits/${product.slug}`} className="relative aspect-square overflow-hidden block">
                <Image
                  src={product.images[0]}
                  alt={product.name}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  className="object-cover transition-transform hover:scale-105"
                />
              </Link>
              <CardContent className="flex flex-1 flex-col p-3 sm:p-4">
                <Link href={`/produits/${product.slug}`} className="text-sm font-semibold text-dark-gray hover:text-primary sm:text-base">
                  {product.name}
                </Link>
                <div className="flex flex-wrap items-center gap-1">
                  <span className="text-sm font-bold text-primary sm:text-base">
                    {product.fromPrice ? "À partir de " : ""}{formatPrice(product.price)}
                  </span>
                  {product.oldPrice ? (
                    <span className="text-xs text-gray-400 line-through sm:text-sm">
                      {formatPrice(product.oldPrice)}
                    </span>
                  ) : null}
                </div>
                <div className="mt-auto pt-2">
                  <Link
                    href={`/produits/${product.slug}`}
                    className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-3 py-2 text-xs font-medium text-white transition-colors hover:bg-primary-dark sm:px-4 sm:py-2.5 sm:text-sm"
                  >
                    Voir le produit
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
