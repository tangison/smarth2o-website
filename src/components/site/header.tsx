"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view
  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.replace("#", ""));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        }
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  // Lock body scroll while the off-canvas menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  // Escape closes; focus is trapped inside the panel while open
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        close();
        return;
      }
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, close]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "bg-paper border-b border-rule"
          : "bg-paper/0 border-b border-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:bg-primary focus:text-white focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div
          className={cn(
            "flex items-center justify-between transition-[height] duration-300",
            scrolled ? "h-16" : "h-20"
          )}
        >
          <Link
            href="/"
            aria-label="Smart H₂O, home"
            className="flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
          >
            {/* Colour lockup on light surfaces, white reversed over the dark hero */}
            <span
              className={cn(
                "relative block w-[158px]",
                scrolled ? "h-[34px]" : "h-[37px]"
              )}
            >
              <img
                src="/images/logo-horizontal.webp"
                alt="Smart H₂O"
                width={511}
                height={120}
                fetchPriority="high"
                className={cn(
                  "absolute left-0 top-0 h-full w-auto max-w-none transition-opacity duration-300",
                  scrolled ? "opacity-100" : "opacity-0"
                )}
              />
              <img
                src="/images/logo-horizontal-white-180.webp"
                alt=""
                aria-hidden="true"
                width={766}
                height={180}
                fetchPriority="high"
                className={cn(
                  "absolute left-0 top-0 h-full w-auto max-w-none transition-opacity duration-300",
                  scrolled ? "opacity-0" : "opacity-100"
                )}
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const id = link.href.replace("#", "");
                return (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      aria-current={activeSection === id ? "true" : undefined}
                      className={cn(
                        "nav-link text-sm font-medium whitespace-nowrap transition-colors",
                        scrolled || open
                          ? activeSection === id
                            ? "text-primary"
                            : "text-steel hover:text-primary"
                          : activeSection === id
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                      )}
                    >
                      {link.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-7">
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex items-center gap-1.5 text-sm font-medium whitespace-nowrap transition-colors",
                scrolled || open
                  ? "text-steel hover:text-accent"
                  : "text-white/70 hover:text-white"
              )}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              WhatsApp
            </a>
            <a
              href="#contact"
              data-interest="site-assessment"
              className={cn(
                "text-sm font-semibold whitespace-nowrap px-5 py-2.5 rounded-md transition-colors",
                scrolled || open
                  ? "bg-primary text-white hover:bg-foreground"
                  : "bg-white text-primary hover:bg-mist"
              )}
            >
              Request a quote
            </a>
          </div>

          {/* Two-line borderless hamburger (mobile) */}
          <button
            ref={burgerRef}
            type="button"
            className={cn(
              "lg:hidden flex items-center justify-center h-10 w-10 -mr-2 rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="offcanvas-nav"
            onClick={() => (open ? close() : setOpen(true))}
          >
            <span className={cn("burger", !scrolled && !open && "on-dark")} aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {/* Off-canvas menu */}
      <div
        className="offcanvas-backdrop lg:hidden"
        data-open={open}
        onClick={close}
        aria-hidden="true"
      />
      <div
        id="offcanvas-nav"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        className="offcanvas lg:hidden"
        data-open={open}
      >
        <div className="flex items-center justify-between px-5 h-20 border-b border-rule">
          <img
            src="/images/logo-horizontal.webp"
            alt="Smart H₂O"
            width={511}
            height={120}
            className="h-auto w-auto"
          />
          <button
            type="button"
            className="flex items-center justify-center h-10 w-10 rounded-sm focus-visible:outline-2 focus-visible:outline-ring"
            aria-label="Close menu"
            aria-expanded="true"
            onClick={close}
          >
            <span className="burger" aria-hidden="true">
              <span />
              <span />
            </span>
          </button>
        </div>
        <nav aria-label="Mobile navigation" className="px-5 py-6">
          <ul className="space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className="block py-3.5 text-2xl font-semibold text-primary hover:text-accent transition-colors"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-5 pb-8 space-y-3 border-t border-rule pt-6">
          <a
            href="#contact"
            data-interest="site-assessment"
            onClick={close}
            className="block bg-primary text-white text-center text-sm font-semibold px-5 py-3.5 rounded-md hover:bg-foreground transition-colors"
          >
            Request a site assessment
          </a>
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-primary text-primary text-sm font-semibold px-5 py-3.5 rounded-md hover:bg-secondary transition-colors"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
        </div>
      </div>
    </header>
  );
}
