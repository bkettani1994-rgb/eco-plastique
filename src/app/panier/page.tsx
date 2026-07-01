"use client";

import Link from "next/link";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";

export default function PanierPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-8">
          <ShoppingBag size={48} className="text-gray-300" />
          <h1 className="text-2xl font-bold text-dark-gray">
            {""}
          </h1>
          <p className="text-gray-500">
            {""}
          </p>
          <Link
            href="/produits"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark"
          >
            {""}
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-dark-gray">
          {""}
        </h1>

        <div className="flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="flex items-center gap-4 rounded-2xl border border-gray-100 p-4 shadow-sm"
            >
              <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl">
                <Image src={item.image} alt={item.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-dark-gray">{item.name}</p>
                <p className="text-sm text-gray-500">{formatPrice(item.price)}</p>
              </div>
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 px-2 py-1">
                <button type="button" aria-label="Diminuer" onClick={() => updateQuantity(item.slug, item.quantity - 1)} className="flex h-7 w-7 items-center justify-center rounded-lg text-dark-gray hover:bg-light-gray">
                  <Minus size={14} />
                </button>
                <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                <button type="button" aria-label="Augmenter" onClick={() => updateQuantity(item.slug, item.quantity + 1)} className="flex h-7 w-7 items-center justify-center rounded-lg text-dark-gray hover:bg-light-gray">
                  <Plus size={14} />
                </button>
              </div>
              <span className="w-20 text-right font-semibold text-dark-gray">
                {formatPrice(item.price * item.quantity)}
              </span>
              <button type="button" aria-label="Retirer" onClick={() => removeItem(item.slug)} className="flex h-9 w-9 items-center justify-center rounded-xl text-gray-400 hover:bg-red-50 hover:text-red-500">
                <Trash2 size={18} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-end gap-4 border-t border-gray-100 pt-6">
          <div className="flex items-center gap-3 text-lg">
            <span className="text-gray-500">{""}</span>
            <span className="font-bold text-primary">{formatPrice(subtotal)}</span>
          </div>
          <Link href="/commande" className="inline-flex items-center justify-center rounded-xl bg-primary px-8 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg">
            {""}
          </Link>
        </div>
      </div>
    </section>
  );
}
