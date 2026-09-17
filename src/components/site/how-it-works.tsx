"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ClipboardCheck,
  FileSignature,
  Wrench,
  LineChart,
  ArrowRight,
} from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const STAGES = [
  {
    step: "01",
    icon: ClipboardCheck,
    title: "Site assessment",
    description:
      "We visit your facility to understand footfall, water supply, power and placement options. You receive a clear recommendation on machine siting and expected demand.",
  },
  {
    step: "02",
    icon: FileSignature,
    title: "Institutional agreement",
    description:
      "We agree the hosting terms in writing — responsibilities, utilities, servicing commitments and commercial arrangements — so both sides know exactly what to expect.",
  },
  {
    step: "03",
    icon: Wrench,
    title: "Installation & commissioning",
    description:
      "Our team installs the machine, connects utilities, tests water quality and dispensing, and commissions the unit ready for public use.",
  },
  {
    step: "04",
    icon: LineChart,
    title: "Maintenance & monitoring",
    description:
      "Scheduled filter changes, sanitation and preventive maintenance keep the machine performing. We monitor performance and respond quickly to technical issues.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="How It Works"
          title="From first visit to flowing water in four stages"
          description="A simple, transparent process designed around institutional schedules and procurement requirements."
        />

        <div className="relative">
          {/* connecting line (desktop) */}
          <div
            className="hidden lg:block absolute top-[4.5rem] left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-teal-200 via-teal-400 to-teal-200"
            aria-hidden="true"
          />

          <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
            {STAGES.map((stage, i) => (
              <Reveal key={stage.step} delay={0.08 * i}>
                <li className="h-full">
                  <Card className="h-full border-border/80 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-5 md:p-6">
                      <div className="flex items-center justify-between">
                        <span className="relative inline-flex items-center justify-center h-14 w-14 rounded-full bg-accent text-teal-700 ring-4 ring-background">
                          <stage.icon className="h-6 w-6" aria-hidden="true" />
                        </span>
                        <span className="font-display text-4xl font-bold text-teal-600/20 select-none" aria-hidden="true">
                          {stage.step}
                        </span>
                      </div>
                      <h3 className="mt-5 text-lg font-semibold text-foreground">
                        {stage.title}
                      </h3>
                      <p className="mt-2 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
                        {stage.description}
                      </p>
                    </CardContent>
                  </Card>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>

        <Reveal delay={0.2}>
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <p className="text-muted-foreground text-sm md:text-base max-w-md">
              Ready to see whether your facility is a good fit?
            </p>
            <Button asChild size="lg" className="bg-water-cta text-white hover:opacity-90 shrink-0">
              <a href="#contact" data-interest="site-assessment">
                Book your site assessment
                <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
              </a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
