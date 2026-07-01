"use client";

import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { generalFaq } from "@/data/site";
import { useLang } from "@/lib/language-context";

export function Faq() {
  const { t, tr } = useLang();

  const faqItems = tr.faq.items;

  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
            {t("Questions fréquentes", tr.faq.heading)}
          </h2>
          <p className="mt-2 text-gray-600">
            {t("Tout ce que vous devez savoir avant de commander", tr.faq.subheading)}
          </p>
        </div>

        <Accordion type="single" collapsible className="rounded-2xl bg-light-gray px-6">
          {generalFaq.map((item, i) => {
            const arItem = faqItems[i];
            return (
              <AccordionItem key={item.question} value={item.question}>
                <AccordionTrigger>
                  {t(item.question, arItem?.question ?? item.question)}
                </AccordionTrigger>
                <AccordionContent>
                  {t(item.answer, arItem?.answer ?? item.answer)}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </section>
  );
}
