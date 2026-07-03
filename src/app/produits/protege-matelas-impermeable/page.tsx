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
  Wind,
  Truck,
  RotateCcw,
  Star,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { generateOrderId, saveLastOrder } from "@/lib/order";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PRODUCT = {
  slug: "protege-matelas-impermeable",
  name: "Protège-matelas imperméable",
  price: 229,
  image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937147/Protege-Matelas_tmrezb.png",
};

const HERO_IMAGE = "https://res.cloudinary.com/diptsoc4h/image/upload/v1783075175/001_1_xiz0o3.jpg";

const GALLERY = [
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783075175/001_1_xiz0o3.jpg",
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783075174/002_ipw8wg.jpg",
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783075173/003_nhvv4f.jpg",
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783075174/004_r6e6y5.jpg",
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783075174/007_lz0ynk.jpg",
];

const SIZES: { label: string; price: number }[] = [
  { label: "60×120 cm",  price: 119 },
  { label: "90×190 cm",  price: 149 },
  { label: "120×190 cm", price: 159 },
  { label: "140×190 cm", price: 169 },
  { label: "140×200 cm", price: 179 },
  { label: "160×190 cm", price: 199 },
  { label: "160×200 cm", price: 209 },
  { label: "180×200 cm", price: 219 },
  { label: "190×200 cm", price: 229 },
  { label: "200×200 cm", price: 239 },
];

const OFFERS = [
  { qty: 1, label: "1 pièce",  discount: 1,    badge: null,   popular: false },
  { qty: 2, label: "2 pièces", discount: 0.95, badge: "−5%",  popular: true },
  { qty: 3, label: "3 pièces", discount: 0.90, badge: "−10%", popular: false },
];

const TRUST_BADGES = [
  { icon: Droplets, label: "100% imperméable", desc: "Membrane TPU certifiée" },
  { icon: Wind,     label: "Respirant",        desc: "Confort toute la nuit" },
  { icon: Shield,   label: "Anti-acariens",    desc: "Antibactérien certifié" },
  { icon: Truck,    label: "Livraison rapide", desc: "Partout au Maroc" },
  { icon: RotateCcw,label: "Retour 30 jours",  desc: "Satisfait ou remboursé" },
  { icon: Star,     label: "4.8 / 5",          desc: "Basé sur 240+ avis" },
];

const LIFESTYLE_BLOCKS = [
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783075173/003_nhvv4f.jpg",
    title: "Une protection invisible, un confort absolu",
    text: "Notre membrane TPU ultra-fine forme une barrière étanche sans le bruissement plastique des protections classiques. Vous dormez sur une surface douce, silencieuse et fraîche — exactement comme sans protection, mais avec toute la sécurité qu'il vous faut.",
    imageLeft: true,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783091043/A2_ymk4qg.jpg",
    title: "Idéal pour toute la famille",
    text: "Que ce soit pour protéger le matelas de votre enfant des accidents nocturnes, pour une personne âgée ou simplement pour prévenir la transpiration, notre protège-matelas s'adapte à tous les besoins. Une seule solution pour toute la maison.",
    imageLeft: false,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783091089/A6_pgu8ij.jpg",
    title: "Installation en 30 secondes chrono",
    text: "Grâce aux quatre élastiques renforcés disposés aux coins, le protège-matelas se pose et se retire en quelques secondes. Il reste parfaitement fixé toute la nuit, même sur les matelas les plus épais, sans se décaler ni se plier.",
    imageLeft: true,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783091089/A8_an5y7s.jpg",
    title: "Entretien sans contrainte",
    text: "Lavable en machine à 40 °C, il sèche rapidement à l'air libre et conserve toutes ses propriétés imperméables après chaque lavage. Pas de traitement spécial, pas de sèche-linge nécessaire — une hygiène irréprochable avec le minimum d'effort.",
    imageLeft: false,
  },
];

const COMPARISON = [
  { feature: "Protection contre les liquides",        ours: true,  classic: false },
  { feature: "Surface silencieuse (sans bruissement)", ours: true,  classic: false },
  { feature: "Respirant & régulation thermique",       ours: true,  classic: false },
  { feature: "Anti-acariens & antibactérien",          ours: true,  classic: false },
  { feature: "Élastiques renforcés 4 coins",           ours: true,  classic: true  },
  { feature: "Lavable en machine",                     ours: true,  classic: true  },
  { feature: "Garantie 12 mois",                       ours: true,  classic: false },
  { feature: "Toutes tailles marocaines",              ours: true,  classic: false },
];

const FAQ_ITEMS = [
  {
    q: "Le protège-matelas fait-il du bruit pendant la nuit ?",
    a: "Non. Notre membrane TPU est spécialement conçue pour être silencieuse, contrairement aux protections plastiques classiques qui bruissent. Vous ne remarquerez même pas sa présence.",
  },
  {
    q: "Peut-on le laver en machine ?",
    a: "Oui, il est lavable en machine à 40 °C. Il sèche rapidement à l'air libre et conserve ses propriétés imperméables et anti-acariens après chaque lavage, sans aucun traitement supplémentaire.",
  },
  {
    q: "Est-il compatible avec un matelas épais (memory foam) ?",
    a: "Absolument. Les élastiques renforcés aux quatre coins s'adaptent aux matelas jusqu'à 35 cm d'épaisseur, y compris les matelas en mousse à mémoire de forme ou en latex.",
  },
  {
    q: "Dans combien de temps est-il livré ?",
    a: "La livraison est effectuée sous 24 à 72 h selon votre ville. Nos livreurs vous contactent avant le passage. Le paiement se fait à la réception (paiement à la livraison).",
  },
  {
    q: "Puis-je commander une taille personnalisée ?",
    a: "Oui. Pour des dimensions spéciales (lits bébé, lits médicaux…), contactez-nous directement sur WhatsApp et nous vous préparerons une offre sur mesure.",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function ProtegeMatelasPage() {
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
      customer: { ...form, notes: `Offre : ${selectedOffer.label} | Tailles : ${sizeSummary} | Total : ${totalPrice} MAD` },
      total: totalPrice,
      createdAt: new Date().toISOString(),
    });

    router.push("/commande/confirmation");
  }

  return (
    <main className="bg-white">
      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
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
          </div>

          {/* Info + form */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Protège-matelas
              </span>
              <h1 className="mt-2 text-3xl font-bold text-dark-gray">
                Protège-matelas imperméable
              </h1>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Membrane TPU silencieuse, respirante, anti-acariens et antibactérienne. Protégez votre
                matelas sans sacrifier le confort.
              </p>
              <div className="mt-3 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500">4.8 / 5 — 240+ avis</span>
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

                      {isSelected && (
                        <div className="flex flex-col gap-2 border-t border-primary/20 px-4 pb-4 pt-3">
                          {Array.from({ length: offer.qty }).map((_, slotIndex) => (
                            <div key={slotIndex} className="flex items-center gap-3">
                              <span className="w-16 flex-shrink-0 text-xs text-gray-500">
                                Pièce {slotIndex + 1}
                              </span>
                              <select
                                value={chosenSizes[slotIndex]?.label ?? SIZES[0].label}
                                onChange={(e) => handleSizeChange(slotIndex, e.target.value)}
                                className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-dark-gray focus:border-primary focus:outline-none"
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
                  className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70"
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
            Pourquoi choisir le nôtre ?
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
            Prêt à protéger votre matelas ?
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
