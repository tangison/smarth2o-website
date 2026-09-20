import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SITE } from "@/lib/site";

const HERO_SCENE = {
  webp: "/images/smart-h2o-scene.webp",
  png: "/images/smart-h2o-scene.png",
  width: 1451,
  height: 810,
};

/*
 * Hero: one statement, two actions, nothing else.
 * The old three-CTA row and the trust list are gone; the facts moved
 * down into the ticker strip where they belong.
 */
const TICKER = [
  "Purified on site",
  "Cashless or prepaid",
  "Locally serviced",
  "Windhoek, Namibia",
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100svh] flex-col overflow-hidden bg-deep text-white"
    >
      {/* Cropped waterfall loop, watermark removed from the source footage */}
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/videos/waterfall-hero-poster.webp"
        aria-hidden="true"
        tabIndex={-1}
      >
        <source src="/videos/waterfall-hero.mp4" type="video/mp4" />
      </video>
      {/* Deep Water wash keeps type at AA contrast over moving water;
          a whisper of teal ties the footage to the brand accent */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-deep/85 via-deep/72 to-deep/92"
      />
      <div aria-hidden="true" className="absolute inset-0 bg-accent/10" />

      <div className="relative z-10 mx-auto flex w-full max-w-[1400px] flex-1 flex-col px-4 pt-28 sm:px-6 md:pt-36 lg:pt-40">
        <p className="hero-in mono-label text-white/60">{SITE.location}</p>

        <h1 className="hero-in-2 mt-5 text-[clamp(2.875rem,9vw,7.5rem)] font-extrabold leading-[0.95] tracking-[-0.03em] text-white">
          Water where
          <br />
          people&nbsp;are<span className="text-accent">.</span>
        </h1>

        <div className="hero-in-3 mt-auto flex flex-col gap-8 pt-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16 lg:pt-12">
          {/* Two actions. WhatsApp stays in the floating button and footer. */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/contact?interest=site-assessment"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-white px-7 py-4 text-sm font-semibold text-primary transition-colors hover:bg-mist"
            >
              Book a site visit
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
            <Link
              href="/contact?interest=host-machine"
              className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-4 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white/5"
            >
              Host a machine
            </Link>
          </div>

          {/* Official transparent scene: machine, bottle, splash, Namibian
              river. Rests on the ticker line, never covers the statement. */}
          <figure className="hero-in-4 w-full max-w-[300px] self-center sm:max-w-[400px] lg:max-w-[580px] lg:self-end">
            <picture>
              <source srcSet={HERO_SCENE.webp} type="image/webp" />
              <img
                src={HERO_SCENE.png}
                alt="Smart H₂O refill machine with a branded bottle, a water splash and a Namibian river scene"
                width={HERO_SCENE.width}
                height={HERO_SCENE.height}
                fetchPriority="high"
                className="relative z-10 h-auto w-full object-contain"
              />
            </picture>
          </figure>
        </div>
      </div>

      {/* Facts ticker: one strip, one speed, pauses on hover */}
      <div className="relative z-10 mt-10 border-t border-white/15 lg:mt-0">
        <ul className="sr-only">
          {TICKER.map((fact) => (
            <li key={fact}>{fact}</li>
          ))}
        </ul>
        <div className="overflow-hidden py-3.5" aria-hidden="true">
          <div className="hero-ticker flex w-max items-center">
            {[0, 1].map((copy) => (
              <div key={copy} className="flex items-center">
                {TICKER.map((fact) => (
                  <span
                    key={`${copy}-${fact}`}
                    className="mono-label flex items-center text-white/60"
                  >
                    <span className="px-5">{fact}</span>
                    <span className="text-accent">·</span>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
