import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { EnquiryForm, ContactRows } from "@/components/site/enquiry-form";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Smart H₂O Solutions and Trading CC in Windhoek: enquiry form, info@smarth2o.com.na, or WhatsApp us about hosting a machine, site visits or screen advertising.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 md:pt-40 pb-10 md:pb-14">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-16 items-end">
              <h1 className="text-4xl md:text-[3.4rem] leading-[1.04] font-extrabold tracking-[-0.025em] text-primary">
                Tell us about
                <br />
                your&nbsp;site.
              </h1>
              <p className="text-[0.9375rem] md:text-base leading-relaxed text-steel max-w-[44ch] lg:ml-auto pb-1">
                Machine hosting, site visits, advertising or Smart H₂O
                Active products. One form, one inbox, straight to the team.
              </p>
            </div>
            <div className="mt-8 md:mt-10 h-[2px] w-full bg-primary/90" aria-hidden="true" />
          </div>
        </section>

        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 md:pb-24">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
              {/* Direct contact */}
              <div>
                <h2 className="text-xl font-bold text-primary">
                  {SITE.legalName}
                </h2>
                <p className="mt-3 text-[0.9375rem] leading-relaxed text-steel max-w-[52ch]">
                  Namibian owned and operated, based in {SITE.location}. For
                  anything urgent, WhatsApp is the fastest way to reach us.
                </p>
                <ContactRows className="mt-8" />
              </div>

              {/* Enquiry form */}
              <div className="border border-rule rounded-2xl bg-mist/60 p-6 md:p-10">
                <h2 className="text-xl font-bold text-primary">Send us an enquiry</h2>
                <p className="mt-2 text-[0.8125rem] leading-relaxed text-foreground/75">
                  Tell us what you need and we will get back to you.
                </p>
                <div className="mt-6">
                  <EnquiryForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
