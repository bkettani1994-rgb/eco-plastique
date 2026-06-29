import { HeroSlider } from "@/components/sections/hero-slider";
import { TrustLogos } from "@/components/sections/trust-logos";
import { FeaturedProducts } from "@/components/sections/featured-products";
import { HowItWorks } from "@/components/sections/how-it-works";
import { WhyChooseUs } from "@/components/sections/why-choose-us";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
import { Cta } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <HeroSlider />
      <TrustLogos />
      <FeaturedProducts />
      <HowItWorks />
      <WhyChooseUs />
      <Testimonials />
      <Faq />
      <Cta />
    </>
  );
}
