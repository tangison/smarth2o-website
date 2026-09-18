import Link from "next/link";
import { Logo } from "./logo";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Very huge white logo */}
        <div className="pt-14 md:pt-20 pb-10 md:pb-14 border-b border-white/12">
          <Logo light width={960} className="w-full max-w-[min(100%,560px)] md:max-w-[720px]" />
        </div>

        {/* Minimal link rows */}
        <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[0.8125rem] font-medium text-white/65 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex flex-col gap-1.5 text-[0.8125rem] text-white/65">
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="hover:text-white transition-colors"
              >
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                className="hover:text-white transition-colors"
              >
                {SITE.phone}
              </a>
            </li>
            <li>{SITE.location}</li>
          </ul>
        </div>

        <div className="border-t border-white/12 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[0.75rem] text-white/45">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 flex-wrap">
            <span>{SITE.domain}</span>
            <span aria-hidden="true">·</span>
            <Link
              href="/brand"
              className="hover:text-white/80 transition-colors"
            >
              Brand
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/privacy"
              className="hover:text-white/80 transition-colors"
            >
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/terms"
              className="hover:text-white/80 transition-colors"
            >
              Terms
            </Link>
          </p>
        </div>

        <div className="pb-8 text-[0.75rem] text-white/35">
          Made by{" "}
          <a
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/70 transition-colors"
          >
            Tangison Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
