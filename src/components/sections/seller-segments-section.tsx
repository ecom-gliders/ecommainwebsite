"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { SectionHeading } from "./section-heading";
import { SectionIcon } from "./section-icon";
import { SectionShell } from "./section-shell";

interface SellerSegmentsSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface SegmentItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  image: string;
  imageAlt: string;
  ctaLabel: string;
  ctaHref: string;
}

/**
 * Growth Journey — full-width equal-height stages (no expand CLS).
 * Active state is visual only; all copy + CTAs always rendered.
 */
export function SellerSegmentsSection({ id, data }: SellerSegmentsSectionProps) {
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const headingId = `${id}-heading`;
  const stageRefs = useRef<Array<HTMLDivElement | null>>([]);

  const segments: SegmentItem[] = useMemo(
    () =>
      readRecordArray(data.segments)
        .map((segment) => {
          const segmentId = readString(segment.id);
          const title = readString(segment.title);
          const description = readString(segment.description);
          const icon = readString(segment.icon);
          const image = readString(segment.image);
          const imageAlt = readString(segment.imageAlt, title);
          const cta = readNavLink(segment.cta);
          if (!title) return null;
          return {
            id: segmentId || title,
            title,
            description,
            icon,
            image,
            imageAlt,
            ctaLabel: cta?.label ?? "Get a free audit",
            ctaHref: cta?.href ?? "#hero-lead-form",
          };
        })
        .filter((item): item is SegmentItem => item !== null),
    [data.segments],
  );

  const scalingIndex = segments.findIndex(
    (segment) => segment.id === "scaling-brands",
  );
  const [activeIndex, setActiveIndex] = useState(
    scalingIndex >= 0 ? scalingIndex : Math.min(1, segments.length - 1),
  );

  const activateStage = (index: number, moveFocus = false) => {
    setActiveIndex(index);
    if (moveFocus) {
      stageRefs.current[index]?.focus();
    }
  };

  if (segments.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="py-14 sm:py-16"
    >
      <SectionHeading
        heading={heading}
        subheading={subheading}
        headingId={headingId}
        className="mx-auto mb-8 max-w-2xl text-center md:mb-10"
      />

      <ol className="seller-journey relative grid w-full grid-cols-1 items-stretch gap-4 sm:gap-5 md:grid-cols-3 md:pt-8">
        <div
          className="pointer-events-none absolute left-[16%] right-[16%] top-[0.7rem] hidden h-0.5 md:block"
          aria-hidden="true"
        >
          <div className="h-full w-full rounded-full bg-border" />
          <div
            className="seller-journey-progress absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-primary to-accent"
            style={{
              width: `${(activeIndex / Math.max(segments.length - 1, 1)) * 100}%`,
            }}
          />
        </div>

        {segments.map((segment, index) => {
          const isActive = index === activeIndex;
          const step = String(index + 1).padStart(2, "0");

          return (
            <li key={segment.id} className="relative flex min-h-0">
              <span
                className={cn(
                  "absolute left-1/2 top-0 z-10 hidden h-3.5 w-3.5 -translate-x-1/2 rounded-full border-2 md:block",
                  isActive
                    ? "border-accent bg-accent"
                    : "border-border bg-background",
                )}
                aria-hidden="true"
              />

              {index < segments.length - 1 ? (
                <span
                  className={cn(
                    "absolute bottom-0 left-6 z-0 h-4 w-0.5 translate-y-full md:hidden",
                    isActive ? "bg-accent" : "bg-border",
                  )}
                  aria-hidden="true"
                />
              ) : null}

              <div
                ref={(node) => {
                  stageRefs.current[index] = node;
                }}
                tabIndex={0}
                aria-current={isActive ? "step" : undefined}
                aria-label={`${segment.title}, stage ${step}`}
                className={cn(
                  "seller-journey-stage group relative flex w-full flex-1 cursor-pointer flex-col overflow-hidden rounded-[10px] border-2 bg-background outline-none transition-[border-color,box-shadow,opacity] duration-300",
                  "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
                  isActive
                    ? "border-primary shadow-[6px_6px_0_0_#131311]"
                    : "border-primary/40 opacity-90 hover:border-primary hover:opacity-100",
                )}
                onMouseEnter={() => activateStage(index)}
                onFocus={() => activateStage(index)}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    activateStage(index);
                  }
                  if (event.key === "ArrowRight" || event.key === "ArrowDown") {
                    event.preventDefault();
                    activateStage(
                      Math.min(index + 1, segments.length - 1),
                      true,
                    );
                  }
                  if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
                    event.preventDefault();
                    activateStage(Math.max(index - 1, 0), true);
                  }
                }}
              >
                {segment.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-surface">
                    <Image
                      src={segment.image}
                      alt={segment.imageAlt || segment.title}
                      fill
                      className="media-hover-zoom object-cover"
                      sizes="(max-width: 768px) 100vw, 33vw"
                      quality={80}
                      loading="lazy"
                    />
                    <span
                      className="pointer-events-none absolute right-3 top-2 font-mono text-4xl font-semibold leading-none text-white/80 drop-shadow sm:text-5xl"
                      aria-hidden="true"
                    >
                      {step}
                    </span>
                  </div>
                ) : (
                  <div className="relative px-5 pt-6">
                    <span
                      className="pointer-events-none absolute right-3 top-2 font-mono text-5xl font-semibold leading-none text-primary/[0.07]"
                      aria-hidden="true"
                    >
                      {step}
                    </span>
                    {segment.icon ? (
                      <SectionIcon
                        name={segment.icon}
                        framed
                        tone={isActive ? "accent" : "primary"}
                        className="mb-0"
                      />
                    ) : null}
                  </div>
                )}

                <div className="flex flex-1 flex-col px-5 py-5">
                  <p className="font-mono text-[11px] font-semibold tracking-[0.14em] text-text-secondary">
                    STAGE {step}
                  </p>
                  <h3 className="mt-1 text-h4 text-primary">{segment.title}</h3>

                  <p className="mt-3 flex-1 text-small font-medium leading-relaxed text-text-secondary sm:text-body">
                    {segment.description}
                  </p>

                  <PrimaryButton
                    asChild
                    size="sm"
                    className={cn(
                      "mt-5 w-full sm:w-auto",
                      !isActive && "pointer-events-none opacity-40",
                    )}
                    tabIndex={isActive ? 0 : -1}
                    aria-hidden={!isActive}
                  >
                    <Link href={segment.ctaHref}>{segment.ctaLabel}</Link>
                  </PrimaryButton>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
