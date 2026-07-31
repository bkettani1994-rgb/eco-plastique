"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, PackageX } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { products, type Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

// بطاقة إضافية : صفحة تجمع الوسادتين (موجودة فقط في القائمة، وليست ضمن
// البيانات المشتركة حتى لا تظهر في الصفحة الرئيسية).
type CardItem = Pick<
  Product,
  "id" | "slug" | "name" | "shortDescription" | "images" | "price" | "category"
> & {
  nameAr?: string;
  shortDescriptionAr?: string;
  categoryAr?: string;
  fromPrice?: boolean;
  oldPrice?: number;
};

const comboOreillers: CardItem = {
  id: "oreillers-combo",
  slug: "oreillers",
  name: "Oreillers médicaux — cervical & mousse",
  nameAr: "الوسائد الطبية — للرقبة وإسفنج الذاكرة",
  shortDescription: "Choisissez entre l'oreiller cervical ou en mousse.",
  shortDescriptionAr: "صفحة واحدة للاختيار بين الوسادة الطبية للرقبة أو وسادة إسفنج ذاكرة الشكل.",
  images: [
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-2_1_jxnez8.jpg",
  ],
  price: 199,
  fromPrice: true,
  category: "Oreillers médicaux",
  categoryAr: "الوسائد الطبية",
};

const listItems: CardItem[] = [...products, comboOreillers];

const ALL = "الكل";
const categories = [
  ALL,
  ...Array.from(new Set(listItems.map((product) => product.categoryAr ?? product.category))),
];

export default function ProduitsPageAr() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState(ALL);

  const filteredProducts = useMemo(() => {
    return listItems.filter((product) => {
      const name = product.nameAr ?? product.name;
      const category = product.categoryAr ?? product.category;
      const matchesQuery =
        name.includes(query) || product.name.toLowerCase().includes(query.toLowerCase());
      const matchesCategory = activeCategory === ALL || category === activeCategory;
      return matchesQuery && matchesCategory;
    });
  }, [query, activeCategory]);

  return (
    <section dir="rtl" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-dark-gray sm:text-4xl">منتجاتنا</h1>
          <p className="mt-2 text-gray-600">
            اكتشف مجموعتنا الكاملة من أغطية طاولة PVC وواقيات المراتب والوسائد الطبية.
          </p>
        </div>

        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search
              size={18}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="ابحث عن منتج..."
              className="w-full rounded-xl border border-gray-200 bg-light-gray py-3 pe-11 ps-4 text-sm text-dark-gray placeholder:text-gray-400 focus:border-primary focus:outline-none"
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
            <p className="text-lg font-medium text-dark-gray">لم يتم العثور على منتجات</p>
            <p className="text-sm text-gray-500">
              جرّب بحثاً آخر أو غيّر الفئة.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="flex flex-col overflow-hidden">
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[0]}
                    alt={product.nameAr ?? product.name}
                    fill
                    sizes="(min-width: 1024px) 25vw, 50vw"
                    className="object-cover"
                  />
                </div>
                <CardContent className="flex flex-1 flex-col gap-2">
                  <h2 className="font-semibold text-dark-gray">{product.nameAr ?? product.name}</h2>
                  <p className="line-clamp-2 text-sm text-gray-500">
                    {product.shortDescriptionAr ?? product.shortDescription}
                  </p>
                  <div className="mt-auto flex items-center gap-2 pt-2">
                    <span className="text-lg font-bold text-primary">
                      {product.fromPrice ? "ابتداءً من " : ""}{formatPrice(product.price)}
                    </span>
                    {product.oldPrice ? (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(product.oldPrice)}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-2 flex flex-col gap-2">
                    <Link
                      href={`/ar/produits/${product.slug}`}
                      className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
                    >
                      عرض المنتج
                    </Link>
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
