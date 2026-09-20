import type { Metadata } from "next";
import { DocShell, DocH2, DocP } from "@/components/site/doc-shell";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Brand",
  description:
    "The Smart H₂O brand system: logo lockups, colour palette, typography and voice. Water is the subject, technology is the intelligence.",
  alternates: { canonical: "/brand" },
};

const COLORS = [
  { name: "Smart Navy", hex: "#031F43", use: "Primary. Headings, nav, buttons." },
  { name: "Smart Teal", hex: "#0CA2AB", use: "Accent only, about 5 percent of a page." },
  { name: "Pure White", hex: "#FFFFFF", use: "Main background and negative space." },
  { name: "Mist", hex: "#F3F7F8", use: "Section backgrounds, panels." },
  { name: "Steel", hex: "#66727A", use: "Secondary text, captions." },
  { name: "Deep Water", hex: "#02172F", use: "Dark hero and footer." },
];

const LOCKUPS = [
  { src: "/images/logo-horizontal.webp", alt: "Smart H₂O horizontal primary logo", caption: "Horizontal lockup, preferred master", dark: false },
  { src: "/images/logo-primary.webp", alt: "Smart H₂O stacked square logo", caption: "Stacked lockup, square contexts", dark: false },
  { src: "/images/logo-mark.webp", alt: "Smart H₂O brand mark", caption: "Brand mark, icon contexts", dark: false },
  { src: "/images/svg/smart-h2o-logo-mark-flat.svg", alt: "Smart H₂O flat mark as scalable vector", caption: "Flat mark, true SVG — navy", dark: false },
  { src: "/images/logo-horizontal-white.webp", alt: "Smart H₂O horizontal logo, white reversed", caption: "White reversed, dark backgrounds only", dark: true },
  { src: "/images/svg/smart-h2o-logo-mark-flat-white.svg", alt: "Smart H₂O flat mark in white as scalable vector", caption: "Flat mark, true SVG — white", dark: true },
];

export default function BrandPage() {
  return (
    <DocShell breadcrumb="Smart H₂O / Brand">
      <h1 className="text-3xl md:text-4xl font-bold tracking-[-0.01em] text-primary">
        Water is the subject.
        <br />
        Technology is the intelligence.
      </h1>
      <DocP>
        The Smart H₂O identity sits at the intersection of water,
        infrastructure and intelligent technology. It should feel engineered,
        deliberate and premium: the work of a serious technical company, not a
        generic vending brand.
      </DocP>

      <DocH2>Logo</DocH2>
      <DocP>
        The horizontal lockup is the preferred master for the website header,
        documents and signage. The stacked lockup suits square contexts and
        social profiles. The standalone mark carries the brand where space is
        tight. White reversed versions appear only on navy or dark
        backgrounds, never on white.
      </DocP>
      <div className="mt-6 grid gap-px bg-rule border border-rule rounded-lg overflow-hidden sm:grid-cols-2">
        {LOCKUPS.map((l) => (
          <figure
            key={l.src}
            className={
              l.dark
                ? "bg-deep p-8 flex flex-col items-center justify-center gap-4"
                : "bg-paper p-8 flex flex-col items-center justify-center gap-4"
            }
          >
            <img
              src={l.src}
              alt={l.alt}
              className={l.dark ? "w-[min(70%,240px)] h-auto" : "w-[min(70%,220px)] h-auto"}
              loading="lazy"
            />
            <figcaption className="mono-label text-steel text-center">
              {l.caption}
            </figcaption>
          </figure>
        ))}
      </div>
      <DocP>
        Never stretch, recolour, rotate or redraw the logo. Clear space on all
        sides equals the height of the 2 in H₂O. Digital minimum width for the
        horizontal lockup is 180 pixels.
      </DocP>

      <DocH2>Colour</DocH2>
      <DocP>
        Roughly 60 percent white and light space, 25 percent navy, 10 percent
        technical neutrals, 5 percent teal. Teal stays an accent and never
        becomes a full-page background.
      </DocP>
      <ul className="mt-6 border-t border-rule">
        {COLORS.map((c) => (
          <li key={c.hex} className="border-b border-rule py-4 flex items-center gap-4">
            <span
              aria-hidden="true"
              className="h-10 w-10 rounded-md border border-rule shrink-0"
              style={{ backgroundColor: c.hex }}
            />
            <span className="flex-1 min-w-0">
              <span className="block text-[0.875rem] font-semibold text-primary">
                {c.name}
              </span>
              <span className="block text-[0.75rem] text-steel">{c.use}</span>
            </span>
            <span className="mono-label text-steel shrink-0">{c.hex}</span>
          </li>
        ))}
      </ul>

      <DocH2>Typography</DocH2>
      <DocP>
        Manrope carries headlines, navigation and interface text at weights
        800 down to 400. Inter sets body copy, tables and forms. IBM Plex Mono
        appears only for genuine technical labels such as specifications and
        reference codes, and never dominates.
      </DocP>

      <DocH2>Voice</DocH2>
      <DocP>
        Direct, professional, practical and human. Concrete claims over vague
        ones, evidence where it exists, plain language where precision allows
        it. We speak to purification, taste, convenience and quality control,
        and we do not make health claims.
      </DocP>

      <DocH2>Photography</DocH2>
      <DocP>
        Real infrastructure and real outcomes: the machines, the sites they
        serve, and Namibia's built environment. Natural, crisp, technical. No
        staged corporate stock, no generic AI imagery.
      </DocP>

      <DocP>
        For logo files and usage questions, contact{" "}
        <a
          href={`mailto:${SITE.email}`}
          className="text-primary underline decoration-accent underline-offset-2 hover:decoration-2 transition-all font-medium"
        >
          {SITE.email}
        </a>
        .
      </DocP>
    </DocShell>
  );
}
