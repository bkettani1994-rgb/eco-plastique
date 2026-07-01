"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Product } from "@/data/products";
import { useLang } from "@/lib/language-context";

interface ProductFaqProps {
  product: Product;
}

export function ProductFaq({ product }: ProductFaqProps) {
  const { t, tr, isAr } = useLang();

  const faqItems = isAr && product.faqAr ? product.faqAr : product.faq;

  if (faqItems.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-8 text-center text-2xl font-bold text-dark-gray sm:text-3xl">
          {t("Questions fréquentes", tr.product_blocks.faq)}
        </h2>
        <Accordion type="single" collapsible className="rounded-2xl bg-light-gray px-6">
          {faqItems.map((item) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
