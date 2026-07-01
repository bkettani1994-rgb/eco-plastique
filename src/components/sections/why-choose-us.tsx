"use client";

import type { LucideIcon } from "lucide-react";
import { Truck, Wallet, ShieldCheck, Headset } from "lucide-react";
import { whyChooseUs } from "@/data/site";

const iconMap: Record<string, LucideIcon> = { Truck, Wallet, ShieldCheck, Headset };

export function WhyChooseUs() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
            Pourquoi nous choisir
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyChooseUs.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <div
                key={item.title}
                className="flex flex-col items-center gap-3 rounded-2xl bg-light-gray p-6 text-center shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white">
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
  );
}
