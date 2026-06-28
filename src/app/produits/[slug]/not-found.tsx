import Link from "next/link";
import { PackageX } from "lucide-react";

export default function ProductNotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <PackageX size={48} className="text-gray-300" />
      <h1 className="text-2xl font-bold text-dark-gray">Produit introuvable</h1>
      <p className="text-gray-500">Ce produit n&apos;existe pas ou n&apos;est plus disponible.</p>
      <Link
        href="/produits"
        className="inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark"
      >
        Voir tous les produits
      </Link>
    </section>
  );
}
