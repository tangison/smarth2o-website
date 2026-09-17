"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  GraduationCap,
  Stethoscope,
  Landmark,
  ShoppingBag,
  Dumbbell,
  Building2,
  MapPin,
  Droplets,
  Zap,
  Wrench,
  BadgeCheck,
  Headset,
  ArrowRight,
} from "lucide-react";
import { Reveal, SectionHeading } from "./reveal";

const IMAGE_CARDS = [
  {
    image: "/images/campus.png",
    alt: "University students with reusable water bottles walking on a sunny campus",
    icon: GraduationCap,
    title: "Universities & Colleges",
    description:
      "Keep lecture halls, residences and libraries hydrated between classes. Students refill reusable bottles between lectures — affordable for them, manageable for the institution.",
    points: ["High-traffic refills between classes", "Student-friendly pricing", "Reusable-bottle culture on campus"],
  },
  {
    image: "/images/hospital.png",
    alt: "Bright hospital waiting area with a Smart H₂O refill station against the wall",
    icon: Stethoscope,
    title: "Hospitals & Clinics",
    description:
      "Reliable hydration for patients, visitors and staff around the clock. Hygienic dispensing and spillage control suit clinical environments where cleanliness matters.",
    points: ["24/7 availability for staff & visitors", "Hygienic, controlled dispensing", "Dry, safe floors with spillage control"],
  },
];

const ICON_CARDS = [
  {
    icon: Landmark,
    title: "Government Offices",
    description:
      "A practical public amenity for ministries and municipal buildings — convenient for citizens and staff, with prepaid or cashless options where available.",
  },
  {
    icon: ShoppingBag,
    title: "Shopping Centres",
    description:
      "Give shoppers a reason to stay longer. Refill stations in high-footfall retail spaces serve tenants and visitors while reducing plastic waste.",
  },
  {
    icon: Dumbbell,
    title: "Gyms & Sports Facilities",
    description:
      "Athletes and gym-goers refill before, during and after sessions. High capacity keeps up with peak-hour demand and training events.",
  },
  {
    icon: Building2,
    title: "Large Workplaces",
    description:
      "Factories, warehouses and office parks get dependable hydration points for teams on long shifts — without the logistics of bottled water deliveries.",
  },
];

export function Institutions() {
  return (
    <section id="institutions" className="py-20 md:py-28 bg-muted/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Solutions for Institutions"
          title="Built for the places Namibia works, learns and heals"
          description="Smart H₂O partners with institutions across Windhoek and beyond. You focus on your people — we keep the water flowing."
        />

        {/* Image feature cards */}
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          {IMAGE_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={0.06 * i}>
              <Card className="h-full overflow-hidden border-border/80 hover:border-teal-300 hover:shadow-lg transition-all duration-300">
                <div className="relative">
                  <img
                    src={card.image}
                    alt={card.alt}
                    className="w-full h-52 md:h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" aria-hidden="true" />
                </div>
                <CardContent className="p-5 md:p-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg bg-accent text-teal-700">
                      <card.icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="text-lg md:text-xl font-semibold text-foreground">
                      {card.title}
                    </h3>
                  </div>
                  <p className="mt-3 text-sm md:text-[0.95rem] leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-2 text-sm text-foreground/80">
                        <BadgeCheck className="h-4 w-4 mt-0.5 text-teal-600 shrink-0" aria-hidden="true" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Compact icon cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 mt-5 md:mt-6">
          {ICON_CARDS.map((card, i) => (
            <Reveal key={card.title} delay={0.05 * i}>
              <Card className="h-full border-border/80 hover:border-teal-300 hover:shadow-md transition-all duration-300">
                <CardContent className="p-5">
                  <div className="inline-flex items-center justify-center h-11 w-11 rounded-lg bg-accent text-teal-700 mb-4">
                    <card.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base md:text-lg font-semibold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </Reveal>
          ))}
        </div>

        {/* Partnership model */}
        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16 rounded-2xl bg-deep-water p-6 md:p-10 text-white relative overflow-hidden">
            <div className="absolute inset-0 water-texture opacity-60 pointer-events-none" aria-hidden="true" />
            <div className="relative">
              <h3 className="text-2xl md:text-3xl font-bold text-center">
                How the hosting model works
              </h3>
              <p className="mt-3 text-center text-teal-50/85 max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
                The host provides an appropriate location, water and electricity, while
                Smart H₂O manages installation, servicing and customer support — subject
                to the final agreement.
              </p>

              <div className="grid md:grid-cols-2 gap-4 md:gap-6 mt-8 max-w-4xl mx-auto">
                <div className="rounded-xl bg-white/10 border border-white/15 p-5 md:p-6 backdrop-blur-sm">
                  <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">
                    The host provides
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3 text-sm md:text-[0.95rem] text-teal-50/90">
                      <MapPin className="h-5 w-5 text-teal-300 shrink-0" aria-hidden="true" />
                      An appropriate, accessible location with footfall
                    </li>
                    <li className="flex items-start gap-3 text-sm md:text-[0.95rem] text-teal-50/90">
                      <Droplets className="h-5 w-5 text-teal-300 shrink-0" aria-hidden="true" />
                      A suitable water supply connection
                    </li>
                    <li className="flex items-start gap-3 text-sm md:text-[0.95rem] text-teal-50/90">
                      <Zap className="h-5 w-5 text-teal-300 shrink-0" aria-hidden="true" />
                      Electrical power to the unit
                    </li>
                  </ul>
                </div>

                <div className="rounded-xl bg-white/10 border border-white/15 p-5 md:p-6 backdrop-blur-sm">
                  <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">
                    Smart H₂O provides
                  </p>
                  <ul className="mt-4 space-y-3">
                    <li className="flex items-start gap-3 text-sm md:text-[0.95rem] text-teal-50/90">
                      <Wrench className="h-5 w-5 text-teal-300 shrink-0" aria-hidden="true" />
                      Installation and commissioning of the machine
                    </li>
                    <li className="flex items-start gap-3 text-sm md:text-[0.95rem] text-teal-50/90">
                      <BadgeCheck className="h-5 w-5 text-teal-300 shrink-0" aria-hidden="true" />
                      Scheduled servicing and quality maintenance
                    </li>
                    <li className="flex items-start gap-3 text-sm md:text-[0.95rem] text-teal-50/90">
                      <Headset className="h-5 w-5 text-teal-300 shrink-0" aria-hidden="true" />
                      Customer support and technical response
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-teal-800 hover:bg-teal-50"
                >
                  <a href="#contact" data-interest="host-machine">
                    Discuss hosting a machine
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
