import type { MetadataRoute } from "next";
import { products } from "@/data/products";

const baseUrl = "https://ecoplastique.ma";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: new Date() },
    { url: `${baseUrl}/produits`, lastModified: new Date() },
    { url: `${baseUrl}/a-propos`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((product) => ({
    url: `${baseUrl}/produits/${product.slug}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...productRoutes];
}
