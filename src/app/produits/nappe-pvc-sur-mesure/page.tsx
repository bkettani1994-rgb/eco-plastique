"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Shield,
  Droplets,
  Sparkles,
  Truck,
  RotateCcw,
  Star,
  ShoppingCart,
  Plus,
  X,
} from "lucide-react";

/* ─── Icônes de formes de table (SVG sur mesure) ───────────────────── */

type ShapeIconProps = { size?: number };

function IconCarre({ size = 32 }: ShapeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <rect x="4.5" y="4.5" width="15" height="15" rx="0.5" />
    </svg>
  );
}

function IconRectangulaire({ size = 32 }: ShapeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <rect x="2.5" y="6.5" width="19" height="11" rx="0.5" />
    </svg>
  );
}

function IconCercle({ size = 32 }: ShapeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}

function IconRectOctogonal({ size = 32 }: ShapeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" aria-hidden="true">
      <polygon points="9,3.5 15,3.5 18,6.5 18,17.5 15,20.5 9,20.5 6,17.5 6,6.5" />
    </svg>
  );
}

function IconCoinsArrondis({ size = 32 }: ShapeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} aria-hidden="true">
      <rect x="6" y="3.5" width="12" height="17" rx="4.5" />
    </svg>
  );
}

function IconOctogone({ size = 32 }: ShapeIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinejoin="round" aria-hidden="true">
      <polygon points="8.2,3.5 15.8,3.5 20.5,8.2 20.5,15.8 15.8,20.5 8.2,20.5 3.5,15.8 3.5,8.2" />
    </svg>
  );
}
import { useCart } from "@/lib/cart-context";
import { generateOrderId, saveLastOrder } from "@/lib/order";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PRODUCT = {
  slug: "nappe-pvc-sur-mesure",
  name: "Nappes en PVC sur mesure",
  image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
};

const THICKNESSES = ["1,5 mm", "2 mm"] as const;
type Thickness = (typeof THICKNESSES)[number];

/* Les 3 modèles de nappe — prix au m² selon l'épaisseur disponible */
const MODELS = [
  {
    id: "transparent",
    label: "Transparente",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783181083/IMG_20240416_161146_515_olg26v.jpg",
    images: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783181083/IMG_20240416_161146_515_olg26v.jpg",
    ],
    description:
      "Cristal transparente, elle laisse admirer votre table tout en la protégeant des taches, rayures et de la chaleur.",
    pricePerM2: { "1,5 mm": 150, "2 mm": 200 } as Partial<Record<Thickness, number>>,
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
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783181084/nappe-mat-2_hk8006.png",
    images: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783181084/nappe-mat-2_hk8006.png",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783197392/nappe-mat-4_mwoleb.png",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783197385/IMG-20250127-WA0017_kfdoij.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783197394/nappe-mat-1_nvztrq.png",
    ],
    description:
      "Finition mate anti-reflets, élégante et discrète. Masque les traces de doigts et apporte une touche moderne.",
    pricePerM2: { "2 mm": 230 } as Partial<Record<Thickness, number>>,
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
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783181083/IMG-20241016-WA0030_uj1r2b.jpg",
    images: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783181083/IMG-20241016-WA0030_uj1r2b.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783196201/IMG-20240509-WA0016_bwmo9q.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783196201/IMG-20241016-WA0031_wbgbjb.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783196201/IMG-20240524-WA0008_dygcxj.jpg",
    ],
    description:
      "Reflets dorés raffinés pour habiller vos tables lors des grandes occasions comme au quotidien.",
    pricePerM2: { "2 mm": 230 } as Partial<Record<Thickness, number>>,
    advantages: [
      "Finition dorée luxueuse",
      "Idéale pour les grandes occasions",
      "Résistante aux taches et à l'eau",
      "Apporte de l'éclat à votre salle à manger",
    ],
  },
] as const;

type Model = (typeof MODELS)[number];

function availableThicknesses(model: Model): Thickness[] {
  return THICKNESSES.filter((t) => model.pricePerM2[t] !== undefined);
}

