"use client";

import { useId } from "react";
import { cn } from "@/lib/utils";
import { TrustLogo } from "./trust-logo";

interface TrustClientItem {
  label: string;
  image: string;
  alt: string;
}

interface TrustClientMarqueeProps {
  items: TrustClientItem[];
}

/** Repeat a set until long enough, then duplicate for seamless -50% loop. */
function buildSeamlessTrack(
  items: TrustClientItem[],
  minItems = 8,
): TrustClientItem[] {
  if (items.length === 0) return [];
  const cycle: TrustClientItem[] = [];
  while (cycle.length < minItems) {
    cycle.push(...items);
  }
  return [...cycle, ...cycle];
}

/**
 * Single continuous client logo ribbon — quieter than dual-row stacks.
 */
export function TrustClientMarquee({ items }: TrustClientMarqueeProps) {
  const labelId = useId();

  if (items.length === 0) return null;

  const track = buildSeamlessTrack(items);
  const half = track.length / 2;

  return (
    <div className="w-full" role="region" aria-labelledby={labelId}>
      <p id={labelId} className="sr-only">
        Client brand logos scrolling continuously.
      </p>
      <div className="trust-marquee-fade group overflow-hidden">
        <div
          className={cn(
            "flex w-max items-center gap-8 group-hover:[animation-play-state:paused] group-focus-within:[animation-play-state:paused]",
            "animate-trust-marquee",
          )}
        >
          {track.map((item, index) => (
            <div
              key={`client-${item.image}-${index}`}
              className="shrink-0"
              aria-hidden={index >= half ? true : undefined}
            >
              <TrustLogo
                label={item.label}
                image={item.image}
                alt={index >= half ? "" : item.alt}
                variant="client"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
