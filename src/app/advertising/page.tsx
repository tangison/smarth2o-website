import type { Metadata } from "next";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";
import { PageHero, CtaBand } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Screen Advertising",
  description:
    "Advertise on Smart H₂O machine screens in Namibian campuses, hospitals, workplaces and public facilities. The hosting institution approves all content before it plays.",
  alternates: { canonical: "/advertising" },
};

const STEPS = [
  {
    step: "01",
    title: "Pick your placements",
    body: "Machines sit in campuses, hospitals, workplaces and public facilities. Choose the sites that match your audience, subject to availability.",
  },
  {
    step: "02",
    title: "Send your content",
    body: "Submit the material you want on screen with your preferred run period. We confirm technical specs before anything is scheduled.",
  },
  {
    step: "03",
    title: "Host approval",
    body: "The institution hosting the machine reviews and approves what appears on its site. Nothing plays without it.",
  },
  {
    step: "04",
    title: "On screen",
    body: "Approved content runs in the screen's advertising slots, next to the refill instructions people stand and read.",
  },
];

export default function AdvertisingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <PageHero
          title={
            <>
              Attention where
              <br />
              people already&nbsp;stand.
            </>
          }
          intro="While a bottle fills, the person holding it is looking at the machine. Its screen carries the host institution's messaging first, and approved advertising in the remaining slots. It is a captive, local audience at eye level."
          meta="Host-approved slots · Windhoek first"
        />

        <section className="bg-paper">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 pb-16 md:pb-24">
            <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12 lg:gap-x-12">
              {STEPS.map((s) => (
                <li key={s.step} className="border-t-2 border-rule pt-5">
                  <p className="mono-label text-steel">{s.step}</p>
                  <h2 className="mt-2.5 text-base font-bold text-primary">
                    {s.title}
                  </h2>
                  <p className="mt-2 text-[0.8125rem] leading-relaxed text-foreground/75 max-w-[32ch]">
                    {s.body}
                  </p>
                </li>
              ))}
            </ol>

            <div className="mt-14 md:mt-20 grid lg:grid-cols-[1.1fr_0.9fr] gap-10 lg:gap-16 items-center">
              <figure>
                <div className="rounded-2xl overflow-hidden bg-mist">
                  <img
                    src="/images/machine-detail.webp"
                    alt="Close view of a Smart H₂O machine's screen and control panel"
                    width={800}
                    height={543}
                    loading="lazy"
                    sizes="(min-width: 1024px) 44vw, 90vw"
                    className="w-full h-auto"
                  />
                </div>
                <figcaption className="mono-label mt-2.5 text-steel">
                  Screen and panel detail
                </figcaption>
              </figure>
              <div>
                <h2 className="text-2xl md:text-[2rem] font-bold leading-[1.15] tracking-[-0.01em] text-primary">
                  Why it works for advertisers.
                </h2>
                <ul className="mt-6 space-y-4 max-w-[56ch]">
                  <li className="flex gap-3 text-[0.875rem] leading-relaxed text-foreground/80">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-accent shrink-0" />
                    The audience is physically present, often waiting, and looking at the screen by default.
                  </li>
                  <li className="flex gap-3 text-[0.875rem] leading-relaxed text-foreground/80">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-accent shrink-0" />
                    Placements are inside institutions, not on open streets, so content plays in a trusted setting.
                  </li>
                  <li className="flex gap-3 text-[0.875rem] leading-relaxed text-foreground/80">
                    <span aria-hidden="true" className="mt-2 h-2 w-2 rounded-full bg-accent shrink-0" />
                    The hosting institution approves every campaign, which keeps what plays appropriate to its community.
                  </li>
                </ul>
                <p className="mt-6 text-[0.8125rem] text-steel max-w-[52ch]">
                  Rates and available placements are shared on request. Nothing
                  runs without written host approval.
                </p>
              </div>
            </div>
          </div>
        </section>

        <CtaBand
          title="Get your brand on the machines people refill at."
          body="Tell us who you want to reach and where. We will confirm placements, specs and the approval path with each hosting institution."
          interest="advertising"
          cta="Advertise on our screens"
        />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
