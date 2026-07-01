"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, MessageCircle } from "lucide-react";
import { navLinks, siteConfig, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";
import { useCart } from "@/lib/cart-context";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { itemCount } = useCart();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
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

        <nav className="hidden items-center gap-8 md:flex">
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

        <div className="hidden items-center gap-4 md:flex">
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

        <button
          type="button"
          aria-label="Ouvrir le menu"
          className="flex items-center justify-center rounded-xl p-2 text-dark-gray md:hidden"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={26} />
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-black/40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={cn(
                "absolute right-0 top-0 flex h-full w-72 flex-col gap-6 bg-white p-6 shadow-lg",
              )}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="flex items-center justify-between">
                <Image
                  src="https://res.cloudinary.com/diptsoc4h/image/upload/v1782939698/EcoPlastique-logo_htt8s1.png"
                  alt={siteConfig.businessName}
                  width={130}
                  height={40}
                  className="h-8 w-auto object-contain"
                />
                <button
                  type="button"
                  aria-label="Fermer le menu"
                  onClick={() => setIsOpen(false)}
                  className="rounded-xl p-2 text-dark-gray hover:bg-light-gray"
                >
                  <X size={24} />
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
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
