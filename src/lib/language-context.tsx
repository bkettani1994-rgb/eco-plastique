"use client";

import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

type Lang = "fr" | "ar";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (fr: string, ar: string) => string;
  isAr: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  useEffect(() => {
    const root = document.documentElement;
    if (lang === "ar") {
      root.setAttribute("dir", "rtl");
      root.setAttribute("lang", "ar");
    } else {
      root.setAttribute("dir", "ltr");
      root.setAttribute("lang", "fr");
    }
  }, [lang]);

  const toggle = () => setLang((l) => (l === "fr" ? "ar" : "fr"));
  const t = (fr: string, ar: string) => (lang === "ar" ? ar : fr);
  const isAr = lang === "ar";

  return (
    <LanguageContext.Provider value={{ lang, toggle, t, isAr }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
