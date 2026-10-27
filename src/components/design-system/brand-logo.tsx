import { designSystem } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  /** Kept for call-site compatibility. */
  width?: number;
  /** Kept for call-site compatibility. */
  height?: number;
  alt?: string;
  /** Kept for call-site compatibility. */
  priority?: boolean;
  /**
   * `onDark` — eCom white, Glider lime (header / footer).
   * `default` — eCom ink, Glider lime (light surfaces).
   */
  surface?: "default" | "onDark";
}

/**
 * Text wordmark — eCom Glider.
 * Scales with type size (no padded raster box in the header pill).
 */
export function BrandLogo({
  className,
  alt = designSystem.brand.name,
  surface = "default",
}: BrandLogoProps) {
  const ecomClass = surface === "onDark" ? "text-white" : "text-primary";

  return (
    <span
      role="img"
      aria-label={alt}
      className={cn(
        "inline-flex max-w-full items-baseline whitespace-nowrap font-black tracking-tight",
        "text-[1.35rem] leading-none sm:text-[1.6rem] md:text-[1.85rem]",
        className,
      )}
    >
      <span className={ecomClass}>eCom</span>
      <span className="text-accent">&nbsp;Glider</span>
    </span>
  );
}
