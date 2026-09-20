import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { PageHero, CtaBand } from "@/components/site/page-hero";
import { Quality } from "@/components/site/quality";

export const metadata: Metadata = {
  title: "Quality, Maintenance and Sustainability",
  description:
    "Water-quality controls, filter replacement and sanitation, preventive maintenance and local technical response from Smart H₂O in Windhoek, plus reusable-container benefits and responsible RO reject water handling.",
  alternates: { canonical: "/quality" },
};

export default function QualityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          title={
            <>
              Quality, kept
              <br />
              between&nbsp;visits.
            </>
          }
          intro="A refill point only works while the water is good and the machine is running. Filtration, sanitation and preventive maintenance run on a schedule, handled by technicians who live and work in Windhoek."
          meta="Purification · Taste · Quality control"
        />
        <Quality />
        <CtaBand
          title="Talk through the service programme with the people who run it."
          body="We will walk you through the water-quality checks, the filter schedule and what a servicing visit looks like at your site."
          interest="general"
          cta="Ask about servicing"
        />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
