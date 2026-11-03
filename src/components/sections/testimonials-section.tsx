"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface TestimonialsSectionProps {
  id: string;
  data: Record<string, unknown>;
}

const AUTO_PAUSE_MS = 3200;
const AUTO_RESUME_MS = 500;

/**
 * Project One testimonial chrome — dark band + cream hard cards.
 * Auto-advances with short pauses; arrows still work. No wheel hijack
 * (page vertical scroll stays free). Scrollbar hidden.
 */
export function TestimonialsSection({ id, data }: TestimonialsSectionProps) {
  const eyebrow = readString(data.eyebrow, "Client voices");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const items = readRecordArray(data.items);
  const headingId = `${id}-heading`;
  const scrollerRef = useRef<HTMLUListElement>(null);
  const pausedRef = useRef(false);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const getStep = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return 320;
    const card = el.querySelector("li");
    return card
      ? card.getBoundingClientRect().width + 20
      : Math.min(320, el.clientWidth * 0.8);
  }, []);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanScrollPrev(el.scrollLeft > 4);
    setCanScrollNext(el.scrollLeft < max - 4);
  }, []);

  const scrollByCard = useCallback(
    (direction: -1 | 1) => {
      const el = scrollerRef.current;
      if (!el) return;
      const max = el.scrollWidth - el.clientWidth;
      const step = getStep();

      if (direction === 1 && el.scrollLeft >= max - 4) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
      if (direction === -1 && el.scrollLeft <= 4) {
        el.scrollTo({ left: max, behavior: "smooth" });
        return;
      }
      el.scrollBy({ left: direction * step, behavior: "smooth" });
    },
    [getStep],
  );

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;

    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    let timer = 0;

    const advance = () => {
      if (!pausedRef.current) {
        const max = el.scrollWidth - el.clientWidth;
        if (max > 2) {
          const step = getStep();
          if (el.scrollLeft >= max - 4) {
            el.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            el.scrollBy({ left: step, behavior: "smooth" });
          }
        }
      }
      timer = window.setTimeout(advance, AUTO_PAUSE_MS);
    };

    timer = window.setTimeout(advance, AUTO_PAUSE_MS);

    const pause = () => {
      pausedRef.current = true;
    };
    const resume = () => {
      window.setTimeout(() => {
        pausedRef.current = false;
      }, AUTO_RESUME_MS);
    };

    el.addEventListener("mouseenter", pause);
    el.addEventListener("mouseleave", resume);
    el.addEventListener("focusin", pause);
    el.addEventListener("focusout", resume);
    el.addEventListener("pointerdown", pause);

    return () => {
      window.clearTimeout(timer);
      el.removeEventListener("scroll", updateScrollState);
      el.removeEventListener("mouseenter", pause);
      el.removeEventListener("mouseleave", resume);
      el.removeEventListener("focusin", pause);
      el.removeEventListener("focusout", resume);
      el.removeEventListener("pointerdown", pause);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [getStep, updateScrollState, items.length]);

  if (!heading || items.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      tone="primary"
      className="py-12 sm:py-16 lg:py-20"
    >
      <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="max-w-3xl">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="mt-3 text-[1.85rem] font-black leading-[1.05] tracking-[-0.04em] text-text-on-dark text-balance sm:text-[2.5rem] lg:text-[3rem] lg:leading-[1.05]"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-4 max-w-2xl text-base font-normal leading-relaxed text-white/65 sm:text-lg">
              {subheading}
            </p>
          ) : null}
        </div>

        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            aria-label="Previous testimonials"
            disabled={!canScrollPrev && !canScrollNext}
            onClick={() => {
              pausedRef.current = true;
              scrollByCard(-1);
              window.setTimeout(() => {
                pausedRef.current = false;
              }, AUTO_PAUSE_MS);
            }}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-[10px] border-2 border-accent text-accent transition-opacity",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
              !canScrollPrev && !canScrollNext && "cursor-not-allowed opacity-35",
            )}
          >
            <ChevronLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next testimonials"
            disabled={!canScrollPrev && !canScrollNext}
            onClick={() => {
              pausedRef.current = true;
              scrollByCard(1);
              window.setTimeout(() => {
                pausedRef.current = false;
              }, AUTO_PAUSE_MS);
            }}
            className={cn(
              "inline-flex h-11 w-11 items-center justify-center rounded-[10px] border-2 border-accent bg-accent text-primary transition-opacity",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
              !canScrollPrev && !canScrollNext && "cursor-not-allowed opacity-35",
            )}
          >
            <ChevronRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      <ul
        ref={scrollerRef}
        tabIndex={0}
        aria-label="Client testimonials"
        className={cn(
          "mt-10 flex gap-4 overflow-x-auto overscroll-x-contain pt-1 sm:mt-12 sm:gap-5",
          "snap-x snap-mandatory touch-pan-x",
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary",
        )}
      >
        {items.map((item) => {
          const quote = readString(item.quote);
          const name = readString(item.name);
          const role = readString(item.role);
          const company = readString(item.company);
          const key = `${name}-${company}`;
          const attribution = [name, company || role]
            .filter(Boolean)
            .join(" | ");

          return (
            <li
              key={key}
              className="flex w-[min(82vw,20.5rem)] shrink-0 snap-start sm:w-[19.5rem] lg:w-[18.5rem]"
            >
              <figure
                className={cn(
                  "relative flex h-full w-full flex-col overflow-hidden rounded-[10px]",
                  "border-2 border-primary bg-[#F3F2EA] p-5 text-primary shadow-[5px_5px_0_0_#131311] sm:p-6",
                )}
              >
                <span
                  className="pointer-events-none absolute right-4 top-3 text-5xl font-black leading-none text-primary/15 sm:right-5 sm:text-6xl"
                  aria-hidden="true"
                >
                  &rdquo;
                </span>

                <blockquote className="relative z-[1] flex-1 pr-8">
                  <p className="text-[0.95rem] font-bold leading-relaxed tracking-[-0.01em] text-primary sm:text-base sm:leading-relaxed">
                    {quote}
                  </p>
                </blockquote>

                {attribution ? (
                  <figcaption className="relative z-[1] mt-6 border-t-2 border-primary/10 pt-4">
                    <p className="text-sm font-bold text-primary sm:text-base">
                      {attribution}
                    </p>
                    {role && company ? (
                      <p className="mt-0.5 text-xs font-normal text-text-secondary sm:text-sm">
                        {role}
                      </p>
                    ) : null}
                  </figcaption>
                ) : null}
              </figure>
            </li>
          );
        })}
      </ul>
    </SectionShell>
  );
}
