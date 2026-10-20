"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { ContainedMedia } from "./contained-media";
import {
  ImagePreviewDialog,
  useImagePreview,
  type PreviewableImage,
} from "./image-preview-dialog";

export interface BrowserProofImage {
  src: string;
  alt: string;
  caption?: string;
}

interface BrowserProofStageProps {
  images: BrowserProofImage[];
  disclaimer?: string;
}

type FrameKind = "browser" | "phone";

interface SizedImage extends BrowserProofImage {
  kind: FrameKind;
  width: number;
  height: number;
}

function classify(width: number, height: number): FrameKind {
  return width >= height ? "browser" : "phone";
}

function proofUrlLabel(src: string): string {
  if (src.includes("sellerboard") || src.includes("brand-yoy")) {
    return "app.sellerboard.com";
  }
  if (src.includes("primeday") || src.includes("803k") || src.includes("90day")) {
    return "sellercentral.amazon.com";
  }
  if (src.includes("dashboard")) {
    return "sellercentral.amazon.com";
  }
  return "ecomgliders.com";
}

function useSizedImages(images: BrowserProofImage[]): {
  sized: SizedImage[];
  ready: boolean;
} {
  const sourceKey = images.map((image) => image.src).join("|");
  const [sized, setSized] = useState<SizedImage[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const snapshot = images;

    async function load() {
      const results = await Promise.all(
        snapshot.map(
          (image) =>
            new Promise<SizedImage>((resolve) => {
              const img = new window.Image();
              img.onload = () => {
                const width = img.naturalWidth || 16;
                const height = img.naturalHeight || 10;
                resolve({
                  ...image,
                  width,
                  height,
                  kind: classify(width, height),
                });
              };
              img.onerror = () => {
                resolve({
                  ...image,
                  width: 16,
                  height: 10,
                  kind: "browser",
                });
              };
              img.src = image.src;
            }),
        ),
      );

      if (!cancelled) {
        setSized(results);
        setReady(true);
      }
    }

    setReady(false);
    void load();
    return () => {
      cancelled = true;
    };
  }, [sourceKey, images]);

  return { sized, ready };
}

/** macOS Safari/Chrome window — matches services hub hero frame. */
function DesktopFrame({
  image,
  className,
  onPreview,
}: {
  image: PreviewableImage;
  className?: string;
  onPreview: () => void;
}) {
  const url = proofUrlLabel(image.src);

  return (
    <button
      type="button"
      onClick={onPreview}
      aria-label={`Preview: ${image.alt}`}
      className={cn(
        "block w-full overflow-hidden rounded-[12px] border border-white/15 bg-[#ececef] text-left",
        "shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ring-1 ring-black/20",
        "transition-transform duration-300 ease-out motion-safe:hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        className,
      )}
    >
      <div className="flex h-10 items-center gap-3 bg-[#e4e4e7] px-3.5">
        <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-black/8 bg-white px-2.5 py-1 shadow-sm">
          <Lock
            className="h-3 w-3 shrink-0 text-neutral-400"
            aria-hidden="true"
          />
          <span className="truncate text-[11px] font-medium text-neutral-500">
            {url}
          </span>
        </div>
      </div>
      <ContainedMedia
        src={image.src}
        alt={image.alt}
        aspectClassName="aspect-[16/10]"
        sizes="(max-width: 768px) 100vw, 70vw"
      />
    </button>
  );
}

