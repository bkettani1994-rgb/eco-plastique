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
  { qty: 1, label: "قطعة واحدة", discount: 1, badge: null as string | null, popular: false },
  { qty: 2, label: "قطعتان", discount: 0.95, badge: "−5%", popular: true },
  { qty: 3, label: "3 قطع", discount: 0.90, badge: "−10%", popular: false },
];

const VARIANTS: Record<VariantKey, VariantData> = {
  cervical: {
    key: "cervical",
    submitProduct: "oreiller-cervical",
    slug: "oreiller-cervical-medical",
    tabLabel: "وسادة طبية لدعم الرقبة",
    badge: "وسادة طبية",
    name: "وسادة طبية مريحة لدعم الرقبة",
    subtitle:
      "إسفنج ذاكرة الشكل عالي الكثافة، غطاء من الخيزران القابل للتنفس ومضاد للعث. نم دون آلام في الرقبة، واستيقظ مرتاحاً.",
    ratingText: "4.8 / 5 — أكثر من 180 تقييم",
    productImage:
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937215/Oreiller_cervicale_jpyife.png",
    gallery: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-1_1_knigst.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-2_1_jxnez8.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-7_1_cj0y6i.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-4_1_ja02lu.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-3_1_rsvqh0.jpg",
    ],
    sizes: [{ label: "وسادة طبية للرقبة", price: 249 }],
    trust: [
      { icon: Brain, label: "تصميم مريح", desc: "مصممة مع مختصين" },
      { icon: Wind, label: "قابلة للتنفس", desc: "غطاء من الخيزران المهوّى" },
      { icon: Shield, label: "مضادة للعث", desc: "مضادة للحساسية ومعتمدة" },
      { icon: Truck, label: "توصيل سريع", desc: "في جميع أنحاء المغرب" },
      { icon: RotateCcw, label: "إرجاع خلال 30 يوم", desc: "مضمون أو استرداد المبلغ" },
      { icon: Star, label: "4.8 / 5", desc: "بناءً على أكثر من 180 تقييم" },
    ],
    lifestyle: [
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-4_1_ja02lu.jpg",
        title: "دعم للرقبة مصمم من طرف خبراء",
        text: "طُوّرت وسادتنا المريحة بالتعاون مع أخصائيي العلاج الطبيعي لتوفير دعم مثالي للرقبة. يتكيّف شكلها التشريحي بشكل طبيعي مع انحناء عمودك الفقري، سواء كنت تنام على ظهرك أو على جانبك.",
        imageLeft: true,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-7_1_cj0y6i.jpg",
        title: "وداعاً لآلام الاستيقاظ",
        text: "آلام الرقبة، والتيبّس الصباحي، والصداع — غالباً ما ترتبط هذه المشاكل بوضعية خاطئة للرأس أثناء النوم. تحافظ وسادتنا على عنقك في محاذاة مثالية طوال الليل، لاستيقاظ مريح وخالٍ من الألم.",
        imageLeft: false,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-6_1_fhebyb.jpg",
        title: "إسفنج ذاكرة الشكل عالي الكثافة",
        text: "مصنوعة من إسفنج لزج معتمد، تحتضن بدقة شكل رأسك ورقبتك دون أن تهبط أو تسبب نقاط ضغط. تستعيد شكلها الأصلي عند كل استيقاظ، لتضمن نفس الدعم ليلة بعد ليلة.",
        imageLeft: true,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783097525/Poste_1-1_Memory-5_1_siqxfa.jpg",
        title: "غطاء صحي وسهل العناية",
        text: "الغطاء من الخيزران القابل للتنفس قابل للفك والغسل في الغسالة على 40 درجة. ينظّم الحرارة والرطوبة لراحة حرارية مثالية. مضاد للعث والحساسية، يناسب البشرة الحساسة والأشخاص المصابين بالحساسية.",
        imageLeft: false,
      },
    ],
    comparison: [
      { feature: "دعم تشريحي للرقبة", ours: true, classic: false },
      { feature: "إسفنج ذاكرة الشكل عالي الكثافة", ours: true, classic: false },
      { feature: "غطاء من الخيزران قابل للتنفس", ours: true, classic: false },
      { feature: "مضاد للعث والحساسية", ours: true, classic: false },
      { feature: "غطاء قابل للغسل في الغسالة", ours: true, classic: true },
      { feature: "مناسبة للنوم على الظهر والجانب", ours: true, classic: false },
      { feature: "ضمان 12 شهراً", ours: true, classic: false },
      { feature: "موصى بها من أخصائيي العلاج الطبيعي", ours: true, classic: false },
    ],
    faq: [
      {
        q: "هل تناسب هذه الوسادة النوم على الجانب؟",
        a: "نعم. الشكل المريح مع التجويف المزدوج المركزي والحواف المرتفعة يناسب النائمين على الظهر وعلى الجانب على حد سواء. تحافظ على الرأس والرقبة في المحور الطبيعي للعمود الفقري مهما كانت وضعيتك.",
      },
      {
        q: "كم من الوقت يلزم للتأقلم مع هذه الوسادة؟",
        a: "يشعر معظم عملائنا بتحسّن منذ الليلة الأولى. فترة تأقلم من 7 إلى 14 يوماً أمر طبيعي حتى يعتاد جسمك على الدعم المثالي للرقبة. بعد هذه المدة تصبح الراحة طبيعية.",
      },
      {
        q: "هل يحافظ الإسفنج على شكله مع مرور الوقت؟",
        a: "إسفنجنا اللزج عالي الكثافة (50 كغ/م³) يحافظ على خصائصه على المدى الطويل. لا يهبط مثل الوسادة العادية ويستعيد شكله الأصلي بعد كل استعمال.",
      },
      {
        q: "في كم من الوقت يتم التوصيل؟",
        a: "يتم التوصيل خلال 24 إلى 72 ساعة حسب مدينتك. يتصل بك موصّلونا قبل المرور. يتم الدفع عند الاستلام.",
      },
      {
        q: "هل يمكنني الطلب كهدية؟",
        a: "بالتأكيد. تُسلَّم الوسادة في تغليف أنيق. تواصل معنا عبر واتساب لإضافة كلمة شخصية أو لأي طلب خاص.",
      },
    ],
    ctaTitle: "نم دون آلام منذ هذه الليلة",
  },
  mousse: {
    key: "mousse",
    submitProduct: "oreiller-memoire",
    slug: "oreiller-memoire-forme",
    tabLabel: "وسادة إسفنج ذاكرة الشكل",
    badge: "وسادة مريحة",
    name: "وسادة من إسفنج ذاكرة الشكل",
    subtitle:
      "إسفنج لزج عالي الكثافة، وغطاء مضاد للعث من الميكروفايبر الناعم. متوفرة بثلاث سماكات، لنوم على مقاسك.",
    ratingText: "4.8 / 5 — أكثر من 200 تقييم",
    productImage:
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937147/Oreiller_Simple_cmja5s.png",
    gallery: [
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-3_1_lydfvm.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-1_1_ln75yv.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-4_1_pspeqa.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093865/Poste-1-1-Memory-Foam-Pillow-5_1_mtysbd.jpg",
      "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-2_1_jhkk7z.jpg",
    ],
    sizes: [
      { label: "15 سم", price: 199 },
      { label: "17 سم", price: 229 },
      { label: "19 سم", price: 249 },
    ],
    trust: [
      { icon: Layers, label: "ذاكرة الشكل", desc: "تتكيّف مع بنية جسمك" },
      { icon: Wind, label: "قابلة للتنفس", desc: "راحة حرارية طوال الليل" },
      { icon: Shield, label: "مضادة للعث", desc: "مضادة للحساسية ومعتمدة" },
      { icon: Truck, label: "توصيل سريع", desc: "في جميع أنحاء المغرب" },
      { icon: RotateCcw, label: "إرجاع خلال 30 يوم", desc: "مضمون أو استرداد المبلغ" },
      { icon: Star, label: "4.8 / 5", desc: "بناءً على أكثر من 200 تقييم" },
    ],
    lifestyle: [
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-3_1_lydfvm.jpg",
        title: "الإسفنج الذي يتكيّف معك، لا العكس",
        text: "يتفاعل إسفنجنا اللزج بذاكرة الشكل مع حرارة جسمك ليحتضن تماماً شكل رأسك ورقبتك. يوزّع نقاط الضغط بشكل متساوٍ، مزيلاً مناطق التوتر التي تسبّب آلام الصباح.",
        imageLeft: true,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-1_1_ln75yv.jpg",
        title: "نوم أعمق، واستشفاء أمثل",
        text: "بإزالة عدم الراحة المرتبط بوضعية الرأس، تعزّز وسادتنا مراحل النوم العميق. تنام بسرعة أكبر، وتتحرك أقل أثناء الليل، وتستيقظ مرتاحاً حقاً، مستعداً ليومك.",
        imageLeft: false,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093864/Poste-1-1-Memory-Foam-Pillow-4_1_pspeqa.jpg",
        title: "متوفرة بعدة سماكات لراحتك",
        text: "لكل شخص تفضيلاته: البعض يحب وسادة طرية تحتضن الرأس، والبعض يفضّل دعماً أكثر ثباتاً. لهذا نوفّر عدة سماكات لتجد بالضبط ما تحتاجه.",
        imageLeft: true,
      },
      {
        image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783093865/Poste-1-1-Memory-Foam-Pillow-5_1_mtysbd.jpg",
        title: "ثلاث سماكات لدعم على مقاسك",
        text: "لكل بنية جسم احتياجاتها. وسادتنا متوفرة بثلاث سماكات — 15 سم و17 سم و19 سم — لتتكيّف مع وضعية نومك وعرض كتفيك. سماكة 15 سم مناسبة لمن ينام على ظهره، و17 سم توفّر توازناً متعدد الاستعمالات، و19 سم تمنح دعماً أعلى، مثالية للنوم على الجانب.",
        imageLeft: false,
      },
    ],
    comparison: [
      { feature: "إسفنج لزج عالي الكثافة", ours: true, classic: false },
      { feature: "يتكيّف مع حرارة الجسم", ours: true, classic: false },
      { feature: "اختيار السماكة (15 / 17 / 19 سم)", ours: true, classic: false },
      { feature: "مضاد للعث والحساسية", ours: true, classic: false },
      { feature: "غطاء قابل للغسل في الغسالة", ours: true, classic: true },
      { feature: "يستعيد شكله بعد الاستعمال", ours: true, classic: false },
      { feature: "ضمان 12 شهراً", ours: true, classic: false },
      { feature: "متوفر بثلاث سماكات", ours: true, classic: false },
    ],
    faq: [
      {
        q: "أي سماكة أختار؟",
        a: "إذا كنت تنام أساساً على جانبك، اختر سماكة 19 سم التي تحافظ على محاذاة الرقبة بشكل أفضل. إذا كنت تنام على ظهرك أو تغيّر وضعيتك كثيراً، فسماكة 15 أو 17 سم توفّر راحة أكثر احتضاناً. عند الشك، تناسب سماكة 17 سم غالبية النائمين.",
      },
      {
        q: "هل إسفنج ذاكرة الشكل حار؟",
        a: "إسفنجنا معالَج لتحسين دوران الهواء بداخله. مع الغطاء القابل للتنفس من الميكروفايبر، تبقى الوسادة بدرجة حرارة مريحة طوال الليل، دون تأثير الحرارة الذي قد تسبّبه بعض الوسائد الإسفنجية.",
      },
      {
        q: "هل تستعيد الوسادة شكلها بعد الضغط؟",
        a: "نعم. يستعيد الإسفنج اللزج عالي الكثافة (45 كغ/م³) شكله الأصلي في ثوانٍ بعد كل استعمال. يحافظ على هذه الخاصية على المدى الطويل، دون أن يهبط مثل الوسادة العادية.",
      },
      {
        q: "في كم من الوقت يتم التوصيل؟",
        a: "يتم التوصيل خلال 24 إلى 72 ساعة حسب مدينتك. يتصل بك موصّلونا قبل المرور. يتم الدفع عند الاستلام.",
      },
      {
        q: "هل يمكنني طلب غطاء إضافي؟",
        a: "نعم. تتوفر أغطية بديلة. تواصل معنا عبر واتساب لتقديم الطلب أو لأي سؤال حول ملحقاتنا.",
      },
    ],
    ctaTitle: "امنح نفسك نوماً بجودة عالية",
  },
};

