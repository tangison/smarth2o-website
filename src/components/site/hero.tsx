import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { SITE } from "@/lib/site";

const HERO_MACHINE = {
  src: "/images/machine-branded.webp",
  width: 760,
  height: 1294,
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
        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-end pt-28 pb-0 md:pt-36 lg:pt-40">
          {/* Copy */}
          <div className="pb-14 md:pb-20 lg:pb-28">
            <p className="hero-in text-[0.8125rem] font-medium text-white/65">
              {SITE.location}
            </p>
            <h1 className="hero-in-2 mt-5 text-[2.4rem] sm:text-5xl lg:text-[3.6rem] leading-[1.04] font-extrabold tracking-[-0.02em] text-white">
              Purified water.
              <br />
              Refilled on&nbsp;site.
            </h1>
            <p className="hero-in-3 mt-6 max-w-[52ch] text-[0.9375rem] md:text-base leading-relaxed text-white/80">
              Smart H₂O installs and services water-refill vending machines for
              Namibian campuses, hospitals, workplaces and public facilities.
              People refill their own bottles. We keep the machines running.
            </p>

            <div className="hero-in-4 mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <Link
                href="/contact?interest=site-assessment"
                className="bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-mist transition-colors"
              >
                Request a site assessment
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

          {/* Real branded machine cutout, grounded with a soft shadow */}
          <div className="hero-in-3 relative flex justify-center lg:justify-end pb-14 md:pb-20 lg:pb-28">
            <figure className="relative">
              <img
                src={HERO_MACHINE.src}
                alt="Smart H₂O branded water-refill vending machine with PURE, SAFE, AFFORDABLE and SUSTAINABLE panel"
                width={HERO_MACHINE.width}
                height={HERO_MACHINE.height}
                fetchPriority="high"
                sizes="(min-width: 1024px) 30vw, 60vw"
                srcSet="/images/machine-branded-480w.webp 480w, /images/machine-branded.webp 760w"
                className="relative z-10 w-[min(64vw,320px)] lg:w-auto lg:h-[min(56vh,540px)] h-auto"
              />
              <div
                aria-hidden="true"
                className="absolute left-1/2 -translate-x-1/2 bottom-1 w-[62%] h-10 rounded-[50%] bg-black/35 blur-2xl"
              />
              <figcaption className="mono-label mt-4 text-white/65 text-center">
                Branded refill unit
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
