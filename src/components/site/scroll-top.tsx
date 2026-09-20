"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Floating scroll-to-top. Bottom-left, round, appears after the first
 * viewport of scrolling; hides near the top. Mirrors the WhatsApp button
 * on the opposite corner so neither overlaps the other.
 */
export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY > 700;
      const nearFooter =
        window.innerHeight + window.scrollY >
        document.documentElement.scrollHeight - 320;
      setVisible(scrolled && !nearFooter);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Scroll back to top"
      tabIndex={visible ? 0 : -1}
      className={cn(
        "fixed bottom-5 left-5 z-40 inline-flex items-center justify-center h-12 w-12 rounded-full border border-rule bg-paper text-primary shadow-lg shadow-deep/15 transition-[opacity,transform,background-color] duration-300 hover:bg-primary hover:text-white",
        visible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      )}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
