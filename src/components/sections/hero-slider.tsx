"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";
import { products } from "@/data/products";
import { cn } from "@/lib/utils";

interface Slide {
  title: string;
  ctaLabel: string;
  ctaHref: string;
  image: string;
  mobileImage?: string;
}

const PRODUCT_IMAGES: Record<string, string> = {
  "protege-matelas-impermeable":
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937147/Protege-Matelas_tmrezb.png",
  "oreiller-cervical-medical":
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937215/Oreiller_cervicale_jpyife.png",
  "oreiller-memoire-forme":
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1782937147/Oreiller_Simple_cmja5s.png",
};

const PRODUCT_MOBILE_IMAGES: Record<string, string> = {
  "nappe-pvc-sur-mesure":
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1783008751/Oreiller_Medical_2_copy_gtlw8u.png",
  "protege-matelas-impermeable":
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1783008751/PROTEGE_MATELAS__erlqsp.png",
  "oreiller-cervical-medical":
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1783008751/Oreiller_Medical_2_bb5yb0.png",
  "oreiller-memoire-forme":
    "https://res.cloudinary.com/diptsoc4h/image/upload/v1783008751/Oreiller_Medical__lgn38h.png",
};

const slides: Slide[] = [
  {
    title: "Le confort et la protection pour votre maison",
    ctaLabel: "Découvrir nos produits",
    ctaHref: "/produits",
    image: "https://picsum.photos/seed/eco-plastique-brand/1600/700",
  },
  ...products.map((product) => ({
    title: product.name,
    ctaLabel: "Voir le produit",
    ctaHref: `/produits/${product.slug}`,
    image: PRODUCT_IMAGES[product.slug] ?? product.images[0],
    mobileImage: PRODUCT_MOBILE_IMAGES[product.slug],
  })),
];

const SLIDE_DURATION = 5000;

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
    <>
      {/* Desktop: 1920×720 ratio */}
      <section className="relative hidden w-full overflow-hidden sm:block" style={{ aspectRatio: "1920/720" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-contain"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          </motion.div>
        </AnimatePresence>

        <SlideContent slide={slide} index={index} />
        <SlideDots index={index} setIndex={setIndex} />
      </section>

      {/* Mobile: 1×1 square ratio */}
      <section className="relative block w-full overflow-hidden sm:hidden" style={{ aspectRatio: "1080/1270" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.mobileImage ?? slide.image}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10" />
          </motion.div>
        </AnimatePresence>

        <MobileSlideContent slide={slide} />
        <SlideDots index={index} setIndex={setIndex} />
      </section>
    </>
  );
}

function SlideContent({ slide, index }: { slide: Slide; index: number }) {
  return (
    <div className="relative z-10 flex h-full flex-col items-start justify-end px-4 pb-10 sm:px-6 sm:pb-16 md:pb-20 lg:px-12">
      <div className="mx-auto w-full max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.5 }}
            className="max-w-xl space-y-4"
          >
            <h1 className="text-xl font-bold leading-tight text-white sm:text-3xl md:text-4xl">
              {slide.title}
            </h1>
            <div className="flex flex-col gap-2 sm:flex-row sm:gap-3">
              <Link
                href={slide.ctaHref}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
              >
                {slide.ctaLabel}
                <ArrowRight size={16} />
              </Link>
              <Link
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl border-2 border-white px-5 py-3 text-sm font-medium text-white transition-all hover:bg-white hover:text-dark-gray"
              >
                <MessageCircle size={16} />
                Commander sur WhatsApp
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function MobileSlideContent({ slide }: { slide: Slide }) {
  return (
    <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
      <Link
        href={slide.ctaHref}
        className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-medium text-white shadow-md transition-all hover:bg-primary-dark hover:shadow-lg"
      >
        Voir le produit
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}

function SlideDots({
  index,
  setIndex,
}: {
  index: number;
  setIndex: (i: number) => void;
}) {
  return (
    <div className="absolute bottom-4 left-0 right-0 z-10 flex justify-center gap-2">
      {slides.map((_, dotIndex) => (
        <button
          key={dotIndex}
          type="button"
          aria-label={`Aller à la diapositive ${dotIndex + 1}`}
          onClick={() => setIndex(dotIndex)}
          className={cn(
            "h-2 rounded-full transition-all",
            dotIndex === index ? "w-8 bg-white" : "w-2 bg-white/40",
          )}
        />
      ))}
    </div>
  );
}
