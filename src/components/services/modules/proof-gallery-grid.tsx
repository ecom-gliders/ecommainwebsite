"use client";

import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";
import { ContainedMedia } from "./contained-media";
import {
  ImagePreviewDialog,
  useImagePreview,
} from "./image-preview-dialog";

export interface ProofGalleryItem {
  src: string;
  alt: string;
  caption?: string;
}

interface ProofGalleryGridProps {
  items: ProofGalleryItem[];
}

export function ProofGalleryGrid({ items }: ProofGalleryGridProps) {
  const { preview, open, openPreview, onOpenChange } = useImagePreview();
  const isSingle = items.length === 1;

  return (
    <>
      <ul
        className={cn(
          "grid gap-4",
          isSingle
            ? "grid-cols-1"
            : "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {items.map((item) => (
          <li
            key={item.src}
            className={cn(serviceHardPanel, "p-5 sm:p-6", isSingle && "col-span-full")}
          >
            <button
              type="button"
              onClick={() => openPreview(item)}
              className="group block w-full overflow-hidden rounded-[10px] border-2 border-primary text-left shadow-[3px_3px_0_0_#131311] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[5px_5px_0_0_#131311] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              aria-label={`Preview: ${item.alt}`}
            >
              <ContainedMedia
                src={item.src}
                alt={item.alt}
                aspectClassName={
                  isSingle
                    ? "aspect-[16/10] min-h-[280px] sm:min-h-[400px]"
                    : "aspect-[4/3]"
                }
                sizes={
                  isSingle
                    ? "(max-width: 768px) 100vw, (max-width: 1320px) 90vw, 1200px"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />
            </button>
            {item.caption ? (
              <p className="mt-3 text-small text-text-secondary">
                {item.caption}
              </p>
            ) : null}
          </li>
        ))}
      </ul>
      <ImagePreviewDialog
        open={open}
        onOpenChange={onOpenChange}
        image={preview}
      />
    </>
  );
}
