"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FEATURES = [
  {
    id: "purification",
    title: "Purified on site",
    body: "Multi-stage treatment runs inside the unit, on a set service and sampling schedule.",
  },
  {
    id: "reusable",
    title: "Bring your own bottle",
    body: "Customers refill reusable containers at the machine. Fewer single-use plastics, no crates to store.",
  },
  {
    id: "payment",
    title: "Cashless or prepaid",
    body: "Where the host site supports it. No float to manage, no coins to collect.",
  },
  {
    id: "capacity",
    title: "Built for real traffic",
    body: "High-capacity units for lecture blocks, clinics, factories and public spaces.",
  },
  {
    id: "spillage",
    title: "Spillage under control",
    body: "Drip management keeps floors dry. In hospitals and retail that is not a nice-to-have.",
  },
  {
    id: "screen",
    title: "A screen that works",
    body: "The host institution's messaging comes first. Remaining slots can run approved advertising.",
  },
];

export function Vending() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-start">
          {/* Machine, the central visual */}
          <figure className="bg-mist rounded-2xl p-6 sm:p-10 flex justify-center lg:sticky lg:top-24">
            <img
              src="/images/machine-branded.webp"
              alt="Smart H₂O branded water-refill vending machine with PURE, SAFE, AFFORDABLE and SUSTAINABLE panel"
              width={760}
              height={1294}
              loading="lazy"
              sizes="(min-width: 1024px) 32vw, 70vw"
              srcSet="/images/machine-branded-480w.webp 480w, /images/machine-branded.webp 760w"
              className="w-[min(58vw,300px)] lg:w-auto max-w-[320px] max-h-[300px] sm:max-h-[420px] lg:max-h-[520px] h-auto object-contain"
            />
          </figure>

          {/* Features as accordion */}
          <Accordion type="single" collapsible defaultValue="purification" className="w-full">
            {FEATURES.map((f) => (
              <AccordionItem key={f.id} value={f.id} className="border-rule">
                <AccordionTrigger className="text-left text-[0.9375rem] font-semibold text-primary hover:text-accent hover:no-underline py-4">
                  {f.title}
                </AccordionTrigger>
                <AccordionContent className="text-[0.8125rem] leading-relaxed text-foreground/75 pb-5 max-w-[54ch]">
                  {f.body}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* More views, scroll-snap slider */}
        <div className="mt-14 md:mt-20">
          <p className="mono-label text-primary">More views</p>
          <div className="snap-slider mt-4 -mx-4 px-4 sm:mx-0 sm:px-0">
            <figure className="w-[62vw] sm:w-[260px] md:w-[300px] lg:w-[336px] shrink-0">
              <div className="bg-mist rounded-2xl aspect-[3/4] flex items-center justify-center p-6">
                <img
                  src="/images/machine-plain.webp"
                  alt="Unbranded Smart H₂O refill unit, front view"
                  width={760}
                  height={1513}
                  loading="lazy"
                  sizes="(min-width: 640px) 280px, 62vw"
                  srcSet="/images/machine-plain-480w.webp 480w, /images/machine-plain.webp 760w"
                  className="w-[72%] h-auto"
                />
              </div>
              <figcaption className="mono-label mt-2.5 text-steel">
                Plain unit
              </figcaption>
            </figure>
            <figure className="w-[62vw] sm:w-[260px] md:w-[300px] lg:w-[336px] shrink-0">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/images/machine-factory.webp"
                  alt="Branded Smart H₂O refill unit on the factory floor"
                  width={960}
                  height={1280}
                  loading="lazy"
                  sizes="(min-width: 640px) 280px, 62vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mono-label mt-2.5 text-steel">
                Factory floor
              </figcaption>
            </figure>
            <figure className="w-[62vw] sm:w-[260px] md:w-[300px] lg:w-[336px] shrink-0">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]">
                <img
                  src="/images/machine-factory-plain.webp"
                  alt="Unbranded Smart H₂O refill unit in production"
                  width={960}
                  height={1280}
                  loading="lazy"
                  sizes="(min-width: 640px) 280px, 62vw"
                  className="w-full h-full object-cover"
                />
              </div>
              <figcaption className="mono-label mt-2.5 text-steel">
                Before branding
              </figcaption>
            </figure>
            <Link
              href="/contact?interest=host-machine"
              className="w-[62vw] sm:w-[260px] md:w-[300px] lg:w-[336px] lg:flex-1 aspect-[3/4] lg:aspect-auto rounded-2xl bg-primary text-white flex flex-col justify-between p-6 hover:bg-foreground transition-colors"
            >
              <p className="text-xl md:text-2xl font-bold leading-tight">
                Want a machine at your facility?
              </p>
              <p className="text-sm font-semibold text-accent">
                Host a machine
              </p>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
