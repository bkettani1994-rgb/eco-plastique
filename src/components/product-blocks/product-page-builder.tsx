import { Product } from "@/data/products";
import { ProductHero } from "@/components/product-blocks/product-hero";
import { Gallery } from "@/components/product-blocks/gallery";
import { Features } from "@/components/product-blocks/features";
import { Benefits } from "@/components/product-blocks/benefits";
import { Specifications } from "@/components/product-blocks/specifications";
import { HowToUse } from "@/components/product-blocks/how-to-use";
import { ProductTestimonials } from "@/components/product-blocks/product-testimonials";
import { ProductFaq } from "@/components/product-blocks/product-faq";
import { WhatsappOrder } from "@/components/product-blocks/whatsapp-order";
import { ProductCta } from "@/components/product-blocks/product-cta";

interface ProductPageBuilderProps {
  product: Product;
}

export function ProductPageBuilder({ product }: ProductPageBuilderProps) {
  const { pageConfig } = product;

  return (
    <>
      {pageConfig.hero ? <ProductHero product={product} /> : null}
      {pageConfig.gallery ? <Gallery product={product} /> : null}
      {pageConfig.features ? <Features product={product} /> : null}
      {pageConfig.benefits ? <Benefits product={product} /> : null}
      {pageConfig.specifications ? <Specifications product={product} /> : null}
      {pageConfig.howToUse ? <HowToUse product={product} /> : null}
      {pageConfig.testimonials ? <ProductTestimonials product={product} /> : null}
      {pageConfig.faq ? <ProductFaq product={product} /> : null}
      {pageConfig.whatsapp ? (
        <div className="flex justify-center bg-white py-10">
          <WhatsappOrder product={product} />
        </div>
      ) : null}
      {pageConfig.cta ? <ProductCta product={product} /> : null}
    </>
  );
}
