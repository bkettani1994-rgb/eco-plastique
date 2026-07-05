"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
// framer-motion removed from mobile drawer to avoid stacking context issues
import { Menu, X, MessageCircle } from "lucide-react";
import { navLinks, siteConfig, whatsappLink } from "@/data/site";

// Pages that have an Arabic version (FR base paths)
const AR_ENABLED = new Set([
  "/",
  "/produits",
  "/produits/nappe-pvc-sur-mesure",
  "/produits/protege-matelas-impermeable",
  "/produits/oreiller-cervical-medical",
  "/produits/oreiller-memoire-forme",
  "/a-propos",
  "/contact",
]);

export function useIsArabicPage(): boolean {
  const pathname = usePathname() || "/";
  return pathname === "/ar" || pathname.startsWith("/ar/");
}

// Keep the visitor in Arabic: map an FR href to its AR equivalent when one exists
export function localizeHref(href: string, isAr: boolean): string {
  if (!isAr) return href;
  if (AR_ENABLED.has(href)) return `/ar${href === "/" ? "" : href}`;
  return href;
}

function LanguageSwitch({ className = "" }: { className?: string }) {
  const pathname = usePathname() || "/";
  const isAr = pathname === "/ar" || pathname.startsWith("/ar/");
  const frBase = isAr ? pathname.replace(/^\/ar/, "") || "/" : pathname;

  // Only show the switch on pages that actually have an Arabic version
  if (!AR_ENABLED.has(frBase)) return null;

  const frHref = frBase;
  const arHref = `/ar${frBase === "/" ? "" : frBase}`;

  return (
    <div className={`flex items-center rounded-xl border border-gray-200 p-0.5 text-xs font-semibold ${className}`}>
      <Link
        href={frHref}
        className={`rounded-lg px-2.5 py-1.5 transition-colors ${
          !isAr ? "bg-primary text-white" : "text-dark-gray hover:text-primary"
        }`}
      >
        FR
      </Link>
      <Link
        href={arHref}
        className={`rounded-lg px-2.5 py-1.5 transition-colors ${
          isAr ? "bg-primary text-white" : "text-dark-gray hover:text-primary"
        }`}
      >
        AR
      </Link>
    </div>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const isAr = useIsArabicPage();
  const homeHref = isAr ? "/ar" : "/";

  return (
    <header className="w-full border-b border-gray-100 bg-white">
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:flex lg:px-8">
        <Link href={homeHref} className="flex items-center">
          <Image
            src="https://res.cloudinary.com/diptsoc4h/image/upload/v1782939698/EcoPlastique-logo_htt8s1.png"
            alt={siteConfig.businessName}
            width={160}
            height={50}
            priority
            className="h-10 w-auto object-contain"
          />
        </Link>

        <nav className="flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={localizeHref(link.href, isAr)}
              className="text-sm font-medium text-dark-gray transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitch />
        </div>
      </div>

      {/* ── Mobile top bar ──────────────────────────────────────── */}
      <div className="relative flex items-center justify-between bg-white px-4 py-3 md:hidden">
        {/* Left: hamburger */}
        <button
          type="button"
          aria-label="Ouvrir le menu"
          className="flex h-10 w-10 items-center justify-center rounded-xl text-dark-gray"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* Center: logo (absolute to stay truly centered) */}
        <Link href={homeHref} className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="https://res.cloudinary.com/diptsoc4h/image/upload/v1782939698/EcoPlastique-logo_htt8s1.png"
            alt={siteConfig.businessName}
            width={110}
            height={36}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Right: language */}
        <div className="flex items-center gap-2">
          <LanguageSwitch />
        </div>
      </div>

      {/* ── Mobile slide-in drawer ──────────────────────────────── */}
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999 }} className="md:hidden">
          {/* Backdrop */}
          <div
            style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.55)' }}
            onClick={() => setIsOpen(false)}
          />
          {/* Panel */}
          <div
            style={{
              position: 'absolute', top: 0, left: 0,
              width: '18rem', height: '100%',
              backgroundColor: '#ffffff',
              zIndex: 10,
              display: 'flex', flexDirection: 'column', gap: '1.5rem',
              padding: '1.5rem',
              boxShadow: '4px 0 24px rgba(0,0,0,0.18)',
              overflowY: 'auto',
            }}
          >
            <div className="flex items-center justify-between">
              <Image
                src="https://res.cloudinary.com/diptsoc4h/image/upload/v1782939698/EcoPlastique-logo_htt8s1.png"
                alt={siteConfig.businessName}
                width={110}
                height={36}
                className="h-8 w-auto object-contain"
              />
              <button
                type="button"
                aria-label="Fermer le menu"
                onClick={() => setIsOpen(false)}
                className="rounded-xl p-2 text-dark-gray hover:bg-light-gray"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={localizeHref(link.href, isAr)}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-dark-gray transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <Link
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark"
            >
              <MessageCircle size={18} />
              Commander sur WhatsApp
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
