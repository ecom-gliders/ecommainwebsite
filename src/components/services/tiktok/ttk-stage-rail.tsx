"use client";

import Image from "next/image";
import { useState } from "react";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkStageRailProps {
  service: ServicePageConfig;
}

const STAGES = [
  {
    label: "Test",
    src: "/images/services/tiktok-shop-ads/ttk-phone-hook.jpg",
  },
  {
    label: "Scale",
    src: "/images/services/tiktok-shop-ads/ttk-phone-scale.jpg",
  },
  {
    label: "Refresh",
    src: "/images/services/tiktok-shop-ads/ttk-phone-refresh.jpg",
  },
  {
    label: "Handoff",
    src: "/images/services/tiktok-shop-ads/ttk-phone-demo.jpg",
  },
] as const;

/** Interactive campaign stage rail — owns stage inspection (council). */
export function TtkStageRail({ service }: TtkStageRailProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);
  const [active, setActive] = useState(0);
  const current = steps[active] ?? steps[0];
  const stage = STAGES[active] ?? STAGES[0];

  return (
    <section
      id="service-solution"
      className={cn("bg-[#0c0c0b] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
          Campaign stages
        </p>
        <h2
          id="service-solution-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
        >
          {solution.heading}
        </h2>

        <div className="mt-8 overflow-hidden border-2 border-accent">
          <div
            className="grid grid-cols-2 border-b-2 border-accent sm:grid-cols-4"
            role="tablist"
            aria-label="Campaign stages"
          >
            {steps.map((step, index) => (
              <button
                key={step.title}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
                className={cn(
                  "relative border-r border-b border-accent px-3 py-3.5 text-left last:border-r-0 sm:border-b-0 sm:px-4",
                  active === index
                    ? "bg-accent text-primary"
                    : "bg-[#141412] text-text-on-dark hover:bg-[#1a1a17]",
                )}
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] opacity-70">
                  {STAGES[index]?.label ?? `Stage ${index + 1}`}
                </span>
                <span className="mt-1 block text-sm font-black leading-tight">
                  {step.title}
                </span>
              </button>
            ))}
          </div>

          <div
            className="grid gap-0 lg:grid-cols-[minmax(0,9rem)_minmax(0,1fr)]"
            role="tabpanel"
            aria-label={`${stage.label}: ${current.title}`}
          >
            <div className="relative min-h-[12rem] border-b-2 border-accent bg-[#141412] lg:border-b-0 lg:border-r-2">
              <Image
                src={stage.src}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 144px"
              />
            </div>
            <div className="p-5 sm:p-6">
              <span className="inline-flex border-2 border-accent bg-accent px-2 py-0.5 font-mono text-[10px] font-black uppercase text-primary">
                {stage.label}
              </span>
              <h3 className="mt-3 text-xl font-black tracking-tight text-text-on-dark sm:text-2xl">
                {current.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm font-medium leading-snug text-text-on-dark/70 sm:text-base">
                {current.description}
              </p>
              <ul className="mt-5 flex gap-1.5" aria-hidden="true">
                {steps.map((_, i) => (
                  <li
                    key={i}
                    className={cn(
                      "h-1.5 flex-1",
                      i <= active ? "bg-accent" : "bg-text-on-dark/15",
                    )}
                  />
                ))}
              </ul>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
