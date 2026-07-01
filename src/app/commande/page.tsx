"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { formatPrice } from "@/lib/utils";
import { generateOrderId, saveLastOrder, type OrderCustomer } from "@/lib/order";
import { useLang } from "@/lib/language-context";

export default function CommandePage() {
  const router = useRouter();
  const { items, subtotal, clearCart } = useCart();
  const { t, tr } = useLang();
  const [customer, setCustomer] = useState<OrderCustomer>({
    fullName: "", phone: "", city: "", address: "", notes: "",
  });

  if (items.length === 0) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-8">
          <ShoppingBag size={48} className="text-gray-300" />
          <h1 className="text-2xl font-bold text-dark-gray">
            {t("Votre panier est vide", tr.order.empty_title)}
          </h1>
          <p className="text-gray-500">
            {t("Ajoutez des produits avant de passer commande.", tr.order.empty_sub)}
          </p>
          <Link href="/produits" className="mt-4 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark">
            {t("Voir les produits", tr.cart.view_products)}
          </Link>
        </div>
      </section>
    );
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    saveLastOrder({ id: generateOrderId(), items, customer, total: subtotal, createdAt: new Date().toISOString() });
    clearCart();
    router.push("/commande/confirmation");
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div>
          <h1 className="mb-6 text-3xl font-bold text-dark-gray">
            {t("Finaliser ma commande", tr.order.title)}
          </h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="fullName" className="mb-1 block text-sm font-medium text-dark-gray">
                {t("Nom complet", tr.order.fullName)}
              </label>
              <input id="fullName" type="text" required value={customer.fullName}
                onChange={(e) => setCustomer((c) => ({ ...c, fullName: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label htmlFor="phone" className="mb-1 block text-sm font-medium text-dark-gray">
                {t("Téléphone", tr.order.phone)}
              </label>
              <input id="phone" type="tel" required value={customer.phone} placeholder="06XX XXX XXX"
                onChange={(e) => setCustomer((c) => ({ ...c, phone: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label htmlFor="city" className="mb-1 block text-sm font-medium text-dark-gray">
                {t("Ville", tr.order.city)}
              </label>
              <input id="city" type="text" required value={customer.city}
                onChange={(e) => setCustomer((c) => ({ ...c, city: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label htmlFor="address" className="mb-1 block text-sm font-medium text-dark-gray">
                {t("Adresse de livraison", tr.order.address)}
              </label>
              <textarea id="address" required rows={3} value={customer.address}
                onChange={(e) => setCustomer((c) => ({ ...c, address: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none" />
            </div>
            <div>
              <label htmlFor="notes" className="mb-1 block text-sm font-medium text-dark-gray">
                {t("Remarques (optionnel)", tr.order.notes)}
              </label>
              <textarea id="notes" rows={2} value={customer.notes}
                onChange={(e) => setCustomer((c) => ({ ...c, notes: e.target.value }))}
                className="w-full rounded-xl border border-gray-200 bg-light-gray px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none" />
            </div>
            <p className="text-xs text-gray-500">{t("Paiement à la livraison partout au Maroc.", tr.order.cod)}</p>
            <button type="submit" className="mt-2 inline-flex items-center justify-center rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg">
              {t("Confirmer ma commande", tr.order.submit)}
            </button>
          </form>
        </div>

        <div className="rounded-2xl bg-light-gray p-6">
          <h2 className="mb-4 text-lg font-semibold text-dark-gray">
            {t("Récapitulatif", tr.order.recap)}
          </h2>
          <div className="flex flex-col gap-3">
            {items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between text-sm">
                <span className="text-dark-gray">{item.name} <span className="text-gray-400">× {item.quantity}</span></span>
                <span className="font-medium text-dark-gray">{formatPrice(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
            <span className="font-semibold text-dark-gray">{t("Total", tr.order.total)}</span>
            <span className="text-lg font-bold text-primary">{formatPrice(subtotal)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
