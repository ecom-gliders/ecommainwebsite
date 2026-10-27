"use client";

import { useState } from "react";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpModuleDeliverablesProps {
  service: ServicePageConfig;
}

const MODULE_SHAPES = [
  "hero-banner",
  "product-grid",
  "pdp-block",
  "collection-row",
  "app-slot",
  "mobile-stack",
  "email-bar",
  "launch-check",
] as const;

function ModuleThumb({ shape }: { shape: (typeof MODULE_SHAPES)[number] }) {
  if (shape === "hero-banner") {
    return (
      <div className="flex h-full flex-col gap-1 p-2" aria-hidden="true">
        <div className="h-2 w-2/3 bg-accent/60" />
        <div className="mt-auto h-4 w-full bg-primary" />
      </div>
    );
  }
  if (shape === "product-grid") {
    return (
      <div className="grid h-full grid-cols-3 gap-0.5 p-2" aria-hidden="true">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="aspect-square bg-primary/15" />
        ))}
      </div>
    );
  }
  if (shape === "pdp-block") {
    return (
      <div className="grid h-full grid-cols-2 gap-1 p-2" aria-hidden="true">
        <div className="bg-[#ECECE6]" />
        <div className="space-y-1">
          <div className="h-2 w-full bg-primary" />
          <div className="h-1 w-2/3 bg-accent" />
        </div>
      </div>
    );
  }
  if (shape === "collection-row") {
    return (
      <div className="flex h-full gap-1 p-2" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex-1 bg-primary/12" />
        ))}
      </div>
    );
  }
  if (shape === "app-slot") {
    return (
      <div
        className="flex h-full items-center justify-center p-2"
        aria-hidden="true"
      >
        <div className="h-8 w-8 border-2 border-dashed border-primary/40" />
      </div>
    );
  }
  if (shape === "mobile-stack") {
    return (
      <div
        className="mx-auto flex h-full w-1/2 flex-col gap-1 border border-primary/20 p-1"
        aria-hidden="true"
      >
        <div className="h-2 bg-primary/20" />
        <div className="flex-1 bg-[#ECECE6]" />
      </div>
    );
  }
  if (shape === "email-bar") {
    return (
      <div className="flex h-full items-end p-2" aria-hidden="true">
        <div className="h-5 w-full border border-primary bg-accent/50" />
      </div>
    );
  }
  return (
    <div
      className="flex h-full flex-col justify-center gap-1 p-2"
      aria-hidden="true"
    >
      {[1, 2, 3].map((n) => (
        <div key={n} className="flex items-center gap-1">
          <span className="h-2 w-2 border border-primary bg-accent" />
          <span className="h-1 flex-1 bg-primary/15" />
        </div>
      ))}
    </div>
  );
}

/** Interactive theme modules — click a card to inspect deliverable detail. */
export function ShpModuleDeliverables({
  service,
}: ShpModuleDeliverablesProps) {
  const { deliverables } = service;
  const [active, setActive] = useState(0);
  if (!deliverables?.items?.length) return null;

  const items = deliverables.items;
  const current = items[active] ?? items[0];
  const currentShape = MODULE_SHAPES[active % MODULE_SHAPES.length];

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#E8E8E2]", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Theme modules
            </p>
            <h2
              id="service-deliverables-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
            >
              {deliverables.heading}
            </h2>
          </div>
          <p className="border-2 border-primary bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
            {items.length} modules
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(16rem,22rem)]">
          <ul
            className="grid grid-cols-2 gap-2 sm:grid-cols-4"
            role="tablist"
            aria-label="Theme modules"
          >
            {items.map((item, index) => {
              const shape = MODULE_SHAPES[index % MODULE_SHAPES.length];
              const selected = active === index;
              return (
                <li key={item.title}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(index)}
                    className={cn(
                      "flex h-full w-full flex-col border-2 text-left transition-colors",
                      selected
                        ? "border-primary bg-primary text-text-on-dark shadow-[3px_3px_0_0_#C6F135]"
                        : "border-primary/30 bg-background text-primary hover:border-primary/60",
                    )}
                  >
                    <div
                      className={cn(
                        "flex items-center justify-between border-b-2 px-2 py-1.5",
                        selected
                          ? "border-accent/40 bg-[#1a1a17]"
                          : "border-primary/20 bg-[#FAFAF7]",
                      )}
                    >
                      <span
                        className={cn(
                          "font-mono text-[9px] font-bold uppercase",
                          selected ? "text-accent" : "text-text-secondary",
                        )}
                      >
                        Mod {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <div
                      className={cn(
                        "h-14 border-b-2",
                        selected
                          ? "border-accent/30 bg-[#141412]"
                          : "border-primary/15 bg-[#F4F4EF]",
                      )}
                    >
                      <ModuleThumb shape={shape} />
                    </div>
                    <p className="line-clamp-2 p-2 text-xs font-black leading-snug">
                      {item.title}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>

          <div
            className="border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]"
            role="tabpanel"
            aria-label={current.title}
          >
            <div className="flex items-center justify-between border-b-2 border-primary bg-primary px-4 py-2.5">
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                Module {String(active + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[9px] font-bold uppercase text-text-on-dark/50">
                Selected
              </span>
            </div>
            <div className="h-28 border-b-2 border-primary bg-[#FAFAF7]">
              <ModuleThumb shape={currentShape} />
            </div>
            <div className="p-5">
              <h3 className="text-lg font-black tracking-tight text-primary sm:text-xl">
                {current.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-snug text-text-secondary sm:text-base">
                {current.description}
              </p>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
