"use client";

import { Star } from "lucide-react";
import { testimonials } from "@/data/site";

function getInitials(name: string): string {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export function Testimonials() {

  return (
    <section className="bg-light-gray py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
            Avis de nos clients
          </h2>
          <p className="mt-2 text-gray-600">
            Ce que nos clients disent de nos produits
          </p>
        </div>

        <div className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4">
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
      </div>
    </section>
  );
}
