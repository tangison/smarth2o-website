import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { PageHero, CtaBand } from "@/components/site/page-hero";
import { HowItWorks } from "@/components/site/how-it-works";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Four stages from first call to first refill: site visit, institutional agreement, installation and commissioning, then maintenance and performance monitoring by the Windhoek team.",
  alternates: { canonical: "/how-it-works" },
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          title={
            <>
              Four stages.
              <br />
              No surprises.
            </>
          }
          intro="Every deployment follows the same path, whether it is a lecture block, a clinic corridor or a shopping centre entrance. The terms are in writing before anything is installed."
          meta="Site visit to monitoring"
        />
        <HowItWorks />
        <CtaBand
          title="Stage one is a site visit, and it starts with a message."
          body="We check water, power and foot traffic, then come back with a clear recommendation for your site."
          interest="site-assessment"
          cta="Book a site visit"
        />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
