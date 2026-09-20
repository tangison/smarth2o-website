import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollTop } from "@/components/site/scroll-top";

export function DocShell({
  children,
  breadcrumb,
}: {
  children: React.ReactNode;
  breadcrumb: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1 bg-paper">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-28 md:pt-32 pb-16 md:pb-24">
          <p className="mono-label text-steel">{breadcrumb}</p>
          <div className="mt-6 border-t-2 border-accent pt-8">{children}</div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollTop />
    </div>
  );
}

export function DocH2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-10 text-xl font-bold text-primary first:mt-0">
      {children}
    </h2>
  );
}

export function DocP({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-3 text-[0.875rem] leading-relaxed text-steel">{children}</p>
  );
}
