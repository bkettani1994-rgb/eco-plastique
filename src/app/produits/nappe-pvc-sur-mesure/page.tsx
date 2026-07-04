"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
  Droplets,
  Sparkles,
  Truck,
  RotateCcw,
  Star,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { generateOrderId, saveLastOrder } from "@/lib/order";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PRODUCT = {
  slug: "nappe-pvc-sur-mesure",
  name: "Nappes en PVC sur mesure",
  price: 150,
  image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
};

const GALLERY = [
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
];

const SIZES: { label: string; price: number }[] = [
  { label: "Sur mesure", price: 150 },
];

const OFFERS = [
  { qty: 1, label: "1 pièce",  discount: 1,    badge: null,   popular: false },
  { qty: 2, label: "2 pièces", discount: 0.95, badge: "−5%",  popular: true },
  { qty: 3, label: "3 pièces", discount: 0.90, badge: "−10%", popular: false },
];

const TRUST_BADGES = [
  { icon: Droplets, label: "Résistante aux liquides", desc: "PVC haute qualité" },
  { icon: Sparkles, label: "Facile à nettoyer",       desc: "Un coup d'éponge suffit" },
  { icon: Shield,   label: "Durable",                 desc: "Bords renforcés" },
  { icon: Truck,    label: "Livraison rapide",        desc: "Partout au Maroc" },
  { icon: RotateCcw,label: "Découpe sur mesure",      desc: "Toutes formes de table" },
  { icon: Star,     label: "4.8 / 5",                 desc: "Basé sur les avis clients" },
];

const LIFESTYLE_BLOCKS = [
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    title: "Découpée aux dimensions exactes de votre table",
    text: "Nos nappes en PVC sont découpées selon les dimensions précises de votre table, qu'elle soit ronde, carrée, ovale ou rectangulaire. Une protection qui épouse parfaitement votre table, sans excès ni manque.",
    imageLeft: true,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    title: "Une protection quotidienne contre les taches et l'eau",
    text: "Fabriquée à partir d'un PVC épais et de haute qualité, elle protège durablement votre table contre les taches, l'eau, l'huile et la chaleur des plats, tout en restant agréable au toucher.",
    imageLeft: false,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    title: "Un large choix de motifs et de couleurs",
    text: "Disponible dans une large gamme de motifs et de couleurs pour s'harmoniser avec votre décoration intérieure. Élégance et praticité à la fois.",
    imageLeft: true,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    title: "Un nettoyage en quelques secondes",
    text: "Sa surface lisse s'essuie en quelques secondes, d'un simple coup d'éponge. Pas besoin de lavage, une hygiène quotidienne avec le minimum d'effort.",
    imageLeft: false,
  },
];

const COMPARISON = [
  { feature: "Découpe sur mesure (toutes formes)",      ours: true,  classic: false },
  { feature: "PVC épais résistant aux taches",          ours: true,  classic: false },
  { feature: "Surface qui s'essuie en secondes",         ours: true,  classic: true  },
  { feature: "Bords renforcés anti-effilochage",         ours: true,  classic: false },
  { feature: "Large choix de motifs et couleurs",        ours: true,  classic: false },
  { feature: "Résiste aux contacts avec la chaleur",     ours: true,  classic: false },
  { feature: "Garantie 12 mois",                        ours: true,  classic: false },
  { feature: "Fabrication marocaine",                   ours: true,  classic: false },
];

