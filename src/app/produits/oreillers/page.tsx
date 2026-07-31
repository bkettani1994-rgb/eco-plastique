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
  Layers,
  Wind,
  Truck,
  RotateCcw,
  Star,
  ShoppingCart,
  type LucideIcon,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { generateOrderId, saveLastOrder } from "@/lib/order";
import { submitOrder } from "@/lib/submit-order";

/* ─── DATA ─────────────────────────────────────────────────────────── */

type VariantKey = "cervical" | "mousse";

interface Size {
  label: string;
  price: number;
  soldOut?: boolean;
}

interface VariantData {
  key: VariantKey;
  submitProduct: "oreiller-cervical" | "oreiller-memoire";
  slug: string;
  tabLabel: string;
  badge: string;
  name: string;
  subtitle: string;
  ratingText: string;
  productImage: string;
  gallery: string[];
  sizes: Size[];
  trust: { icon: LucideIcon; label: string; desc: string }[];
  lifestyle: { image: string; title: string; text: string; imageLeft: boolean }[];
  comparison: { feature: string; ours: boolean; classic: boolean }[];
  faq: { q: string; a: string }[];
  ctaTitle: string;
}

const OFFERS = [
  { qty: 1, label: "1 pièce", discount: 1, badge: null as string | null, popular: false },
  { qty: 2, label: "2 pièces", discount: 0.95, badge: "−5%", popular: true },
  { qty: 3, label: "3 pièces", discount: 0.90, badge: "−10%", popular: false },
];

