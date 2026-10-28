"use client";

import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface PreviewableVideo {
  vimeoId: string;
  title: string;
  name?: string;
  company?: string;
}

interface VideoPreviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: PreviewableVideo[];
  index: number;
  onIndexChange: (index: number) => void;
}

/** Faster first paint: 360p + preload; browser may upgrade after start. */
function dialogPlayerSrc(vimeoId: string) {
  const params = new URLSearchParams({
    autoplay: "1",
    title: "0",
    byline: "0",
    portrait: "0",
    playsinline: "1",
    quality: "360p",
    preload: "auto",
    dnt: "1",
  });
  return `https://player.vimeo.com/video/${vimeoId}?${params.toString()}`;
}

export function VideoPreviewDialog({
  open,
  onOpenChange,
  items,
  index,
  onIndexChange,
}: VideoPreviewDialogProps) {
  const current = items[index] ?? null;
  const count = items.length;
  const caption = [current?.name, current?.company].filter(Boolean).join(" · ");
  const [buffering, setBuffering] = React.useState(true);

  const goPrev = React.useCallback(() => {
    if (count < 2) return;
    onIndexChange((index - 1 + count) % count);
  }, [count, index, onIndexChange]);

  const goNext = React.useCallback(() => {
    if (count < 2) return;
    onIndexChange((index + 1) % count);
  }, [count, index, onIndexChange]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") goPrev();
      if (event.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, goPrev, goNext]);

  React.useEffect(() => {
    setBuffering(true);
  }, [current?.vimeoId, open]);

  // Prefetch next/prev player documents while dialog is open.
  React.useEffect(() => {
    if (!open || count < 2) return;
    const warmIds = [
      items[(index + 1) % count]?.vimeoId,
      items[(index - 1 + count) % count]?.vimeoId,
    ].filter(Boolean) as string[];

    const links = warmIds.map((id) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = dialogPlayerSrc(id);
      link.as = "document";
      document.head.appendChild(link);
      return link;
    });

    return () => {
      links.forEach((link) => link.remove());
    };
  }, [open, index, count, items]);

  return (
    <DialogPrimitive.Root open={open} onOpenChange={onOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-[60] bg-primary/85 backdrop-blur-sm",
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
            {current?.title ?? "Video review preview"}
          </DialogPrimitive.Title>

          <DialogPrimitive.Close
            className="absolute right-2 top-2 z-10 inline-flex min-h-11 min-w-11 items-center justify-center rounded-[10px] border-2 border-primary bg-accent text-primary shadow-[3px_3px_0_0_#131311] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-3 sm:top-3"
            aria-label="Close preview"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </DialogPrimitive.Close>

          {count > 1 ? (
            <>
              <button
                type="button"
                aria-label="Previous video"
                className="absolute left-2 top-1/2 z-10 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-[10px] border-2 border-primary bg-background text-primary shadow-[3px_3px_0_0_#131311] hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:left-3"
                onClick={goPrev}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                aria-label="Next video"
                className="absolute right-2 top-1/2 z-10 inline-flex min-h-11 min-w-11 -translate-y-1/2 items-center justify-center rounded-[10px] border-2 border-primary bg-background text-primary shadow-[3px_3px_0_0_#131311] hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:right-3"
                onClick={goNext}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            </>
          ) : null}

          {current ? (
            <div className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3">
              <div className="relative aspect-[9/16] h-full max-h-[min(85vh,820px)] w-full max-w-[min(100%,420px)] overflow-hidden rounded-[12px] border-2 border-primary bg-neutral-950 shadow-[6px_6px_0_0_#C6FD50]">
                {buffering ? (
                  <div className="absolute inset-0 z-[1] flex items-center justify-center bg-neutral-950">
                    <span className="h-10 w-10 animate-spin rounded-full border-2 border-accent border-t-transparent" />
                  </div>
                ) : null}
                <iframe
                  key={current.vimeoId}
                  src={dialogPlayerSrc(current.vimeoId)}
                  title={current.title}
                  className="absolute inset-0 h-full w-full"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  onLoad={() => setBuffering(false)}
                />
              </div>
              <div className="max-w-md px-4 text-center">
                <p className="text-sm font-bold text-text-on-dark sm:text-base">
                  {current.title}
                </p>
                {caption ? (
                  <p className="mt-1 text-small text-text-on-dark/80">
                    {caption}
                  </p>
                ) : null}
                {count > 1 ? (
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.12em] text-accent">
                    {index + 1} / {count}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
