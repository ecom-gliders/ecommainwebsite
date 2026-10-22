"use client";

import Image from "next/image";
import { useCallback, useState, type SyntheticEvent } from "react";
import {
  DOMINANT_COLOR_FALLBACK,
  extractDominantColorFromImage,
} from "@/lib/blog/extract-dominant-color";
import { cn } from "@/lib/utils";

interface BlogFeaturedImageProps {
  src: string;
  alt: string;
  /** Outer frame classes (aspect, border, etc.) */
  className?: string;
  /** Extra classes on the Next/Image (e.g. hover scale) */
  imageClassName?: string;
  sizes: string;
  priority?: boolean;
  quality?: number;
}

/**
 * Featured image with object-contain. Letterbox gaps are filled by an absolute
 * layer painted with the image’s dominant color (sampled from the rendered
 * Next/Image element — same-origin `/_next/image`, so canvas is not tainted).
 */
export function BlogFeaturedImage({
  src,
  alt,
  className,
  imageClassName,
  sizes,
  priority = false,
  quality = 80,
}: BlogFeaturedImageProps) {
  const [backgroundColor, setBackgroundColor] = useState(
    DOMINANT_COLOR_FALLBACK,
  );

  const onImageLoad = useCallback(
    (event: SyntheticEvent<HTMLImageElement>) => {
      setBackgroundColor(extractDominantColorFromImage(event.currentTarget));
    },
    [],
  );

  return (
    <div className={cn("relative overflow-hidden", className)}>
      {/* Explicit fill layer — Next/Image `fill` spans the full box; letterbox gaps must paint behind it */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0"
        style={{ backgroundColor }}
      />
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        quality={quality}
        className={cn("z-[1] object-contain", imageClassName)}
        onLoad={onImageLoad}
      />
    </div>
  );
}
