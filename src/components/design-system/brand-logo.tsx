import Image from "next/image";
import { designSystem } from "@/lib/design-tokens";
import { cn } from "@/lib/utils";

interface BrandLogoProps {
  className?: string;
  width: number;
  height: number;
  alt?: string;
  /** Header / LCP: true. Footer and secondary: false (lazy). */
  priority?: boolean;
  /**
   * `onDark` — lighten mark for navy/charcoal chrome (logo assets are navy wordmark).
   * `default` — mark as authored for light surfaces.
   */
  surface?: "default" | "onDark";
}

export function BrandLogo({
  className,
  width,
  height,
  alt = `${designSystem.brand.name} logo`,
  priority = false,
  surface = "default",
}: BrandLogoProps) {
  const src =
    surface === "onDark"
      ? designSystem.brand.logo.dark
      : designSystem.brand.logo.light;

  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={cn(
        "max-w-full object-contain",
        surface === "onDark" && "brightness-0 invert",
        className,
      )}
      priority={priority}
      sizes={`${width}px`}
      quality={85}
    />
  );
}
