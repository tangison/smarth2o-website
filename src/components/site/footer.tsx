import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { Logo } from "./logo";
import { NAV_LINKS, SITE } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Client-issued white stacked lockup, straight on Deep Water */}
        <div className="pt-14 md:pt-20 pb-10 md:pb-14 border-b border-white/12">
          <Logo white className="w-full max-w-[min(100%,380px)]" />
        </div>

        {/* Minimal link rows */}
        <div className="py-8 md:py-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-7 gap-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.8125rem] font-medium text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="flex flex-col gap-1.5 text-[0.8125rem] text-white/70">
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
                href={SITE.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-white transition-colors"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                Chat on WhatsApp
              </a>
            </li>
            <li>{SITE.location}</li>
          </ul>
        </div>

        {/* What is coming, kept honest and out of the way */}
        <p className="pb-8 -mt-2 text-[0.8125rem] text-white/50 max-w-[60ch]">
          {SITE.teaser}
        </p>

        <div className="border-t border-white/12 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[0.75rem] text-white/55">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2 flex-wrap">
            <span>{SITE.domain}</span>
            <span aria-hidden="true">·</span>
            <Link
              href="/brand"
              className="hover:text-white/85 transition-colors"
            >
              Brand
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/privacy"
              className="hover:text-white/85 transition-colors"
            >
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link
              href="/terms"
              className="hover:text-white/85 transition-colors"
            >
              Terms
            </Link>
          </p>
        </div>

        <div className="pb-8 text-[0.75rem] text-white/50">
          Made by{" "}
          <a
            href="https://studio.tangison.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-white/75 transition-colors"
          >
            Tangison Studio
          </a>
        </div>
      </div>
    </footer>
  );
}
