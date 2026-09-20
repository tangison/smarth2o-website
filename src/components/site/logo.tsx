import { cn } from "@/lib/utils";

/**
 * The official Smart H₂O logo lockups, shipped as true SVG from the client
 * asset package. Never redraw, stretch or recolour. Horizontal lockup in the
 * header and wide placements, stacked lockup in the footer and square
 * placements. On navy or any dark surface the lockup renders solid white
 * with the approved filter: brightness(0) invert(1). On white or light
 * surfaces it keeps its original colours.
 */
export function Logo({
  className,
  light = false,
  stacked = false,
  priority = false,
}: {
  className?: string;
  light?: boolean;
  stacked?: boolean;
  priority?: boolean;
}) {
  const src = stacked
    ? "/images/svg/smart-h2o-logo-stacked.svg"
    : "/images/svg/smart-h2o-logo-horizontal.svg";
  return (
    <img
      src={src}
      alt="Smart H₂O"
      width={stacked ? 820 : 883}
      height={stacked ? 646 : 253}
      className={cn("h-auto w-auto", light && "brightness-0 invert", className)}
      {...(priority ? { fetchPriority: "high" as const } : {})}
    />
  );
}
