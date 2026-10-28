"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { readString } from "./section-data";

interface ChecklistTickerSectionProps {
  id: string;
  data: Record<string, unknown>;
}

function readItems(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.flatMap((item) => {
    if (typeof item === "string" && item.trim()) return [item.trim()];
    if (item && typeof item === "object") {
      const label = readString((item as Record<string, unknown>).label);
      return label ? [label] : [];
    }
    return [];
  });
}

function buildSeamlessTrack(items: string[], minItems = 12): string[] {
  if (items.length === 0) return [];
  const cycle: string[] = [];
  while (cycle.length < minItems) {
    cycle.push(...items);
  }
  return [...cycle, ...cycle];
}

/**
 * Project One lime USP marquee — full-bleed accent band, uppercase ticker.
 * Phrases stay eCom Gliders ops copy from config (no PO claims).
 */
export function ChecklistTickerSection({
  id,
  data,
}: ChecklistTickerSectionProps) {
  const labelId = useId();
  const eyebrow = readString(data.eyebrow);
  const items = readItems(data.items);

  if (items.length === 0) return null;

  const track = buildSeamlessTrack(items);
  const half = track.length / 2;

  return (
    <section
      id={id}
      className="relative scroll-mt-24 overflow-hidden bg-accent text-primary"
      aria-labelledby={labelId}
    >
      <p id={labelId} className="sr-only">
        {eyebrow || "Amazon account operations scrolling continuously"}
      </p>

      <div
        className="overflow-hidden py-5 sm:py-[1.35rem]"
        role="region"
        aria-labelledby={labelId}
      >
        <div
          className={cn(
            "flex w-max items-center gap-x-5 sm:gap-x-7",
            "animate-checklist-ticker",
          )}
        >
          {track.map((label, index) => (
            <span
              key={`${label}-${index}`}
              className="inline-flex shrink-0 items-center gap-x-5 sm:gap-x-7"
              aria-hidden={index >= half ? true : undefined}
            >
              <span className="whitespace-nowrap text-xs font-bold uppercase tracking-[0.14em] text-primary">
                {label}
              </span>
              <span
                className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary"
                aria-hidden="true"
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
