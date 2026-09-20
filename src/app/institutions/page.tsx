import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { PageHero, CtaBand } from "@/components/site/page-hero";
import { Institutions } from "@/components/site/institutions";

export const metadata: Metadata = {
  title: "Solutions for Institutions",
  description:
    "Smart H₂O water-refill machines for universities, hospitals, government offices, shopping centres, gyms and large workplaces in Namibia. Hosts provide location, water and power; we do the rest.",
  alternates: { canonical: "/institutions" },
};

export default function InstitutionsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          title={
            <>
              Built for
              <br />
              institutions.
            </>
          }
          intro="Universities, hospitals, government offices, shopping centres, gyms and large workplaces each get the same deal: you provide the location, water and electricity. Smart H₂O manages installation, servicing and customer support, subject to the final agreement."
          meta="Six host profiles · One partnership"
        />
        <Institutions />
        <CtaBand
          title="A partnership your facilities team will not have to babysit."
          body="Servicing is scheduled, water quality is checked on a set programme, and your team has one number to call when anything needs attention."
          interest="host-machine"
          cta="Book a site visit"
        />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
