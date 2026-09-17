"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  FlaskConical,
  RefreshCcw,
  CalendarCheck,
  Truck,
  Recycle,
  Waves,
} from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const POINTS = [
  {
    icon: FlaskConical,
    title: "Water-quality controls",
    description:
      "Machines purify through a multi-stage process, and water quality is checked as part of our routine control programme — so taste, clarity and consistency stay right.",
  },
  {
    icon: RefreshCcw,
    title: "Filter replacement & sanitation",
    description:
      "Filters and treatment media are replaced on schedule, and dispensing areas are sanitized regularly to keep every refill fresh and clean.",
  },
  {
    icon: CalendarCheck,
    title: "Preventive maintenance",
    description:
      "We service machines before problems appear. Planned visits cover filters, seals, dispensing components and general machine health.",
  },
  {
    icon: Truck,
    title: "Local technical response",
    description:
      "Our technical team is based in Windhoek. When a machine needs attention, a real technician responds — not a call centre an ocean away.",
  },
  {
    icon: Recycle,
    title: "Reusable-container benefits",
    description:
      "Every refill in a customer\u2019s own bottle is one fewer single-use plastic. Institutions cut plastic waste without sacrificing convenience.",
  },
  {
    icon: Waves,
    title: "Responsible RO reject handling",
    description:
      "Reverse-osmosis systems produce concentrate. We plan for responsible handling and disposal of RO reject water in line with good practice.",
  },
];

export function Quality() {
  return (
    <section id="quality" className="py-20 md:py-28 bg-muted/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Quality, Maintenance & Sustainability"
          title="Quality you can taste, service you can rely on"
          description="We speak plainly about what we deliver: purification, taste, convenience and quality control — backed by disciplined maintenance."
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Image column */}
          <Reveal className="lg:col-span-2 lg:sticky lg:top-28">
            <div className="rounded-2xl overflow-hidden shadow-lg border border-border">
              <img
                src="/images/refill.jpg"
                alt="A customer filling a reusable bottle at a Smart H₂O refill station"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className="mt-4 rounded-xl border border-teal-200 bg-accent/60 p-4 md:p-5">
              <p className="text-sm leading-relaxed text-foreground/80">
                <strong className="text-teal-800">Our promise is practical:</strong>{" "}
                purified water, quality control and dependable machines. We make no
                unverified health claims — we focus on what we can measure, maintain
                and stand behind.
              </p>
            </div>
          </Reveal>

          {/* Points list */}
          <div className="lg:col-span-3 space-y-4">
            {POINTS.map((point, i) => (
              <Reveal key={point.title} delay={0.05 * i}>
                <Card className="border-border/80 hover:border-teal-300 transition-colors">
                  <CardContent className="flex gap-4 p-5">
                    <div className="inline-flex shrink-0 items-center justify-center h-11 w-11 rounded-lg bg-accent text-teal-700">
                      <point.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <div>
                      <h3 className="text-base md:text-lg font-semibold text-foreground">
                        {point.title}
                      </h3>
                      <p className="mt-1.5 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
                        {point.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
