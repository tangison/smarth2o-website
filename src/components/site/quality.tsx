"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TOPICS = [
  {
    id: "water-quality",
    title: "Water quality",
    body: "Treatment runs inside the machine and is checked on a service schedule: purification, taste and quality control. We make no health claims.",
  },
  {
    id: "servicing",
    title: "Filters, sanitation, maintenance",
    body: "Replacement and sanitation happen on a preventive schedule, not when something breaks. Machines are monitored and visited, and small issues get corrected before they become outages.",
  },
  {
    id: "local-response",
    title: "Local technical response",
    body: "Windhoek is our initial market. The technicians live here, so response does not wait on a flight.",
  },
  {
    id: "sustainability",
    title: "Sustainability",
    body: "Every refill replaces a single-use bottle. Over a term or a work year, that is a lot of plastic never bought. Reverse-osmosis reject water is handled responsibly, in line with the site's arrangements.",
  },
];

export function Quality() {
  return (
    <section id="quality" className="bg-mist border-y border-rule">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-10 lg:gap-16 items-start">
          <div>
            <h2 className="text-3xl md:text-[2.4rem] leading-[1.12] font-bold tracking-[-0.01em] text-primary">
              Quality, kept
              <br className="hidden sm:block" /> between&nbsp;visits.
            </h2>
            <p className="mt-4 max-w-[44ch] text-[0.9375rem] leading-relaxed text-foreground/75">
              A refill point only works while the water is good and the
              machine is running. This is how we hold that&nbsp;line.
            </p>
            <figure className="mt-8 hidden lg:block">
              <div className="rounded-lg overflow-hidden">
                <img
                  src="/images/refill-nozzle.webp"
                  alt="Water streaming from the Smart H₂O refill nozzle into a reusable bottle"
                  width={560}
                  height={699}
                  loading="lazy"
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  className="w-full h-auto"
                />
              </div>
              <figcaption className="mono-label mt-2.5 text-steel">
                Refill point, up close
              </figcaption>
            </figure>
          </div>

          <Accordion type="single" collapsible defaultValue="water-quality" className="w-full">
            {TOPICS.map((t) => (
              <AccordionItem key={t.id} value={t.id} className="border-rule">
                <AccordionTrigger className="text-left text-[0.9375rem] font-semibold text-primary hover:text-accent hover:no-underline py-4">
                  {t.title}
                </AccordionTrigger>
                <AccordionContent className="text-[0.8125rem] leading-relaxed text-foreground/75 pb-5 max-w-[54ch]">
                  {t.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
