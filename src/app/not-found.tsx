import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

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
          <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/70">
            The address you followed does not exist on smarth2o.com.na.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="/"
              className="bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-mist transition-colors"
            >
              Back to the home page
            </a>
            <a
              href="/#contact"
              className="border border-white/35 text-white text-sm font-semibold px-6 py-3.5 rounded-md hover:border-white hover:bg-white/5 transition-colors"
            >
              Contact us
            </a>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
