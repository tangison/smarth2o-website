"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Droplets,
  Recycle,
  CreditCard,
  Factory,
  ShieldCheck,
  MonitorPlay,
  ArrowRight,
} from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const FEATURES = [
  {
    icon: Droplets,
    title: "Purified refill water",
    description:
      "Every machine purifies water on-site through a multi-stage treatment process, so customers enjoy clean, great-tasting refill water at the point of use.",
  },
  {
    icon: Recycle,
    title: "Reusable containers",
    description:
      "Customers refill their own reusable bottles and containers. That means fewer single-use plastics on campus, in wards and around the workplace.",
  },
  {
    icon: CreditCard,
    title: "Cashless or prepaid access",
    description:
      "Where available, machines accept cashless or prepaid payment, making hydration simple and secure for institutions and their visitors.",
  },
  {
    icon: Factory,
    title: "High-capacity machines",
    description:
      "Built for institutional demand. Our machines are specified to keep up with busy lecture blocks, clinics, factories and public spaces.",
  },
  {
    icon: ShieldCheck,
    title: "Spillage control",
    description:
      "Thoughtful dispensing design and drip management keep floors dry and safe — important in hospitals, offices and retail environments.",
  },
  {
    icon: MonitorPlay,
    title: "Display-screen advertising",
    description:
      "Machines carry a display screen that can show institutional messaging or vetted advertising, turning a utility into a communication asset.",
  },
];

export function Vending() {
  return (
    <section id="solutions" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Water Vending Solutions"
          title="Purified water, dispensed smart"
          description="Smart H₂O machines combine purification, capacity and control in one unit — designed for institutions that need reliable hydration at scale."
        />

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Machine showcase */}
          <Reveal className="lg:col-span-2 lg:sticky lg:top-28">
            <div className="relative rounded-2xl bg-gradient-to-b from-accent to-muted p-6 border border-border">
              <img
                src="/images/machine-studio.png"
                alt="Smart H₂O institutional water vending machine with digital display and dispensing station"
                className="w-full h-auto rounded-xl shadow-lg"
              />
              <div className="mt-5 text-center">
                <p className="text-sm font-semibold text-foreground">
                  Institutional refill unit
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                  Installed, serviced and monitored by Smart H₂O
                </p>
              </div>
            </div>
          </Reveal>

          {/* Feature grid */}
          <div className="lg:col-span-3 grid sm:grid-cols-2 gap-4 md:gap-5">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={0.05 * i}>
                <Card className="h-full border-border/80 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                  <CardContent className="p-5 md:p-6">
                    <div className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-accent text-teal-700 mb-4">
                      <feature.icon className="h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base md:text-lg font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}

            <Reveal delay={0.3} className="sm:col-span-2">
              <div className="rounded-xl bg-water-cta p-6 md:p-8 text-white flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold">
                    Want a machine at your facility?
                  </h3>
                  <p className="mt-2 text-white/85 text-sm md:text-base leading-relaxed">
                    We assess your site, agree the terms, and handle everything from
                    installation to ongoing maintenance.
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  variant="secondary"
                  className="bg-white text-teal-800 hover:bg-teal-50 shrink-0"
                >
                  <a href="#contact" data-interest="host-machine">
                    Get started
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