function firstAvailable(sizes: Size[]): Size {
  return sizes.find((s) => !s.soldOut) ?? sizes[0];
}

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function OreillersPageAr() {
  const router = useRouter();
  const { addItem, clearCart } = useCart();

  const [variant, setVariant] = useState<VariantKey>("cervical");
  const data = VARIANTS[variant];

  const [activeImg, setActiveImg] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState(OFFERS[0]);
  const [chosenSizes, setChosenSizes] = useState<Size[]>([firstAvailable(VARIANTS.cervical.sizes)]);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

    const sizeSummary = chosenSizes.map((s) => s.label).join("، ");
    const orderNotes = `العرض: ${selectedOffer.label} | النماذج: ${sizeSummary} | المجموع: ${totalPrice} درهم`;
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

    const typeLabel = variant === "cervical" ? "Cervical" : "Mousse";
    await submitOrder({
      product: "oreiller-combo",
      orderId,
      customer: form,
      details: orderNotes,
      total: totalPrice,
      lang: "ar",
      fields: { offer: selectedOffer.label, variant: `${typeLabel} — ${sizeSummary}` },
    });

    router.push("/commande/confirmation");
  }

  return (
    <main dir="rtl" className="bg-white">
      {/* ── سلكتور نوع الوسادة ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pt-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md text-center">
          <p className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-primary">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
            </span>
            اختر نوع وسادتك
            <span className="animate-bounce">👇</span>
          </p>
          <div className="flex rounded-2xl border-2 border-primary bg-light-gray p-1 shadow-[0_0_0_4px_rgba(142,198,63,0.15)] ring-1 ring-primary/30 animate-attention">
            {(Object.keys(VARIANTS) as VariantKey[]).map((key) => {
              const v = VARIANTS[key];
              const active = key === variant;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => selectVariant(key)}
                  className={`flex-1 rounded-xl px-3 py-2.5 text-center text-xs font-semibold transition-all sm:text-sm ${
                    active ? "bg-primary text-white shadow" : "text-dark-gray hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {v.tabLabel}
                </button>
              );
            })}
          </div>
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
                  <Image src={src} alt={`صورة ${i + 1}`} fill className="object-cover" sizes="20vw" />
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
              <p className="mb-3 text-sm font-semibold text-dark-gray">اختر عرضك :</p>
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
                        className="flex w-full items-center justify-between px-4 py-3 text-start"
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
                              <span className="ms-2 rounded-full px-2.5 py-1 text-xs font-extrabold text-white shadow-sm" style={{ backgroundColor: "#8ec63f" }}>
                                {offer.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="text-base font-bold" style={{ color: "#8ec63f" }}>
                            {isSelected ? totalPrice : previewTotal} درهم
                          </span>
                          {offer.qty > 1 && (
                            <span className="ms-2 text-sm text-gray-400 line-through">
                              {isSelected ? baseTotal : previewOld} درهم
                            </span>
                          )}
                        </div>
                      </button>

                      {isSelected && data.sizes.length > 1 && (
                        <div className="flex flex-col gap-2 border-t border-primary/20 px-4 pb-4 pt-3">
                          {Array.from({ length: offer.qty }).map((_, slotIndex) => (
                            <div key={slotIndex} className="flex items-center gap-3">
                              <span className="w-16 flex-shrink-0 text-xs text-gray-500">
                                قطعة {slotIndex + 1}
                              </span>
                              <select
                                value={chosenSizes[slotIndex]?.label ?? defaultSize.label}
                                onChange={(e) => handleSizeChange(slotIndex, e.target.value)}
                                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-dark-gray focus:border-primary focus:outline-none"
                              >
                                {data.sizes.map((s) => (
                                  <option key={s.label} value={s.label} disabled={s.soldOut}>
                                    {s.label} — {s.price} درهم{s.soldOut ? " (نفذ من المخزون)" : ""}
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
                  disabled={submitting}
                  className="animate-shake mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70"
                >
                  <ShoppingCart size={18} />
                  {submitting ? "جارٍ المعالجة…" : `اطلب الآن — ${totalPrice} درهم`}
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
            لماذا تختار وسادتنا ؟
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-4 text-start font-semibold text-dark-gray">الميزة</th>
                  <th className="px-5 py-4 text-center font-semibold text-primary">Eco Plastique</th>
                  <th className="px-5 py-4 text-center font-semibold text-gray-400">عادية</th>
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
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray">الأسئلة الشائعة</h2>
        <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
          {data.faq.map((item, i) => (
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
          <h2 className="text-2xl font-bold text-white">{data.ctaTitle}</h2>
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
    </main>
  );
}
