"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
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

export interface BrowserProofCallout {
  metric: string;
  metricLabel?: string;
  points?: string[];
}

interface BrowserProofStageProps {
  images: BrowserProofImage[];
  disclaimer?: string;
  callout?: BrowserProofCallout;
  heading?: string;
}

interface SizedImage extends BrowserProofImage {
  width: number;
  height: number;
  isPortrait: boolean;
}

function sanitizeCaption(caption: string | undefined): string | undefined {
  if (!caption) return undefined;
  const cleaned = caption
    .replace(/\s*Source:\s*[^\s.].*/gi, "")
    .replace(/\s*source\s+github\.ecom.*/gi, "")
    .replace(/\s*growth\.ecomgliders\.com\.?/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();
  if (!cleaned) return undefined;
  if (/github\.ecom|multi-year brand growth snapshot seller dashboard/i.test(cleaned)) {
    return undefined;
  }
  return cleaned;
}

function deriveCallout(
  images: BrowserProofImage[],
  callout?: BrowserProofCallout,
): BrowserProofCallout {
  if (callout?.metric) {
    return {
      metric: callout.metric,
      metricLabel: callout.metricLabel,
      points: callout.points?.filter(Boolean).slice(0, 4),
    };
  }

  const caption = sanitizeCaption(images.find((image) => image.caption)?.caption);
  const alt = images[0]?.alt ?? "";

  const money =
    caption?.match(/\$[\d,.]+[MBKmbk]?/)?.[0] ??
    alt.match(/\$[\d,.]+[MBKmbk]?/)?.[0];
  const percent =
    caption?.match(/\+?\d{1,3}%/)?.[0] ?? alt.match(/\+?\d{1,3}%/)?.[0];

  return {
    metric: money ?? percent ?? "Verified account view",
    metricLabel:
      sanitizeCaption(images[0]?.caption) ??
      "Live Seller Central / Seller app performance",
    points: images
      .slice(0, 3)
      .map((image) => sanitizeCaption(image.caption))
      .filter((value): value is string => Boolean(value)),
  };
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
                const width = img.naturalWidth || 9;
                const height = img.naturalHeight || 16;
                resolve({
                  ...image,
                  width,
                  height,
                  isPortrait: height >= width,
                });
              };
              img.onerror = () => {
                resolve({
                  ...image,
                  width: 9,
                  height: 16,
                  isPortrait: true,
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

function pickPhoneImage(sized: SizedImage[]): SizedImage | null {
  if (sized.length === 0) return null;
  const appLike = sized.find((image) =>
    /primeday|803k|90day|small-brand|seller.?app/i.test(image.src),
  );
  if (appLike) return appLike;
  const portrait = sized.find((image) => image.isPortrait);
  if (portrait) return portrait;
  return sized[0];
}

/** Compact iPhone-style device — shorter than full 9:16 so the stage stays dense. */
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
        "block w-full overflow-hidden rounded-[1.55rem] border border-white/20 bg-[#1c1c1e] p-1.5 text-left",
        "shadow-[0_22px_40px_-18px_rgba(0,0,0,0.75)] ring-1 ring-black/30",
        "transition-transform duration-300 ease-out motion-safe:hover:-translate-y-0.5",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        className,
      )}
    >
      <div className="overflow-hidden rounded-[1.25rem] bg-black">
        <div
          className="relative flex items-center justify-between px-4 pb-0.5 pt-2.5 text-xs font-semibold text-white"
          aria-hidden="true"
        >
          <span>9:41</span>
          <span className="absolute left-1/2 top-2 h-[1rem] w-[4.75rem] -translate-x-1/2 rounded-full bg-black" />
          <div className="flex items-center gap-1">
            <span className="flex items-end gap-[2px]">
              {[3, 5, 7, 9].map((h) => (
                <span
                  key={h}
                  className="w-[2.5px] rounded-sm bg-white"
                  style={{ height: h }}
                />
              ))}
            </span>
            <span className="ml-0.5 h-[9px] w-[16px] rounded-[3px] border border-white/80 p-px">
              <span className="block h-full w-[70%] rounded-[1px] bg-white" />
            </span>
          </div>
        </div>
        <div className="relative aspect-[9/14] w-full bg-black">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 768px) 60vw, 260px"
            quality={80}
            className="object-cover object-top"
          />
        </div>
        <div className="flex justify-center bg-black py-1.5" aria-hidden="true">
          <span className="h-1 w-20 rounded-full bg-white/35" />
        </div>
      </div>
    </button>
  );
}

/**
 * Feature callout stage: large green metric copy on the left,
 * single mobile mockup on the right. No dual-device collage.
 */
export function BrowserProofStage({
  images,
  disclaimer,
  callout,
}: BrowserProofStageProps) {
  const { sized, ready } = useSizedImages(images);
  const { preview, open, openPreview, onOpenChange } = useImagePreview();
  const resolved = deriveCallout(images, callout);
  const phone = pickPhoneImage(sized);

  if (images.length === 0) return null;

  return (
    <div>
      <div
        className={cn(
          "relative overflow-hidden rounded-[18px] border-2 border-primary bg-primary",
          "shadow-[5px_5px_0_0_#131311]",
          "px-5 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9",
        )}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-45"
          aria-hidden="true"
          style={{
            backgroundImage:
              "radial-gradient(ellipse 55% 70% at 18% 45%, color-mix(in srgb, var(--color-accent) 18%, transparent), transparent 60%), radial-gradient(ellipse 50% 60% at 88% 50%, color-mix(in srgb, var(--color-accent) 12%, transparent), transparent 55%), radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)",
            backgroundSize: "100% 100%, 100% 100%, 18px 18px",
          }}
        />

        <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6 sm:gap-7 lg:max-w-5xl lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <div className="min-w-0 w-full max-w-md lg:max-w-xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.16em] text-accent sm:text-xs">
              Verified Seller tools
            </p>
            <p className="service-callout-metric mt-2.5">{resolved.metric}</p>
            {resolved.metricLabel ? (
              <p className="mt-2.5 text-[clamp(1.15rem,2vw,1.45rem)] font-bold leading-snug text-text-on-dark">
                {resolved.metricLabel}
              </p>
            ) : null}
            {resolved.points && resolved.points.length > 0 ? (
              <ul className="mt-4 grid gap-2">
                {resolved.points.map((point) => (
                  <li
                    key={point}
                    className="flex w-fit max-w-full gap-2.5 rounded-[10px] border border-white/10 bg-white/[0.05] px-3.5 py-2.5 text-sm font-medium leading-snug text-text-on-dark/90 sm:text-[0.95rem]"
                  >
                    <span
                      className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            ) : disclaimer ? (
              <p className="mt-3 text-sm leading-relaxed text-text-on-dark/65">
                {disclaimer.replace(/\s*Source:.*$/i, "").trim()}
              </p>
            ) : null}
          </div>

          <div className="w-full max-w-[220px] shrink-0 sm:max-w-[235px] lg:max-w-[250px]">
            {!ready || !phone ? (
              <div className="aspect-[9/14] w-full animate-pulse rounded-[1.55rem] bg-white/10" />
            ) : (
              <PhoneFrame
                image={phone}
                onPreview={() => openPreview(phone)}
              />
            )}
          </div>
        </div>
      </div>

      <ImagePreviewDialog
        open={open}
        onOpenChange={onOpenChange}
        image={preview}
      />
    </div>
  );
}
