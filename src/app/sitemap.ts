import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const PAGES = [
  { path: "/", priority: 1, freq: "monthly" as const },
  { path: "/vending", priority: 0.9, freq: "monthly" as const },
  { path: "/institutions", priority: 0.9, freq: "monthly" as const },
  { path: "/advertising", priority: 0.8, freq: "monthly" as const },
  { path: "/how-it-works", priority: 0.7, freq: "monthly" as const },
  { path: "/quality", priority: 0.7, freq: "monthly" as const },
  { path: "/active", priority: 0.5, freq: "monthly" as const },
  { path: "/about", priority: 0.6, freq: "yearly" as const },
  { path: "/contact", priority: 0.8, freq: "yearly" as const },
  { path: "/brand", priority: 0.3, freq: "yearly" as const },
  { path: "/privacy", priority: 0.2, freq: "yearly" as const },
  { path: "/terms", priority: 0.2, freq: "yearly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return PAGES.map((p) => ({
    url: `${SITE.url}${p.path}`,
    lastModified: now,
    changeFrequency: p.freq,
    priority: p.priority,
  }));
}
