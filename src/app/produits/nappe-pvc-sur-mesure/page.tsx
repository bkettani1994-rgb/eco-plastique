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
  Circle,
  Square,
  RectangleHorizontal,
  Egg,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { generateOrderId, saveLastOrder } from "@/lib/order";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PRODUCT = {
  slug: "nappe-pvc-sur-mesure",
  name: "Nappes en PVC sur mesure",
  image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
};

/* Les 3 modèles de nappe — prix au m² selon l'épaisseur */
const MODELS = [
  {
    id: "transparent",
    label: "Transparente",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    description:
      "Cristal transparente, elle laisse admirer votre table tout en la protégeant des taches, rayures et de la chaleur.",
    pricePerM2: { "1,5 mm": 120, "2 mm": 150 },
    advantages: [
      "Laisse visible le bois ou le marbre de votre table",
      "Transparence cristal sans effet jauni",
      "Protection contre taches, rayures et chaleur",
      "Nettoyage d'un simple coup d'éponge",
    ],
  },
  {
    id: "matte",
    label: "Mate",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    description:
      "Finition mate anti-reflets, élégante et discrète. Masque les traces de doigts et apporte une touche moderne.",
    pricePerM2: { "1,5 mm": 140, "2 mm": 170 },
    advantages: [
      "Aspect satiné moderne sans reflets",
      "Masque les traces de doigts",
      "Toucher doux et agréable",
      "Protection complète du plateau",
    ],
  },
  {
    id: "dore",
    label: "Dorée",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    description:
      "Reflets dorés raffinés pour habiller vos tables lors des grandes occasions comme au quotidien.",
    pricePerM2: { "1,5 mm": 160, "2 mm": 190 },
    advantages: [
      "Finition dorée luxueuse",
      "Idéale pour les grandes occasions",
      "Résistante aux taches et à l'eau",
      "Apporte de l'éclat à votre salle à manger",
    ],
  },
] as const;

type Model = (typeof MODELS)[number];

const THICKNESSES = ["1,5 mm", "2 mm"] as const;
type Thickness = (typeof THICKNESSES)[number];

const SHAPES = [
  { id: "ronde", label: "Ronde", icon: Circle },
  { id: "carree", label: "Carrée", icon: Square },
  { id: "rectangulaire", label: "Rectangulaire", icon: RectangleHorizontal },
  { id: "ovale", label: "Ovale", icon: Egg },
] as const;

type ShapeId = (typeof SHAPES)[number]["id"];

const MIN_PRICE = 100;

const TRUST_BADGES = [
  { icon: Droplets, label: "Résistante aux liquides", desc: "PVC haute qualité" },
  { icon: Sparkles, label: "Facile à nettoyer",       desc: "Un coup d'éponge suffit" },
  { icon: Shield,   label: "Durable",                 desc: "Bords renforcés" },
  { icon: Truck,    label: "Livraison rapide",        desc: "Partout au Maroc" },
  { icon: RotateCcw,label: "Découpe sur mesure",      desc: "Toutes formes de table" },
  { icon: Star,     label: "4.8 / 5",                 desc: "Basé sur les avis clients" },
];

const FAQ_ITEMS = [
  {
    q: "Comment prendre les mesures de ma table ?",
    a: "Mesurez la longueur et la largeur (ou le diamètre) de votre table avec un mètre ruban, en ajoutant si besoin quelques centimètres de débord sur chaque côté pour un effet drapé.",
  },
  {
    q: "La nappe résiste-t-elle à la chaleur ?",
    a: "Oui, notre PVC supporte les contacts ponctuels avec des plats tièdes, mais nous recommandons un dessous de plat pour les plats très chauds afin de préserver la nappe sur le long terme.",
  },
  {
    q: "Quelle épaisseur choisir : 1,5 mm ou 2 mm ?",
    a: "L'épaisseur 1,5 mm convient à un usage quotidien classique. L'épaisseur 2 mm offre une rigidité et une durabilité supérieures, recommandée pour les tables très utilisées ou les grandes tables.",
  },
  {
    q: "Combien de temps faut-il pour recevoir ma nappe sur mesure ?",
    a: "Le délai de fabrication et de livraison est généralement de 2 à 5 jours ouvrés selon votre ville.",
  },
];

/* ─── HELPERS ──────────────────────────────────────────────────────── */

interface Dimensions {
  length: string; // cm — longueur / diamètre / côté
  width: string;  // cm — largeur (rect & ovale)
}

