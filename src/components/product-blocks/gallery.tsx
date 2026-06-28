import { ImagePlaceholder } from "@/components/ui/image-placeholder";
import { Product } from "@/data/products";

interface GalleryProps {
  product: Product;
}

export function Gallery({ product }: GalleryProps) {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray sm:text-3xl">
          Galerie photo
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {product.images.map((image, index) => (
            <ImagePlaceholder
              key={image}
              aspect="square"
              label={`${product.name} - photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
