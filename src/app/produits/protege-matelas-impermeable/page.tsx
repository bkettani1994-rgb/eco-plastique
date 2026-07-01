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
import { useLang } from "@/lib/language-context";

/* ─── DATA ─────────────────────────────────────────────────────────── */

const PRODUCT = {
  slug: "protege-matelas-impermeable",
  name: "Protège-matelas imperméable",
  price: 229,
  image: "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937147/Protege-Matelas_tmrezb.png",
};

const HERO_IMAGE = "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937765/004_1_ygeg4d.jpg";

const GALLERY = [HERO_IMAGE, HERO_IMAGE, HERO_IMAGE, HERO_IMAGE, HERO_IMAGE];

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

const OFFERS_FR = [
  { qty: 1, label: "1 pièce",  discount: 1,    badge: null },
  { qty: 2, label: "2 pièces", discount: 0.95, badge: "−5%" },
  { qty: 3, label: "3 pièces", discount: 0.90, badge: "−10%" },
];

const OFFERS_AR = [
  { qty: 1, label: "قطعة واحدة",  discount: 1,    badge: null },
  { qty: 2, label: "قطعتان",      discount: 0.95, badge: "−5%" },
  { qty: 3, label: "3 قطع",       discount: 0.90, badge: "−10%" },
];

const TRUST_ICONS = [Droplets, Wind, Shield, Truck, RotateCcw, Star];

const COMPARISON_OURS = [true, true, true, true, true, true, true, true];
const COMPARISON_CLASSIC = [false, false, false, false, true, true, false, false];

/* ─── PAGE ──────────────────────────────────────────────────────────── */

