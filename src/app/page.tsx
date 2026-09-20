import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { Hero } from "@/components/site/hero";
import { Advertising } from "@/components/site/advertising";
import { HowItWorks } from "@/components/site/how-it-works";
import { Active } from "@/components/site/active";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const INDEX = [
  {
    href: "/vending",
    label: "Water Vending Solutions",
    hint: "Purified refill water, customer-owned containers, cashless access and high-capacity institutional machines.",
  },
  {
    href: "/institutions",
    label: "Solutions for Institutions",
    hint: "Campuses, hospitals, government offices, shopping centres, gyms and large workplaces.",
  },
  {
    href: "/advertising",
    label: "Screen Advertising",
    hint: "Approved brand messages on the screens people stand in front of while they refill.",
  },
  {
    href: "/how-it-works",
    label: "How It Works",
    hint: "Site assessment, agreement, installation and commissioning, monitored maintenance.",
  },
  {
    href: "/quality",
    label: "Quality, Maintenance and Sustainability",
    hint: "Water-quality controls, preventive servicing and responsible handling of RO reject water.",
  },
  {
    href: "/active",
    label: "Smart H₂O Active",
    hint: "Bottles and hydration accessories. Hydrate. Perform. Recover.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <Hero />

        {/* Editorial index: one rule per page, no cards */}
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] gap-8 lg:gap-16 items-end">
              <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-[-0.015em] text-primary">
                What Smart H₂O
                <br className="hidden sm:block" /> does&nbsp;today.
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-foreground/75 max-w-[52ch] lg:ml-auto">
                The host provides an appropriate location, water and
                electricity. Smart H₂O manages installation, servicing and
                customer support, subject to the final agreement. Start
                anywhere.
              </p>
            </div>

            <ul className="mt-12 md:mt-16 border-t-2 border-primary">
              {INDEX.map((item) => (
                <li key={item.href} className="border-b border-rule">
                  <Link
                    href={item.href}
                    className="group grid sm:grid-cols-[1.1fr_0.9fr_auto] gap-x-8 gap-y-1.5 items-baseline py-6 md:py-7"
                  >
                    <span className="text-lg md:text-2xl font-bold text-primary tracking-[-0.01em] group-hover:text-accent transition-colors">
                      {item.label}
                    </span>
                    <span className="text-[0.875rem] leading-relaxed text-foreground/70 max-w-[52ch]">
                      {item.hint}
                    </span>
                    <span className="hidden sm:inline-flex h-10 w-10 rounded-full border border-rule items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <Advertising />
        <HowItWorks />
        <Active />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