/** iPhone-style device — notch, status bar, home indicator. */
function PhoneFrame({
  image,
  className,
  onPreview,
}: {
  image: PreviewableImage;
  className?: string;
  onPreview: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPreview}
      aria-label={`Preview: ${image.alt}`}
      className={cn(
        "block w-full overflow-hidden rounded-[2rem] border border-white/20 bg-[#1c1c1e] p-2 text-left",
        "shadow-[0_28px_50px_-20px_rgba(0,0,0,0.75)] ring-1 ring-black/30",
        "transition-transform duration-300 ease-out motion-safe:hover:-translate-y-1",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[1.55rem] bg-black">
        <div
          className="relative flex items-center justify-between px-5 pb-1 pt-3 text-[10px] font-semibold text-white"
          aria-hidden="true"
        >
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-[1.15rem] w-[5.5rem] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center gap-1">
            <span className="flex items-end gap-[2px]">
              {[4, 6, 8, 10].map((h) => (
                <span
                  key={h}
                  className="w-[2.5px] rounded-sm bg-white"
                  style={{ height: h }}
                />
              ))}
            </span>
            <span className="ml-0.5 h-[10px] w-[18px] rounded-[3px] border border-white/80 p-px">
              <span className="block h-full w-[70%] rounded-[1.5px] bg-white" />
            </span>
          </div>
        </div>
        <ContainedMedia
          src={image.src}
          alt={image.alt}
          aspectClassName="aspect-[9/16]"
          sizes="(max-width: 768px) 60vw, 28vw"
        />
        <div className="flex justify-center bg-black py-2" aria-hidden="true">
          <span className="h-1 w-24 rounded-full bg-white/35" />
        </div>
      </div>
    </button>
  );
}

function StageShell({ children }: { children: ReactNode }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[16px] border-2 border-primary bg-primary",
        "shadow-[6px_6px_0_0_#131311]",
        "px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12",
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(159,232,112,0.12), transparent 55%), radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
          backgroundSize: "100% 100%, 22px 22px",
        }}
      />
      <div className="relative mx-auto max-w-5xl">{children}</div>
    </div>
  );
}

/**
 * Dimension-aware proof stage:
 * - landscape → browser chrome
 * - portrait → phone chrome
 * - two browsers → left-layered stack
 * - browser + phone → desktop dominant + phone overlap
 * Tap opens full preview (contain + blur).
 */
