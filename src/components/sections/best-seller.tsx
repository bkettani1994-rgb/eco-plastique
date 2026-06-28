import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Badge } from "@/components/ui/badge";
import { getProductBySlug } from "@/data/products";

export function BestSeller() {
  const product = getProductBySlug("nappe-pvc-sur-mesure");

  if (!product) {
    return null;
  }

  const benefits = ["Protection optimale", "Facile à nettoyer", "Sur mesure", "Résistante"];

  return (
    <section className="bg-light-gray py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <ImagePlaceholder aspect="video" iconSize={40} />

        <div className="space-y-6">
          <Badge>Meilleure vente</Badge>
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">{product.name}</h2>
          <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>

          <ul className="grid grid-cols-2 gap-3">
            {benefits.map((benefit) => (
              <li key={benefit} className="flex items-center gap-2 text-sm text-dark-gray">
                <CheckCircle2 size={18} className="shrink-0 text-primary" />
                {benefit}
              </li>
            ))}
          </ul>

          <Link
            href={`/produits/${product.slug}`}
            className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
          >
            Voir le produit
          </Link>
        </div>
      </div>
    </section>
  );
}
