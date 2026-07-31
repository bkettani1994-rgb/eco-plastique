"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

const STORAGE_KEY = "eco-lang-choice";

// Pages FR qui possèdent une version arabe (/ar/...)
const AR_ENABLED = new Set([
  "/",
  "/produits",
  "/produits/nappe-pvc-sur-mesure",
  "/produits/protege-matelas-impermeable",
  "/produits/oreiller-cervical-medical",
  "/produits/oreiller-memoire-forme",
  "/produits/oreillers",
  "/a-propos",
  "/contact",
]);

export function LanguageGate() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Déjà choisi ? on n'affiche plus rien
    try {
      if (localStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }
    setOpen(true);
  }, []);

  const remember = (lang: "fr" | "ar") => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore */
    }
  };

  const isAr = pathname === "/ar" || pathname.startsWith("/ar/");
  const frBase = isAr ? pathname.replace(/^\/ar/, "") || "/" : pathname;

  const chooseFr = () => {
    remember("fr");
    setOpen(false);
    if (isAr) router.push(frBase);
  };

  const chooseAr = () => {
    remember("ar");
    setOpen(false);
    if (!isAr) {
      const target = AR_ENABLED.has(frBase)
        ? `/ar${frBase === "/" ? "" : frBase}`
        : "/ar";
      router.push(target);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl">
        <div className="mb-4 flex justify-center">
          <Image
            src="https://res.cloudinary.com/diptsoc4h/image/upload/v1782939698/EcoPlastique-logo_htt8s1.png"
            alt="Eco Plastique"
            width={150}
            height={45}
            className="h-auto w-[150px]"
          />
        </div>
        <h2 className="text-lg font-bold text-dark-gray">
          Choisissez votre langue
          <span className="mt-1 block text-base font-semibold" dir="rtl">
            اختر لغتك
          </span>
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Français ou العربية ?
        </p>
        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={chooseFr}
            className="w-full rounded-xl bg-primary px-4 py-3 text-base font-bold text-white transition-colors hover:bg-primary/90"
          >
            🇫🇷 Français
          </button>
          <button
            onClick={chooseAr}
            className="w-full rounded-xl border-2 border-primary px-4 py-3 text-base font-bold text-primary transition-colors hover:bg-primary/5"
            dir="rtl"
          >
            🇲🇦 العربية
          </button>
        </div>
      </div>
    </div>
  );
}