export function BrowserProofStage({
  images,
  disclaimer,
}: BrowserProofStageProps) {
  const { sized, ready } = useSizedImages(images);
  const { preview, open, openPreview, onOpenChange } = useImagePreview();

  if (images.length === 0) return null;

  const primary = sized[0] ?? null;
  const secondary = sized[1] ?? null;
  const stageCaption = images[0]?.caption;
  const secondaryNote =
    images[1]?.caption && images[1].caption !== stageCaption
      ? images[1].caption
      : null;

  const bothBrowser =
    ready &&
    primary?.kind === "browser" &&
    secondary?.kind === "browser";
  const primaryBrowserSecondaryPhone =
    ready &&
    primary?.kind === "browser" &&
    secondary?.kind === "phone";
  const primaryPhone =
    ready && primary?.kind === "phone" && !secondary;
  const twoPhones =
    ready && primary?.kind === "phone" && secondary?.kind === "phone";
  const phoneThenBrowser =
    ready && primary?.kind === "phone" && secondary?.kind === "browser";

  return (
    <div>
      <StageShell>
        {!ready || !primary ? (
          <div className="aspect-[16/10] w-full animate-pulse rounded-[10px] bg-white/10" />
        ) : bothBrowser && secondary ? (
          <>
            {/* Layered browsers — left back, right front */}
            <div className="relative hidden min-h-[280px] md:block lg:min-h-[320px]">
              <div className="relative z-0 w-[68%] -rotate-1">
                <DesktopFrame
                  image={primary}
                  onPreview={() => openPreview(primary)}
                />
              </div>
              <div className="absolute bottom-[-4%] right-0 z-10 w-[68%] rotate-1">
                <DesktopFrame
                  image={secondary}
                  onPreview={() => openPreview(secondary)}
                />
              </div>
              <div className="h-16" aria-hidden="true" />
            </div>
            <div className="space-y-4 md:hidden">
              <DesktopFrame
                image={primary}
                onPreview={() => openPreview(primary)}
              />
              <DesktopFrame
                image={secondary}
                onPreview={() => openPreview(secondary)}
              />
            </div>
          </>
        ) : primaryBrowserSecondaryPhone && secondary ? (
          <>
            <div className="relative hidden md:block">
              <DesktopFrame
                image={primary}
                className="w-[72%]"
                onPreview={() => openPreview(primary)}
              />
              <div className="absolute bottom-[-6%] right-[2%] w-[30%] max-w-[220px]">
                <PhoneFrame
                  image={secondary}
                  onPreview={() => openPreview(secondary)}
                />
              </div>
              <div className="h-10 lg:h-14" aria-hidden="true" />
            </div>
            <div className="md:hidden">
              <DesktopFrame
                image={primary}
                onPreview={() => openPreview(primary)}
              />
              <div className="relative z-10 mx-auto -mt-8 w-[58%] max-w-[220px]">
                <PhoneFrame
                  image={secondary}
                  onPreview={() => openPreview(secondary)}
                />
              </div>
            </div>
          </>
        ) : phoneThenBrowser && secondary ? (
          <>
            {/* Prefer browser as dominant even if listed second */}
            <div className="relative hidden md:block">
              <DesktopFrame
                image={secondary}
                className="w-[72%]"
                onPreview={() => openPreview(secondary)}
              />
              <div className="absolute bottom-[-6%] right-[2%] w-[30%] max-w-[220px]">
                <PhoneFrame
                  image={primary}
                  onPreview={() => openPreview(primary)}
                />
              </div>
              <div className="h-10 lg:h-14" aria-hidden="true" />
            </div>
            <div className="md:hidden">
              <DesktopFrame
                image={secondary}
                onPreview={() => openPreview(secondary)}
              />
              <div className="relative z-10 mx-auto -mt-8 w-[58%] max-w-[220px]">
                <PhoneFrame
                  image={primary}
                  onPreview={() => openPreview(primary)}
                />
              </div>
            </div>
          </>
        ) : twoPhones && secondary ? (
          <>
            <div className="relative mx-auto hidden max-w-md md:block">
              <div className="relative z-0 w-[70%] -rotate-2">
                <PhoneFrame
                  image={primary}
                  onPreview={() => openPreview(primary)}
                />
              </div>
              <div className="absolute bottom-[-4%] right-0 z-10 w-[70%] rotate-2">
                <PhoneFrame
                  image={secondary}
                  onPreview={() => openPreview(secondary)}
                />
              </div>
              <div className="h-12" aria-hidden="true" />
            </div>
            <div className="mx-auto flex max-w-[240px] flex-col gap-4 md:hidden">
              <PhoneFrame
                image={primary}
                onPreview={() => openPreview(primary)}
              />
              <PhoneFrame
                image={secondary}
                onPreview={() => openPreview(secondary)}
              />
            </div>
          </>
        ) : primaryPhone ? (
          <div className="mx-auto w-full max-w-[260px]">
            <PhoneFrame
              image={primary}
              onPreview={() => openPreview(primary)}
            />
          </div>
        ) : (
          <div className="mx-auto w-full max-w-4xl">
            <DesktopFrame
              image={primary}
              onPreview={() => openPreview(primary)}
            />
          </div>
        )}
      </StageShell>

      {stageCaption ? (
        <p className="mt-4 max-w-3xl text-small font-medium text-primary">
          {stageCaption}
        </p>
      ) : null}
      {secondaryNote ? (
        <p className="mt-1 max-w-3xl text-xs text-text-secondary">
          {secondaryNote}
        </p>
      ) : null}
      {disclaimer ? (
        <p className="mt-2 max-w-3xl text-xs leading-relaxed text-text-secondary">
          {disclaimer}
        </p>
      ) : null}

      <ImagePreviewDialog
        open={open}
        onOpenChange={onOpenChange}
        image={preview}
      />
    </div>
  );
}
