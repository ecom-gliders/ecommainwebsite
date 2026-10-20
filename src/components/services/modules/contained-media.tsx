"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";

interface ContainedMediaProps {
  src: string;
  alt: string;
  className?: string;
  /** Frame aspect. Default 4/3 for gallery cards. */
  aspectClassName?: string;
  sizes?: string;
  quality?: number;
  priority?: boolean;
  /**
   * gallery — blur fill + contain FG (default).
   * spotlight — solid panel, no blur twin; diagram reads full-frame.
   */
  variant?: "gallery" | "spotlight";
}

/**
 * Fixed-aspect media well.
 * Gallery: object-contain foreground + blurred fill behind.
 * Spotlight: solid ink panel + contain only (no blur twin).
 */
export function ContainedMedia({
  src,
  alt,
  className,
  aspectClassName = "aspect-[4/3]",
  sizes = "(max-width: 1024px) 50vw, 33vw",
  quality = 85,
  priority = false,
  variant = "gallery",
}: ContainedMediaProps) {
  const isSpotlight = variant === "spotlight";

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        isSpotlight ? "bg-primary" : "bg-neutral-900",
        aspectClassName,
        className,
      )}
    >
      {!isSpotlight ? (
        <>
          <Image
            src={src}
            alt=""
            fill
            sizes={sizes}
            quality={75}
            aria-hidden="true"
            className="scale-125 object-cover opacity-80 blur-2xl saturate-150"
            priority={priority}
          />
          <div
            className="pointer-events-none absolute inset-0 bg-primary/30"
            aria-hidden="true"
          />
        </>
      ) : null}
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        quality={quality}
        className="object-contain object-center"
        priority={priority}
      />
    </div>
  );
}
