import { cn } from "@/lib/utils";

/**
 * The real Smart H₂O logo lockups, served from processed brand assets.
 * Never redraw, recolour or regenerate. Horizontal lockup in the header,
 * white reversed version for dark surfaces.
 */
export function Logo({
  className,
  light = false,
  width = 148,
  priority = false,
}: {
  className?: string;
  light?: boolean;
  width?: number;
  priority?: boolean;
}) {
  const src = light ? "/images/logo-horizontal-white.webp" : "/images/logo-horizontal.webp";
  // trimmed masters: 1100x259 (both variants, same aspect)
  const dims = { w: 1100, h: 259 };
  const height = Math.round(width * (dims.h / dims.w));
  return (
    <img
      src={src}
      alt="Smart H₂O"
      width={width}
      height={height}
      className={cn("h-auto w-auto", className)}
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );
}
