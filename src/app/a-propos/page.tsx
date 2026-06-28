import type { Metadata } from "next";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { ShieldCheck, Handshake, Lightbulb, Headset, Truck, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { whyChooseUs } from "@/data/site";

export const metadata: Metadata = {
  title: "À propos",
  description:
    "Découvrez Eco Plastique, entreprise marocaine spécialisée dans les nappes PVC sur mesure, les protège-matelas imperméables et les oreillers médicaux.",
};

const values = [
  {
    title: "Qualité",
    description:
      "Nous sélectionnons rigoureusement nos matériaux pour garantir des produits durables et fiables.",
    icon: ShieldCheck,
  },
  {
    title: "Confiance",
    description:
      "Le paiement à la livraison et notre service client réactif construisent une relation de confiance avec chaque client.",
    icon: Handshake,
  },
  {
    title: "Innovation",
    description:
      "Nous adaptons continuellement nos produits aux besoins réels des foyers marocains, du sur-mesure aux nouvelles matières.",
    icon: Lightbulb,
  },
  {
    title: "Service client",
    description:
      "Notre équipe reste disponible sur WhatsApp pour vous accompagner avant et après votre commande.",
    icon: Headset,
  },
];

const whyIconMap: Record<string, LucideIcon> = {
  Truck,
  Wallet,
  ShieldCheck,
  Headset,
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-light-gray py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
          <div className="space-y-6">
            <h1 className="text-3xl font-bold text-dark-gray sm:text-4xl">
              À propos d&apos;Eco Plastique
            </h1>
            <p className="text-gray-600 leading-relaxed">
              Eco Plastique est une entreprise marocaine spécialisée dans la fabrication et la
              distribution de nappes en PVC sur mesure, de protège-matelas imperméables et
              d&apos;oreillers médicaux. Depuis nos débuts, nous avons à cœur d&apos;offrir des
              produits utiles, durables et accessibles à toutes les familles marocaines, en
              alliant qualité, confort et praticité au quotidien.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Notre mission est simple : protéger votre maison et améliorer votre confort grâce à
              des produits pensés pour durer, avec un service client à l&apos;écoute et une
              livraison rapide partout au Maroc.
            </p>
          </div>
          <ImagePlaceholder aspect="video" iconSize={48} label="Notre équipe Eco Plastique" />
        </div>
      </section>

      <section className="bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">Nos valeurs</h2>
            <p className="mt-2 text-gray-600">Ce qui guide notre travail chaque jour</p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <div
                  key={value.title}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-light-gray p-6 text-center shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
                    <Icon size={24} />
                  </div>
                  <h3 className="font-semibold text-dark-gray">{value.title}</h3>
                  <p className="text-sm text-gray-500">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-light-gray py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
              Pourquoi nous choisir
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item) => {
              const Icon = whyIconMap[item.icon];
              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-sm"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    {Icon ? <Icon size={24} /> : null}
                  </div>
                  <h3 className="font-semibold text-dark-gray">{item.title}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
