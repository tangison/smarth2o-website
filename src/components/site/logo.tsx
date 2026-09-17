import { cn } from "@/lib/utils";

/**
 * Smart H₂O wordmark with water-drop mark.
 * Renders crisply at any size; `light` variant for dark backgrounds.
 */
export function Logo({
  className,
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg
        width="34"
        height="34"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M20 3C20 3 8 16.5 8 24.5C8 31.4 13.4 37 20 37C26.6 37 32 31.4 32 24.5C32 16.5 20 3 20 3Z"
          fill="url(#h2o-drop)"
        />
        <path
          d="M14.5 25.5C14.5 29 17 31.5 20.5 31.5"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <defs>
          <linearGradient id="h2o-drop" x1="8" y1="3" x2="32" y2="37" gradientUnits="userSpaceOnUse">
            <stop stopColor="#2DD4BF" />
            <stop offset="0.55" stopColor="#0D9488" />
            <stop offset="1" stopColor="#0F766E" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className={cn(
          "font-display font-bold tracking-tight leading-none",
          light ? "text-white" : "text-foreground"
        )}
      >
        Smart
        <span className={light ? "text-teal-300" : "text-teal-600"}> H₂O</span>
      </span>
    </span>
  );
}
