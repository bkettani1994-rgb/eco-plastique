"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, PackageX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

const categories = ["Tous", ...Array.from(new Set(products.map((product) => product.category)))];

export default function ProduitsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesQuery = product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === "Tous" || product.category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-dark-gray sm:text-4xl">Nos produits</h1>
          <p className="mt-2 text-gray-600">
            Découvrez notre gamme complète de nappes PVC, protège-matelas et oreillers médicaux.
          </p>
        </div>

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher un produit..."
              className="w-full rounded-xl border border-gray-200 bg-light-gray py-3 pl-11 pr-4 text-sm text-dark-gray placeholder:text-gray-400 focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "rounded-xl px-4 py-2 text-sm font-medium transition-colors",
                  activeCategory === category
                    ? "bg-primary text-white"
                    : "bg-light-gray text-dark-gray hover:bg-primary/10",
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <PackageX size={48} className="text-gray-300" />
            <p className="text-lg font-medium text-dark-gray">Aucun produit trouvé</p>
            <p className="text-sm text-gray-500">
              Essayez une autre recherche ou changez de catégorie.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
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
                  <h2 className="font-semibold text-dark-gray">{product.name}</h2>
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
        )}
      </div>
    </section>
  );
}
