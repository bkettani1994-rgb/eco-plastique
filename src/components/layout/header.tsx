"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// framer-motion removed from mobile drawer to avoid stacking context issues
import { Menu, X, ShoppingCart, MessageCircle } from "lucide-react";
import { navLinks, siteConfig, whatsappLink } from "@/data/site";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white">
      {/* ── Desktop ─────────────────────────────────────────────── */}
      <div className="mx-auto hidden max-w-7xl items-center justify-between px-4 py-4 sm:px-6 md:flex lg:px-8">
        <Link href="/" className="flex items-center">
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
              href={link.href}
              className="text-sm font-medium text-dark-gray transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
          >
            <MessageCircle size={18} />
            WhatsApp
          </Link>
          <Link
            href="/panier"
            aria-label="Panier"
            className="relative flex h-10 w-10 items-center justify-center rounded-xl text-dark-gray transition-colors hover:bg-light-gray"
          >
            <ShoppingCart size={20} />
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
              {itemCount}
            </span>
          </Link>
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
        <Link href="/" className="absolute left-1/2 -translate-x-1/2">
          <Image
            src="https://res.cloudinary.com/diptsoc4h/image/upload/v1782939698/EcoPlastique-logo_htt8s1.png"
            alt={siteConfig.businessName}
            width={110}
            height={36}
            priority
            className="h-8 w-auto object-contain"
          />
        </Link>

        {/* Right: cart */}
        <div className="flex items-center gap-2">
          <Link
            href="/panier"
            aria-label="Panier"
            className="relative flex h-9 w-9 items-center justify-center rounded-xl text-dark-gray"
          >
            <ShoppingCart size={20} />
            {itemCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-semibold text-white">
                {itemCount}
              </span>
            )}
          </Link>
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
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-dark-gray transition-colors hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/panier"
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 text-base font-medium text-dark-gray transition-colors hover:text-primary"
              >
                <ShoppingCart size={18} />
                Panier ({itemCount})
              </Link>
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
