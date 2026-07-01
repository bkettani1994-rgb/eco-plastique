"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, PackageX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AddToCartButton } from "@/components/add-to-cart-button";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import { useLang } from "@/lib/language-context";

const categoriesFr = ["Tous", ...Array.from(new Set(products.map((product) => product.category)))];

export default function ProduitsPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const { t, tr, isAr } = useLang();

  const categoriesAr = [tr.product_listing.all, ...Array.from(new Set(products.map((p) => p.categoryAr ?? p.category)))];

  const categories = isAr ? categoriesAr : categoriesFr;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const name = isAr && product.nameAr ? product.nameAr : product.name;
      const category = isAr && product.categoryAr ? product.categoryAr : product.category;
      const allLabel = isAr ? tr.product_listing.all : "Tous";
      const matchesQuery = name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === allLabel || category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory, isAr, tr.product_listing.all]);

  // Reset category when language changes
  const allLabel = isAr ? tr.product_listing.all : "Tous";

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-dark-gray sm:text-4xl">
            {t("Nos produits", tr.product_listing.title)}
          </h1>
          <p className="mt-2 text-gray-600">
            {t(
              "Découvrez notre gamme complète de nappes PVC, protège-matelas et oreillers médicaux.",
              tr.product_listing.subtitle,
            )}
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
              placeholder={t("Rechercher un produit...", tr.product_listing.search_placeholder)}
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
            <p className="text-lg font-medium text-dark-gray">
              {t("Aucun produit trouvé", tr.product_listing.not_found)}
            </p>
            <p className="text-sm text-gray-500">
              {t(
                "Essayez une autre recherche ou changez de catégorie.",
                tr.product_listing.not_found_sub,
              )}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={isAr && product.nameAr ? product.nameAr : product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col gap-2">
                  <h2 className="font-semibold text-dark-gray">
                    {isAr && product.nameAr ? product.nameAr : product.name}
                  </h2>
                  <p className="line-clamp-2 text-sm text-gray-500">
                    {isAr && product.shortDescriptionAr
                      ? product.shortDescriptionAr
                      : product.shortDescription}
                  </p>
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
                      {t("Voir le produit", tr.product_listing.view_product)}
                    </Link>
                    <AddToCartButton product={product} className="w-full px-4 py-2.5" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
