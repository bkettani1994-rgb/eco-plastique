"use client";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { generalFaq } from "@/data/site";
import { translations } from "@/lib/translations";

export function Faq({ lang = "fr" }: { lang?: "fr" | "ar" }) {
  const isAr = lang === "ar";
  const items = isAr
    ? translations.faq.items.map((it) => ({ question: it.question, answer: it.answer }))
    : generalFaq;

  return (
    <section dir={isAr ? "rtl" : undefined} className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
            {isAr ? translations.faq.heading : "Questions fréquentes"}
          </h2>
          <p className="mt-2 text-gray-600">
            {isAr ? translations.faq.subheading : "Tout ce que vous devez savoir avant de commander"}
          </p>
        </div>

        <Accordion type="single" collapsible className="rounded-2xl bg-light-gray px-6">
          {items.map((item) => (
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
