"use client";

import { useState } from "react";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpFloorAudienceProps {
  service: ServicePageConfig;
}

type FloorId = "brand" | "catalog" | "checkout" | "ops";

const FLOOR_META: Record<
  FloorId,
  { floor: string; wireLabel: string; blocks: string[] }
> = {
  brand: {
    floor: "01",
    wireLabel: "Brand layer",
    blocks: ["Logo lockup", "Hero story", "Trust strip"],
  },
  catalog: {
    floor: "02",
    wireLabel: "Catalog layer",
    blocks: ["Collection grid", "Filters", "Quick view"],
  },
  checkout: {
    floor: "03",
    wireLabel: "Checkout layer",
    blocks: ["Cart drawer", "Payment", "Confirmation"],
  },
  ops: {
    floor: "04",
    wireLabel: "Ops layer",
    blocks: ["Orders", "Inventory sync", "Reports"],
  },
};

/** Interactive store floors — click a floor to inspect its scope. */
export function ShpFloorAudience({ service }: ShpFloorAudienceProps) {
  const { audience } = service;
  const [active, setActive] = useState(0);
  if (!audience?.points?.length) return null;

  const floors = audience.points.slice(0, 4).map((point, index) => {
    const id = (["brand", "catalog", "checkout", "ops"] as FloorId[])[index];
    return {
      id,
      ...FLOOR_META[id],
      title: point.title,
      description: point.description,
    };
  });

  const current = floors[active] ?? floors[0];

  return (
    <section
      id="service-audience"
      className={cn("bg-[#F4F4EF]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
          Store floors
        </p>
        <h2
          id="service-audience-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
        >
          {audience.heading}
        </h2>
        <div className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)]">
          <div
            className="flex flex-row gap-2 overflow-x-auto lg:flex-col lg:overflow-visible"
            role="tablist"
            aria-label="Store floors"
          >
            {floors.map((floor, index) => (
              <button
                key={floor.id}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
                className={cn(
                  "flex min-w-[9rem] shrink-0 items-center gap-3 border-2 px-3 py-3 text-left transition-colors lg:min-w-0 lg:w-full",
                  active === index
                    ? "border-primary bg-primary text-text-on-dark shadow-[3px_3px_0_0_#C6F135]"
                    : "border-primary/25 bg-background text-primary hover:border-primary/50",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-lg font-black tabular-nums",
                    active === index ? "text-accent" : "text-primary/40",
                  )}
                >
                  {floor.floor}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-black leading-tight">
                    {floor.title}
                  </span>
                  <span
                    className={cn(
                      "mt-0.5 block font-mono text-[9px] font-bold uppercase tracking-[0.08em]",
                      active === index
                        ? "text-text-on-dark/55"
                        : "text-text-secondary",
                    )}
                  >
                    {floor.wireLabel}
                  </span>
                </span>
              </button>
            ))}
          </div>

          <div
            className="border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]"
            role="tabpanel"
            aria-label={`Floor ${current.floor}: ${current.title}`}
          >
            <div className="flex items-center justify-between gap-3 border-b-2 border-primary bg-primary px-4 py-3">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                Floor {current.floor} · {current.wireLabel}
              </p>
              <ul className="flex gap-1" aria-hidden="true">
                {floors.map((_, i) => (
                  <li
                    key={i}
                    className={cn(
                      "h-1.5 w-6",
                      i === active ? "bg-accent" : "bg-text-on-dark/20",
                    )}
                  />
                ))}
              </ul>
            </div>

            <div className="grid gap-0 sm:grid-cols-[minmax(0,1fr)_minmax(10rem,12rem)]">
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-black tracking-tight text-primary sm:text-2xl">
                  {current.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-snug text-text-secondary sm:text-base">
                  {current.description}
                </p>

                <div className="mt-6 space-y-2" aria-hidden="true">
                  {current.blocks.map((block, i) => (
                    <div
                      key={block}
                      className={cn(
                        "flex items-center gap-3 border-2 border-primary px-3 py-2.5",
                        i === 0 ? "bg-accent" : "bg-[#FAFAF7]",
                      )}
                    >
                      <span className="font-mono text-[10px] font-bold text-primary/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-sm font-bold text-primary">{block}</span>
                      <span
                        className={cn(
                          "ml-auto h-2 w-2",
                          i === 0 ? "bg-primary" : "bg-primary/25",
                        )}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div
                className="border-t-2 border-primary bg-[#0c0c0b] p-4 sm:border-l-2 sm:border-t-0"
                aria-hidden="true"
              >
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent">
                  Live wire
                </p>
                <div className="mt-3 space-y-2">
                  {current.blocks.map((block, i) => (
                    <div
                      key={block}
                      className={cn(
                        "border p-2",
                        i === 0
                          ? "border-accent bg-[#1a1a17]"
                          : "border-accent/25 bg-[#141412]",
                      )}
                    >
                      <div
                        className={cn(
                          "h-1.5 w-2/3",
                          i === 0 ? "bg-accent" : "bg-text-on-dark/20",
                        )}
                      />
                      <div className="mt-2 h-8 bg-text-on-dark/10" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
