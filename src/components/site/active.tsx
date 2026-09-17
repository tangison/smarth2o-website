"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Dumbbell, ShoppingBag, Coffee, Snowflake } from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";
import { SITE } from "@/lib/site";

const FUTURE = [
  { icon: ShoppingBag, label: "Smart H₂O Apparel" },
  { icon: Coffee, label: "The Café" },
  { icon: Snowflake, label: "Clear Ice" },
  { icon: Dumbbell, label: "Active Gym" },
];

export function Active() {
  return (
    <section id="active" className="py-20 md:py-28 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Smart H₂O Active"
          title="Hydrate. Perform. Recover."
          description="A focused range of reusable bottles and hydration accessories that complements every Smart H₂O refill point."
        />

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          {/* Product range */}
          <Reveal>
            <div className="relative rounded-2xl overflow-hidden h-full min-h-[22rem] shadow-lg group">
              <img
                src="/images/active-bottles.png"
                alt="Reusable Smart H₂O Active sport bottles and hydration accessories with condensation droplets"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-teal-950/80 via-teal-950/20 to-transparent"
                aria-hidden="true"
              />
              <div className="relative h-full flex flex-col justify-end p-6 md:p-8">
                <p className="text-teal-200 text-sm font-semibold uppercase tracking-widest">
                  Current range
                </p>
                <h3 className="mt-1 text-2xl md:text-3xl font-bold text-white">
                  Bottles &amp; hydration accessories
                </h3>
                <p className="mt-2 max-w-md text-sm md:text-base leading-relaxed text-teal-50/85">
                  Durable, refill-ready bottles and accessories for students,
                  professionals and athletes — designed to pair with Smart H₂O
                  refill points at your institution.
                </p>
                <div className="mt-5">
                  <Button
                    asChild
                    size="lg"
                    className="bg-white text-teal-800 hover:bg-teal-50"
                  >
                    <a href="#contact" data-interest="smart-h2o-active">
                      Enquire about Active products
                      <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Gym visual + future expansion */}
          <div className="grid gap-6">
            <Reveal delay={0.08}>
              <div className="relative rounded-2xl overflow-hidden h-64 md:h-72 shadow-lg group">
                <img
                  src="/images/active-gym.png"
                  alt="Athlete drinking water from a reusable bottle after a gym session"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-r from-teal-950/70 via-transparent to-transparent"
                  aria-hidden="true"
                />
                <div className="relative h-full flex flex-col justify-center p-6 md:p-8">
                  <p className="font-display text-2xl md:text-3xl font-bold text-white leading-tight">
                    {SITE.tagline}
                  </p>
                  <p className="mt-2 text-sm text-teal-50/85 max-w-xs">
                    Hydration that keeps up with training, work and everything in between.
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="rounded-2xl border border-dashed border-teal-300/70 bg-accent/40 p-6">
                <p className="text-sm font-semibold uppercase tracking-widest text-teal-700">
                  On the roadmap
                </p>
                <p className="mt-2 text-sm md:text-[0.95rem] text-muted-foreground leading-relaxed">
                  Smart H₂O Active is growing step by step. These offerings are
                  planned as future expansion — so the core vending-machine offer
                  stays clear.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {FUTURE.map((item) => (
                    <Badge
                      key={item.label}
                      variant="outline"
                      className="gap-1.5 border-teal-300/60 bg-white/60 text-teal-800 px-3 py-1.5"
                    >
                      <item.icon className="h-3.5 w-3.5" aria-hidden="true" />
                      {item.label}
                    </Badge>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
