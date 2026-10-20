"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { readNavLink, readRecordArray, readString } from "./section-data";

interface PromoCampaignSliderSectionProps {
  id: string;
  data: Record<string, unknown>;
}

type ComposedSlide = {
  kind: "composed";
  id: string;
  eyebrow?: string;
  headline: string;
  body?: string;
  cta: { label: string; href: string };
  ctaExternal?: boolean;
  leftImage?: string;
  leftImageAlt?: string;
  badgeImage?: string;
  badgeImageAlt?: string;
  rightImage?: string;
  rightImageAlt?: string;
  backgroundColor?: string;
};

type ImageSlide = {
  kind: "image";
  id: string;
  image: string;
  imageAlt: string;
  href: string;
  external?: boolean;
  backgroundColor?: string;
};

type CampaignSlide = ComposedSlide | ImageSlide;

const AUTOPLAY_MS = 5000;
const DRAG_THRESHOLD_PX = 48;
const DEFAULT_COMPOSED_BG = "#131311";
/** Fixed band height — prevents CLS when switching composed ↔ image slides. */
const BAND_HEIGHT = "h-[6.75rem] sm:h-[7.25rem] lg:h-[7.75rem]";
const RAIL =
  "relative hidden w-32 shrink-0 self-stretch overflow-visible sm:block lg:w-44";

function readHexColor(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(trimmed)
    ? trimmed
    : undefined;
}

function parseSlides(data: Record<string, unknown>): CampaignSlide[] {
  return readRecordArray(data.slides)
    .map((raw, index): CampaignSlide | null => {
      const kind = readString(raw.kind, "composed");
      const id = readString(raw.id, `slide-${index + 1}`);
      const backgroundColor = readHexColor(raw.backgroundColor);

      if (kind === "image") {
        const image = readString(raw.image);
        const href = readString(raw.href);
        if (!image || !href) return null;
        return {
          kind: "image",
          id,
          image,
          imageAlt: readString(raw.imageAlt, readString(raw.alt, "")),
          href,
          external: raw.external === true,
          backgroundColor,
        };
      }

      const cta = readNavLink(raw.cta);
      const headline = readString(raw.headline);
      if (!cta || !headline) return null;

      return {
        kind: "composed",
        id,
        eyebrow: readString(raw.eyebrow) || undefined,
        headline,
        body: readString(raw.body) || undefined,
        cta,
        ctaExternal: raw.ctaExternal === true,
        leftImage: readString(raw.leftImage) || undefined,
        leftImageAlt: readString(raw.leftImageAlt) || undefined,
        badgeImage: readString(raw.badgeImage) || undefined,
        badgeImageAlt: readString(raw.badgeImageAlt) || undefined,
        rightImage: readString(raw.rightImage) || undefined,
        rightImageAlt: readString(raw.rightImageAlt) || undefined,
        backgroundColor,
      };
    })
    .filter((slide): slide is CampaignSlide => slide !== null);
}

async function sampleDominantColor(src: string): Promise<string | null> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.decoding = "async";
    img.onload = () => {
      try {
        const w = 64;
        const h = Math.max(
          4,
          Math.round((img.naturalHeight / img.naturalWidth) * w),
        );
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        if (!ctx) {
          resolve(null);
          return;
        }
        ctx.drawImage(img, 0, 0, w, h);
        const { data } = ctx.getImageData(0, 0, w, h);
        const band = Math.max(2, Math.floor(w * 0.12));
        let r = 0;
        let g = 0;
        let b = 0;
        let n = 0;
        for (let y = 0; y < h; y++) {
          for (let x = 0; x < w; x++) {
            if (x >= band && x < w - band) continue;
            const i = (y * w + x) * 4;
            if (data[i + 3] < 200) continue;
            r += data[i];
            g += data[i + 1];
            b += data[i + 2];
            n++;
          }
        }
        if (!n) {
          resolve(null);
          return;
        }
        resolve(
          "#" +
            [r, g, b]
              .map((v) => Math.round(v / n).toString(16).padStart(2, "0"))
              .join(""),
        );
      } catch {
        resolve(null);
      }
    };
    img.onerror = () => resolve(null);
    img.src = src;
  });
}

function isLightHex(hexColor: string): boolean {
  const hex = hexColor.replace("#", "");
  const full =
    hex.length === 3
      ? hex
          .split("")
          .map((c) => c + c)
          .join("")
      : hex;
  if (full.length !== 6) return false;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return 0.2126 * r + 0.7152 * g + 0.0722 * b > 160;
}

