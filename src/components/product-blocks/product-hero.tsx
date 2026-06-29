import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { WhatsappOrder } from "@/components/product-blocks/whatsapp-order";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="bg-light-gray py-12 sm:py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:px-8">
        <div className="relative aspect-square overflow-hidden rounded-2xl shadow-md">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
            priority
          />
        </div>

        <div className="space-y-6">
          <Badge>{product.category}</Badge>
          <h1 className="text-3xl font-bold text-dark-gray sm:text-4xl">{product.name}</h1>
          <p className="text-gray-600 leading-relaxed">{product.shortDescription}</p>

          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-primary">{formatPrice(product.price)}</span>
            {product.oldPrice ? (
              <span className="text-lg text-gray-400 line-through">
                {formatPrice(product.oldPrice)}
              </span>
            ) : null}
          </div>

          <WhatsappOrder product={product} />
        </div>
      </div>
    </section>
  );
}
