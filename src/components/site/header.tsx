"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { MessageCircle, Search } from "lucide-react";
import { NAV_LINKS, PAGE_LINKS, SITE } from "@/lib/site";
import { cn } from "@/lib/utils";

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (v: boolean) => void }) {
  const router = useRouter();
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the site"
      data-open={open}
      className={cn(
        "fixed inset-0 z-[70] flex items-start justify-center px-4 pt-[12vh] transition-[visibility] duration-200",
        open ? "pointer-events-auto visible" : "pointer-events-none invisible"
      )}
    >
      <button
        type="button"
        aria-label="Close search"
        tabIndex={-1}
        onClick={() => onOpenChange(false)}
        className={cn(
          "absolute inset-0 bg-deep/45 transition-opacity duration-200",
          open ? "opacity-100" : "opacity-0"
        )}
      />
      <div
        className={cn(
          "relative w-full max-w-lg rounded-2xl bg-paper border border-rule shadow-2xl shadow-deep/30 transition-[opacity,transform] duration-200",
          open ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
        )}
      >
        <div className="flex items-center gap-3 border-b border-rule px-5">
          <Search className="h-4 w-4 text-steel shrink-0" aria-hidden="true" />
          <input
            id="site-search-input"
            type="text"
            placeholder="Search pages…"
            autoComplete="off"
            aria-label="Search pages"
            className="w-full bg-transparent py-4 text-[0.9375rem] text-primary placeholder:text-steel/70 focus:outline-none"
          />
          <kbd className="mono-label hidden sm:block text-steel/70 border border-rule rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>
        <ul id="site-search-results" className="max-h-[46vh] overflow-y-auto p-2 m-0 list-none" />
        <p id="site-search-empty" className="hidden px-5 py-6 text-sm text-steel text-center">
          Nothing matches that. Try “vending”, “host” or “advertising”.
        </p>
        <p className="border-t border-rule px-5 py-3 text-[0.75rem] text-steel">
          Press Enter to open the highlighted page.
        </p>
      </div>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Home is the only dark-surface page top; inner pages start on paper.
  const onDark = pathname === "/" && !scrolled && !open;

  const close = useCallback(() => {
    setOpen(false);
    burgerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
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
  }, [open]);

  // Global ⌘K / Ctrl+K and "/" open search
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      const typing = tag === "INPUT" || tag === "TEXTAREA";
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const runSearch = useCallback((query: string) => {
    const list = searchRef.current?.querySelector<HTMLUListElement>("#site-search-results");
    const empty = searchRef.current?.querySelector<HTMLParagraphElement>("#site-search-empty");
    if (!list || !empty) return;
    const q = query.trim().toLowerCase();
    const matches = PAGE_LINKS.filter(
      (p) => !q || p.label.toLowerCase().includes(q) || p.hint.toLowerCase().includes(q)
    );
    list.innerHTML = "";
    empty.classList.toggle("hidden", matches.length > 0);
    matches.forEach((p, i) => {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.setAttribute("data-href", p.href);
      btn.className =
        "w-full text-left px-3 py-2.5 rounded-lg flex flex-col gap-0.5 cursor-pointer" +
        (i === 0 ? " bg-mist" : " hover:bg-mist");
      if (i === 0) btn.setAttribute("aria-selected", "true");
      const label = document.createElement("span");
      label.textContent = p.label;
      label.className = "text-[0.875rem] font-semibold text-primary";
      const hint = document.createElement("span");
      hint.textContent = p.hint;
      hint.className = "text-[0.75rem] text-steel";
      btn.append(label, hint);
      li.appendChild(btn);
      list.appendChild(li);
    });
  }, []);

  // Wire input + keyboard inside the dialog (imperative for a light dependency-free widget)
  useEffect(() => {
    if (!searchOpen) return;
    const root = searchRef.current;
    const input = searchInputRef.current ?? root?.querySelector<HTMLInputElement>("#site-search-input");
    searchInputRef.current = input ?? null;
    runSearch("");
    requestAnimationFrame(() => input?.focus());
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSearchOpen(false);
        return;
      }
      const list = root?.querySelector<HTMLUListElement>("#site-search-results");
      if (!list) return;
      const items = Array.from(list.querySelectorAll<HTMLButtonElement>("button[data-href]"));
      const current = items.findIndex((b) => b.getAttribute("aria-selected") === "true");
      if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        const next = e.key === "ArrowDown" ? Math.min(current + 1, items.length - 1) : Math.max(current - 1, 0);
        items.forEach((b, i) => {
          if (i === next) {
            b.setAttribute("aria-selected", "true");
            b.classList.add("bg-mist");
          } else {
            b.removeAttribute("aria-selected");
            b.classList.remove("bg-mist");
          }
        });
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = items[current >= 0 ? current : 0];
        if (target) {
          router.push(target.getAttribute("data-href") ?? "/");
          setSearchOpen(false);
        }
      }
    };
    root?.addEventListener("keydown", onKey);
    const onInput = (e: Event) => runSearch((e.target as HTMLInputElement).value);
    input?.addEventListener("input", onInput);
    const onClick = (e: MouseEvent) => {
      const btn = (e.target as HTMLElement).closest?.("button[data-href]") as HTMLElement | null;
      if (btn) {
        router.push(btn.getAttribute("data-href") ?? "/");
        setSearchOpen(false);
      }
    };
    root?.addEventListener("click", onClick);
    return () => {
      root?.removeEventListener("keydown", onKey);
      input?.removeEventListener("input", onInput);
      root?.removeEventListener("click", onClick);
    };
  }, [searchOpen, runSearch, router]);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,box-shadow] duration-300",
        scrolled || open
          ? "bg-paper border-b border-rule shadow-sm shadow-deep/5"
          : "bg-transparent border-b border-transparent"
      )}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-10 focus:bg-primary focus:text-white focus:px-3 focus:py-2 focus:text-sm focus:rounded-full"
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
            className="flex items-center rounded-full focus-visible:outline-2 focus-visible:outline-ring"
          >
            <span className={cn("block w-[129px]", scrolled ? "h-[34px]" : "h-[37px]")}>
              <img
                src="/images/svg/smart-h2o-logo-horizontal.svg"
                alt="Smart H₂O"
                width={883}
                height={253}
                fetchPriority="high"
                className={cn(
                  "h-full w-auto max-w-none transition-[filter] duration-300",
                  onDark && "brightness-0 invert"
                )}
              />
            </span>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Main navigation" className="hidden lg:block">
            <ul className="flex items-center gap-7">
              {NAV_LINKS.map((link) => {
                const active = pathname === link.href;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "nav-link text-sm font-medium whitespace-nowrap transition-colors",
                        onDark
                          ? active
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                          : active
                            ? "text-primary"
                            : "text-steel hover:text-primary"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="hidden lg:flex items-center gap-2.5">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the site"
              aria-haspopup="dialog"
              className={cn(
                "inline-flex items-center justify-center h-10 w-10 rounded-full border transition-colors",
                onDark
                  ? "border-white/30 text-white/80 hover:border-white hover:text-white"
                  : "border-rule text-steel hover:border-primary hover:text-primary"
              )}
            >
              <Search className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={SITE.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Chat with Smart H₂O on WhatsApp"
              className={cn(
                "inline-flex items-center justify-center h-10 w-10 rounded-full border transition-colors",
                onDark
                  ? "border-white/30 text-white/80 hover:border-white hover:text-white"
                  : "border-rule text-steel hover:border-primary hover:text-primary"
              )}
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
            </a>
            <Link
              href="/contact?interest=site-assessment"
              className={cn(
                "ml-1 text-sm font-semibold whitespace-nowrap px-5 py-2.5 rounded-full transition-colors",
                onDark
                  ? "bg-white text-primary hover:bg-mist"
                  : "bg-primary text-white hover:bg-foreground"
              )}
            >
              Book a site visit
            </Link>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-1.5 lg:hidden">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search the site"
              className={cn(
                "inline-flex items-center justify-center h-10 w-10 rounded-full transition-colors",
                onDark ? "text-white/80 hover:text-white" : "text-steel hover:text-primary"
              )}
            >
              <Search className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              ref={burgerRef}
              type="button"
              className="inline-flex items-center justify-center h-10 w-10 -mr-2 rounded-full focus-visible:outline-2 focus-visible:outline-ring"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="offcanvas-nav"
              onClick={() => (open ? close() : setOpen(true))}
            >
              <span className={cn("burger", onDark && "on-dark")} aria-hidden="true">
                <span />
                <span />
              </span>
            </button>
          </div>
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
            src="/images/svg/smart-h2o-logo-horizontal.svg"
            alt="Smart H₂O"
            width={883}
            height={253}
            className="h-auto w-auto max-h-9"
          />
          <button
            type="button"
            className="flex items-center justify-center h-10 w-10 rounded-full focus-visible:outline-2 focus-visible:outline-ring"
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
            {PAGE_LINKS.filter((p) => p.href !== "/brand").map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={close}
                  aria-current={pathname === link.href ? "page" : undefined}
                  className="flex items-baseline justify-between gap-4 py-3 text-xl font-semibold text-primary hover:text-accent transition-colors"
                >
                  {link.label}
                  {pathname === link.href && (
                    <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent shrink-0" />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="px-5 pb-8 space-y-3 border-t border-rule pt-6">
          <Link
            href="/contact?interest=site-assessment"
            onClick={close}
            className="block bg-primary text-white text-center text-sm font-semibold px-5 py-3.5 rounded-full hover:bg-foreground transition-colors"
          >
            Book a site visit
          </Link>
          <a
            href={SITE.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 border border-primary text-primary text-sm font-semibold px-5 py-3.5 rounded-full hover:bg-secondary transition-colors"
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" />
            WhatsApp us
          </a>
        </div>
      </div>

      <div ref={searchRef}>
        <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
      </div>
    </header>
  );
}
