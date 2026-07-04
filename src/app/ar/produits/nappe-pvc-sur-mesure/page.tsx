"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Globe,
} from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { generateOrderId, saveLastOrder } from "@/lib/order";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PRODUCT = {
  slug: "nappe-pvc-sur-mesure",
  name: "أغطية طاولة PVC حسب المقاس",
  price: 150,
  image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
};

const GALLERY = [
  "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
];

const SIZES: { label: string; price: number }[] = [
  { label: "مقاس مخصص", price: 150 },
];

const OFFERS = [
  { qty: 1, label: "قطعة واحدة", discount: 1,    badge: null,   popular: false },
  { qty: 2, label: "قطعتان",     discount: 0.95, badge: "−5%",  popular: true },
  { qty: 3, label: "3 قطع",      discount: 0.90, badge: "−10%", popular: false },
];

const TRUST_BADGES = [
  { icon: Droplets, label: "مقاومة للسوائل",  desc: "PVC عالي الجودة" },
  { icon: Sparkles, label: "سهلة التنظيف",     desc: "مسحة بالإسفنجة تكفي" },
  { icon: Shield,   label: "متينة",            desc: "حواف معززة" },
  { icon: Truck,    label: "توصيل سريع",       desc: "في جميع أنحاء المغرب" },
  { icon: RotateCcw,label: "قص حسب المقاس",    desc: "لكل أشكال الطاولات" },
  { icon: Star,     label: "4.8 / 5",          desc: "بناءً على تقييمات عملائنا" },
];

const LIFESTYLE_BLOCKS = [
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    title: "قص حسب أبعاد طاولتك بالضبط",
    text: "تُقصّ أغطيتنا من PVC حسب الأبعاد الدقيقة لطاولتك، سواء كانت مستديرة أو مربعة أو بيضاوية أو مستطيلة. حماية تناسب طاولتك تماماً دون فائض ولا نقص.",
    imageLeft: true,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    title: "حماية يومية ضد البقع والماء",
    text: "مصنوعة من PVC سميك وعالي الجودة، تحمي طاولتك بشكل دائم من البقع والماء والزيت وحرارة الأطباق، مع بقائها ناعمة الملمس.",
    imageLeft: false,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    title: "تشكيلة واسعة من النقوش والألوان",
    text: "متوفرة بمجموعة كبيرة من النقوش والألوان لتنسجم مع ديكور منزلك الداخلي. أناقة وعملية في آنٍ واحد.",
    imageLeft: true,
  },
  {
    image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1783071866/Nappe_ym7cqj.png",
    title: "تنظيف في ثوانٍ",
    text: "سطح أملس يُمسح في ثوانٍ بمجرد مسحة بالإسفنجة. لا حاجة للغسيل، نظافة يومية بأقل جهد.",
    imageLeft: false,
  },
];

const COMPARISON = [
  { feature: "قص حسب المقاس (كل الأشكال)",  ours: true,  classic: false },
  { feature: "PVC سميك مقاوم للبقع",        ours: true,  classic: false },
  { feature: "سطح يُمسح في ثوانٍ",           ours: true,  classic: true  },
  { feature: "حواف معززة ضد التفتت",         ours: true,  classic: false },
  { feature: "تشكيلة نقوش وألوان",           ours: true,  classic: false },
  { feature: "مقاوم للتلامس العرضي مع الحرارة", ours: true, classic: false },
  { feature: "ضمان 12 شهراً",              ours: true,  classic: false },
  { feature: "صناعة مغربية",               ours: true,  classic: false },
];

