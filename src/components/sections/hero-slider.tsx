"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { whatsappLink } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

interface Slide {
  title: string;
  subtitle: string;
  ctaLabel: string;
  ctaHref: string;
}

const slides: Slide[] = [
  {
    title: "Le confort et la protection pour votre maison",
    subtitle:
      "Découvrez nos solutions sur mesure pour protéger et améliorer votre quotidien.",
    ctaLabel: "Découvrir nos produits",
    ctaHref: "/produits",
  },
  ...products.map((product) => ({
    title: product.name,
    subtitle: product.shortDescription,
    ctaLabel: "Voir le produit",
    ctaHref: `/produits/${product.slug}`,
  })),
];

const SLIDE_DURATION = 3000;

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((current) => (current + 1) % slides.length);
    }, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, []);

  const slide = slides[index];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-primary/5">
      <div className="mx-auto grid min-h-[420px] max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 md:py-24 lg:px-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-3xl font-bold leading-tight text-dark-gray sm:text-4xl md:text-5xl">
              {slide.title}
            </h1>
            <p className="text-base leading-relaxed text-gray-600 sm:text-lg">
              {slide.subtitle}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
              >
                {slide.ctaLabel}
                <ArrowRight size={18} />
              </Link>
              <Link
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-primary px-6 py-3.5 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-white"
              >
                <MessageCircle size={18} />
                Commander sur WhatsApp
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5 }}
          >
            <ImagePlaceholder aspect="video" iconSize={48} label={slide.title} />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
        {slides.map((_, dotIndex) => (
          <button
            key={dotIndex}
            type="button"
            aria-label={`Aller à la diapositive ${dotIndex + 1}`}
            onClick={() => setIndex(dotIndex)}
            className={cn(
              "h-2 rounded-full transition-all",
              dotIndex === index ? "w-8 bg-primary" : "w-2 bg-primary/30",
            )}
          />
        ))}
      </div>
    </section>
  );
}
