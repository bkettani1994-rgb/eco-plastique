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
import { useCart } from "@/lib/cart-context";
import { generateOrderId, saveLastOrder } from "@/lib/order";
import { submitOrder } from "@/lib/submit-order";

/* ─── Icônes de formes de table (SVG sur mesure) ───────────────────── */

type ShapeIconProps = { size?: number };


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

/* مخطط قياس المربع (لا توجد صورة). */
function SquareMeasureDiagram({ label }: { label: string }) {
  return (
    <svg viewBox="0 0 260 210" className="h-full w-full" role="img" aria-label={label}>
      <rect x="60" y="55" width="140" height="140" rx="6" fill="#f4faea" stroke="#8ec63f" strokeWidth="2" />
      <line x1="60" y1="35" x2="200" y2="35" stroke="#8ec63f" strokeWidth="1.6" />
      <line x1="60" y1="28" x2="60" y2="42" stroke="#8ec63f" strokeWidth="1.6" />
      <line x1="200" y1="28" x2="200" y2="42" stroke="#8ec63f" strokeWidth="1.6" />
      <polygon points="60,35 68,31 68,39" fill="#8ec63f" />
      <polygon points="200,35 192,31 192,39" fill="#8ec63f" />
      <line x1="220" y1="55" x2="220" y2="195" stroke="#8ec63f" strokeWidth="1.6" />
      <line x1="213" y1="55" x2="227" y2="55" stroke="#8ec63f" strokeWidth="1.6" />
      <line x1="213" y1="195" x2="227" y2="195" stroke="#8ec63f" strokeWidth="1.6" />
      <text x="130" y="24" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#333333">
        {label}
      </text>
      <text x="238" y="130" textAnchor="middle" fontSize="15" fontWeight="bold" fill="#333333" transform="rotate(90 238 130)">
        {label}
      </text>
    </svg>
  );
}

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PRODUCT = {
  slug: "nappe-pvc-sur-mesure",
  name: "أغطية طاولة PVC حسب المقاس",
  image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
};

const THICKNESSES = ["1,5 ملم", "2 ملم"] as const;
type Thickness = (typeof THICKNESSES)[number];

/* الأنواع الثلاثة — السعر بالمتر المربع حسب السماكة المتوفرة */
const MODELS = [
  {
    id: "transparent",
    label: "شفافة",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205254/8_p5gcls.jpg",
    images: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205254/8_p5gcls.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205186/9_ip7mi9.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205253/7_1_y53ss8.jpg",
    ],
    pricePerM2: { "1,5 ملم": 149, "2 ملم": 199 } as Partial<Record<Thickness, number>>,
  },
  {
    id: "matte",
    label: "مطفية",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205255/4_54_kde86n.png",
    images: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205255/4_54_kde86n.png",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205254/6_33_ub21es.png",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205254/5_41_of5vzg.png",
    ],
    pricePerM2: { "2 ملم": 229 } as Partial<Record<Thickness, number>>,
  },
  {
    id: "dore",
    label: "ذهبية",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205255/3_71_nyvpla.png",
    images: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205255/3_71_nyvpla.png",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205255/2_85_tfzvfs.png",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783205255/1_81_vyaqks.png",
    ],
    pricePerM2: { "2 ملم": 229 } as Partial<Record<Thickness, number>>,
  },
] as const;

type Model = (typeof MODELS)[number];

function availableThicknesses(model: Model): Thickness[] {
  return THICKNESSES.filter((t) => model.pricePerM2[t] !== undefined);
}

const SHAPES = [
  { id: "rectangulaire", label: "مستطيل", icon: IconRectangulaire },
  { id: "ronde", label: "دائرة", icon: IconCercle },
  { id: "coins-coupes", label: "مستطيل ثماني", icon: IconRectOctogonal },
  { id: "coins-arrondis", label: "مستطيل بزوايا دائرية", icon: IconCoinsArrondis },
  { id: "octogonale", label: "ثماني الأضلاع", icon: IconOctogone },
] as const;

