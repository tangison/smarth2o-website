import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

/**
 * Editorial page header for inner pages: oversized left-biased title,
 * intro offset to the right, hairline rule. No eyebrows, no cards.
 */
export function PageHero({
  title,
  intro,
  meta,
}: {
  title: React.ReactNode;
  intro: string;
  meta?: string;
}) {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-6 lg:gap-16 items-end">
          <h1 className="text-4xl md:text-[3.4rem] leading-[1.04] font-extrabold tracking-[-0.025em] text-primary">
            {title}
          </h1>
          <div className="pb-1">
            <p className="text-[0.9375rem] md:text-base leading-relaxed text-steel max-w-[44ch] lg:ml-auto">
              {intro}
            </p>
            {meta && <p className="mono-label mt-4 text-steel/80 lg:text-right">{meta}</p>}
          </div>
        </div>
        <div className="mt-8 md:mt-10 h-[2px] w-full bg-primary/90" aria-hidden="true" />
      </div>
    </section>
  );
}

/**
 * Closing band for inner pages: navy statement + round CTAs.
 */
export function CtaBand({
  title,
  body,
  interest = "general",
  cta = "Start a conversation",
}: {
  title: string;
  body: string;
  interest?: string;
  cta?: string;
}) {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-16 items-end">
          <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-[-0.015em]">
            {title}
          </h2>
          <div>
            <p className="text-[0.9375rem] leading-relaxed text-white/70 max-w-[46ch] lg:ml-auto">
              {body}
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-3 lg:justify-end">
              <Link
                href={`/contact?interest=${interest}`}
                className="bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-mist transition-colors"
              >
                {cta}
              </Link>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-white/35 text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:border-white hover:bg-white/5 transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
