"use client";

import { useState } from "react";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpBuildRailProps {
  service: ServicePageConfig;
}

/** Interactive build phases — click a stage to inspect milestone detail. */
export function ShpBuildRail({ service }: ShpBuildRailProps) {
  const module = service.modules?.find((m) => m.type === "brandPathwayBoard");
  const [active, setActive] = useState(1);
  if (!module || module.type !== "brandPathwayBoard") return null;

  const phases = module.stages;
  const current = phases[active] ?? phases[0];

  return (
    <section
      id={module.id}
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby={`${module.id}-heading`}
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
          Build rail
        </p>
        <h2
          id={`${module.id}-heading`}
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
        >
          {module.heading}
        </h2>
        {module.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary sm:text-base">
            {module.subheading}
          </p>
        ) : null}

        <div className="mt-8 overflow-hidden border-2 border-primary shadow-[4px_4px_0_0_#131311]">
          <div
            className="grid grid-cols-2 border-b-2 border-primary sm:grid-cols-4"
            role="tablist"
            aria-label="Build phases"
          >
            {phases.map((phase, index) => (
              <button
                key={phase.label}
                type="button"
                role="tab"
                aria-selected={active === index}
                onClick={() => setActive(index)}
                className={cn(
                  "relative border-r-2 border-b-2 border-primary px-3 py-4 text-left transition-colors last:border-r-0 sm:border-b-0 sm:px-4",
                  "sm:[&:nth-child(2)]:border-b-0",
                  active === index
                    ? "bg-accent text-primary"
                    : "bg-[#FAFAF7] text-primary hover:bg-[#F0F0EB]",
                )}
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] opacity-60">
                  Phase {String(index + 1).padStart(2, "0")}
                </span>
                <span className="mt-1 block text-sm font-black leading-tight">
                  {phase.label}
                </span>
                {active === index ? (
                  <span
                    className="absolute inset-x-0 bottom-0 hidden h-1 bg-primary sm:block"
                    aria-hidden="true"
                  />
                ) : null}
              </button>
            ))}
          </div>

          <div
            className="grid gap-0 lg:grid-cols-[minmax(0,1fr)_minmax(12rem,16rem)]"
            role="tabpanel"
            aria-label={`Phase ${active + 1}: ${current.label}`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className={cn(
                    "border-2 border-primary px-2 py-0.5 font-mono text-[9px] font-bold uppercase",
                    current.state === "done" && "bg-accent text-primary",
                    current.state === "current" && "bg-primary text-accent",
                    current.state === "upcoming" &&
                      "border-dashed bg-background text-text-secondary",
                  )}
                >
                  {current.state}
                </span>
                <h3 className="text-xl font-black tracking-tight text-primary sm:text-2xl">
                  {current.label}
                </h3>
              </div>
              <p className="mt-2 text-sm font-medium leading-snug text-text-secondary sm:text-base">
                {current.detail}
              </p>

              <div className="mt-6 border-2 border-primary bg-[#FAFAF7] p-4">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  {module.urlLabel}
                </p>
                <p className="mt-2 text-sm font-medium text-primary">
                  {module.disclaimer}
                </p>
              </div>
            </div>

            <div
              className="border-t-2 border-primary bg-primary p-5 lg:border-l-2 lg:border-t-0"
              aria-hidden="true"
            >
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent">
                Rail progress
              </p>
              <div className="mt-4 space-y-3">
                {phases.map((phase, i) => (
                  <div key={phase.label} className="flex items-center gap-2">
                    <span
                      className={cn(
                        "flex h-8 w-8 shrink-0 items-center justify-center border-2 font-mono text-[10px] font-black",
                        i <= active
                          ? "border-accent bg-accent text-primary"
                          : "border-text-on-dark/30 text-text-on-dark/40",
                      )}
                    >
                      {i + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div
                        className={cn(
                          "h-2 w-full",
                          i < active
                            ? "bg-accent"
                            : i === active
                              ? "bg-accent/50"
                              : "bg-text-on-dark/15",
                        )}
                      />
                      <p
                        className={cn(
                          "mt-1 truncate font-mono text-[9px] font-bold uppercase",
                          i <= active
                            ? "text-text-on-dark/70"
                            : "text-text-on-dark/35",
                        )}
                      >
                        {phase.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
