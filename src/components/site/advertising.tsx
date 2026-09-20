import Link from "next/link";

/**
 * Home-page teaser band for the screen advertising offer.
 * The full page lives at /advertising.
 */
export function Advertising() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-16 items-end">
          <h2 className="text-3xl md:text-[2.4rem] leading-[1.1] font-bold tracking-[-0.015em] text-white">
            Your message, on our
            <br className="hidden sm:block" /> machine&nbsp;screens.
          </h2>
          <div>
            <p className="text-[0.9375rem] leading-relaxed text-white/70 max-w-[46ch] lg:ml-auto">
              Every machine carries a display screen in daily use. The hosting
              institution's messaging comes first; remaining slots are open to
              advertisers whose content the institution approves.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-4 lg:justify-end">
              <Link
                href="/advertising"
                className="bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-mist transition-colors"
              >
                See screen advertising
              </Link>
              <p className="text-[0.8125rem] text-white/60">
                Rates on request.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