export default function ProtegeMatelasPage() {
  const router = useRouter();
  const { addItem, clearCart } = useCart();
  const { t, tr, isAr } = useLang();
  const pm = tr.pm;

  const OFFERS = isAr ? OFFERS_AR : OFFERS_FR;

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
      customer: { ...form, notes: `${isAr ? "الأحجام" : "Tailles"} : ${sizeSummary}` },
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
                  <Image src={src} alt={`${i + 1}`} fill className="object-cover" sizes="20vw" />
                </button>
              ))}
            </div>
          </div>

          {/* Info + form */}
          <div className="flex flex-col gap-6">
            <div>
              <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
                {pm.category_badge}
              </span>
              <h1 className="mt-2 text-3xl font-bold text-dark-gray">
                {pm.title}
              </h1>
              <p className="mt-3 text-gray-500 leading-relaxed">
                {pm.subtitle}
              </p>
              <div className="mt-3 flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={16} className="fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-gray-500">4.8 / 5 — 240+ {pm.reviews}</span>
              </div>
            </div>

            {/* Quantity offers */}
            <div>
              <p className="mb-2 text-sm font-semibold text-dark-gray">{pm.choose_offer}</p>
              <div className="flex flex-col gap-3">
                {OFFERS.map((offer) => {
                  const isSelected = selectedOffer.qty === offer.qty;
                  const previewBase = isSelected ? baseTotal : SIZES[0].price * offer.qty;
                  const previewTotal = Math.round(previewBase * offer.discount);
                  const previewOld = Math.round(previewBase);

                  return (
                    <div
                      key={offer.qty}
                      className={`rounded-xl border-2 transition-all ${
                        isSelected ? "border-primary bg-primary/5" : "border-gray-200"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => handleOfferChange(offer)}
                        className="flex w-full items-center justify-between px-4 py-3 text-left"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full border-2 ${
                              isSelected ? "border-primary bg-primary" : "border-gray-300"
                            }`}
                          >
                            {isSelected && <Check size={11} className="text-white" />}
                          </div>
                          <div>
                            <span className="font-semibold text-dark-gray">{offer.label}</span>
                            {offer.badge && (
                              <span className="ml-2 rounded-full bg-primary px-2 py-0.5 text-xs font-bold text-white">
                                {offer.badge}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold text-primary">
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
                              <span className="w-20 flex-shrink-0 text-xs text-gray-500">
                                {pm.slot_label} {slotIndex + 1}
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
            </div>

            {/* Order form */}
            <form onSubmit={handleOrder} className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-light-gray p-5">
              <p className="font-semibold text-dark-gray">{pm.delivery_info}</p>
              <div className="grid gap-3 sm:grid-cols-2">
                <input
                  required
                  placeholder={pm.placeholder_name}
                  value={form.fullName}
                  onChange={(e) => setForm((f) => ({ ...f, fullName: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                />
                <input
                  required
                  type="tel"
                  placeholder={pm.placeholder_phone}
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
                />
              </div>
              <input
                required
                placeholder={pm.placeholder_city}
                value={form.city}
                onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
              />
              <input
                required
                placeholder={pm.placeholder_address}
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-dark-gray focus:border-primary focus:outline-none"
              />
              <button
                type="submit"
                disabled={submitting}
                className="mt-1 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg disabled:opacity-70"
              >
                <ShoppingCart size={18} />
                {submitting ? pm.submitting : `${pm.order_btn} ${totalPrice} MAD`}
              </button>
              <p className="text-center text-xs text-gray-400">{pm.cod_note}</p>
            </form>
          </div>
        </div>
      </section>

      {/* ── 2. TRUST BADGES ─────────────────────────────────────────── */}
      <section className="border-y border-gray-100 bg-light-gray py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {pm.trust_badges.map(({ label, desc }, idx) => {
              const Icon = TRUST_ICONS[idx];
              return (
                <div key={label} className="flex flex-col items-center gap-2 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Icon size={22} className="text-primary" />
                  </div>
                  <p className="text-sm font-semibold text-dark-gray">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. LIFESTYLE BLOCKS ─────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl space-y-20 px-4 py-20 sm:px-6 lg:px-8">
        {pm.lifestyle.map((block, i) => (
          <div
            key={i}
            className={`flex flex-col items-center gap-10 lg:flex-row ${
              i % 2 === 0 ? "" : "lg:flex-row-reverse"
            }`}
          >
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl lg:w-1/2">
              <Image
                src={`https://picsum.photos/seed/pm-block-${i + 1}/900/700`}
                alt={block.title}
                fill
                sizes="(max-width:1024px) 100vw, 50vw"
                className="object-cover"
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
            {pm.comparison_title}
          </h2>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="px-5 py-4 text-left font-semibold text-dark-gray">{pm.comparison_col_feature}</th>
                  <th className="px-5 py-4 text-center font-semibold text-primary">{pm.comparison_col_ours}</th>
                  <th className="px-5 py-4 text-center font-semibold text-gray-400">{pm.comparison_col_classic}</th>
                </tr>
              </thead>
              <tbody>
                {pm.comparison.map(({ feature }, i) => (
                  <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="px-5 py-3.5 text-gray-600">{feature}</td>
                    <td className="px-5 py-3.5 text-center">
                      {COMPARISON_OURS[i] ? (
                        <Check size={18} className="mx-auto text-primary" />
                      ) : (
                        <span className="text-gray-300">—</span>
                      )}
                    </td>
                    <td className="px-5 py-3.5 text-center">
                      {COMPARISON_CLASSIC[i] ? (
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
          {pm.faq_title}
        </h2>
        <div className="flex flex-col divide-y divide-gray-100 rounded-2xl border border-gray-100 bg-white shadow-sm">
          {pm.faq.map((item, i) => (
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
          <h2 className="text-2xl font-bold text-white">{pm.cta_title}</h2>
          <p className="mt-2 text-white/80">{pm.cta_sub}</p>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-8 py-3.5 text-sm font-semibold text-primary shadow-md transition-all hover:bg-gray-50 hover:shadow-lg"
          >
            <ShoppingCart size={18} />
            {pm.cta_btn}
          </button>
        </div>
      </section>
    </main>
  );
}
