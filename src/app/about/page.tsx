import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { PageHero, CtaBand } from "@/components/site/page-hero";
import { ContactRows } from "@/components/site/enquiry-form";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "Smart H₂O Solutions and Trading CC is a Namibian business installing and maintaining water-refill vending machines. Windhoek is the initial operating market, with growth planned across Namibia.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          title={
            <>
              Namibian owned.
              <br />
              Windhoek first.
            </>
          }
          intro={`${SITE.legalName} exists so that good water is never more than a refill away, wherever people spend their day.`}
          meta={`${SITE.legalName}`}
        />

        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 md:pb-24">
            <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16">
              <div className="max-w-[62ch]">
                <p className="text-[0.9375rem] md:text-base leading-relaxed text-foreground/80">
                  We install and maintain water-refill vending machines where
                  people already spend their day: campuses, hospitals,
                  workplaces and public facilities. The machines purify water
                  on site, customers refill their own containers, and the team
                  servicing everything lives and works here in Windhoek.
                </p>
                <p className="mt-5 text-[0.9375rem] md:text-base leading-relaxed text-foreground/80">
                  The business is Namibian-owned and built around a simple
                  partnership. The host institution provides an appropriate
                  location, water and electricity. We handle installation,
                  servicing and customer support, under terms set out in the
                  institutional agreement. Neither side has to think about the
                  parts the other does best.
                </p>
                <p className="mt-5 text-[0.9375rem] md:text-base leading-relaxed text-foreground/80">
                  Windhoek is our initial operating market. As the network of
                  refill points grows, so does our reach across Namibia. The
                  intention is the same in every town: real infrastructure,
                  looked after locally, with water quality that holds between
                  visits.
                </p>
              </div>
              <div>
                <h2 className="mono-label text-primary">Direct lines</h2>
                <ContactRows className="mt-4" />
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          title="The next refill point could be yours."
          body="Start with a site visit. It costs nothing but a short conversation about your facility."
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
