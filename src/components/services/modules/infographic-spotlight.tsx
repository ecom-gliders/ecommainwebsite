"use client";

import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";
import { ContainedMedia } from "./contained-media";
import {
  ImagePreviewDialog,
  useImagePreview,
} from "./image-preview-dialog";

export interface InfographicSpotlightImage {
  src: string;
  alt: string;
  caption?: string;
}

interface InfographicSpotlightProps {
  image: InfographicSpotlightImage;
}

export function InfographicSpotlight({ image }: InfographicSpotlightProps) {
  const { preview, open, openPreview, onOpenChange } = useImagePreview();

  return (
    <>
      <figure className={cn(serviceHardPanel, "p-4 sm:p-5")}>
        <button
          type="button"
          onClick={() => openPreview(image)}
          className="group block w-full overflow-hidden rounded-[10px] border-2 border-primary text-left shadow-[3px_3px_0_0_#131311] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#131311] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          aria-label={`Preview: ${image.alt}`}
        >
          <ContainedMedia
            src={image.src}
            alt={image.alt}
            variant="spotlight"
            aspectClassName="aspect-[16/10] min-h-[280px] sm:min-h-[420px] lg:min-h-[480px]"
            sizes="(max-width: 768px) 100vw, (max-width: 1320px) 90vw, 1200px"
            quality={85}
          />
        </button>
        {image.caption ? (
          <figcaption className="mt-3 text-small text-text-secondary">
            {image.caption}
          </figcaption>
        ) : null}
      </figure>
      <ImagePreviewDialog
        open={open}
        onOpenChange={onOpenChange}
        image={preview}
      />
    </>
  );
}
