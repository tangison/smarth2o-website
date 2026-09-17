"use client";

import { Button } from "@/components/ui/button";
import { MapPin, Droplets, ShieldCheck, CreditCard, MessageCircle, ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";
import { Reveal } from "./reveal";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-deep-water">
      {/* decorative texture */}
      <div className="absolute inset-0 water-texture pointer-events-none" aria-hidden="true" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 md:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Copy */}
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-1.5 text-sm font-medium text-teal-200">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-teal-300 animate-ripple" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-300" />
                </span>
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {SITE.location} · Namibia
              </p>
            </Reveal>

            <Reveal delay={0.08}>
              <h1 className="mt-6 text-4xl sm:text-5xl lg:text-[3.4rem] font-bold text-white leading-[1.08] tracking-tight">
                Smart water-refill solutions for{" "}
                <span className="text-teal-300">Namibian campuses, hospitals, workplaces</span>{" "}
                and public facilities.
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-teal-50/85">
                Smart H₂O installs and services high-capacity purified water vending
                machines where people need them most. Customers refill their own
                reusable containers — convenient, quality-controlled hydration without
                single-use plastic.
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
                <Button asChild size="lg" className="bg-water-cta text-white hover:opacity-90 text-base px-7 h-12 shadow-lg shadow-teal-900/40">
                  <a href="#contact" data-interest="site-assessment">
                    Request a Site Assessment
                    <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-teal-300/40 bg-white/5 text-teal-50 hover:bg-white/10 hover:text-white text-base px-7 h-12"
                >
                  <a href="#contact" data-interest="host-machine">
                    Host a Smart H₂O Machine
                  </a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-emerald-400/40 bg-emerald-400/10 text-emerald-200 hover:bg-emerald-400/20 hover:text-emerald-100 text-base px-7 h-12"
                >
                  <a href={SITE.whatsappLink} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-1 h-5 w-5" aria-hidden="true" />
                    Contact Us on WhatsApp
                  </a>
                </Button>
              </div>
            </Reveal>

            <Reveal delay={0.32}>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-teal-100/75">
                <li className="inline-flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-teal-300" aria-hidden="true" />
                  Purified refill water
                </li>
                <li className="inline-flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-teal-300" aria-hidden="true" />
                  Locally serviced &amp; maintained
                </li>
                <li className="inline-flex items-center gap-2">
                  <CreditCard className="h-4 w-4 text-teal-300" aria-hidden="true" />
                  Cashless or prepaid access
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Visual */}
          <Reveal delay={0.15} className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-teal-950/50 ring-1 ring-white/15">
              <img
                src="/images/hero-machine.png"
                alt="A Smart H₂O water refill machine dispensing purified water into a reusable bottle in a modern institutional corridor"
                className="w-full h-auto aspect-[7/4] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-950/45 via-transparent to-transparent" aria-hidden="true" />
              {/* floating chips */}
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-teal-900 shadow">
                  <Droplets className="h-3.5 w-3.5" aria-hidden="true" />
                  Purified on-site
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-teal-900 shadow">
                  <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
                  Serviced by our local team
                </span>
              </div>
            </div>

            {/* decorative droplet */}
            <div
              className="hidden md:block absolute -top-6 -right-6 h-20 w-20 rounded-full bg-teal-400/20 blur-xl animate-floaty"
              aria-hidden="true"
            />
          </Reveal>
        </div>
      </div>

      {/* wave divider into light content */}
      <svg
        className="block w-full text-background"
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0,40 C240,80 480,0 720,32 C960,64 1200,16 1440,48 L1440,80 L0,80 Z"
          fill="currentColor"
        />
      </svg>
    </section>
  );
}
