import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { PageHero, CtaBand } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Smart H₂O Active",
  description:
    "Smart H₂O Active bottles and hydration accessories. A bottle you keep refilling. Ask about branded bottles for your institution, gym or event.",
  alternates: { canonical: "/active" },
};

export default function ActivePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          title={
            <>
              Hydrate.
              <br />
              Perform. Recover.
            </>
          }
          intro="Smart H₂O Active is the hydration side of the business: bottles and accessories made to be refilled at our machines and carried everywhere else. Built for training grounds, campuses and long shifts."
          meta="Bottles · Hydration accessories"
        />

        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-end">
              <h2 className="text-2xl md:text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-primary">
                A bottle that belongs to the&nbsp;system.
              </h2>
              <p className="text-[0.9375rem] leading-relaxed text-foreground/75 max-w-[46ch] lg:ml-auto">
                Every Smart H₂O Active bottle is designed around the refill
                habit: tough enough for a gym bag, sized for the machine's
                dispenser, and easy to clean. Institutions can order branded
                bottles for orientation packs, events and sports teams.
              </p>
            </div>
          </div>
        </section>

        <CtaBand
          title="Order bottles for your team, campus or event."
          body="Tell us the quantity and the timeline. We will come back with options and pricing."
          interest="smart-h2o-active"
          cta="Ask about Active products"
        />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