const VARIANTS: Record<VariantKey, VariantData> = {
  cervical: {
    key: "cervical",
    submitProduct: "oreiller-cervical",
    slug: "oreiller-cervical-medical",
    tabLabel: "Oreiller cervical médical",
    badge: "Oreiller médical",
    name: "Oreiller ergonomique cervical médical",
    subtitle:
      "Mousse à mémoire de forme haute densité, housse en bambou respirante et anti-acariens. Dormez sans douleurs cervicales, réveillez-vous reposé.",
    ratingText: "4.8 / 5 — 180+ avis",
    productImage:
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937215/Oreiller_cervicale_jpyife.png",
    gallery: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-1_1_knigst.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-2_1_jxnez8.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-7_1_cj0y6i.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-4_1_ja02lu.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-3_1_rsvqh0.jpg",
    ],
    sizes: [{ label: "Oreiller cervical", price: 249 }],
    trust: [
      { icon: Brain, label: "Ergonomique", desc: "Conçu avec des spécialistes" },
      { icon: Wind, label: "Respirant", desc: "Housse en bambou ventilée" },
      { icon: Shield, label: "Anti-acariens", desc: "Hypoallergénique certifié" },
      { icon: Truck, label: "Livraison rapide", desc: "Partout au Maroc" },
      { icon: RotateCcw, label: "Retour 30 jours", desc: "Satisfait ou remboursé" },
      { icon: Star, label: "4.8 / 5", desc: "Basé sur 180+ avis" },
    ],
    lifestyle: [
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
    ],
    comparison: [
      { feature: "Soutien cervical anatomique", ours: true, classic: false },
      { feature: "Mousse à mémoire de forme haute densité", ours: true, classic: false },
      { feature: "Housse en bambou respirante", ours: true, classic: false },
      { feature: "Anti-acariens & hypoallergénique", ours: true, classic: false },
      { feature: "Housse lavable en machine", ours: true, classic: true },
      { feature: "Adapté dos et côté", ours: true, classic: false },
      { feature: "Garantie 12 mois", ours: true, classic: false },
      { feature: "Recommandé par des kinésithérapeutes", ours: true, classic: false },
    ],
    faq: [
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
    ],
    ctaTitle: "Dormez sans douleurs dès cette nuit",
  },
  mousse: {
    key: "mousse",
    submitProduct: "oreiller-memoire",
    slug: "oreiller-memoire-forme",
    tabLabel: "Oreiller en mousse à mémoire",
    badge: "Oreiller confort",
    name: "Oreiller en mousse à mémoire de forme",
    subtitle:
      "Mousse viscoélastique haute densité, housse anti-acariens en microfibre douce. Disponible en trois épaisseurs, pour un sommeil sur mesure.",
    ratingText: "4.8 / 5 — 200+ avis",
    productImage:
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937147/Oreiller_Simple_cmja5s.png",
    gallery: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-3_1_lydfvm.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-1_1_ln75yv.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-4_1_pspeqa.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783343454/Poste-1-1-Memory-Foam-Pillow-5.jpg_qiuiw3.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-2_1_jhkk7z.jpg",
    ],
    sizes: [
      { label: "15 cm", price: 199 },
      { label: "17 cm", price: 229 },
      { label: "19 cm", price: 249 },
    ],
    trust: [
      { icon: Layers, label: "Mémoire de forme", desc: "S'adapte à votre morphologie" },
      { icon: Wind, label: "Respirant", desc: "Confort thermique toute la nuit" },
      { icon: Shield, label: "Anti-acariens", desc: "Hypoallergénique certifié" },
      { icon: Truck, label: "Livraison rapide", desc: "Partout au Maroc" },
      { icon: RotateCcw, label: "Retour 30 jours", desc: "Satisfait ou remboursé" },
      { icon: Star, label: "4.8 / 5", desc: "Basé sur 200+ avis" },
    ],
    lifestyle: [
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-3_1_lydfvm.jpg",
        title: "La mousse qui s'adapte à vous, pas l'inverse",
        text: "Notre mousse viscoélastique à mémoire de forme réagit à la chaleur de votre corps pour épouser exactement la forme de votre tête et de votre nuque. Elle répartit les points de pression de façon uniforme, éliminant les zones de tension qui causent les douleurs matinales.",
        imageLeft: true,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-1_1_ln75yv.jpg",
        title: "Un sommeil plus profond, une récupération optimale",
        text: "En éliminant les inconforts liés au positionnement de la tête, notre oreiller favorise les phases de sommeil profond. Vous vous endormez plus vite, vous bougez moins la nuit et vous vous réveillez réellement reposé, prêt à affronter votre journée.",
        imageLeft: false,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-4_1_pspeqa.jpg",
        title: "Disponible en plusieurs fermetés pour votre confort",
        text: "Chaque personne a ses préférences : certains aiment un oreiller moelleux qui enveloppe, d'autres préfèrent un soutien plus ferme. C'est pourquoi nous proposons plusieurs niveaux de fermeté pour que vous trouviez exactement ce dont vous avez besoin.",
        imageLeft: true,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783343454/Poste-1-1-Memory-Foam-Pillow-5.jpg_qiuiw3.jpg",
        title: "Trois épaisseurs pour un soutien sur mesure",
        text: "Chaque morphologie a ses besoins. Notre oreiller est disponible en trois épaisseurs — 15 cm, 17 cm et 19 cm — pour s'adapter à votre position de sommeil et à la largeur de vos épaules. Le 15 cm convient aux dormeurs sur le dos, le 17 cm offre un équilibre polyvalent, et le 19 cm apporte un maintien plus haut, idéal pour dormir sur le côté.",
        imageLeft: false,
      },
    ],
    comparison: [
      { feature: "Mousse viscoélastique haute densité", ours: true, classic: false },
      { feature: "S'adapte à la chaleur du corps", ours: true, classic: false },
      { feature: "Choix d'épaisseur (15 / 17 / 19 cm)", ours: true, classic: false },
      { feature: "Anti-acariens & hypoallergénique", ours: true, classic: false },
      { feature: "Housse lavable en machine", ours: true, classic: true },
      { feature: "Récupère sa forme après utilisation", ours: true, classic: false },
      { feature: "Garantie 12 mois", ours: true, classic: false },
      { feature: "Disponible en 3 épaisseurs", ours: true, classic: false },
    ],
    faq: [
      {
        q: "Quelle épaisseur choisir ?",
        a: "Si vous dormez principalement sur le côté, optez pour le 19 cm qui maintient mieux la nuque dans l'alignement. Si vous dormez sur le dos ou changez souvent de position, le 15 ou 17 cm offrira un confort plus enveloppant. En cas de doute, le 17 cm convient à la majorité des dormeurs.",
      },
      {
        q: "La mousse à mémoire de forme est-elle chaude ?",
        a: "Notre mousse est traitée pour améliorer la circulation d'air à l'intérieur. Associée à la housse en microfibre respirante, l'oreiller reste à une température agréable toute la nuit, sans l'effet de chaleur que peuvent avoir certains oreillers en mousse.",
      },
      {
        q: "L'oreiller retrouve-t-il sa forme après compression ?",
        a: "Oui. La mousse viscoélastique haute densité (45 kg/m³) retrouve sa forme initiale en quelques secondes après chaque utilisation. Elle conserve cette propriété sur le long terme, sans s'affaisser comme un oreiller classique en fibres.",
      },
      {
        q: "Dans combien de temps est-il livré ?",
        a: "La livraison est effectuée sous 24 à 72 h selon votre ville. Nos livreurs vous contactent avant le passage. Le paiement se fait à la réception (paiement à la livraison).",
      },
      {
        q: "Puis-je commander une housse supplémentaire ?",
        a: "Oui. Des housses de rechange sont disponibles. Contactez-nous sur WhatsApp pour passer commande ou pour toute question sur nos accessoires.",
      },
    ],
    ctaTitle: "Offrez-vous un sommeil de qualité",
  },
};

