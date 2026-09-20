import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { PageHero, CtaBand } from "@/components/site/page-hero";
import { Vending } from "@/components/site/vending";

export const metadata: Metadata = {
  title: "Water Vending Solutions",
  description:
    "Purified refill water from Smart H₂O vending machines: customer-owned reusable containers, cashless or prepaid access, high-capacity units and spillage control for Namibian institutions.",
  alternates: { canonical: "/vending" },
};

export default function VendingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          title={
            <>
              Water vending,
              <br />
              done properly.
            </>
          }
          intro="A Smart H₂O machine purifies water on site and dispenses it into the customer's own container. Cashless or prepaid where the site supports it, high-capacity where traffic demands it."
          meta="Refill model · Windhoek"
        />
        <Vending />
        <CtaBand
          title="Put a refill point where your people already are."
          body="Tell us about your facility and foot traffic. We will assess the site and come back with a straightforward recommendation."
          interest="host-machine"
          cta="Host a machine"
        />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