const SHAPES = [
  { id: "carree", label: "Carré", icon: IconCarre },
  { id: "rectangulaire", label: "Rectangulaire", icon: IconRectangulaire },
  { id: "ronde", label: "Cercle", icon: IconCercle },
  { id: "coins-coupes", label: "Rectangle octogonal", icon: IconRectOctogonal },
  { id: "coins-arrondis", label: "Rectangle à coins arrondis", icon: IconCoinsArrondis },
  { id: "octogonale", label: "Octogone", icon: IconOctogone },
] as const;

type ShapeId = (typeof SHAPES)[number]["id"];

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

type DimKey = "length" | "width" | "arcA" | "arcB" | "radius";
type Dimensions = Record<DimKey, string>;

const EMPTY_DIMS: Dimensions = { length: "", width: "", arcA: "", arcB: "", radius: "" };

/* Champs de dimensions demandés pour chaque forme */
const SHAPE_FIELDS: Record<ShapeId, { key: DimKey; label: string }[]> = {
  carree: [{ key: "length", label: "Côté (cm)" }],
  rectangulaire: [
    { key: "length", label: "Longueur (cm)" },
    { key: "width", label: "Largeur (cm)" },
  ],
  ronde: [{ key: "length", label: "Diamètre (cm)" }],
  "coins-coupes": [
    { key: "length", label: "Longueur (cm)" },
    { key: "width", label: "Largeur (cm)" },
    { key: "arcA", label: "Arc A (cm)" },
    { key: "arcB", label: "Arc B (cm)" },
  ],
  "coins-arrondis": [
    { key: "length", label: "Longueur (cm)" },
    { key: "width", label: "Largeur (cm)" },
    { key: "radius", label: "Rayon (cm)" },
  ],
  octogonale: [
    { key: "length", label: "Longueur (cm)" },
    { key: "arcA", label: "Arc (cm)" },
  ],
};

function parseDim(value: string): number {
  return parseFloat(value.replace(",", "."));
}

/* Surface = longueur × largeur (en m²) — la nappe est découpée dans une
   feuille rectangulaire. Formes à une seule dimension de base : côté ×
   côté, diamètre × diamètre ou longueur × longueur. Les arcs / rayon
   sont des détails de découpe qui n'entrent pas dans la surface. */
