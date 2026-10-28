"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface CreativeShowcaseSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface CreativeVisual {
  image: string;
  alt: string;
  caption: string;
}

/**
 * Project One “See Work” chrome — dark soft-rect panel, work pills,
 * larger hover float above the pill only (no bottom listing frame).
 */
export function CreativeShowcaseSection({
  id,
  data,
}: CreativeShowcaseSectionProps) {
  const eyebrow = readString(data.eyebrow, "See work");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const cta = readNavLink(data.cta);
  const headingId = `${id}-heading`;
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [canHover, setCanHover] = useState(false);

  const visuals: CreativeVisual[] = useMemo(
    () =>
      readRecordArray(data.items)
        .map((item) => {
          const image = readString(item.image);
          const alt = readString(item.alt);
          const caption = readString(item.caption);
          if (!image) return null;
          return { image, alt, caption };
        })
        .filter((item): item is CreativeVisual => item !== null),
    [data.items],
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const active = visuals[activeIndex] ?? visuals[0];

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setCanHover(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  if (!active) return null;

  const selectIndex = (index: number, moveFocus = false) => {
    const next = Math.max(0, Math.min(index, visuals.length - 1));
    setActiveIndex(next);
    if (moveFocus) {
      thumbRefs.current[next]?.focus();
    }
  };

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="overflow-x-clip py-12 sm:py-16 lg:py-20"
    >
      <div className="rounded-[16px] bg-[#2A2A27] px-5 py-8 text-text-on-dark sm:px-8 sm:py-10 lg:px-10 lg:py-12">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between lg:gap-10">
          <div className="max-w-2xl">
            {eyebrow ? (
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/55">
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
              <p className="mt-4 max-w-xl text-base font-normal leading-relaxed text-white/70 sm:text-lg">
                {subheading}
              </p>
            ) : null}
          </div>
          {cta ? (
            <PrimaryButton
              asChild
              variant="accent"
              className="w-full shrink-0 sm:w-auto"
            >
              <Link href={cta.href}>{cta.label}</Link>
            </PrimaryButton>
          ) : null}
        </div>

        {visuals.length > 0 ? (
          <ul
            className="mt-8 flex flex-wrap gap-2.5 sm:mt-10 sm:gap-3"
            role="list"
            aria-label="Creative examples"
          >
            {visuals.map((item, index) => {
              const isActive = index === activeIndex;
              const isHovered = hoverIndex === index;
              const showFloat = canHover
                ? isHovered
                : isActive;
              const label = item.caption || `Creative ${index + 1}`;

              return (
                <li key={item.image} className="relative">
                  {showFloat ? (
                    <div
                      className={cn(
                        "pointer-events-none absolute bottom-[calc(100%+0.9rem)] left-1/2 z-30 w-[18rem] -translate-x-1/2 sm:w-[22rem]",
                        "motion-safe:animate-[creative-float-in_180ms_ease-out]",
                      )}
                      aria-hidden="true"
                    >
                      <div className="overflow-hidden rounded-[10px] border-2 border-primary bg-[#F4F4F4] shadow-[5px_5px_0_0_#131311]">
                        <div className="relative aspect-[4/3] w-full">
                          <Image
                            src={item.image}
                            alt=""
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 288px, 352px"
                            quality={80}
                            priority={index === 0}
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}

                  <button
                    ref={(node) => {
                      thumbRefs.current[index] = node;
                    }}
                    type="button"
                    aria-pressed={isActive}
                    aria-label={label}
                    className={cn(
                      "inline-flex min-h-12 items-center gap-2 rounded-[10px] border px-3.5 py-2.5 text-left text-xs font-bold uppercase tracking-[0.08em] transition-colors duration-200 sm:px-4",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#2A2A27]",
                      isActive || isHovered
                        ? "border-accent bg-accent text-primary"
                        : "border-white/35 bg-transparent text-text-on-dark hover:border-white/70",
                    )}
                    onClick={() => selectIndex(index)}
                    onMouseEnter={() => {
                      if (!canHover) return;
                      setHoverIndex(index);
                      setActiveIndex(index);
                    }}
                    onMouseLeave={() => setHoverIndex(null)}
                    onFocus={() => {
                      setHoverIndex(index);
                      setActiveIndex(index);
                    }}
                    onBlur={() => setHoverIndex(null)}
                    onKeyDown={(event) => {
                      if (
                        event.key === "ArrowRight" ||
                        event.key === "ArrowDown"
                      ) {
                        event.preventDefault();
                        selectIndex(index + 1, true);
                      }
                      if (
                        event.key === "ArrowLeft" ||
                        event.key === "ArrowUp"
                      ) {
                        event.preventDefault();
                        selectIndex(index - 1, true);
                      }
                    }}
                  >
                    <span>{label}</span>
                    {isActive || isHovered ? (
                      <ArrowRight
                        className="h-3.5 w-3.5 shrink-0 opacity-90"
                        aria-hidden="true"
                      />
                    ) : (
                      <ArrowUpRight
                        className="h-3.5 w-3.5 shrink-0 opacity-80"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        ) : null}
      </div>
    </SectionShell>
  );
}
