import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { generalFaq } from "@/data/site";

export function Faq() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-dark-gray sm:text-3xl">
            Questions fréquentes
          </h2>
          <p className="mt-2 text-gray-600">Tout ce que vous devez savoir avant de commander</p>
        </div>

        <Accordion type="single" collapsible className="rounded-2xl bg-light-gray px-6">
          {generalFaq.map((item) => (
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