function computeArea(shape: ShapeId, dims: Dimensions): number | null {
  const L = parseDim(dims.length);
  const W = parseDim(dims.width);

  switch (shape) {
    case "ronde":
    case "carree":
    case "octogonale": {
      if (!L || L <= 0) return null;
      const c = L / 100;
      return c * c;
    }
    case "coins-arrondis":
    case "coins-coupes":
    case "rectangulaire": {
      if (!L || !W || L <= 0 || W <= 0) return null;
      return (L / 100) * (W / 100);
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
  const [dims, setDims] = useState<Dimensions>(EMPTY_DIMS);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const thicknessOptions = availableThicknesses(model);

  const [imgIndex, setImgIndex] = useState(0);

  function selectModel(m: Model) {
    setModel(m);
    setImgIndex(0);
    const opts = availableThicknesses(m);
    if (!opts.includes(thickness)) setThickness(opts[0]);
  }

  const shapeFields = SHAPE_FIELDS[shape];
  // Tous les champs de la forme doivent être remplis (> 0)
  const dimsComplete = shapeFields.every((f) => parseDim(dims[f.key]) > 0);

  const area = dimsComplete ? computeArea(shape, dims) : null;
  const pricePerM2 = model.pricePerM2[thickness] ?? 0;
  // Frais supplémentaires selon le résultat longueur × largeur (m²)
  // 0 à 0,49 : +30 | 0,5 à 0,99 : +50 | 1 et plus : +30
  const surcharge = area === null ? 0 : area < 0.5 ? 30 : area < 1 ? 50 : 30;
  const totalPrice = area && pricePerM2 ? Math.round(area * pricePerM2 + surcharge) : null;

  /* ─── Quantité de la nappe en cours ─── */
  const [qty, setQty] = useState(1);

  /* ─── Liste des nappes ajoutées ─── */
  interface AddedNappe {
    modelLabel: string;
    image: string;
    shapeLabel: string;
    thickness: Thickness;
    dimSummary: string;
    areaM2: number;
    price: number; // prix unitaire
    qty: number;
  }
  const [addedNappes, setAddedNappes] = useState<AddedNappe[]>([]);

  const shapeLabel = SHAPES.find((s) => s.id === shape)?.label ?? shape;
  const dimSummary = shapeFields
    .map((f) => `${f.label.replace(" (cm)", "")} ${dims[f.key]} cm`)
    .join(" · ");

  function addCurrentNappe() {
    if (!totalPrice || !area) return;
    setAddedNappes((prev) => [
      ...prev,
      {
        modelLabel: model.label,
        image: model.image,
        shapeLabel,
        thickness,
        dimSummary,
        areaM2: area,
        price: totalPrice,
        qty,
      },
    ]);
    setDims(EMPTY_DIMS);
    setQty(1);
  }

  function removeNappe(index: number) {
    setAddedNappes((prev) => prev.filter((_, i) => i !== index));
  }

  // Nappes à commander : celles ajoutées + la config en cours si valide
  const pendingCurrent: AddedNappe | null =
    totalPrice && area
      ? { modelLabel: model.label, image: model.image, shapeLabel, thickness, dimSummary, areaM2: area, price: totalPrice, qty }
      : null;
  const orderNappes: AddedNappe[] = pendingCurrent ? [...addedNappes, pendingCurrent] : addedNappes;
  const grandTotal = orderNappes.reduce((sum, n) => sum + n.price * n.qty, 0);
  const totalPieces = orderNappes.reduce((sum, n) => sum + n.qty, 0);

  const [form, setForm] = useState({ fullName: "", phone: "", city: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  function handleOrder(e: React.FormEvent) {
    e.preventDefault();
    if (orderNappes.length === 0) return;
    setSubmitting(true);

    const orderItems = orderNappes.map((n, i) => ({
      slug: `${PRODUCT.slug}-${i + 1}`,
      name: `${PRODUCT.name} (${n.modelLabel} | ${n.shapeLabel} | ${n.thickness} | ${n.dimSummary})`,
      price: n.price,
      image: n.image,
      quantity: n.qty,
    }));

    clearCart();
    orderItems.forEach((item) => addItem(item, item.quantity));

    const notes = orderNappes
      .map(
        (n, i) =>
          `Nappe ${i + 1} : ${n.modelLabel} | ${n.shapeLabel} | ${n.thickness} | ${n.dimSummary} | ${n.areaM2.toFixed(2)} m² | ${n.qty} × ${n.price} MAD`
      )
      .join(" — ");

    saveLastOrder({
      id: generateOrderId(),
      items: orderItems,
      customer: { ...form, notes: `${notes} — Total : ${grandTotal} MAD` },
      total: grandTotal,
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
                src={model.images[imgIndex] ?? model.image}
                alt={`Nappe ${model.label}`}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-dark-gray shadow">
                Nappe {model.label}
              </span>
              {model.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="Photo précédente"
                    onClick={() => setImgIndex((i) => (i - 1 + model.images.length) % model.images.length)}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-dark-gray shadow-md transition hover:bg-white"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    aria-label="Photo suivante"
                    onClick={() => setImgIndex((i) => (i + 1) % model.images.length)}
                    className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-dark-gray shadow-md transition hover:bg-white"
                  >
                    <ChevronRight size={22} />
                  </button>
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                    {model.images.map((_, i) => (
                      <span
                        key={i}
                        className={`h-1.5 rounded-full transition-all ${
                          i === imgIndex ? "w-5 bg-white" : "w-1.5 bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              {MODELS.map((m) => {
                const isSelected = model.id === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => selectModel(m)}
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
              <div className="grid grid-cols-6 gap-2">
                {SHAPES.map(({ id, label, icon: Icon }) => {
                  const isSelected = shape === id;
                  return (
                    <button
                      key={id}
                      type="button"
                      aria-label={label}
                      title={label}
                      onClick={() => { setShape(id); setDims(EMPTY_DIMS); }}
                      className="flex aspect-square items-center justify-center rounded-xl border-2 transition-all"
                      style={
                        isSelected
                          ? { borderColor: "#f97316", backgroundColor: "#fff7ed", color: "#f97316" }
                          : { borderColor: "#e5e7eb", color: "#6b7280" }
                      }
                    >
                      <Icon size={30} />
                    </button>
                  );
                })}
              </div>

              {/* Étape 3 : épaisseur */}
              <div className="mb-3 mt-5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#f97316" }}>3</span>
                <p className="text-sm font-semibold text-dark-gray">Épaisseur :</p>
              </div>
              <div className={`grid gap-2 ${thicknessOptions.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {thicknessOptions.map((t) => {
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
              <div className={`grid gap-3 ${shapeFields.length > 1 ? "grid-cols-2" : "grid-cols-1"}`}>
                {shapeFields.map((field) => (
                  <input
                    key={`${shape}-${field.key}`}
                    required
                    type="number"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    min={1}
                    max={500}
                    placeholder={field.label}
                    value={dims[field.key]}
                    onChange={(e) =>
                      setDims((d) => ({ ...d, [field.key]: e.target.value.replace(/[^0-9.,]/g, "") }))
                    }
                    className="min-w-0 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                  />
                ))}
              </div>

              {/* Quantité */}
              <div className="mb-3 mt-5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#f97316" }}>5</span>
                <p className="text-sm font-semibold text-dark-gray">Quantité :</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="Diminuer la quantité"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all disabled:opacity-40"
                  style={{ borderColor: "#f97316", color: "#f97316" }}
                >
                  −
                </button>
                <span className="w-12 text-center text-lg font-bold text-dark-gray">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="Augmenter la quantité"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all"
                  style={{ borderColor: "#f97316", color: "#f97316" }}
                >
                  +
                </button>
                <span className="text-xs text-gray-500">pièce{qty > 1 ? "s" : ""} de la même taille</span>
              </div>

              {/* Prix total de la nappe en cours */}
              <div className="mt-4 flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#fff7ed" }}>
                <div>
                  <p className="text-sm font-semibold text-dark-gray">Prix total de la nappe</p>
                  {totalPrice && qty > 1 && (
                    <p className="text-xs text-gray-500">{qty} × {totalPrice} MAD</p>
                  )}
                </div>
                <span className="text-xl font-extrabold" style={{ color: "#f97316" }}>
                  {totalPrice ? `${totalPrice * qty} MAD` : "— MAD"}
                </span>
              </div>

              {/* Ajouter cette nappe à la commande */}
              <button
                type="button"
                onClick={addCurrentNappe}
                disabled={!totalPrice}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 bg-white px-6 py-3 text-sm font-semibold transition-all disabled:opacity-50"
                style={{ borderColor: "#f97316", color: "#f97316" }}
              >
                <Plus size={18} />
                Ajouter cette nappe
              </button>

              {/* Liste des nappes ajoutées */}
              {addedNappes.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-sm font-semibold text-dark-gray">
                    Vos nappes ({addedNappes.length}
                    {pendingCurrent ? " + 1 en cours" : ""}) :
                  </p>
                  {addedNappes.map((n, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-dark-gray">
                          Nappe {n.modelLabel} — {n.shapeLabel}
                          {n.qty > 1 ? ` × ${n.qty}` : ""}
                        </p>
                        <p className="text-xs text-gray-500">
                          {n.thickness} · {n.dimSummary}
                          {n.qty > 1 ? ` · ${n.qty} × ${n.price} MAD` : ""}
                        </p>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: "#f97316" }}>
                          {n.price * n.qty} MAD
                        </span>
                        <button
                          type="button"
                          onClick={() => removeNappe(i)}
                          aria-label="Retirer cette nappe"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#fff7ed" }}>
                    <p className="text-sm font-semibold text-dark-gray">Total de la commande</p>
                    <span className="text-xl font-extrabold" style={{ color: "#f97316" }}>
                      {grandTotal} MAD
                    </span>
                  </div>
                </div>
              )}

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
                  disabled={submitting || orderNappes.length === 0}
                  className="animate-shake mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70"
                >
                  <ShoppingCart size={18} />
                  {submitting
                    ? "Traitement…"
                    : orderNappes.length > 0
                      ? `Commander${totalPieces > 1 ? ` ${totalPieces} nappes` : ""} — ${grandTotal} MAD`
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
