import { Star } from "lucide-react";
import { Product } from "@/data/products";

interface ProductTestimonialsProps {
  product: Product;
}

function getInitials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProductTestimonials({ product }: ProductTestimonialsProps) {
  if (!product.testimonials || product.testimonials.length === 0) {
    return null;
  }

  return (
    <section className="bg-light-gray py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray sm:text-3xl">
          Avis clients
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {product.testimonials.map((testimonial) => (
            <div
              key={`${testimonial.name}-${testimonial.city}`}
              className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-md"
            >
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < testimonial.rating
                        ? "fill-primary text-primary"
                        : "fill-gray-200 text-gray-200"
                    }
                  />
                ))}
              </div>
              <p className="text-sm leading-relaxed text-gray-600">
                &laquo; {testimonial.review} &raquo;
              </p>
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
