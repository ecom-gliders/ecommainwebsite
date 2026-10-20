"use client";

import Image from "next/image";
import Player from "@vimeo/player";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  Play,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";
import {
  VideoPreviewDialog,
  type PreviewableVideo,
} from "./video-preview-dialog";

interface VideoReviewsSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface VideoHighlight {
  value: string;
  label: string;
  direction: "up" | "down";
  caption: string;
}

interface VideoReviewItem extends PreviewableVideo {
  coverImage: string;
  coverImageAlt: string;
  hoverStartSeconds: number;
  highlight: VideoHighlight | null;
}

const DRAG_CLICK_PX = 10;
const DEFAULT_HOVER_START_S = 14;
/** Short mid-clip window that loops on hover (Favrick-style). */
const HOVER_LOOP_SECONDS = 8;

function readPositiveNumber(value: unknown, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0
    ? value
    : fallback;
}

function readHighlight(value: unknown): VideoHighlight | null {
  if (!value || typeof value !== "object") return null;
  const record = value as Record<string, unknown>;
  const highlightValue = readString(record.value);
  const label = readString(record.label);
  if (!highlightValue || !label) return null;
  const direction = record.direction === "down" ? "down" : "up";
  return {
    value: highlightValue,
    label,
    direction,
    caption: readString(record.caption),
  };
}

function toVideoItem(record: Record<string, unknown>): VideoReviewItem | null {
  const vimeoId = readString(record.vimeoId);
  if (!vimeoId) return null;
  const coverImage =
    readString(record.coverImage) ||
    `https://vumbnail.com/${vimeoId}.jpg`;
  return {
    vimeoId,
    title: readString(record.title, "Client video review"),
    name: readString(record.name) || undefined,
    company: readString(record.company) || undefined,
    coverImage,
    coverImageAlt: readString(
      record.coverImageAlt,
      `${readString(record.title, "Client video review")} cover`,
    ),
    hoverStartSeconds: readPositiveNumber(
      record.hoverStartSeconds,
      DEFAULT_HOVER_START_S,
    ),
    highlight: readHighlight(record.highlight),
  };
}