function computeArea(shape: ShapeId, dims: Dimensions): number | null {
  const L = parseFloat(dims.length.replace(",", "."));
  const W = parseFloat(dims.width.replace(",", "."));

  switch (shape) {
    case "ronde": {
      if (!L || L <= 0) return null;
      const r = L / 200; // diamètre cm → rayon m
      return Math.PI * r * r;
    }
    case "carree": {
      if (!L || L <= 0) return null;
      const c = L / 100;
      return c * c;
    }
    case "rectangulaire": {
      if (!L || !W || L <= 0 || W <= 0) return null;
      return (L / 100) * (W / 100);
    }
    case "ovale": {
      if (!L || !W || L <= 0 || W <= 0) return null;
      return Math.PI * (L / 200) * (W / 200);
    }
  }
}

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function NappePvcPage() {
  const router = useRouter();
  const { addItem, clearCart } = useCart();

  const [model, setModel] = useState<Model>(MODELS[0]);
  const [thickness, setThickness] = useState<Thickness>("1,5 mm");
  const [shape, setShape] = useState<ShapeId>("rectangulaire");
  const [dims, setDims] = useState<Dimensions>({ length: "", width: "" });
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const area = computeArea(shape, dims);
  const pricePerM2 = model.pricePerM2[thickness];
  const rawPrice = area ? area * pricePerM2 : null;
  const totalPrice = rawPrice ? Math.max(MIN_PRICE, Math.round(rawPrice)) : null;

  const needsWidth = shape === "rectangulaire" || shape === "ovale";
  const lengthLabel =
    shape === "ronde" ? "Diamètre (cm)" : shape === "carree" ? "Côté (cm)" : "Longueur (cm)";

  const [form, setForm] = useState({ fullName: "", phone: "", city: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!totalPrice) return;
    setSubmitting(true);

    const shapeLabel = SHAPES.find((s) => s.id === shape)?.label ?? shape;
    const dimSummary = needsWidth
      ? `${dims.length}×${dims.width} cm`
      : `${dims.length} cm`;
    const summary = `${model.label} | ${shapeLabel} | ${thickness} | ${dimSummary}`;

    const orderItem = {
      slug: PRODUCT.slug,
      name: `${PRODUCT.name} (${summary})`,
      price: totalPrice,
      image: model.image,
      quantity: 1,
    };

    clearCart();
    addItem(orderItem, 1);

    saveLastOrder({
      id: generateOrderId(),
      items: [{ ...orderItem, quantity: 1 }],
      customer: {
        ...form,
        notes: `Modèle : ${model.label} | Forme : ${shapeLabel} | Épaisseur : ${thickness} | Dimensions : ${dimSummary} | Surface : ${area?.toFixed(2)} m² | Total : ${totalPrice} MAD`,
      },
      total: totalPrice,
      createdAt: new Date().toISOString(),
    });

    router.push("/commande/confirmation");
  }

  return (
    <main className="bg-white">
      {/* ── 1. HERO : galerie modèles + configurateur ───────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* Gallery : image principale + vignettes de type de nappe */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-light-gray">
              <Image
                src={model.image}
                alt={`Nappe ${model.label}`}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-dark-gray shadow">
                Nappe {model.label}
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MODELS.map((m) => {
                const isSelected = model.id === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setModel(m)}
                    className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 transition-all ${
                      isSelected ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={m.image} alt={`Nappe ${m.label}`} fill className="object-cover" sizes="33vw" />
                    <span
                      className={`absolute bottom-0 left-0 right-0 py-1 text-center text-[11px] font-semibold ${
                        isSelected ? "bg-primary text-white" : "bg-white/85 text-dark-gray"
                      }`}
                    >
                      {m.label}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Infos modèle : prix m² + avantages */}
            <div className="rounded-2xl bg-light-gray p-5">
              <h3 className="text-lg font-bold text-dark-gray">Nappe {model.label}</h3>
              <p className="mt-1 text-sm text-gray-500">{model.description}</p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {THICKNESSES.map((t) => (
                  <div key={t} className="rounded-xl bg-white p-3 text-center shadow-sm">
                    <p className="text-xs text-gray-500">Épaisseur {t}</p>
                    <p className="text-lg font-bold text-primary">{model.pricePerM2[t]} MAD/m²</p>
                  </div>
                ))}
              </div>

              <ul className="mt-4 flex flex-col gap-2">
                {model.advantages.map((adv) => (
                  <li key={adv} className="flex items-start gap-2 text-sm text-gray-600">
                    <Check size={16} className="mt-0.5 flex-shrink-0 text-primary" />
                    {adv}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Info + configurateur */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                Nappes
              </span>
              <h1 className="mt-2 text-3xl font-bold text-dark-gray">
                Nappes en PVC sur mesure
              </h1>
              <p className="mt-3 text-gray-500 leading-relaxed">
                Choisissez votre modèle, votre forme, votre épaisseur et vos dimensions — nous
                découpons votre nappe aux mesures exactes de votre table.
              </p>
              <div className="mt-3 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500">4.8 / 5</span>
              </div>
            </div>

            {/* Configurateur + formulaire — section orange */}
            <div className="rounded-2xl border-2 p-5" style={{ borderColor: "#f97316" }}>
              {/* Étape 1 : modèle (rappel de la sélection) */}
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#f97316" }}>1</span>
                <p className="text-sm font-semibold text-dark-gray">
                  Type de nappe : <span style={{ color: "#f97316" }}>{model.label}</span>
                  <span className="ml-2 text-xs font-normal text-gray-400">(changez via les photos)</span>
                </p>
              </div>

              {/* Étape 2 : forme */}
              <div className="mb-3 mt-4 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#f97316" }}>2</span>
                <p className="text-sm font-semibold text-dark-gray">Forme de votre table :</p>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {SHAPES.map(({ id, label, icon: Icon }) => {
                  const isSelected = shape === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => { setShape(id); setDims({ length: "", width: "" }); }}
                      className="flex flex-col items-center gap-1.5 rounded-xl border-2 px-2 py-3 transition-all"
                      style={isSelected ? { borderColor: "#f97316", backgroundColor: "#fff7ed" } : { borderColor: "#e5e7eb" }}
                    >
                      <Icon size={22} style={isSelected ? { color: "#f97316" } : { color: "#9ca3af" }} />
                      <span className={`text-xs font-semibold ${isSelected ? "text-dark-gray" : "text-gray-500"}`}>
                        {label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Étape 3 : épaisseur */}
              <div className="mb-3 mt-5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#f97316" }}>3</span>
                <p className="text-sm font-semibold text-dark-gray">Épaisseur :</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {THICKNESSES.map((t) => {
                  const isSelected = thickness === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setThickness(t)}
                      className="flex items-center justify-between rounded-xl border-2 px-4 py-3 transition-all"
                      style={isSelected ? { borderColor: "#f97316", backgroundColor: "#fff7ed" } : { borderColor: "#e5e7eb" }}
                    >
                      <span className="text-sm font-semibold text-dark-gray">{t}</span>
                      <span className="text-sm font-bold" style={{ color: "#f97316" }}>
                        {model.pricePerM2[t]} MAD/m²
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Étape 4 : dimensions */}
              <div className="mb-3 mt-5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#f97316" }}>4</span>
                <p className="text-sm font-semibold text-dark-gray">Dimensions de votre table :</p>
              </div>
              <div className={`grid gap-3 ${needsWidth ? "grid-cols-2" : "grid-cols-1"}`}>
                <input
                  required
                  type="number"
                  min={20}
                  max={500}
                  placeholder={lengthLabel}
                  value={dims.length}
                  onChange={(e) => setDims((d) => ({ ...d, length: e.target.value }))}
                  className="min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                />
                {needsWidth && (
                  <input
                    required
                    type="number"
                    min={20}
                    max={500}
                    placeholder="Largeur (cm)"
                    value={dims.width}
                    onChange={(e) => setDims((d) => ({ ...d, width: e.target.value }))}
                    className="min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                  />
                )}
              </div>

              {/* Prix total */}
              <div className="mt-4 flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#fff7ed" }}>
                <div>
                  <p className="text-sm font-semibold text-dark-gray">Prix total</p>
                  {area && (
                    <p className="text-xs text-gray-500">
                      {area.toFixed(2)} m² × {pricePerM2} MAD/m²
                    </p>
                  )}
                </div>
                <span className="text-xl font-extrabold" style={{ color: "#f97316" }}>
                  {totalPrice ? `${totalPrice} MAD` : "— MAD"}
                </span>
              </div>

              <hr className="my-3 border-orange-200" />

              {/* Formulaire de commande */}
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
                  disabled={submitting || !totalPrice}
                  className="animate-shake mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70"
                >
                  <ShoppingCart size={18} />
                  {submitting
                    ? "Traitement…"
                    : totalPrice
                      ? `Commander — ${totalPrice} MAD`
                      : "Renseignez vos dimensions"}
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

      {/* ── 3. FAQ ──────────────────────────────────────────────────── */}
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
