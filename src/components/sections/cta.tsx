"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { useLang } from "@/lib/language-context";

export function Cta() {
  const { t, tr } = useLang();

  return (
    <section className="bg-primary py-16 sm:py-20">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 px-4 text-center sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold text-white sm:text-3xl">
          {t("Prêt à protéger votre maison ?", tr.cta.heading)}
        </h2>
        <p className="text-white/90">
          {t("Découvrez notre gamme complète et commandez en toute simplicité.", tr.cta.sub)}
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link
            href="/produits"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-medium text-primary shadow-md transition-all hover:bg-light-gray hover:shadow-lg"
          >
            {t("Voir les produits", tr.cta.view_products)}
            <ArrowRight size={18} />
          </Link>
          <Link
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-6 py-3.5 text-sm font-medium text-white transition-all hover:bg-white hover:text-primary"
          >
            <MessageCircle size={18} />
            {t("Commander sur WhatsApp", tr.cta.whatsapp)}
          </Link>
        </div>
      </div>
    </section>
  );
}
