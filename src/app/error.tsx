"use client";

import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1 bg-deep text-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-40 pb-24 md:pt-48 md:pb-32">
          <p className="mono-label text-accent">Something went wrong</p>
          <h1 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-[-0.02em]">
            That did not flow.
          </h1>
          <p className="mt-5 max-w-[46ch] text-[0.9375rem] leading-relaxed text-white/70">
            An error interrupted this page. Try again, and if it keeps
            happening, reach us on WhatsApp.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={reset}
              className="bg-white text-primary text-sm font-semibold px-6 py-3.5 rounded-md hover:bg-mist transition-colors"
            >
              Try again
            </button>
            <a
              href="/"
              className="border border-white/35 text-white text-sm font-semibold px-6 py-3.5 rounded-md hover:border-white hover:bg-white/5 transition-colors"
            >
              Back to the home page
            </a>
          </div>
          {error.digest ? (
            <p className="mt-6 mono-label text-white/35">Ref {error.digest}</p>
          ) : null}
        </div>
      </main>
      <Footer />
    </div>
  );
}
