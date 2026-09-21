import { cn } from "@/lib/utils";

/**
 * Official Smart H₂O logo lockups, shipped as true SVG from the client
 * asset packages. Never redraw, stretch or recolour.
 *
 * - colour (default): the original colour files. Horizontal lockup in the
 *   header and wide placements, stacked lockup in square placements.
 * - white: the client-issued white stacked lockup
 *   (smart-h2o-logo-white-stacked.svg). The artwork is already solid
 *   white, so no CSS filter is applied. This is the footer mark on Deep
 *   Water and any other dark surface.
 * - light: forces the colour file to solid white with the approved
 *   brightness(0) invert(1) filter. Kept for dark surfaces that still
 *   use the colour files (header).
 *
 * `stacked` only selects between the two colour files; `white` ships as
 * the stacked lockup and takes precedence.
 */
export function Logo({
  className,
  light = false,
  white = false,
  stacked = false,
  priority = false,
}: {
  className?: string;
  /** Force the colour file to white with the approved CSS filter. */
  light?: boolean;
  /** Use the client-issued white file (no filter). */
  white?: boolean;
  stacked?: boolean;
  priority?: boolean;
}) {
  const src = white
    ? "/images/svg/smart-h2o-logo-white-stacked.svg"
    : stacked
      ? "/images/svg/smart-h2o-logo-stacked.svg"
      : "/images/svg/smart-h2o-logo-horizontal.svg";
  const intrinsic = white
    ? { width: 966, height: 726 }
    : stacked
      ? { width: 820, height: 646 }
      : { width: 883, height: 253 };
  return (
    <img
      src={src}
      alt="Smart H₂O"
      width={intrinsic.width}
      height={intrinsic.height}
      className={cn(
        "h-auto w-auto",
        !white && light && "brightness-0 invert",
        className
      )}
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );
}