function firstAvailable(sizes: Size[]): Size {
  return sizes.find((s) => !s.soldOut) ?? sizes[0];
}

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function OreillersPage() {
  const router = useRouter();
  const { addItem, clearCart } = useCart();

  const [variant, setVariant] = useState<VariantKey>("cervical");
  const data = VARIANTS[variant];

  const [activeImg, setActiveImg] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(OFFERS[0]);
  const [chosenSizes, setChosenSizes] = useState<Size[]>([firstAvailable(VARIANTS.cervical.sizes)]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Changement de type d'oreiller : on réinitialise galerie, offre et tailles
  function selectVariant(key: VariantKey) {
    if (key === variant) return;
    setVariant(key);
    setActiveImg(0);
    setSelectedOffer(OFFERS[0]);
    setChosenSizes([firstAvailable(VARIANTS[key].sizes)]);
    setOpenFaq(null);
  }

  const defaultSize = firstAvailable(data.sizes);

  function handleOfferChange(offer: typeof OFFERS[0]) {
    setSelectedOffer(offer);
    setChosenSizes(Array.from({ length: offer.qty }, (_, i) => chosenSizes[i] ?? defaultSize));
  }

  function handleSizeChange(slotIndex: number, sizeLabel: string) {
    const found = data.sizes.find((s) => s.label === sizeLabel) ?? defaultSize;
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
      slug: data.slug,
      name: `${data.name} (${sizeSummary})`,
      price: Math.round(totalPrice / selectedOffer.qty),
      image: data.productImage,
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
      product: data.submitProduct,
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
      {/* ── SÉLECTEUR DE TYPE D'OREILLER ─────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-md rounded-2xl border border-gray-200 bg-light-gray p-1">
          {(Object.keys(VARIANTS) as VariantKey[]).map((key) => {
            const v = VARIANTS[key];
            const active = key === variant;
            return (
              <button
                key={key}
                type="button"
                onClick={() => selectVariant(key)}
                className={`flex-1 rounded-xl px-3 py-2.5 text-center text-xs font-semibold transition-all sm:text-sm ${
                  active ? "bg-primary text-white shadow" : "text-dark-gray hover:text-primary"
                }`}
              >
                {v.tabLabel}
              </button>
            );
          })}
        </div>
      </section>

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-light-gray">
              <Image
                src={data.gallery[activeImg] ?? data.gallery[0]}
                alt={data.name}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-5 gap-2">
              {data.gallery.map((src, i) => (
                <button
                  key={src}
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
                {data.badge}
              </span>
              <h1 className="mt-2 text-3xl font-bold text-dark-gray">{data.name}</h1>
              <p className="mt-3 leading-relaxed text-gray-500">{data.subtitle}</p>
              <div className="mt-3 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500">{data.ratingText}</span>
              </div>
            </div>

            {/* Quantity offers + order form */}
            <div className="rounded-2xl border-2 p-5" style={{ borderColor: "#8ec63f" }}>
              <p className="mb-3 text-sm font-semibold text-dark-gray">Choisissez votre offre :</p>
              <div className="flex flex-col gap-3">
                {OFFERS.map((offer) => {
                  const isSelected = selectedOffer.qty === offer.qty;
                  const previewBase = isSelected ? baseTotal : defaultSize.price * offer.qty;
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

                      {isSelected && data.sizes.length > 1 && (
                        <div className="flex flex-col gap-2 border-t border-primary/20 px-4 pb-4 pt-3">
                          {Array.from({ length: offer.qty }).map((_, slotIndex) => (
                            <div key={slotIndex} className="flex items-center gap-3">
                              <span className="w-16 flex-shrink-0 text-xs text-gray-500">
                                Pièce {slotIndex + 1}
                              </span>
                              <select
                                value={chosenSizes[slotIndex]?.label ?? defaultSize.label}
                                onChange={(e) => handleSizeChange(slotIndex, e.target.value)}
                                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-dark-gray focus:border-primary focus:outline-none"
                              >
                                {data.sizes.map((s) => (
                                  <option key={s.label} value={s.label} disabled={s.soldOut}>
                                    {s.label} — {s.price} MAD{s.soldOut ? " (rupture de stock)" : ""}
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
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BADGES ─────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-light-gray py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {data.trust.map(({ icon: Icon, label, desc }) => (
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
        {data.lifestyle.map((block, i) => (
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
              <p className="leading-relaxed text-gray-500">{block.text}</p>
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
                {data.comparison.map(({ feature, ours, classic }, i) => (
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
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray">Questions fréquentes</h2>
        <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
          {data.faq.map((item, i) => (
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
          <h2 className="text-2xl font-bold text-white">{data.ctaTitle}</h2>
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
