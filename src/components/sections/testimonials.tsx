"use client";

import { useRef, useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials as frTestimonials } from "@/data/site";
import { translations } from "@/lib/translations";
import { cn } from "@/lib/utils";

function getInitials(name: string): string {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export function Testimonials({ lang = "fr" }: { lang?: "fr" | "ar" }) {
  const isAr = lang === "ar";
  const testimonials = isAr ? translations.testimonials.items : frTestimonials;
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  function scrollTo(index: number) {
    const container = scrollRef.current;
    if (!container) return;
    const card = container.children[index] as HTMLElement;
    if (!card) return;
    container.scrollTo({ left: card.offsetLeft - 16, behavior: "smooth" });
    setActiveIndex(index);
  }

  function prev() {
    scrollTo(Math.max(0, activeIndex - 1));
  }

  function next() {
    scrollTo(Math.min(testimonials.length - 1, activeIndex + 1));
  }

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    function onScroll() {
      const cards = Array.from(container!.children) as HTMLElement[];
      const scrollLeft = container!.scrollLeft;
      let closest = 0;
      let minDist = Infinity;
      cards.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - scrollLeft - 16);
        if (dist < minDist) { minDist = dist; closest = i; }
      });
      setActiveIndex(closest);
    }
    container.addEventListener("scroll", onScroll, { passive: true });
    return () => container.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section dir={isAr ? "rtl" : undefined} className="bg-light-gray py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
            {isAr ? translations.testimonials.heading : "Avis de nos clients"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isAr ? translations.testimonials.subheading : "Ce que nos clients disent de nos produits"}
          </p>
        </div>

        <div className="relative">
          {/* Left arrow */}
          <button
            type="button"
            onClick={prev}
            disabled={activeIndex === 0}
            className="absolute -left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 disabled:opacity-30 sm:-left-6"
            aria-label="Précédent"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Cards */}
          <div
            ref={scrollRef}
            className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
          >
            {testimonials.map((testimonial) => (
              <div
                key={`${testimonial.name}-${testimonial.city}`}
                className="flex w-72 shrink-0 snap-start flex-col gap-4 rounded-2xl bg-white p-6 shadow-md"
              >
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={index < testimonial.rating ? "fill-primary text-primary" : "fill-gray-200 text-gray-200"}
                    />
                  ))}
                </div>
                <p className="text-sm leading-relaxed text-gray-600">&laquo; {testimonial.review} &raquo;</p>
                <div className="mt-auto flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                    {getInitials(testimonial.name)}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark-gray">{testimonial.name}</p>
                    <p className="text-xs text-gray-500">{testimonial.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right arrow */}
          <button
            type="button"
            onClick={next}
            disabled={activeIndex === testimonials.length - 1}
            className="absolute -right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition hover:bg-gray-100 disabled:opacity-30 sm:-right-6"
            aria-label="Suivant"
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Dots */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => scrollTo(i)}
              aria-label={`Avis ${i + 1}`}
              className={cn(
                "h-2 rounded-full transition-all",
                i === activeIndex ? "w-6 bg-primary" : "w-2 bg-gray-300"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
