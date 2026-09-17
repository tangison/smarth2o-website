import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Smart H₂O | Smart Water-Refill Solutions for Namibia",
  description:
    "Smart H₂O Solutions and Trading CC provides smart water-refill vending solutions for Namibian campuses, hospitals, workplaces and public facilities. Purified refill water, cashless access, professional maintenance.",
  keywords: [
    "Smart H₂O",
    "water refill Namibia",
    "water vending machine Windhoek",
    "purified water",
    "reusable bottles",
    "campus water",
    "hospital water solution",
  ],
  authors: [{ name: "Smart H₂O Solutions and Trading CC" }],
  openGraph: {
    title: "Smart H₂O | Smart Water-Refill Solutions for Namibia",
    description:
      "Purified refill water for Namibian campuses, hospitals, workplaces and public facilities.",
    siteName: "Smart H₂O",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${outfit.variable} ${inter.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
