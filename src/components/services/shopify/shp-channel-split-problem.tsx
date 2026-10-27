"use client";

import { useState } from "react";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpChannelSplitProblemProps {
  service: ServicePageConfig;
}

type ChannelMode = "amazon" | "owned";

/** Interactive Amazon-only vs owned storefront toggle — CSS wireframes only. */
export function ShpChannelSplitProblem({
  service,
}: ShpChannelSplitProblemProps) {
  const { problem } = service;
  const [mode, setMode] = useState<ChannelMode>("amazon");
  if (!problem?.points?.length) return null;

  const amazonPoints = problem.points.slice(0, 2);
  const ownedPoints = problem.points.slice(2, 4);
  const activePoints = mode === "amazon" ? amazonPoints : ownedPoints;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
          Channel gap
        </p>
        <h2
          id="service-problem-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
        >
          {problem.heading}
        </h2>

        <div className="mt-8 overflow-hidden border-2 border-accent">
          <div
            className="grid grid-cols-2 border-b border-accent"
            role="tablist"
            aria-label="Channel comparison"
          >
            {(
              [
                { id: "amazon" as const, label: "Amazon-only" },
                { id: "owned" as const, label: "Owned storefront" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={mode === tab.id}
                onClick={() => setMode(tab.id)}
                className={cn(
                  "px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.1em] transition-colors sm:text-[11px]",
                  mode === tab.id
                    ? "bg-accent text-primary"
                    : "bg-[#161614] text-text-on-dark/70 hover:bg-[#1a1a17]",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div
            className="grid gap-0 lg:grid-cols-2"
            role="tabpanel"
            aria-label={mode === "amazon" ? "Amazon-only" : "Owned storefront"}
          >
            <div
              className={cn(
                "min-h-[14rem] p-5 sm:p-6",
                mode === "amazon" ? "bg-[#1a1a17]" : "bg-[#141412]",
              )}
              aria-hidden="true"
            >
              {mode === "amazon" ? (
                <div className="space-y-3 border border-text-on-dark/20 bg-[#0c0c0b] p-4">
                  <div className="h-2 w-3/4 bg-text-on-dark/20" />
                  <div className="grid grid-cols-4 gap-1.5">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="aspect-square bg-text-on-dark/10" />
                    ))}
                  </div>
                  <div className="h-8 w-full bg-text-on-dark/15" />
                  <p className="font-mono text-[9px] font-bold uppercase text-text-on-dark/40">
                    Marketplace template
                  </p>
                </div>
              ) : (
                <div className="border-2 border-accent bg-[#0c0c0b] p-4 shadow-[3px_3px_0_0_#C6F135]">
                  <div className="h-2 w-1/2 bg-accent" />
                  <div className="mt-3 h-5 w-4/5 bg-text-on-dark" />
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <div
                        key={i}
                        className="aspect-[4/3] border border-accent/30 bg-[#1a1a17]"
                      />
                    ))}
                  </div>
                  <span className="mt-4 inline-flex h-8 items-center border-2 border-accent bg-accent px-3 font-mono text-[9px] font-black uppercase text-primary">
                    Shop collection
                  </span>
                </div>
              )}
            </div>

            <ul className="space-y-0 border-t border-accent lg:border-l lg:border-t-0">
              {activePoints.map((point, index) => (
                <li
                  key={point.title}
                  className={cn(
                    "border-b border-accent/25 p-5 last:border-b-0 sm:p-6",
                    mode === "owned" && "bg-[#141412]",
                  )}
                >
                  <p className="font-mono text-[10px] font-bold text-accent">
                    {mode === "amazon" ? "Risk" : "Gain"}{" "}
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-base font-black text-text-on-dark sm:text-lg">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/70 sm:text-base">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