type ShapeId = (typeof SHAPES)[number]["id"];

/* دليل القياس المعروض في نافذة « كيف أقيس؟ » */
const MEASURE_GUIDE: { id: ShapeId; how: string; image?: string }[] = [
  {
    id: "rectangulaire",
    how: "قس الطول ثم العرض لسطح الطاولة.",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783344490/1_awcbvg.jpg",
  },
  {
    id: "ronde",
    how: "قس القطر : من حافة إلى الحافة المقابلة مروراً بالمركز.",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783344491/3_dmwkjt.jpg",
  },
  {
    id: "coins-coupes",
    how: "قس الطول والعرض الكليين، ثم طول كل زاوية مقصوصة (القوس أ والقوس ب).",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783344490/5_iwwwmc.jpg",
  },
  {
    id: "coins-arrondis",
    how: "قس الطول والعرض الكليين، ثم نصف قطر استدارة الزاوية.",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783344490/2_qbyxbu.jpg",
  },
  {
    id: "octogonale",
    how: "قس الطول الكلي (من وجه إلى الوجه المقابل)، ثم طول الضلع المائل (القوس).",
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783344492/4_fo2kfz.jpg",
  },
];

const TRUST_BADGES = [
  { icon: Droplets, label: "مقاومة للسوائل",  desc: "PVC عالي الجودة" },
  { icon: Sparkles, label: "سهلة التنظيف",     desc: "مسحة بالإسفنجة تكفي" },
  { icon: Shield,   label: "متينة",            desc: "حواف معززة" },
  { icon: Truck,    label: "توصيل سريع",       desc: "في جميع أنحاء المغرب" },
  { icon: RotateCcw,label: "قص حسب المقاس",    desc: "لكل أشكال الطاولات" },
  { icon: Star,     label: "4.8 / 5",          desc: "بناءً على تقييمات عملائنا" },
];

const FAQ_ITEMS = [
  {
    q: "كيف أقيس أبعاد طاولتي؟",
    a: "قس الطول والعرض (أو القطر) بشريط القياس، مع إضافة بضعة سنتيمترات على كل جانب إذا رغبت في تدلٍّ جانبي.",
  },
  {
    q: "هل الغطاء مقاوم للحرارة؟",
    a: "نعم، يتحمّل PVC التلامس العرضي مع الأطباق الدافئة، لكن ننصح باستخدام حامل طبق للأطباق الساخنة جداً للحفاظ على الغطاء على المدى الطويل.",
  },
  {
    q: "أي سماكة أختار: 1,5 ملم أم 2 ملم؟",
    a: "سماكة 1,5 ملم مناسبة للاستخدام اليومي العادي. سماكة 2 ملم توفر صلابة ومتانة أعلى، ويُنصح بها للطاولات كثيرة الاستعمال أو الكبيرة.",
  },
  {
    q: "كم تستغرق مدة استلام غطائي حسب المقاس؟",
    a: "مدة التصنيع والتوصيل عادة من 2 إلى 5 أيام عمل حسب مدينتك.",
  },
];

/* ─── HELPERS ──────────────────────────────────────────────────────── */

type DimKey = "length" | "width" | "arcA" | "arcB" | "radius";
type Dimensions = Record<DimKey, string>;

const EMPTY_DIMS: Dimensions = { length: "", width: "", arcA: "", arcB: "", radius: "" };

/* حقول الأبعاد المطلوبة لكل شكل */
const SHAPE_FIELDS: Record<ShapeId, { key: DimKey; label: string }[]> = {
  rectangulaire: [
    { key: "length", label: "الطول (سم)" },
    { key: "width", label: "العرض (سم)" },
  ],
  ronde: [{ key: "length", label: "القطر (سم)" }],
  "coins-coupes": [
    { key: "length", label: "الطول (سم)" },
    { key: "width", label: "العرض (سم)" },
    { key: "arcA", label: "القوس أ (سم)" },
    { key: "arcB", label: "القوس ب (سم)" },
  ],
  "coins-arrondis": [
    { key: "length", label: "الطول (سم)" },
    { key: "width", label: "العرض (سم)" },
    { key: "radius", label: "نصف القطر (سم)" },
  ],
  octogonale: [
    { key: "length", label: "الطول (سم)" },
    { key: "arcA", label: "القوس (سم)" },
  ],
};

