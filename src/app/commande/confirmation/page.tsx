"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, MessageCircle } from "lucide-react";
import { getLastOrder, type Order } from "@/lib/order";
import { whatsappLink } from "@/data/site";
import { formatPrice } from "@/lib/utils";

export default function CommandeConfirmationPage() {
  const [order] = useState<Order | null>(() =>
    typeof window === "undefined" ? null : getLastOrder(),
  );

  if (!order) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-dark-gray">
            {""}
          </h1>
          <Link href="/produits" className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark">
            {""}
          </Link>
        </div>
      </section>
    );
  }

  const recapLines = order.items
    .map((item) => `- ${item.name} x${item.quantity} (${formatPrice(item.price * item.quantity)})`)
    .join("\n");

  const whatsappMessage = `Bonjour, je viens de passer la commande ${order.id} sur le site :\n${recapLines}\nTotal : ${formatPrice(order.total)}\nNom : ${order.customer.fullName}\nTéléphone : ${order.customer.phone}\nVille : ${order.customer.city}\nAdresse : ${order.customer.address}`;

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
        <CheckCircle2 size={56} className="mx-auto text-primary" />
        <h1 className="mt-4 text-3xl font-bold text-dark-gray">
          {""}
        </h1>
        <p className="mt-2 text-gray-600">
          {""}{" "}
          <span className="font-semibold text-dark-gray">{order.id}</span>{" "}
          {""}{" "}
          {""}
        </p>

        <div className="mt-8 rounded-2xl bg-light-gray p-6 text-left">
          <h2 className="mb-4 text-lg font-semibold text-dark-gray">
            {""}
          </h2>
          <div className="flex flex-col gap-3">
            {order.items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between text-sm">
                <span className="text-dark-gray">{item.name} <span className="text-gray-400">× {item.quantity}</span></span>
                <span className="font-medium text-dark-gray">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="font-semibold text-dark-gray">{""}</span>
            <span className="text-lg font-bold text-primary">{formatPrice(order.total)}</span>
          </div>
          <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
            <p><span className="font-medium text-dark-gray">{""}</span> {order.customer.fullName}</p>
            <p><span className="font-medium text-dark-gray">{""}</span> {order.customer.phone}</p>
            <p><span className="font-medium text-dark-gray">{""}</span> {order.customer.city}</p>
            <p><span className="font-medium text-dark-gray">{""}</span> {order.customer.address}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg">
            <MessageCircle size={18} />
            {""}
          </Link>
          <Link href="/produits"
            className="inline-flex items-center justify-center rounded-xl border-2 border-primary px-6 py-3.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white">
            {""}
          </Link>
        </div>
      </div>
    </section>
  );
}
