"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Check,
  ChevronDown,
  ChevronUp,
  Shield,
  Brain,
  Wind,
  Truck,
  RotateCcw,
  Star,
  ShoppingCart,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { generateOrderId, saveLastOrder } from "@/lib/order";
import { submitOrder } from "@/lib/submit-order";
import { whatsappLink } from "@/data/site";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PRODUCT = {
  slug: "oreiller-cervical-medical",
  name: "Oreiller ergonomique cervical médical",
  price: 250,
  image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937215/Oreiller_cervicale_jpyife.png",
};

// Produit temporairement indisponible (pas encore en stock)
const OUT_OF_STOCK = true;

const GALLERY = [
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-1_1_knigst.jpg",
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-2_1_jxnez8.jpg",
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-7_1_cj0y6i.jpg",
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-4_1_ja02lu.jpg",
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-3_1_rsvqh0.jpg",
];

const SIZES: { label: string; price: number }[] = [
  { label: "Oreiller cervical", price: 249 },
];

const OFFERS = [
  { qty: 1, label: "1 pièce",  discount: 1,    badge: null,   popular: false },
  { qty: 2, label: "2 pièces", discount: 0.95, badge: "−5%",  popular: true },
  { qty: 3, label: "3 pièces", discount: 0.90, badge: "−10%", popular: false },
];

const TRUST_BADGES = [
  { icon: Brain,     label: "Ergonomique",      desc: "Conçu avec des spécialistes" },
  { icon: Wind,      label: "Respirant",         desc: "Housse en bambou ventilée" },
  { icon: Shield,    label: "Anti-acariens",     desc: "Hypoallergénique certifié" },
  { icon: Truck,     label: "Livraison rapide",  desc: "Partout au Maroc" },
  { icon: RotateCcw, label: "Retour 30 jours",  desc: "Satisfait ou remboursé" },
  { icon: Star,      label: "4.8 / 5",           desc: "Basé sur 180+ avis" },
];

const LIFESTYLE_BLOCKS = [
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-4_1_ja02lu.jpg",
    title: "Un soutien cervical conçu par des experts",
    text: "Notre oreiller ergonomique a été développé en collaboration avec des kinésithérapeutes pour offrir un maintien optimal de la nuque. Sa forme anatomique s'adapte naturellement à la courbure de votre colonne vertébrale, que vous dormiez sur le dos ou sur le côté.",
    imageLeft: true,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-7_1_cj0y6i.jpg",
    title: "Fini les douleurs au réveil",
    text: "Cervicalgies, raideurs matinales, maux de tête — ces problèmes sont souvent liés à un mauvais positionnement de la tête pendant le sommeil. Notre oreiller cervical maintient votre cou dans l'alignement parfait toute la nuit, pour un réveil reposé et sans douleur.",
    imageLeft: false,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-6_1_fhebyb.jpg",
    title: "Mousse à mémoire de forme haute densité",
    text: "Fabriqué en mousse viscoélastique certifiée, il épouse précisément la forme de votre tête et de votre nuque, sans s'affaisser ni créer de points de pression. Il retrouve sa forme initiale à chaque réveil, garantissant le même soutien nuit après nuit.",
    imageLeft: true,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-5_1_siqxfa.jpg",
    title: "Housse hygiénique et facile d'entretien",
    text: "La housse en bambou respirante est amovible et lavable en machine à 40 °C. Elle régule la chaleur et l'humidité pour un confort thermique optimal. Anti-acariens et hypoallergénique, elle convient aux peaux sensibles et aux personnes allergiques.",
    imageLeft: false,
  },
];

const COMPARISON = [
  { feature: "Soutien cervical anatomique",             ours: true,  classic: false },
  { feature: "Mousse à mémoire de forme haute densité", ours: true,  classic: false },
  { feature: "Housse en bambou respirante",             ours: true,  classic: false },
  { feature: "Anti-acariens & hypoallergénique",        ours: true,  classic: false },
  { feature: "Housse lavable en machine",               ours: true,  classic: true  },
  { feature: "Adapté dos et côté",                      ours: true,  classic: false },
  { feature: "Garantie 12 mois",                        ours: true,  classic: false },
  { feature: "Recommandé par des kinésithérapeutes",    ours: true,  classic: false },
];

