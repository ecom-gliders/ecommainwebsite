"use client";

import { useId } from "react";
import { MoreHorizontal } from "lucide-react";
import { PainSpawnBubbles } from "./pain-spawn-bubbles";
import { readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface PainStripSectionProps {
  id: string;
  data: Record<string, unknown>;
}

function readLabels(value: unknown): string[] {
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

/**
 * Project One “Sound Familiar” UI language — dark split card,
 * scrolling friction list + lime speech bubbles + bold headline.
 * eCom Gliders copy only.
 */
export function PainStripSection({ id, data }: PainStripSectionProps) {
  const headingId = useId();
  const eyebrow = readString(data.eyebrow);
  const headline = readString(data.headline);
  const pains = readLabels(data.pains);
  const bubbles = readLabels(data.bubbles);

  if (!headline || pains.length === 0) return null;

  const track = [...pains, ...pains];
  const spawnQuotes = bubbles.length > 0 ? bubbles : pains.slice(0, 6);

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="py-6 sm:py-8 lg:py-10"
    >
      <div className="relative grid overflow-hidden rounded-[16px] bg-primary text-text-on-dark lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <PainSpawnBubbles quotes={spawnQuotes} />

        {/* Left: scrolling friction checklist UI */}
        <div className="relative z-10 border-b border-white/10 px-5 py-8 sm:px-7 sm:py-10 lg:border-b-0 lg:border-r lg:border-white/10 lg:px-8 lg:py-12">
          <div className="pain-checklist-fade relative h-[280px] overflow-hidden sm:h-[320px] lg:h-[360px]">
            <ul
              className="animate-pain-checklist flex w-full flex-col"
              aria-label="Common Amazon seller friction"
            >
              {track.map((pain, index) => (
                <li
                  key={`${pain}-${index}`}
                  className="flex items-center gap-3 border-b border-white/10 px-1 py-3.5"
                  aria-hidden={index >= pains.length ? true : undefined}
                >
                  <span
                    className="inline-flex h-4 w-4 shrink-0 rounded-[4px] border border-white/25 bg-transparent"
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 text-[13px] font-medium leading-snug text-text-on-dark/65 sm:text-sm">
                    {pain}
                  </span>
                  <MoreHorizontal
                    className="h-4 w-4 shrink-0 text-text-on-dark/30"
                    aria-hidden="true"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: eyebrow + oversized headline */}
        <div className="relative z-10 flex flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-on-dark/55">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="mt-4 max-w-xl text-[1.85rem] font-black leading-[1.15] tracking-[-0.02em] text-[#FAFAFA] text-balance sm:mt-5 sm:text-[2.35rem] lg:text-[40px] lg:leading-[48px]"
          >
            {headline}
          </h2>
        </div>
      </div>
    </SectionShell>
  );
}
