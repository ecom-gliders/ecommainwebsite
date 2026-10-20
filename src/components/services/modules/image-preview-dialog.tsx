"use client";

import * as React from "react";
import Image from "next/image";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PreviewableImage {
  src: string;
  alt: string;
  caption?: string;
}

interface ImagePreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  image: PreviewableImage | null;
}

export function ImagePreviewDialog({
  open,
  onOpenChange,
  image,
}: ImagePreviewDialogProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[60] bg-primary/80 backdrop-blur-sm",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed inset-3 z-[61] flex flex-col outline-none sm:inset-6 md:inset-10",
            "data-[state=open]:animate-in data-[state=closed]:animate-out",
            "data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
            "data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95",
          )}
          aria-describedby={undefined}
        >
          <DialogPrimitive.Title className="sr-only">
            {image?.alt ?? "Image preview"}
          </DialogPrimitive.Title>
          <DialogPrimitive.Close
            className="absolute right-2 top-2 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border-2 border-primary bg-accent text-primary shadow-[3px_3px_0_0_#131311] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-3 sm:top-3"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          {image ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
              <div className="relative h-full max-h-[min(85vh,900px)] w-full max-w-6xl overflow-hidden rounded-[12px] border-2 border-primary bg-neutral-950 shadow-[6px_6px_0_0_#9FE870]">
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="100vw"
                  quality={75}
                  aria-hidden="true"
                  className="scale-110 object-cover opacity-70 blur-2xl saturate-150"
                />
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="100vw"
                  quality={85}
                  className="object-contain object-center p-2 sm:p-4"
                />
              </div>
              {image.caption ? (
                <p className="mt-3 max-w-3xl px-4 text-center text-small text-text-on-dark/85">
                  {image.caption}
                </p>
              ) : null}
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

export function useImagePreview() {
  const [preview, setPreview] = React.useState<PreviewableImage | null>(null);
  return {
    preview,
    open: Boolean(preview),
    openPreview: setPreview,
    onOpenChange: (next: boolean) => {
      if (!next) setPreview(null);
    },
  };
}