const FAQ_ITEMS = [
  {
    q: "Cet oreiller convient-il si je dors sur le côté ?",
    a: "Oui. La forme ergonomique avec double creux central et rebords relevés s'adapte aussi bien aux dormeurs sur le dos qu'aux dormeurs sur le côté. Il maintient la tête et la nuque dans l'axe naturel de la colonne quelle que soit votre position.",
  },
  {
    q: "Combien de temps faut-il pour s'adapter à cet oreiller ?",
    a: "La plupart de nos clients ressentent une amélioration dès la première nuit. Une période d'adaptation de 7 à 14 jours est normale pour que votre corps s'habitue au soutien cervical optimal. Passé ce délai, le confort devient naturel.",
  },
  {
    q: "La mousse garde-t-elle sa forme dans le temps ?",
    a: "Notre mousse viscoélastique haute densité (50 kg/m³) conserve ses propriétés sur le long terme. Elle ne s'affaisse pas comme un oreiller classique et retrouve sa forme initiale après chaque utilisation.",
  },
  {
    q: "Dans combien de temps est-il livré ?",
    a: "La livraison est effectuée sous 24 à 72 h selon votre ville. Nos livreurs vous contactent avant le passage. Le paiement se fait à la réception (paiement à la livraison).",
  },
  {
    q: "Puis-je commander pour offrir en cadeau ?",
    a: "Absolument. L'oreiller est livré dans un emballage soigné. Contactez-nous sur WhatsApp pour ajouter un mot personnalisé ou pour toute demande spéciale.",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function OreillercervicalPage() {
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

  async function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    const sizeSummary = chosenSizes.map((s) => s.label).join(", ");
    const orderNotes = `Offre : ${selectedOffer.label} | Modèles : ${sizeSummary} | Total : ${totalPrice} MAD`;
    const orderItem = {
      slug: PRODUCT.slug,
      name: `${PRODUCT.name} (${sizeSummary})`,
      price: Math.round(totalPrice / selectedOffer.qty),
      image: PRODUCT.image,
      quantity: selectedOffer.qty,
    };

    clearCart();
    addItem(orderItem, selectedOffer.qty);

    const orderId = generateOrderId();
    saveLastOrder({
      id: orderId,
      items: [{ ...orderItem, quantity: selectedOffer.qty }],
      customer: { ...form, notes: orderNotes },
      total: totalPrice,
      createdAt: new Date().toISOString(),
    });

    await submitOrder({
      product: "oreiller-cervical",
      orderId,
      customer: form,
      details: orderNotes,
      total: totalPrice,
      lang: "fr",
      fields: { offer: selectedOffer.label, variant: sizeSummary },
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
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                  Oreiller médical
                </span>
                {OUT_OF_STOCK && (
                  <span className="inline-block rounded-full bg-red-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-red-600">
                    Rupture de stock
                  </span>
                )}
              </div>
              <h1 className="mt-2 text-3xl font-bold text-dark-gray">
                Oreiller ergonomique cervical médical
              </h1>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Mousse à mémoire de forme haute densité, housse en bambou respirante et anti-acariens.
                Dormez sans douleurs cervicales, réveillez-vous reposé.
              </p>
              <div className="mt-3 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500">4.8 / 5 — 180+ avis</span>
              </div>
            </div>

            {OUT_OF_STOCK ? (
              <div className="rounded-2xl border-2 border-red-200 bg-red-50 p-6 text-center">
                <p className="text-lg font-bold text-red-600">Rupture de stock</p>
                <p className="mt-2 text-sm text-gray-600">
                  Ce produit n&apos;est pas encore disponible. Il sera bientôt de retour —
                  contactez-nous sur WhatsApp pour être prévenu dès son réapprovisionnement.
                </p>
                <a
                  href={whatsappLink("Bonjour, je souhaite être prévenu(e) dès que l'oreiller cervical médical sera de nouveau disponible.")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Me prévenir du retour en stock
                </a>
              </div>
            ) : (
            /* Quantity offers + order form — single orange bordered section */
            <div className="rounded-2xl border-2 p-5" style={{ borderColor: "#8ec63f" }}>
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
                      style={isSelected ? { borderColor: "#8ec63f", backgroundColor: "#f4faea" } : { borderColor: "#e5e7eb" }}
                    >
                      <button
                        type="button"
                        onClick={() => handleOfferChange(offer)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 transition-all"
                            style={isSelected ? { borderColor: "#8ec63f", backgroundColor: "#8ec63f" } : { borderColor: "#d1d5db" }}
                          >
                            {isSelected && <Check size={11} className="text-white" />}
                          </div>
                          <div>
                            <span className="font-semibold text-dark-gray">{offer.label}</span>
                            {offer.badge && (
                              <span className="ml-2 rounded-full px-2.5 py-1 text-xs font-extrabold text-white shadow-sm" style={{ backgroundColor: "#8ec63f" }}>
                                {offer.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold" style={{ color: "#8ec63f" }}>
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

              <hr className="my-2 border-primary/30" />

              {/* Order form inside the same orange border */}
              <form onSubmit={handleOrder} className="flex flex-col gap-3">
                <p className="font-semibold text-dark-gray">Vos coordonnées de livraison</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="Nom complet"
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="Téléphone (06…)"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                  />
                </div>
                <input
                  required
                  placeholder="Ville"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                />
                <input
                  required
                  placeholder="Adresse de livraison"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                />
                <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#f4faea" }}>
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
            )}
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
            Dormez sans douleurs dès cette nuit
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
