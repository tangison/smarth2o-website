import type { Metadata, Viewport } from "next";
import { Manrope, Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { SITE } from "@/lib/site";

const manrope = Manrope({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const title = "Smart H₂O | Water-refill vending machines for Namibian institutions";
const description =
  "Smart H₂O installs, services and monitors purified water-refill vending machines for Namibian campuses, hospitals, workplaces and public facilities. Windhoek based, locally supported.";

export const viewport: Viewport = {
  themeColor: "#02172F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: title,
    template: "%s | Smart H₂O",
  },
  description,
  keywords: [
    "water refill Namibia",
    "water vending machine Windhoek",
    "purified water",
    "reusable bottles",
    "campus water",
    "hospital water solution",
    "Smart H₂O",
  ],
  authors: [{ name: SITE.legalName }],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title,
    description,
    url: `https://${SITE.domain}`,
    siteName: "Smart H₂O",
    type: "website",
    locale: "en_NA",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Smart H₂O, purified water, smart machines, Namibia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/images/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/favicon/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/favicon/apple-touch-icon.png", sizes: "180x180" }],
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    "geo.region": "NA-KH",
    "geo.placename": "Windhoek",
    "geo.position": "-22.5597;17.0832",
    ICBM: "-22.5597, 17.0832",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE.name,
  legalName: SITE.legalName,
  url: `https://${SITE.domain}`,
  logo: `https://${SITE.domain}/images/logo-horizontal.webp`,
  description,
  email: SITE.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Windhoek",
    addressCountry: "NA",
  },
  areaServed: "Namibia",
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `https://${SITE.domain}/#business`,
  name: SITE.legalName,
  image: `https://${SITE.domain}/images/og-image.png`,
  logo: `https://${SITE.domain}/images/logo-horizontal.webp`,
  description,
  email: SITE.email,
  url: `https://${SITE.domain}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Windhoek",
    addressRegion: "Khomas",
    addressCountry: "NA",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -22.5597,
    longitude: 17.0832,
  },
  areaServed: ["Windhoek", "Namibia"],
  knowsAbout: [
    "water refill vending machines",
    "purified drinking water",
    "institutional water solutions",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${inter.variable} ${plexMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessJsonLd),
          }}
        />
      </body>
    </html>
  );
}
