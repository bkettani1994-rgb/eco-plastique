import { HeroSlider } from "@/components/sections/hero-slider";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <hr className="border-t-4 border-gray-200" />
      <FeaturedProducts />
      <WhyChooseUs />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
