import type { LucideIcon } from "lucide-react";
import { ShoppingBag, Ruler, BadgeCheck, Truck } from "lucide-react";
import { howItWorks } from "@/data/site";

const iconMap: Record<string, LucideIcon> = {
  ShoppingBag,
  Ruler,
  BadgeCheck,
  Truck,
};

export function HowItWorks() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">Comment ça marche</h2>
          <p className="mt-2 text-gray-600">Une commande simple, rapide et sans stress</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorks.map((step, index) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={step.title} className="flex flex-col items-center gap-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  {Icon ? <Icon size={28} /> : null}
                </div>
                <span className="text-xs font-semibold uppercase tracking-wide text-primary">
                  Étape {index + 1}
                </span>
                <h3 className="font-semibold text-dark-gray">{step.title}</h3>
                <p className="text-sm text-gray-500">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
