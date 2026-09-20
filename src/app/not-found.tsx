import Link from "next/link";
import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1 bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-40 pb-24 md:pt-48 md:pb-32">
          <p className="mono-label text-accent">404</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-[-0.02em]">
            This page ran dry.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/75">
            The address you followed does not exist on smarth2o.com.na. It may
            have moved, or the link may have a typo in it.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-full hover:bg-mist transition-colors"
            >
              Back to the home page
            </Link>
            <Link
              href="/contact"
              className="border border-white/40 text-white text-sm font-semibold px-6 py-3.5 rounded-full hover:border-white hover:bg-white/5 transition-colors"
            >
              Contact us
            </Link>
          </div>
          <nav aria-label="Helpful pages" className="mt-12 border-t border-white/15 pt-6">
            <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[0.8125rem]">
              {[
                { href: "/vending", label: "Water Vending Solutions" },
                { href: "/institutions", label: "Institutions" },
                { href: "/advertising", label: "Screen Advertising" },
                { href: "/how-it-works", label: "How It Works" },
              ].map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/65 hover:text-white transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}
