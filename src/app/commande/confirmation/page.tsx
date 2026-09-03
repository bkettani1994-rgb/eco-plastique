"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  MessageCircle,
  PhoneCall,
  Package,
  Truck,
  User,
  Phone,
  MapPin,
  Home,
} from "lucide-react";
import { getLastOrder, type Order } from "@/lib/order";
import { siteConfig } from "@/data/site";
import { formatPrice } from "@/lib/utils";
import { trackPixel } from "@/lib/meta-pixel";

// Numéro WhatsApp spécifique selon le produit commandé (sinon numéro par défaut)
const PRODUCT_WHATSAPP: Record<string, string> = {
  "nappe-pvc-sur-mesure": "212663310060",
};

const NEXT_STEPS = [
  {
    icon: PhoneCall,
    title: "Confirmation par téléphone",
    text: "Notre équipe vous appelle très vite pour confirmer votre commande.",
  },
  {
    icon: Package,
    title: "Préparation",
    text: "Votre commande est préparée avec soin dans nos ateliers.",
  },
  {
    icon: Truck,
    title: "Livraison sous 24–72 h",
    text: "Livraison partout au Maroc. Paiement à la réception.",
  },
];

export default function CommandeConfirmationPage() {
  const [order] = useState<Order | null>(() =>
    typeof window === "undefined" ? null : getLastOrder(),
  );

  // Événement Meta Purchase (une seule fois, avec la valeur de la commande)
  const tracked = useRef(false);
  useEffect(() => {
    if (order && !tracked.current) {
      tracked.current = true;
      trackPixel(
        "Purchase",
        {
          value: order.total,
          currency: "MAD",
          contents: order.items.map((item) => ({
            id: item.slug,
            quantity: item.quantity,
          })),
          num_items: order.items.reduce((sum, item) => sum + item.quantity, 0),
        },
        order.id, // eventID = déduplication avec la Conversions API serveur
      );
    }
  }, [order]);

  if (!order) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-3 px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-dark-gray">Aucune commande trouvée</h1>
          <p className="text-gray-500">Découvrez nos produits et passez votre première commande.</p>
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

  const firstName = order.customer.fullName.trim().split(/\s+/)[0] || order.customer.fullName;

  const recapLines = order.items
    .map((item) => `- ${item.name} x${item.quantity} (${formatPrice(item.price * item.quantity)})`)
    .join("\n");

  const whatsappMessage = `Bonjour, je viens de passer la commande ${order.id} sur le site :\n${recapLines}\nTotal : ${formatPrice(order.total)}\nNom : ${order.customer.fullName}\nTéléphone : ${order.customer.phone}\nVille : ${order.customer.city}\nAdresse : ${order.customer.address}`;

  // Numéro WhatsApp selon le produit commandé (ex. nappe PVC → numéro dédié)
  const waNumber = PRODUCT_WHATSAPP[order.items[0]?.slug] ?? siteConfig.whatsappNumber;
  const whatsappHref = `https://wa.me/${waNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const actionButtons = (
    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
      <Link
        href={whatsappHref}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
      >
        <MessageCircle size={18} />
        Confirmer sur WhatsApp
      </Link>
      <Link
        href="/produits"
        className="inline-flex items-center justify-center rounded-xl border-2 border-primary bg-white px-6 py-3.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
      >
        Continuer mes achats
      </Link>
    </div>
  );

  return (
    <section className="bg-light-gray py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
        {/* ── En-tête de confirmation ── */}
        <div className="rounded-3xl bg-white p-8 text-center shadow-sm">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 size={44} className="text-primary" />
          </div>

          <h1 className="mt-5 text-3xl font-bold text-dark-gray">
            Merci <span className="text-primary">{firstName}</span> ! 🎉
          </h1>
          <p className="mt-3 text-gray-600">
            Votre commande a bien été reçue. Nous sommes ravis de vous compter
            parmi nos clients.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-light-gray px-4 py-2 text-sm">
            <span className="text-gray-500">N° de commande :</span>
            <span className="font-bold text-dark-gray">{order.id}</span>
          </div>

          {/* CTA de confirmation directement sous le n° de commande */}
          {actionButtons}
        </div>

        {/* ── Et maintenant ? ── */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-dark-gray">Et maintenant ?</h2>
          <div className="flex flex-col gap-4">
            {NEXT_STEPS.map(({ icon: Icon, title, text }, i) => (
              <div key={title} className="flex items-start gap-4">
                <div className="relative flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10">
                  <Icon size={20} className="text-primary" />
                  <span className="absolute -left-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                    {i + 1}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-dark-gray">{title}</p>
                  <p className="text-sm text-gray-500">{text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Récapitulatif de la commande ── */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-dark-gray">Votre commande</h2>
          <div className="flex flex-col gap-3">
            {order.items.map((item) => (
              <div key={item.slug} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-dark-gray">
                  {item.name} <span className="text-gray-400">× {item.quantity}</span>
                </span>
                <span className="flex-shrink-0 font-medium text-dark-gray">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between rounded-xl bg-primary/10 px-4 py-3">
            <span className="font-semibold text-dark-gray">Total à payer à la livraison</span>
            <span className="text-xl font-extrabold text-primary">{formatPrice(order.total)}</span>
          </div>
        </div>

        {/* ── Coordonnées de livraison ── */}
        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-lg font-bold text-dark-gray">Livraison prévue chez</h2>
          <div className="flex flex-col gap-3 text-sm">
            <div className="flex items-center gap-3">
              <User size={18} className="flex-shrink-0 text-primary" />
              <span className="rounded-lg bg-primary/10 px-3 py-1 text-base font-bold text-primary">
                {order.customer.fullName}
              </span>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Phone size={18} className="flex-shrink-0 text-primary" />
              {order.customer.phone}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <MapPin size={18} className="flex-shrink-0 text-primary" />
              {order.customer.city}
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <Home size={18} className="flex-shrink-0 text-primary" />
              {order.customer.address}
            </div>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-400">
          Une question sur votre commande ? Contactez-nous sur WhatsApp, nous
          répondons rapidement.
        </p>
      </div>
    </section>
  );
}
