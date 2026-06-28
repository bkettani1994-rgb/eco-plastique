import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProductBySlug, products } from "@/data/products";
import { ProductPageBuilder } from "@/components/product-blocks/product-page-builder";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: product.seoTitle,
    description: product.seoDescription,
    openGraph: {
      title: product.seoTitle,
      description: product.seoDescription,
      type: "website",
      siteName: "Eco Plastique",
      locale: "fr_MA",
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    sku: product.id,
    image: product.images,
    offers: {
      "@type": "Offer",
      price: product.price.toString(),
      priceCurrency: "MAD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductPageBuilder product={product} />
    </>
  );
}
