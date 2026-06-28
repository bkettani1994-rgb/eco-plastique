import { Hero } from "@/components/sections/hero";
import { Categories } from "@/components/sections/categories";
import { BestSeller } from "@/components/sections/best-seller";
import { HowItWorks } from "@/components/sections/how-it-works";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <BestSeller />
      <HowItWorks />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
