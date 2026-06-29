"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { generateOrderId, saveLastOrder, type OrderCustomer } from "@/lib/order";

export default function CommandePage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: "",
    phone: "",
    city: "",
    address: "",
    notes: "",
  });

  if (items.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-8">
          <ShoppingBag size={48} className="text-gray-300" />
          <h1 className="text-2xl font-bold text-dark-gray">Votre panier est vide</h1>
          <p className="text-gray-500">Ajoutez des produits avant de passer commande.</p>
          <Link
            href="/produits"
            className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark"
          >
            Voir les produits
          </Link>
        </div>
      </section>
    );
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const order = {
      id: generateOrderId(),
      items,
      customer,
      total: subtotal,
      createdAt: new Date().toISOString(),
    };

    saveLastOrder(order);
    clearCart();
    router.push("/commande/confirmation");
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <h1 className="mb-6 text-3xl font-bold text-dark-gray">Finaliser ma commande</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-dark-gray">
                Nom complet
              </label>
              <input
                id="fullName"
                type="text"
                required
                value={customer.fullName}
                onChange={(event) =>
                  setCustomer((current) => ({ ...current, fullName: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-dark-gray">
                Téléphone
              </label>
              <input
                id="phone"
                type="tel"
                required
                value={customer.phone}
                onChange={(event) =>
                  setCustomer((current) => ({ ...current, phone: event.target.value }))
                }
                placeholder="06XX XXX XXX"
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium text-dark-gray">
                Ville
              </label>
              <input
                id="city"
                type="text"
                required
                value={customer.city}
                onChange={(event) =>
                  setCustomer((current) => ({ ...current, city: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium text-dark-gray">
                Adresse de livraison
              </label>
              <textarea
                id="address"
                required
                rows={3}
                value={customer.address}
                onChange={(event) =>
                  setCustomer((current) => ({ ...current, address: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="notes" className="mb-1 block text-sm font-medium text-dark-gray">
                Remarques (optionnel)
              </label>
              <textarea
                id="notes"
                rows={2}
                value={customer.notes}
                onChange={(event) =>
                  setCustomer((current) => ({ ...current, notes: event.target.value }))
                }
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
              />
            </div>

            <p className="text-xs text-gray-500">Paiement à la livraison partout au Maroc.</p>

            <button
              type="submit"
              className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
            >
              Confirmer ma commande
            </button>
          </form>
        </div>

        <div className="rounded-2xl bg-light-gray p-6">
          <h2 className="mb-4 text-lg font-semibold text-dark-gray">Récapitulatif</h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between text-sm">
                <span className="text-dark-gray">
                  {item.name} <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="font-medium text-dark-gray">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="font-semibold text-dark-gray">Total</span>
            <span className="text-lg font-bold text-primary">{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
