"use client";

import { Logo } from "./logo";
import { NAV_LINKS, SITE } from "@/lib/site";
import { MapPin, Mail, Phone } from "lucide-react";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep-water text-teal-50/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand */}
          <div>
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed text-teal-50/70 max-w-xs">
              Smart water-refill solutions for Namibian campuses, hospitals,
              workplaces and public facilities.
            </p>
          </div>

          {/* Nav */}
          <nav aria-label="Footer navigation">
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">
              Explore
            </p>
            <ul className="mt-4 space-y-2.5 columns-1 sm:columns-2 gap-x-6">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="break-inside-avoid">
                  <a
                    href={link.href}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contact */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-teal-300">
              Contact
            </p>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-teal-300 mt-0.5 shrink-0" aria-hidden="true" />
                {SITE.location}
              </li>
              <li className="flex items-start gap-3">
                <Mail className="h-4 w-4 text-teal-300 mt-0.5 shrink-0" aria-hidden="true" />
                <a href={`mailto:${SITE.email}`} className="hover:text-white transition-colors">
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="h-4 w-4 text-teal-300 mt-0.5 shrink-0" aria-hidden="true" />
                <a
                  href={`tel:${SITE.phone.replace(/\s/g, "")}`}
                  className="hover:text-white transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-teal-50/55">
          <p>
            © {year} {SITE.legalName}. All rights reserved.
          </p>
          <p>
            {SITE.domain} · {SITE.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}