function ComposedSlideView({
  slide,
  priority,
}: {
  slide: ComposedSlide;
  priority: boolean;
}) {
  const ctaClassName = cn(
    "promo-cta-pulse relative z-[1] inline-flex h-9 shrink-0 items-center justify-center gap-1.5",
    "rounded-[10px] border-2 border-primary bg-[#E23B3B] px-4",
    "text-[11px] font-bold uppercase tracking-[0.04em] text-white",
    "hover:bg-[#F04A4A] sm:h-10 sm:px-5 sm:text-[12px]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
  );

  const ctaInner = (
    <>
      {slide.cta.label}
      <ArrowRight size={14} strokeWidth={2.5} aria-hidden="true" />
    </>
  );

  const cta = slide.ctaExternal ? (
    <a
      href={slide.cta.href}
      target="_blank"
      rel="noopener noreferrer"
      className={ctaClassName}
      draggable={false}
    >
      {ctaInner}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={slide.cta.href} className={ctaClassName} draggable={false}>
      {ctaInner}
    </Link>
  );

  return (
    <div className="relative flex h-full items-stretch gap-2.5 px-4 sm:gap-3 sm:px-5 lg:gap-4 lg:px-6">
      {slide.leftImage ? (
        <div className={RAIL}>
          <div className="relative h-full w-full">
            <div className="absolute inset-x-0 bottom-0 top-0">
              <Image
                src={slide.leftImage}
                alt={slide.leftImageAlt ?? ""}
                fill
                className="object-contain object-bottom"
                sizes="176px"
                quality={85}
                priority={priority}
                draggable={false}
              />
            </div>
            {slide.badgeImage ? (
              <div className="absolute bottom-2 right-0 z-[1] h-10 w-10 rotate-[-8deg] sm:h-11 sm:w-11">
                <Image
                  src={slide.badgeImage}
                  alt={slide.badgeImageAlt || "Audit"}
                  fill
                  className="object-contain"
                  sizes="44px"
                  quality={85}
                  priority={priority}
                  draggable={false}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-4">
        {slide.badgeImage ? (
          <div className="relative h-9 w-9 shrink-0 rotate-[-8deg] sm:hidden">
            <Image
              src={slide.badgeImage}
              alt={slide.badgeImageAlt || "Audit"}
              fill
              className="object-contain"
              sizes="36px"
              quality={85}
              priority={priority}
              draggable={false}
            />
          </div>
        ) : null}

        <div className="min-w-0 flex-1">
          {slide.eyebrow ? (
            <span className="mb-0.5 block text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
              {slide.eyebrow}
            </span>
          ) : null}
          <p className="text-base font-black leading-[1.12] tracking-[-0.03em] text-text-on-dark sm:text-lg lg:text-xl">
            {slide.headline}
          </p>
          {slide.body ? (
            <p className="mt-1 line-clamp-2 max-w-xl text-[11px] leading-snug text-text-on-dark/70 sm:line-clamp-1 sm:text-xs">
              {slide.body}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 items-center">{cta}</div>
      </div>

      {slide.rightImage ? (
        <div className={RAIL}>
          <div className="absolute inset-0">
            <Image
              src={slide.rightImage}
              alt={slide.rightImageAlt ?? ""}
              fill
              className="object-contain object-bottom"
              sizes="176px"
              quality={85}
              priority={priority}
              draggable={false}
            />
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-6 bg-gradient-to-r from-primary to-transparent"
          />
        </div>
      ) : null}
    </div>
  );
}

function isAnimatedRaster(src: string): boolean {
  return /\.gif($|\?)/i.test(src);
}

function ImageSlideView({
  slide,
  priority,
  allowLink,
}: {
  slide: ImageSlide;
  priority: boolean;
  allowLink: boolean;
}) {
  const animated = isAnimatedRaster(slide.image);
  const media = (
    <div className="relative h-full w-full">
      <Image
        src={slide.image}
        alt={slide.imageAlt}
        fill
        className="object-contain object-center"
        sizes="(max-width: 1320px) 100vw, 1320px"
        quality={85}
        priority={priority}
        unoptimized={animated}
        draggable={false}
      />
    </div>
  );

  const shellClass = "block h-full w-full";

  if (!allowLink) {
    return (
      <div className="relative h-full px-3 py-2 sm:px-4">
        <div className={shellClass}>{media}</div>
      </div>
    );
  }

  const inner = slide.external ? (
    <a
      href={slide.href}
      target="_blank"
      rel="noopener noreferrer"
      className={shellClass}
      draggable={false}
    >
      {media}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={slide.href} className={shellClass} draggable={false}>
      {media}
    </Link>
  );

  return <div className="relative h-full px-3 py-2 sm:px-4">{inner}</div>;
}

/**
 * Post-hero campaign carousel — fixed-height band (no CLS), desktop arrows, drag.
 */
export function PromoCampaignSliderSection({
  id,
  data,
}: PromoCampaignSliderSectionProps) {
  const slides = parseSlides(data);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [sampledBg, setSampledBg] = useState<Record<string, string>>({});
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    pointerId: number | null;
    startX: number;
    lastX: number;
    dragged: boolean;
  }>({ pointerId: null, startX: 0, lastX: 0, dragged: false });
  const count = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (count === 0) return;
      setActive(((index % count) + count) % count);
    },
    [count],
  );

  const goPrev = useCallback(() => {
    setActive((current) => (count === 0 ? current : (current - 1 + count) % count));
  }, [count]);

  const goNext = useCallback(() => {
    setActive((current) => (count === 0 ? current : (current + 1) % count));
  }, [count]);

  useEffect(() => {
    if (count < 2 || paused || isDragging) return;
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % count);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, isDragging]);

  useEffect(() => {
    let cancelled = false;
    const pending = slides.filter(
      (slide): slide is ImageSlide =>
        slide.kind === "image" &&
        !slide.backgroundColor &&
        !sampledBg[slide.id],
    );
    if (pending.length === 0) return;

    void (async () => {
      const next: Record<string, string> = {};
      for (const slide of pending) {
        const hex = await sampleDominantColor(slide.image);
        if (hex) next[slide.id] = hex;
      }
      if (!cancelled && Object.keys(next).length > 0) {
        setSampledBg((prev) => ({ ...prev, ...next }));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [slides, sampledBg]);

  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el || count < 2) return;

    const isDotOrControl = (target: EventTarget | null) => {
      if (!(target instanceof Element)) return false;
      // Allow drag on slide links/images; only skip pagination controls.
      return Boolean(target.closest("button"));
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (isDotOrControl(event.target)) return;
      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        lastX: event.clientX,
        dragged: false,
      };
      setIsDragging(true);
      setPaused(true);
      el.setPointerCapture(event.pointerId);
    };

    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (drag.pointerId !== event.pointerId) return;
      drag.lastX = event.clientX;
      const dx = event.clientX - drag.startX;
      if (Math.abs(dx) > 6) drag.dragged = true;
      setDragOffset(dx);
    };

    const onUp = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (drag.pointerId !== event.pointerId) return;
      const dx = drag.lastX - drag.startX;
      try {
        el.releasePointerCapture(event.pointerId);
      } catch {
        /* already released */
      }
      const wasDragged = drag.dragged;
      dragRef.current = {
        pointerId: null,
        startX: 0,
        lastX: 0,
        dragged: wasDragged,
      };
      setDragOffset(0);
      setIsDragging(false);
      setPaused(false);

      if (Math.abs(dx) >= DRAG_THRESHOLD_PX) {
        if (dx < 0) goNext();
        else goPrev();
      }

      window.setTimeout(() => {
        dragRef.current.dragged = false;
      }, 0);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
    };
  }, [count, goNext, goPrev]);

  if (count === 0) return null;

  const current = slides[active];
  const label =
    current.kind === "composed" ? current.headline : current.imageAlt || "Offer";

  const bandBackground =
    current.backgroundColor ||
    (current.kind === "image"
      ? sampledBg[current.id] || DEFAULT_COMPOSED_BG
      : DEFAULT_COMPOSED_BG);

  const lightBand = isLightHex(bandBackground);
  const allowLink = !isDragging && !dragRef.current.dragged;

  return (
    <section
      id={id}
      className="scroll-mt-24 py-4 sm:py-5"
      aria-roledescription="carousel"
      aria-label="Campaign offers"
    >
      <div className="container-page">
        <div
          ref={cardRef}
          className={cn(
            "relative overflow-hidden rounded-[16px] border-2 border-primary shadow-[4px_4px_0_0_#131311] touch-pan-y select-none",
            BAND_HEIGHT,
            lightBand ? "text-primary" : "text-text-on-dark",
            isDragging ? "cursor-grabbing" : "cursor-grab",
          )}
          style={{ backgroundColor: bandBackground }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            if (!isDragging) setPaused(false);
          }}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (
              !event.currentTarget.contains(event.relatedTarget as Node | null)
            ) {
              if (!isDragging) setPaused(false);
            }
          }}
          onClickCapture={(event) => {
            if (dragRef.current.dragged) {
              event.preventDefault();
              event.stopPropagation();
            }
          }}
        >
          {current.kind === "composed" ? (
            <div
              aria-hidden="true"
              className="promo-shimmer pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/10 to-transparent"
            />
          ) : null}

          <div
            className="relative h-full"
            role="group"
            aria-roledescription="slide"
            aria-label={`${active + 1} of ${count}: ${label}`}
            style={{
              transform: dragOffset
                ? `translate3d(${dragOffset * 0.35}px, 0, 0)`
                : undefined,
              transition: isDragging ? "none" : "transform 180ms ease-out",
            }}
          >
            {current.kind === "composed" ? (
              <ComposedSlideView slide={current} priority={active === 0} />
            ) : (
              <ImageSlideView
                slide={current}
                priority={active === 0}
                allowLink={allowLink}
              />
            )}
          </div>

          {count > 1 ? (
            <div className="pointer-events-none absolute bottom-2.5 left-1/2 z-[2] flex -translate-x-1/2 items-center gap-1.5">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show slide ${index + 1}`}
                  aria-current={index === active ? "true" : undefined}
                  className={cn(
                    "pointer-events-auto h-2 w-2 rounded-full transition-colors duration-200",
                    index === active
                      ? "bg-accent"
                      : lightBand
                        ? "bg-primary/25 hover:bg-primary/40"
                        : "bg-text-on-dark/35 hover:bg-text-on-dark/55",
                  )}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
