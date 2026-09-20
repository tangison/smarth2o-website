import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const HERO_SCENE = {
  webp: "/images/smart-h2o-scene.webp",
  png: "/images/smart-h2o-scene.png",
  width: 1451,
  height: 810,
};

export function Hero() {
  return (
    <section id="home" className="relative bg-deep text-white overflow-hidden">
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

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-10 lg:gap-16 items-end pt-28 pb-0 md:pt-36 lg:pt-40">
          {/* Copy */}
          <div className="pb-14 md:pb-20 lg:pb-28">
            <p className="hero-in text-[0.8125rem] font-medium text-white/65">
              {SITE.location}
            </p>
            <h1 className="hero-in-2 mt-5 text-[2.4rem] sm:text-5xl lg:text-[3.6rem] leading-[1.04] font-extrabold tracking-[-0.02em] text-white">
              Water where people&nbsp;are.
            </h1>
            <p className="hero-in-3 mt-6 max-w-[52ch] text-[0.9375rem] md:text-base leading-relaxed text-white/80">
              Smart H₂O installs water-refill machines across Namibia and keeps
              them running. Campuses, hospitals, workplaces, public facilities.
              You bring the bottle. We do the rest.
            </p>

            <div className="hero-in-4 mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/contact?interest=site-assessment"
                className="bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-mist transition-colors"
              >
                Book a site visit
              </Link>
              <Link
                href="/contact?interest=host-machine"
                className="border border-white/40 text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:border-white hover:bg-white/5 transition-colors"
              >
                Host a machine
              </Link>
              <a
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start sm:self-auto px-2 py-3.5 text-sm font-semibold text-accent hover:text-white transition-colors"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp us
              </a>
            </div>

            <ul className="hero-in-4 mt-10 flex flex-wrap gap-x-6 gap-y-2 text-[0.8125rem] text-white/65">
              <li>Purified on site</li>
              <li aria-hidden="true" className="text-white/30">·</li>
              <li>Cashless or prepaid</li>
              <li aria-hidden="true" className="text-white/30">·</li>
              <li>Locally serviced</li>
            </ul>
          </div>

          {/* Official transparent scene: machine, bottle, splash, Namibian river.
              object-contain keeps every element intact over the video wash */}
          <div className="hero-in-3 relative flex justify-center lg:justify-end items-end pb-14 md:pb-20 lg:pb-28">
            <figure className="w-full max-w-[560px]">
              <picture>
                <source srcSet={HERO_SCENE.webp} type="image/webp" />
                <img
                  src={HERO_SCENE.png}
                  alt="Smart H₂O refill machine with a branded bottle, a water splash and a Namibian river scene"
                  width={HERO_SCENE.width}
                  height={HERO_SCENE.height}
                  fetchPriority="high"
                  className="relative z-10 w-full h-auto object-contain"
                />
              </picture>
              <figcaption className="mono-label mt-4 text-white/65 text-center">
                Machine, bottle and splash, ready for the next refill
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
