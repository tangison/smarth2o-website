import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Vending } from "@/components/site/vending";
import { Institutions } from "@/components/site/institutions";
import { Advertising } from "@/components/site/advertising";
import { HowItWorks } from "@/components/site/how-it-works";
import { Quality } from "@/components/site/quality";
import { Active } from "@/components/site/active";
import { AboutContact } from "@/components/site/about-contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main id="main" className="flex-1">
        <Hero />
        <Vending />
        <Institutions />
        <Advertising />
        <HowItWorks />
        <Quality />
        <Active />
        <AboutContact />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