function parseDim(value: string): number {
  return parseFloat(value.replace(",", "."));
}

/* المساحة = الطول × العرض (م²) — يُقص الغطاء من صفيحة مستطيلة */
function computeArea(shape: ShapeId, dims: Dimensions): number | null {
  const L = parseDim(dims.length);
  const W = parseDim(dims.width);

  switch (shape) {
    case "ronde":
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

/* العرض الأقصى للفة PVC (بالسنتيمتر). يجب أن تدخل كل مفرش في هذا العرض. */
const MAX_WIDTH_CM = 140;

/* الحد الأدنى للبُعد القابل للتصنيع (بالسنتيمتر). */
const MIN_DIM_CM = 10;

function dimUnderMin(shape: ShapeId, dims: Dimensions): boolean {
  const L = parseDim(dims.length);
  const W = parseDim(dims.width);
  switch (shape) {
    case "ronde":
    case "octogonale":
      return L > 0 && L < MIN_DIM_CM;
    case "rectangulaire":
    case "coins-arrondis":
    case "coins-coupes":
      return (L > 0 && L < MIN_DIM_CM) || (W > 0 && W < MIN_DIM_CM);
  }
  return false;
}

function widthOverLimit(shape: ShapeId, dims: Dimensions): boolean {
  const L = parseDim(dims.length);
  const W = parseDim(dims.width);
  switch (shape) {
    case "ronde":
    case "octogonale":
      return L > 0 && L > MAX_WIDTH_CM;
    case "rectangulaire":
    case "coins-arrondis":
    case "coins-coupes":
      return L > 0 && W > 0 && Math.min(L, W) > MAX_WIDTH_CM;
  }
  return false;
}

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function NappePvcPageAr() {
  const router = useRouter();
  const { addItem, clearCart } = useCart();

  const [model, setModel] = useState<Model>(MODELS[0]);
  const [thickness, setThickness] = useState<Thickness>("1,5 ملم");
  const [shape, setShape] = useState<ShapeId>("rectangulaire");
  const [dims, setDims] = useState<Dimensions>(EMPTY_DIMS);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showMeasureGuide, setShowMeasureGuide] = useState(false);
  const [showThicknessCompare, setShowThicknessCompare] = useState(false);

  const thicknessOptions = availableThicknesses(model);

  const [imgIndex, setImgIndex] = useState(0);

  function selectModel(m: Model) {
    setModel(m);
    setImgIndex(0);
    const opts = availableThicknesses(m);
    if (!opts.includes(thickness)) setThickness(opts[0]);
  }

  const shapeFields = SHAPE_FIELDS[shape];
  const dimsComplete = shapeFields.every((f) => parseDim(dims[f.key]) > 0);

  const area = dimsComplete ? computeArea(shape, dims) : null;
  const pricePerM2 = model.pricePerM2[thickness] ?? 0;
  // رسوم إضافية حسب النتيجة (م²) : أقل من 0,5 : +30 | من 0,5 إلى 0,99 : +50 | 1 وأكثر : +30
  const surcharge = area === null ? 0 : area < 0.5 ? 30 : area < 1 ? 50 : 30;
  const overWidth = widthOverLimit(shape, dims);
  const underMin = dimUnderMin(shape, dims);
  const dimError = overWidth || underMin;
  const totalPrice =
    area && pricePerM2 && !dimError ? Math.round(area * pricePerM2 + surcharge) : null;

  /* ─── الكمية ─── */
  const [qty, setQty] = useState(1);

  /* ─── قائمة الأغطية المضافة ─── */
  interface AddedNappe {
    modelLabel: string;
    image: string;
    shapeLabel: string;
    thickness: Thickness;
    dimSummary: string;
    areaM2: number;
    price: number; // سعر الوحدة
    qty: number;
  }
  const [addedNappes, setAddedNappes] = useState<AddedNappe[]>([]);

  const shapeLabel = SHAPES.find((s) => s.id === shape)?.label ?? shape;
  const dimSummary = shapeFields
    .map((f) => `${f.label.replace(" (سم)", "")} ${dims[f.key]} سم`)
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

  const pendingCurrent: AddedNappe | null =
    totalPrice && area
      ? { modelLabel: model.label, image: model.image, shapeLabel, thickness, dimSummary, areaM2: area, price: totalPrice, qty }
      : null;
  const orderNappes: AddedNappe[] = pendingCurrent ? [...addedNappes, pendingCurrent] : addedNappes;
  const grandTotal = orderNappes.reduce((sum, n) => sum + n.price * n.qty, 0);
  const totalPieces = orderNappes.reduce((sum, n) => sum + n.qty, 0);

  const [form, setForm] = useState({ fullName: "", phone: "", city: "", address: "" });
  const [submitting, setSubmitting] = useState(false);

  async function handleOrder(e: React.FormEvent) {
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
          `غطاء ${i + 1} : ${n.modelLabel} | ${n.shapeLabel} | ${n.thickness} | ${n.dimSummary} | ${n.areaM2.toFixed(2)} م² | ${n.qty} × ${n.price} درهم`
      )
      .join(" — ");

    const orderId = generateOrderId();
    saveLastOrder({
      id: orderId,
      items: orderItems,
      customer: { ...form, notes: `${notes} — المجموع : ${grandTotal} درهم` },
      total: grandTotal,
      createdAt: new Date().toISOString(),
    });

    await submitOrder({
      product: "nappe-pvc",
      orderId,
      customer: form,
      details: `${notes} — المجموع : ${grandTotal} درهم`,
      total: grandTotal,
      lang: "ar",
      rows: orderNappes.map((n) => ({
        type: n.modelLabel,
        shape: n.shapeLabel,
        thickness: n.thickness,
        dimensions: n.dimSummary,
        qty: n.qty,
        price: n.price * n.qty,
      })),
    });

    router.push("/commande/confirmation");
  }

  return (
    <main dir="rtl" className="bg-white">
      {/* ── 1. HERO : معرض الأنواع + أداة الطلب ─────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-start">
          {/* المعرض : الصورة الرئيسية + مصغرات الأنواع */}
          <div className="flex flex-col gap-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-light-gray">
              <Image
                src={model.images[imgIndex] ?? model.image}
                alt={`غطاء ${model.label}`}
                fill
                priority
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
              />
              <span className="absolute bottom-3 right-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-dark-gray shadow">
                غطاء {model.label}
              </span>
              {model.images.length > 1 && (
                <>
                  <button
                    type="button"
                    aria-label="الصورة السابقة"
                    onClick={() => setImgIndex((i) => (i - 1 + model.images.length) % model.images.length)}
                    className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-dark-gray shadow-md transition hover:bg-white"
                  >
                    <ChevronLeft size={22} />
                  </button>
                  <button
                    type="button"
                    aria-label="الصورة التالية"
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
                    <Image src={m.image} alt={`غطاء ${m.label}`} fill className="object-cover" sizes="33vw" />
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

          {/* معلومات + أداة الطلب */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                أغطية الطاولة
              </span>
              <h1 className="mt-2 text-3xl font-bold text-dark-gray">
                أغطية طاولة PVC حسب المقاس
              </h1>
              <p className="mt-3 leading-relaxed text-gray-500">
                اختر النوع والشكل والسماكة والأبعاد — نقصّ غطاءك حسب المقاسات الدقيقة لطاولتك.
              </p>
              <div className="mt-3 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500">4.8 / 5</span>
              </div>
            </div>

            {/* أداة الطلب + الاستمارة — إطار أخضر واحد */}
            <div className="rounded-2xl border-2 p-5" style={{ borderColor: "#8ec63f" }}>
              {/* الخطوة 1 : النوع */}
              <div className="mb-3 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#8ec63f" }}>1</span>
                <p className="text-sm font-semibold text-dark-gray">
                  نوع الغطاء : <span style={{ color: "#8ec63f" }}>{model.label}</span>
                  <span className="ms-2 text-xs font-normal text-gray-400">(غيّره عبر الصور)</span>
                </p>
              </div>

              {/* الخطوة 2 : الشكل */}
              <div className="mb-3 mt-4 flex flex-wrap items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#8ec63f" }}>2</span>
                <p className="text-sm font-semibold text-dark-gray">شكل طاولتك :</p>
                <button
                  type="button"
                  onClick={() => setShowMeasureGuide(true)}
                  className="ms-auto inline-flex flex-shrink-0 items-center gap-0.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-primary/10"
                  style={{ borderColor: "#8ec63f", color: "#8ec63f" }}
                >
                  📏 كيف أقيس؟
                </button>
              </div>
              <div className="grid grid-cols-5 gap-2">
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
                          ? { borderColor: "#8ec63f", backgroundColor: "#f4faea", color: "#8ec63f" }
                          : { borderColor: "#e5e7eb", color: "#6b7280" }
                      }
                    >
                      <Icon size={30} />
                    </button>
                  );
                })}
              </div>

              {/* الخطوة 3 : السماكة */}
              <div className="mb-3 mt-5 flex flex-wrap items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#8ec63f" }}>3</span>
                <p className="text-sm font-semibold text-dark-gray">السماكة :</p>
                {thicknessOptions.length > 1 && (
                  <button
                    type="button"
                    onClick={() => setShowThicknessCompare(true)}
                    className="ms-auto inline-flex flex-shrink-0 items-center gap-0.5 whitespace-nowrap rounded-full border px-2 py-0.5 text-[10px] font-semibold transition-colors hover:bg-primary/10"
                    style={{ borderColor: "#8ec63f", color: "#8ec63f" }}
                  >
                    ⚖️ قارن السماكات
                  </button>
                )}
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
                      style={isSelected ? { borderColor: "#8ec63f", backgroundColor: "#f4faea" } : { borderColor: "#e5e7eb" }}
                    >
                      <span className="text-sm font-semibold text-dark-gray">{t}</span>
                      <span className="text-sm font-bold" style={{ color: "#8ec63f" }}>
                        {model.pricePerM2[t]} درهم/م²
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* الخطوة 4 : الأبعاد */}
              <div className="mb-3 mt-5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#8ec63f" }}>4</span>
                <p className="text-sm font-semibold text-dark-gray">أبعاد طاولتك :</p>
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
                    className={`min-w-0 rounded-xl border bg-white px-4 py-3 text-sm text-dark-gray focus:outline-none ${
                      dimError ? "border-red-400 focus:border-red-500" : "border-gray-200 focus:border-primary"
                    }`}
                  />
                ))}
              </div>

              {overWidth && (
                <p className="mt-2 rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                  ⚠️ العرض الأقصى للفاتنا هو <strong>1,40 م (140 سم)</strong>.
                  يرجى تقليل هذا البعد. للحصول على مفرش أعرض، تواصلوا معنا مباشرة.
                </p>
              )}
              {underMin && (
                <p className="mt-2 rounded-xl bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
                  ⚠️ الحد الأدنى للبُعد هو <strong>10 سم</strong>. يرجى زيادة هذا البعد.
                </p>
              )}

              {/* الخطوة 5 : الكمية */}
              <div className="mb-3 mt-5 flex items-center gap-2">
                <span className="flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#8ec63f" }}>5</span>
                <p className="text-sm font-semibold text-dark-gray">الكمية :</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  aria-label="إنقاص الكمية"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all disabled:opacity-40"
                  style={{ borderColor: "#8ec63f", color: "#8ec63f" }}
                >
                  −
                </button>
                <span className="w-12 text-center text-lg font-bold text-dark-gray">{qty}</span>
                <button
                  type="button"
                  onClick={() => setQty((q) => Math.min(20, q + 1))}
                  aria-label="زيادة الكمية"
                  className="flex h-11 w-11 items-center justify-center rounded-xl border-2 text-lg font-bold transition-all"
                  style={{ borderColor: "#8ec63f", color: "#8ec63f" }}
                >
                  +
                </button>
                <span className="text-xs text-gray-500">بنفس المقاس</span>
              </div>

              {/* السعر الإجمالي للغطاء الحالي */}
              <div className="mt-4 flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#f4faea" }}>
                <div>
                  <p className="text-sm font-semibold text-dark-gray">السعر الإجمالي للغطاء</p>
                  {totalPrice && qty > 1 && (
                    <p className="text-xs text-gray-500">{qty} × {totalPrice} درهم</p>
                  )}
                </div>
                <span className="text-xl font-extrabold" style={{ color: "#8ec63f" }}>
                  {totalPrice ? `${totalPrice * qty} درهم` : "— درهم"}
                </span>
              </div>

              {/* إضافة هذا الغطاء */}
              <button
                type="button"
                onClick={addCurrentNappe}
                disabled={!totalPrice}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 bg-white px-6 py-3 text-sm font-semibold transition-all disabled:opacity-50"
                style={{ borderColor: "#8ec63f", color: "#8ec63f" }}
              >
                <Plus size={18} />
                أضف هذا الغطاء
              </button>

              {/* قائمة الأغطية المضافة */}
              {addedNappes.length > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-sm font-semibold text-dark-gray">
                    أغطيتك ({addedNappes.length}
                    {pendingCurrent ? " + 1 قيد الإعداد" : ""}) :
                  </p>
                  {addedNappes.map((n, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-dark-gray">
                          غطاء {n.modelLabel} — {n.shapeLabel}
                          {n.qty > 1 ? ` × ${n.qty}` : ""}
                        </p>
                        <p className="text-xs text-gray-500">
                          {n.thickness} · {n.dimSummary}
                          {n.qty > 1 ? ` · ${n.qty} × ${n.price} درهم` : ""}
                        </p>
                      </div>
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <span className="text-sm font-bold" style={{ color: "#8ec63f" }}>
                          {n.price * n.qty} درهم
                        </span>
                        <button
                          type="button"
                          onClick={() => removeNappe(i)}
                          aria-label="إزالة هذا الغطاء"
                          className="flex h-7 w-7 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-red-50 hover:text-red-500"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#f4faea" }}>
                    <p className="text-sm font-semibold text-dark-gray">مجموع الطلب</p>
                    <span className="text-xl font-extrabold" style={{ color: "#8ec63f" }}>
                      {grandTotal} درهم
                    </span>
                  </div>
                </div>
              )}

              <hr className="my-3 border-primary/30" />

              {/* استمارة الطلب */}
              <form onSubmit={handleOrder} className="flex flex-col gap-3">
                <p className="font-semibold text-dark-gray">معلومات التوصيل</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="الاسم الكامل"
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="الهاتف (06…)"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                  />
                </div>
                <input
                  required
                  placeholder="المدينة"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                />
                <input
                  required
                  placeholder="عنوان التوصيل"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                />
                <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#f4faea" }}>
                  <span className="text-sm text-gray-500">رسوم التوصيل</span>
                  <span className="text-sm font-semibold text-green-600">مجاني</span>
                </div>
                <button
                  type="submit"
                  disabled={submitting || orderNappes.length === 0}
                  className="animate-shake mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70"
                >
                  <ShoppingCart size={18} />
                  {submitting
                    ? "جارٍ المعالجة…"
                    : orderNappes.length > 0
                      ? `اطلب الآن${totalPieces > 1 ? ` (${totalPieces} أغطية)` : ""} — ${grandTotal} درهم`
                      : "أدخل الأبعاد"}
                </button>
                <p className="text-center text-xs text-gray-400">
                  الدفع عند الاستلام · التوصيل خلال 24–72 ساعة في المغرب
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
          الأسئلة الشائعة
        </h2>
        <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
          {FAQ_ITEMS.map((item, i) => (
            <div key={i}>
              <button
                type="button"
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between px-5 py-4 text-start"
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
            زيّن طاولتك بأناقة
          </h2>
          <p className="mt-2 text-white/80">
            التوصيل خلال 24–72 ساعة في جميع أنحاء المغرب · الدفع عند الاستلام
          </p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
          >
            <ShoppingCart size={18} />
            اطلب الآن
          </button>
        </div>
      </section>
      {/* ── نافذة « كيف أقيس؟ » ─────────────────────────────────────── */}
      {showMeasureGuide && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowMeasureGuide(false)}
        >
          <div
            dir="rtl"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-dark-gray">📏 كيف تقيس طاولتك؟</h3>
              <button
                type="button"
                aria-label="إغلاق"
                onClick={() => setShowMeasureGuide(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-dark-gray"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mb-4 rounded-xl px-4 py-3 text-sm text-gray-600" style={{ backgroundColor: "#f4faea" }}>
              استعمل شريط قياس وقس دائماً <strong>سطح الطاولة</strong> (وليس الأرجل).
              أضف بضعة سنتيمترات إذا أردت أن يتدلى الغطاء قليلاً.
            </p>

            <div className="flex flex-col divide-y divide-gray-100">
              {MEASURE_GUIDE.map(({ id, how, image }) => {
                const shapeDef = SHAPES.find((s) => s.id === id)!;
                return (
                  <div key={id} className="py-4">
                    <div className="mb-2 flex items-center gap-2">
                      <shapeDef.icon size={20} />
                      <p className="text-sm font-semibold text-dark-gray">{shapeDef.label}</p>
                    </div>
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-gray-100 bg-light-gray">
                      {image ? (
                        <Image src={image} alt={`كيف تقيس : ${shapeDef.label}`} fill sizes="(max-width:640px) 100vw, 480px" className="object-contain" />
                      ) : (
                        <SquareMeasureDiagram label="الضلع" />
                      )}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{how}</p>
                  </div>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setShowMeasureGuide(false)}
              className="mt-4 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              فهمت
            </button>
          </div>
        </div>
      )}

      {/* ── نافذة « قارن السماكات » ──────────────────────────────────── */}
      {showThicknessCompare && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
          onClick={() => setShowThicknessCompare(false)}
        >
          <div
            dir="rtl"
            className="max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-dark-gray">⚖️ قارن السماكات</h3>
              <button
                type="button"
                aria-label="إغلاق"
                onClick={() => setShowThicknessCompare(false)}
                className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-dark-gray"
              >
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { label: "سماكة 1,5 ملم", src: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783369185/Gemini_Generated_Image_4wf26z4wf26z4wf2_rhjxw7.png" },
                { label: "سماكة 2 ملم", src: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783369185/Gemini_Generated_Image_73phdh73phdh73ph_agyrks.png" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col gap-2">
                  <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-gray-100 bg-light-gray">
                    <Image src={item.src} alt={item.label} fill sizes="(max-width:640px) 100vw, 240px" className="object-contain" />
                  </div>
                  <p className="text-center text-sm font-semibold text-dark-gray">{item.label}</p>
                </div>
              ))}
            </div>

            <p className="mt-4 rounded-xl px-4 py-3 text-sm text-gray-600" style={{ backgroundColor: "#f4faea" }}>
              سماكة <strong>1,5 ملم</strong> مناسبة للاستعمال اليومي العادي. سماكة
              <strong> 2 ملم</strong> أكثر صلابة ومتانة، ويُنصح بها للطاولات الكبيرة أو
              الاستعمال المكثّف.
            </p>

            <button
              type="button"
              onClick={() => setShowThicknessCompare(false)}
              className="mt-4 w-full rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-dark"
            >
              فهمت
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