/** Fast muted hover embed — no hash seek (seek via Player SDK after ready). */
function hoverPlayerSrc(vimeoId: string) {
  const params = new URLSearchParams({
    background: "1",
    autoplay: "1",
    muted: "1",
    loop: "1",
    autopause: "0",
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

/** Green = good outcome, red = bad. ACoS down / reduction counts as good. */
function highlightIsPositive(highlight: VideoHighlight): boolean {
  const label = highlight.label.toLowerCase();
  const isAcos = /acos|a\.?c\.?o\.?s|reduction/.test(label);
  if (isAcos) return highlight.direction === "down" || /reduction/.test(label);
  return highlight.direction === "up";
}

function MetricBadge({ highlight }: { highlight: VideoHighlight }) {
  const Arrow = highlight.direction === "down" ? ArrowDown : ArrowUp;
  const positive = highlightIsPositive(highlight);
  const tone = positive ? "text-accent" : "text-red-400";
  const shadow = positive
    ? "shadow-[3px_3px_0_0_#C6FD50]"
    : "shadow-[3px_3px_0_0_#f87171]";

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] p-2.5 sm:p-3">
      <div
        className={cn(
          "rounded-[10px] border-2 border-primary/90 bg-primary/90 px-2.5 py-2 backdrop-blur-[2px]",
          shadow,
        )}
      >
        <p
          className={cn(
            "flex items-center gap-1.5 text-[1.05rem] font-black leading-none tracking-[-0.03em] sm:text-[1.15rem]",
            tone,
          )}
        >
          <Arrow
            className={cn("h-4 w-4 shrink-0 stroke-[2.75]", tone)}
            aria-hidden="true"
          />
          <span>
            {highlight.value}
            <span className="ml-1 text-[0.7rem] font-bold uppercase tracking-[0.08em] text-text-on-dark/85 sm:text-xs">
              {highlight.label}
            </span>
          </span>
        </p>
        {highlight.caption ? (
          <p className="mt-1.5 text-[11px] font-medium leading-snug text-text-on-dark/80 sm:text-xs">
            {highlight.caption}
          </p>
        ) : null}
      </div>
    </div>
  );
}

/**
 * Favrick-style reels: growth-style metric badges, warm Vimeo hover mid-clip,
 * drag/arrows, click lightbox.
 */
export function VideoReviewsSection({ id, data }: VideoReviewsSectionProps) {
  const eyebrow = readString(data.eyebrow, "Real sellers, real results");
  const heading = readString(data.heading, "Client video reviews");
  const subheading = readString(data.subheading);
  const items = useMemo(
    () =>
      readRecordArray(data.items)
        .map(toVideoItem)
        .filter((item): item is VideoReviewItem => item !== null),
    [data.items],
  );
  const headingId = `${id}-heading`;
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const iframeRefs = useRef<(HTMLIFrameElement | null)[]>([]);
  const playersRef = useRef<Map<number, Player>>(new Map());
  const iframeReadyRef = useRef<Set<number>>(new Set());
  const hoverIndexRef = useRef<number | null>(null);
  const loopCleanupsRef = useRef<Map<number, () => void>>(new Map());
  const dragRef = useRef<{
    pointerId: number | null;
    startX: number;
    scrollStart: number;
    dragged: boolean;
    active: boolean;
  }>({
    pointerId: null,
    startX: 0,
    scrollStart: 0,
    dragged: false,
    active: false,
  });
  const suppressClickRef = useRef(false);

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [warmed, setWarmed] = useState<number[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    hoverIndexRef.current = hoverIndex;
  }, [hoverIndex]);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(max > 4 && el.scrollLeft < max - 4);
  }, []);

  const getStep = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 260;
    const card = el.querySelector("li");
    return card
      ? card.getBoundingClientRect().width + 16
      : Math.min(260, el.clientWidth * 0.75);
  }, []);

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      el.scrollBy({ left: direction * getStep(), behavior: "smooth" });
    },
    [getStep],
  );

  const markWarmed = useCallback((index: number) => {
    setWarmed((prev) => (prev.includes(index) ? prev : [...prev, index]));
  }, []);

  const clearLoopHandler = useCallback((index: number) => {
    const cleanup = loopCleanupsRef.current.get(index);
    if (cleanup) {
      cleanup();
      loopCleanupsRef.current.delete(index);
    }
  }, []);

  const pauseAllExcept = useCallback(
    async (keep: number | null) => {
      const entries = [...playersRef.current.entries()];
      await Promise.all(
        entries.map(async ([index, player]) => {
          if (index === keep) return;
          clearLoopHandler(index);
          try {
            await player.pause();
          } catch {
            /* ignore */
          }
        }),
      );
    },
    [clearLoopHandler],
  );

  const playHover = useCallback(
    async (index: number) => {
      const iframe = iframeRefs.current[index];
      const item = items[index];
      if (!iframe || !item || !iframeReadyRef.current.has(index)) return;

      let player = playersRef.current.get(index);
      if (!player) {
        player = new Player(iframe);
        playersRef.current.set(index, player);
      }

      try {
        await player.ready();
        if (hoverIndexRef.current !== index) return;
        await pauseAllExcept(index);
        clearLoopHandler(index);

        const duration = await player.getDuration().catch(() => 0);
        const loopStart =
          duration > 6
            ? Math.min(
                Math.max(item.hoverStartSeconds, duration * 0.35),
                Math.max(0, duration - HOVER_LOOP_SECONDS - 1),
              )
            : 0;
        const loopEnd =
          duration > 0
            ? Math.min(loopStart + HOVER_LOOP_SECONDS, duration - 0.25)
            : loopStart + HOVER_LOOP_SECONDS;

        await player.setLoop(true).catch(() => undefined);
        await player.setMuted(true).catch(() => undefined);
        await player.setVolume(0).catch(() => undefined);
        await player.setCurrentTime(loopStart).catch(() => undefined);
        if (hoverIndexRef.current !== index) return;
        await player.play();

        // Favrick-style: keep a short mid-clip looping while hovered.
        const onTime = (data: { seconds: number }) => {
          if (hoverIndexRef.current !== index) return;
          if (data.seconds >= loopEnd - 0.05) {
            void player.setCurrentTime(loopStart).then(() => {
              if (hoverIndexRef.current === index) {
                void player.play().catch(() => undefined);
              }
            });
          }
        };
        const onEnded = () => {
          if (hoverIndexRef.current !== index) return;
          void player.setCurrentTime(loopStart).then(() => {
            if (hoverIndexRef.current === index) {
              void player.play().catch(() => undefined);
            }
          });
        };

        player.on("timeupdate", onTime);
        player.on("ended", onEnded);
        loopCleanupsRef.current.set(index, () => {
          player.off("timeupdate", onTime);
          player.off("ended", onEnded);
        });
      } catch {
        /* Privacy / autoplay may block; background=1 still attempts play. */
      }
    },
    [clearLoopHandler, items, pauseAllExcept],
  );

  const clearHoverPreview = useCallback(() => {
    const prev = hoverIndexRef.current;
    setHoverIndex(null);
    if (prev !== null) clearLoopHandler(prev);
    void pauseAllExcept(null);
  }, [clearLoopHandler, pauseAllExcept]);

  const openVideo = useCallback(
    (index: number) => {
      if (suppressClickRef.current || dragRef.current.dragged) return;
      clearHoverPreview();
      setActiveIndex(index);
    },
    [clearHoverPreview],
  );

  const startHoverPreview = useCallback(
    (index: number) => {
      if (reducedMotion || activeIndex !== null || dragRef.current.active) {
        return;
      }
      if (dragRef.current.dragged || isDragging) return;
      markWarmed(index);
      setHoverIndex(index);
    },
    [activeIndex, isDragging, markWarmed, reducedMotion],
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  // Prefetch first cards when section nears viewport.
  useEffect(() => {
    const root = document.getElementById(id);
    if (!root || items.length === 0) return;
    sectionRef.current = root;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        setWarmed((prev) => {
          const next = new Set(prev);
          next.add(0);
          if (items.length > 1) next.add(1);
          if (items.length > 2) next.add(2);
          return [...next];
        });
        io.disconnect();
      },
      { rootMargin: "240px 0px" },
    );
    io.observe(root);
    return () => io.disconnect();
  }, [id, items.length]);

  // Seek/play mid-clip once the warm iframe is ready.
  useEffect(() => {
    if (hoverIndex === null || reducedMotion) return;
    void playHover(hoverIndex);
  }, [hoverIndex, playHover, reducedMotion]);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    const onMove = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;

      const dx = event.clientX - drag.startX;
      if (!drag.dragged && Math.abs(dx) > DRAG_CLICK_PX) {
        drag.dragged = true;
        suppressClickRef.current = true;
        setIsDragging(true);
        clearHoverPreview();
        drag.startX = event.clientX;
        drag.scrollStart = el.scrollLeft;
        try {
          el.setPointerCapture(event.pointerId);
        } catch {
          /* ignore */
        }
      }

      if (drag.dragged) {
        el.scrollLeft = drag.scrollStart - (event.clientX - drag.startX);
      }
    };

    const onUp = (event: PointerEvent) => {
      const drag = dragRef.current;
      if (!drag.active || drag.pointerId !== event.pointerId) return;

      const wasDragged = drag.dragged;
      try {
        if (el.hasPointerCapture(event.pointerId)) {
          el.releasePointerCapture(event.pointerId);
        }
      } catch {
        /* already released */
      }

      dragRef.current = {
        pointerId: null,
        startX: 0,
        scrollStart: 0,
        dragged: false,
        active: false,
      };
      setIsDragging(false);
      updateScrollState();

      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);

      if (wasDragged) {
        window.setTimeout(() => {
          suppressClickRef.current = false;
        }, 50);
      } else {
        suppressClickRef.current = false;
      }
    };

    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      if (event.target instanceof Element) {
        if (event.target.closest("[data-reel-arrow]")) return;
      }

      dragRef.current = {
        pointerId: event.pointerId,
        startX: event.clientX,
        scrollStart: el.scrollLeft,
        dragged: false,
        active: true,
      };
      suppressClickRef.current = false;

      window.addEventListener("pointermove", onMove);
      window.addEventListener("pointerup", onUp);
      window.addEventListener("pointercancel", onUp);
    };

    el.addEventListener("pointerdown", onDown);

    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
      el.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [clearHoverPreview, items.length, updateScrollState]);

  useEffect(() => {
    return () => {
      loopCleanupsRef.current.forEach((cleanup) => cleanup());
      loopCleanupsRef.current.clear();
      playersRef.current.forEach((player) => {
        void player.unload().catch(() => undefined);
      });
      playersRef.current.clear();
    };
  }, []);

  if (items.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      tone="muted"
      className="overflow-x-clip"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary sm:text-xs">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="mt-3 text-[1.85rem] font-black leading-[1.05] tracking-[-0.04em] text-primary text-balance sm:text-[2.5rem] lg:text-[3rem]"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-4 text-base font-normal leading-relaxed text-text-secondary sm:text-lg">
              {subheading}
            </p>
          ) : null}
        </div>

        {canScrollPrev || canScrollNext ? (
          <div className="hidden shrink-0 gap-2 sm:flex">
            {canScrollPrev ? (
              <button
                type="button"
                data-reel-arrow
                aria-label="Previous video reviews"
                onClick={() => scrollByCard(-1)}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-[10px] border-2 border-primary bg-background text-primary shadow-[3px_3px_0_0_#131311]",
                  "transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                )}
              >
                <ChevronLeft className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
            {canScrollNext ? (
              <button
                type="button"
                data-reel-arrow
                aria-label="Next video reviews"
                onClick={() => scrollByCard(1)}
                className={cn(
                  "inline-flex h-11 w-11 items-center justify-center rounded-[10px] border-2 border-primary bg-accent text-primary shadow-[3px_3px_0_0_#131311]",
                  "transition-colors hover:brightness-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
                )}
              >
                <ChevronRight className="h-5 w-5" aria-hidden="true" />
              </button>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="relative mt-8">
        {canScrollPrev ? (
          <button
            type="button"
            data-reel-arrow
            aria-label="Previous video reviews"
            onClick={() => scrollByCard(-1)}
            className={cn(
              "absolute left-1 top-1/2 z-[3] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center sm:hidden",
              "rounded-[10px] border-2 border-primary bg-background/95 text-primary shadow-[3px_3px_0_0_#131311]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            )}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}
        {canScrollNext ? (
          <button
            type="button"
            data-reel-arrow
            aria-label="Next video reviews"
            onClick={() => scrollByCard(1)}
            className={cn(
              "absolute right-1 top-1/2 z-[3] inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center sm:hidden",
              "rounded-[10px] border-2 border-primary bg-accent/95 text-primary shadow-[3px_3px_0_0_#131311]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
            )}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        ) : null}

        <ul
          ref={scrollerRef}
          tabIndex={0}
          className={cn(
            "flex gap-4 overflow-x-auto overscroll-x-contain py-1",
            "snap-x snap-mandatory scroll-px-1 touch-pan-x",
            "[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
            isDragging ? "cursor-grabbing select-none snap-none" : "cursor-grab",
            // Edge fade via mask — does not sit on top of cards like blur overlays.
            canScrollPrev &&
              canScrollNext &&
              "[mask-image:linear-gradient(to_right,transparent,black_1.75rem,black_calc(100%-1.75rem),transparent)]",
            canScrollPrev &&
              !canScrollNext &&
              "[mask-image:linear-gradient(to_right,transparent,black_1.75rem,black)]",
            !canScrollPrev &&
              canScrollNext &&
              "[mask-image:linear-gradient(to_right,black,black_calc(100%-1.75rem),transparent)]",
          )}
          aria-label="Client video reviews"
        >
          {items.map((item, index) => {
            const isHoverTarget = hoverIndex === index;
            const showHoverVideo = isHoverTarget;
            const keepIframe =
              !reducedMotion &&
              (warmed.includes(index) || isHoverTarget);
            const who = [item.name, item.company].filter(Boolean).join(", ");

            return (
              <li
                key={item.vimeoId}
                className="w-[min(220px,72vw)] shrink-0 snap-start sm:w-[240px]"
              >
                <button
                  type="button"
                  className={cn(
                    "group relative block w-full overflow-hidden rounded-[14px] border-2 border-primary bg-primary text-left",
                    "shadow-[4px_4px_0_0_#131311] transition-[transform,box-shadow] duration-200",
                    !isDragging &&
                      "hover:-translate-y-0.5 hover:shadow-[6px_6px_0_0_#C6FD50]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  )}
                  onClick={() => openVideo(index)}
                  onMouseEnter={() => startHoverPreview(index)}
                  onMouseLeave={clearHoverPreview}
                  onFocus={() => startHoverPreview(index)}
                  onBlur={clearHoverPreview}
                  aria-label={
                    who
                      ? `Play video: ${item.title}, ${who}`
                      : `Play video: ${item.title}`
                  }
                >
                  <span className="relative block aspect-[9/16] w-full overflow-hidden bg-neutral-900">
                    <Image
                      src={item.coverImage}
                      alt={item.coverImageAlt}
                      fill
                      sizes="240px"
                      quality={85}
                      draggable={false}
                      className={cn(
                        "object-cover transition-[transform,opacity] duration-200",
                        showHoverVideo
                          ? "scale-105 opacity-0"
                          : "opacity-100 group-hover:scale-[1.02]",
                      )}
                    />

                    {keepIframe ? (
                      <iframe
                        ref={(node) => {
                          iframeRefs.current[index] = node;
                        }}
                        src={hoverPlayerSrc(item.vimeoId)}
                        title=""
                        aria-hidden="true"
                        tabIndex={-1}
                        onLoad={() => {
                          iframeReadyRef.current.add(index);
                          if (hoverIndexRef.current === index) {
                            void playHover(index);
                          }
                        }}
                        className={cn(
                          "pointer-events-none absolute inset-0 h-full w-full scale-[1.35] transition-opacity duration-150",
                          showHoverVideo ? "opacity-100" : "opacity-0",
                        )}
                        allow="autoplay; fullscreen; picture-in-picture"
                      />
                    ) : null}

                    <span
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/25 to-transparent transition-opacity duration-200",
                        showHoverVideo ? "opacity-50" : "opacity-100",
                      )}
                      aria-hidden="true"
                    />

                    {item.highlight ? (
                      <MetricBadge highlight={item.highlight} />
                    ) : null}

                    <span
                      className={cn(
                        "absolute left-1/2 top-[42%] flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center",
                        "rounded-full border-2 border-primary bg-accent text-primary shadow-[3px_3px_0_0_#131311]",
                        "transition-[transform,opacity] duration-150 group-hover:scale-105",
                        showHoverVideo || item.highlight
                          ? "opacity-0"
                          : "opacity-100",
                      )}
                      aria-hidden="true"
                    >
                      <Play className="ml-0.5 h-5 w-5 fill-current" />
                    </span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <VideoPreviewDialog
        open={activeIndex !== null}
        onOpenChange={(open) => {
          if (!open) setActiveIndex(null);
        }}
        items={items}
        index={activeIndex ?? 0}
        onIndexChange={setActiveIndex}
      />
    </SectionShell>
  );
}