const FAQ_ITEMS = [
  {
    q: "كيف أقيس أبعاد طاولتي؟",
    a: "قس الطول والعرض بشريط القياس، مع إضافة بضعة سنتيمترات على كل جانب إذا رغبت في تدلٍّ جانبي.",
  },
  {
    q: "هل الغطاء مقاوم للحرارة؟",
    a: "نعم، يتحمّل PVC التلامس العرضي مع الأطباق الدافئة، لكن ننصح باستخدام حامل طبق للأطباق الساخنة جداً للحفاظ على الغطاء على المدى الطويل.",
  },
  {
    q: "هل يمكنني اختيار نقش مخصّص؟",
    a: "نعم، تواصل معنا عبر واتساب لاستعراض كتالوج النقوش والألوان الكامل والحصول على نصائح مخصّصة.",
  },
  {
    q: "كم تستغرق مدة استلام غطائي حسب المقاس؟",
    a: "مدة التصنيع والتوصيل عادة من 2 إلى 5 أيام عمل حسب مدينتك.",
  },
];

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function NappePvcPageAr() {
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

    const sizeSummary = chosenSizes.map((s) => s.label).join("، ");
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
      customer: { ...form, notes: `العرض: ${selectedOffer.label} | المقاس: ${sizeSummary} | المجموع: ${totalPrice} درهم` },
      total: totalPrice,
      createdAt: new Date().toISOString(),
    });

    router.push("/commande/confirmation");
  }

  return (
    <main dir="rtl" className="bg-white">
      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Language switch */}
        <div className="mb-6 flex justify-start">
          <Link
            href="/produits/nappe-pvc-sur-mesure"
            className="inline-flex items-center gap-2 rounded-full border border-gray-200 px-4 py-2 text-sm font-medium text-dark-gray transition-colors hover:border-primary hover:text-primary"
          >
            <Globe size={16} />
            Français
          </Link>
        </div>

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
                    <Image src={src} alt={`صورة ${i + 1}`} fill className="object-cover" sizes="20vw" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info + form */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                أغطية الطاولة
              </span>
              <h1 className="mt-2 text-3xl font-bold text-dark-gray">
                أغطية طاولة PVC حسب المقاس
              </h1>
              <p className="mt-3 leading-relaxed text-gray-500">
                احمِ طاولتك بأناقة مع غطاء PVC حسب المقاس، سهل التنظيف ومتين للاستخدام اليومي.
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
              <p className="mb-3 text-sm font-semibold text-dark-gray">اختر عرضك :</p>
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
                        className="flex w-full items-center justify-between px-4 py-3 text-start"
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
                              <span className="ms-2 rounded-full px-2.5 py-1 text-xs font-extrabold text-white shadow-sm" style={{ backgroundColor: "#f97316" }}>
                                {offer.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-end">
                          <span className="text-base font-bold" style={{ color: "#f97316" }}>
                            {isSelected ? totalPrice : previewTotal} درهم
                          </span>
                          {offer.qty > 1 && (
                            <span className="ms-2 text-sm text-gray-400 line-through">
                              {isSelected ? baseTotal : previewOld} درهم
                            </span>
                          )}
                        </div>
                      </button>

                      {isSelected && SIZES.length > 1 && (
                        <div className="flex flex-col gap-2 border-t border-primary/20 px-4 pb-4 pt-3">
                          {Array.from({ length: offer.qty }).map((_, slotIndex) => (
                            <div key={slotIndex} className="flex items-center gap-3">
                              <span className="w-16 flex-shrink-0 text-xs text-gray-500">
                                قطعة {slotIndex + 1}
                              </span>
                              <select
                                value={chosenSizes[slotIndex]?.label ?? SIZES[0].label}
                                onChange={(e) => handleSizeChange(slotIndex, e.target.value)}
                                className="min-w-0 flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-dark-gray focus:border-primary focus:outline-none"
                              >
                                {SIZES.map((s) => (
                                  <option key={s.label} value={s.label}>
                                    {s.label} — {s.price} درهم
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
                <p className="font-semibold text-dark-gray">معلومات التوصيل</p>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    placeholder="الاسم الكامل"
                    value={form.fullName}
                    onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                  />
                  <input
                    required
                    type="tel"
                    placeholder="الهاتف (06…)"
                    value={form.phone}
                    onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                    className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                  />
                </div>
                <input
                  required
                  placeholder="المدينة"
                  value={form.city}
                  onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                />
                <input
                  required
                  placeholder="عنوان التوصيل"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-orange-400 focus:outline-none"
                />
                <div className="flex items-center justify-between rounded-xl px-4 py-3" style={{ backgroundColor: "#fff7ed" }}>
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
              <p className="leading-relaxed text-gray-500">{block.text}</p>
            </div>
          </div>
        ))}
      </section>

      {/* ── 4. COMPARISON TABLE ─────────────────────────────────────── */}
      <section className="bg-light-gray py-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray">
            لماذا تختار منتجنا ؟
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-4 text-start font-semibold text-dark-gray">الميزة</th>
                  <th className="px-5 py-4 text-center font-semibold text-primary">Eco Plastique</th>
                  <th className="px-5 py-4 text-center font-semibold text-gray-400">عادي</th>
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
            احمِ طاولتك بأناقة
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
    </main>
  );
}