const FAQ_ITEMS = [
  {
    q: "Comment prendre les mesures de ma table ?",
    a: "Mesurez la longueur et la largeur de votre table avec un mètre ruban, en ajoutant si besoin quelques centimètres de débord sur chaque côté pour un effet drapé.",
  },
  {
    q: "La nappe résiste-t-elle à la chaleur ?",
    a: "Oui, notre PVC supporte les contacts ponctuels avec des plats tièdes, mais nous recommandons un dessous de plat pour les plats très chauds afin de préserver la nappe sur le long terme.",
  },
  {
    q: "Puis-je choisir un motif personnalisé ?",
    a: "Oui, contactez-nous sur WhatsApp pour découvrir notre catalogue complet de motifs et de couleurs disponibles, et recevoir des conseils personnalisés.",
  },
  {
    q: "Combien de temps faut-il pour recevoir ma nappe sur mesure ?",
    a: "Le délai de fabrication et de livraison est généralement de 2 à 5 jours ouvrés selon votre ville.",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function NappePvcPage() {
  const router = useRouter();
  const { addItem, clearCart } = useCart();

  const [activeImg, setActiveImg] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(OFFERS[0]);
  const [chosenSizes, setChosenSizes] = useState<{ label: string; price: number }[]>([SIZES[0]]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  function handleOfferChange(offer: typeof OFFERS[0]) {
    setSelectedOffer(offer);
    setChosenSizes(Array.from({ length: offer.qty }, (_, i) => chosenSizes[i] ?? SIZES[0]));
  }

  function handleSizeChange(slotIndex: number, sizeLabel: string) {
    const found = SIZES.find((s) => s.label === sizeLabel) ?? SIZES[0];
    setChosenSizes((prev) => prev.map((s, i) => (i === slotIndex ? found : s)));
  }

  const baseTotal = chosenSizes.reduce((sum, s) => sum + s.price, 0);
  const totalPrice = Math.round(baseTotal * selectedOffer.discount);

  const [form, setForm] = useState({ fullName: "", phone: "", city: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const sizeSummary = chosenSizes.map((s) => s.label).join(", ");
    const orderItem = {
      slug: PRODUCT.slug,
      name: `${PRODUCT.name} (${sizeSummary})`,
      price: Math.round(totalPrice / selectedOffer.qty),
      image: PRODUCT.image,
      quantity: selectedOffer.qty,
    };

    clearCart();
    addItem(orderItem, selectedOffer.qty);

    saveLastOrder({
      id: generateOrderId(),
      items: [{ ...orderItem, quantity: selectedOffer.qty }],
      customer: { ...form, notes: `Offre : ${selectedOffer.label} | Format : ${sizeSummary} | Total : ${totalPrice} MAD` },
      total: totalPrice,
      createdAt: new Date().toISOString(),
    });

    router.push("/commande/confirmation");
  }

  return (
    <main className="bg-white">
      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-light-gray">
              <Image
                src={GALLERY[activeImg]}
                alt={PRODUCT.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {GALLERY.length > 1 && (
              <div className="grid grid-cols-5 gap-2">
                {GALLERY.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImg(i)}
                    className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 transition-all ${
                      i === activeImg ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={src} alt={`Vue ${i + 1}`} fill className="object-cover" sizes="20vw" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info + form */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Nappes
              </span>
              <h1 className="mt-2 text-3xl font-bold text-dark-gray">
                Nappes en PVC sur mesure
              </h1>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Protégez votre table avec élégance grâce à notre nappe en PVC sur mesure, facile à
                nettoyer et résistante au quotidien.
              </p>
              <div className="mt-3 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500">4.8 / 5</span>
              </div>
            </div>

            {/* Quantity offers + order form — single orange bordered section */}
            <div className="rounded-2xl border-2 p-5" style={{ borderColor: "#f97316" }}>
              <p className="mb-3 text-sm font-semibold text-dark-gray">Choisissez votre offre :</p>
              <div className="flex flex-col gap-3">
                {OFFERS.map((offer) => {
                  const isSelected = selectedOffer.qty === offer.qty;
                  const previewBase = isSelected ? baseTotal : SIZES[0].price * offer.qty;
                  const previewTotal = Math.round(previewBase * offer.discount);
                  const previewOld = Math.round(previewBase);

                  return (
                    <div
                      key={offer.qty}
                      className="relative rounded-xl border-2 transition-all"
                      style={isSelected ? { borderColor: "#f97316", backgroundColor: "#fff7ed" } : { borderColor: "#e5e7eb" }}
                    >
                      <button
                        type="button"
                        onClick={() => handleOfferChange(offer)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all"
                            style={isSelected ? { borderColor: "#f97316", backgroundColor: "#f97316" } : { borderColor: "#d1d5db" }}
                          >
                            {isSelected && <Check size={11} className="text-white" />}
                          </div>
                          <div>
                            <span className="font-semibold text-dark-gray">{offer.label}</span>
                            {offer.badge && (
                              <span className="ml-2 rounded-full px-2.5 py-1 text-xs font-extrabold text-white shadow-sm" style={{ backgroundColor: "#f97316" }}>
                                {offer.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold" style={{ color: "#f97316" }}>
                            {isSelected ? totalPrice : previewTotal} MAD
                          </span>
                          {offer.qty > 1 && (
                            <span className="ml-2 text-sm text-gray-400 line-through">
                              {isSelected ? baseTotal : previewOld} MAD
                            </span>
                          )}
                        </div>
                      </button>

                      {isSelected && SIZES.length > 1 && (
                        <div className="flex flex-col gap-2 border-t border-primary/20 px-4 pb-4 pt-3">
                          {Array.from({ length: offer.qty }).map((_, slotIndex) => (
                            <div key={slotIndex} className="flex items-center gap-3">
                              <span className="w-16 flex-shrink-0 text-xs text-gray-500">
                                Pièce {slotIndex + 1}
                              </span>
                              <select
                                value={chosenSizes[slotIndex]?.label ?? SIZES[0].label}
                                onChange={(e) => handleSizeChange(slotIndex, e.target.value)}
                                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-dark-gray focus:border-primary focus:outline-none"
                              >
                                {SIZES.map((s) => (
                                  <option key={s.label} value={s.label}>
                                    {s.label} — {s.price} MAD
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              <hr className="my-2 border-orange-200" />

              {/* Order form inside the same orange border */}
              <form onSubmit={handleOrder} className="flex flex-col gap-3">
                <p className="font-semibold text-dark-gray">Vos coordonnées de livraison</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Nom complet"
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Téléphone (06…)"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <input
                  required
                  placeholder="Ville"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                />
                <input
                  required
                  placeholder="Adresse de livraison"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                />
                <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#fff7ed" }}>
                  <span className="text-sm text-gray-500">Frais de livraison</span>
                  <span className="text-sm font-semibold text-green-600">Gratuit</span>
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="animate-shake mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70"
                >
                  <ShoppingCart size={18} />
                  {submitting ? "Traitement…" : `Commander — ${totalPrice} MAD`}
                </button>
                <p className="text-center text-xs text-gray-400">
                  Paiement à la livraison · Livraison sous 24–72h au Maroc
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BADGES ─────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-light-gray py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {TRUST_BADGES.map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Icon size={22} className="text-primary" />
                </div>
                <p className="text-sm font-semibold text-dark-gray">{label}</p>
                <p className="text-xs text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. LIFESTYLE BLOCKS ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        {LIFESTYLE_BLOCKS.map((block, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-10 lg:flex-row ${
              block.imageLeft ? "" : "lg:flex-row-reverse"
            }`}
          >
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-light-gray lg:w-1/2">
              <Image
                src={block.image}
                alt={block.title}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col gap-4 lg:w-1/2">
              <h2 className="text-2xl font-bold text-dark-gray">{block.title}</h2>
              <p className="text-gray-500 leading-relaxed">{block.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── 4. COMPARISON TABLE ─────────────────────────────────────── */}
      <section className="bg-light-gray py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray">
            Pourquoi choisir la nôtre ?
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-4 text-left font-semibold text-dark-gray">Caractéristique</th>
                  <th className="px-5 py-4 text-center font-semibold text-primary">Eco Plastique</th>
                  <th className="px-5 py-4 text-center font-semibold text-gray-400">Standard</th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON.map(({ feature, ours, classic }, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-3.5 text-gray-600">{feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {ours ? (
                        <Check size={18} className="mx-auto text-primary" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {classic ? (
                        <Check size={18} className="mx-auto text-gray-400" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 5. FAQ ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray">
          Questions fréquentes
        </h2>
        <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-left"
              >
                <span className="font-medium text-dark-gray">{item.q}</span>
                {openFaq === i ? (
                  <ChevronUp size={18} className="flex-shrink-0 text-primary" />
                ) : (
                  <ChevronDown size={18} className="flex-shrink-0 text-gray-400" />
                )}
              </button>
              {openFaq === i && (
                <p className="px-5 pb-4 text-sm leading-relaxed text-gray-500">{item.a}</p>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BOTTOM ──────────────────────────────────────────────── */}
      <section className="bg-primary py-14 text-center">
        <div className="mx-auto max-w-2xl px-4">
          <h2 className="text-2xl font-bold text-white">
            Habillez votre table avec élégance
          </h2>
          <p className="mt-2 text-white/80">
            Livraison sous 24–72 h partout au Maroc · Paiement à la livraison
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
          >
            <ShoppingCart size={18} />
            Commander maintenant
          </button>
        </div>
      </section>
    </main>
  );
}
