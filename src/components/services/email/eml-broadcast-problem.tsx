"use client";

import Image from "next/image";
import { useState } from "react";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EmlBroadcastProblemProps {
  service: ServicePageConfig;
}

type CadenceMode = "broadcast" | "looped";

/**
 * One-and-done broadcast versus looped cadence.
 * Both panels stay in DOM; toggle only changes visual emphasis.
 */
export function EmlBroadcastProblem({ service }: EmlBroadcastProblemProps) {
  const { problem } = service;
  const [mode, setMode] = useState<CadenceMode>("broadcast");
  if (!problem?.points?.length) return null;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
          Cadence gap
        </p>
        <h2
          id="service-problem-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
        >
          {problem.heading}
        </h2>

        <div
          className="mt-6 flex w-full max-w-md border-2 border-accent"
          role="tablist"
          aria-label="Broadcast versus looped cadence"
        >
          {(
            [
              { id: "broadcast" as const, label: "One-and-done" },
              { id: "looped" as const, label: "Looped cadence" },
            ] as const
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={mode === tab.id}
              onClick={() => setMode(tab.id)}
              className={cn(
                "flex-1 px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.1em] transition-colors sm:text-[11px]",
                mode === tab.id
                  ? "bg-accent text-primary"
                  : "bg-[#161614] text-text-on-dark/70 hover:bg-[#1a1a17]",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-stretch lg:gap-8">
          <ul className="space-y-3">
            {problem.points.map((point, index) => (
              <li key={point.title} className="border-l-2 border-accent pl-3">
                <p className="font-mono text-[10px] font-bold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-0.5 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                  {point.title}
                </h3>
                <p className="mt-1 text-xs font-medium leading-snug text-text-on-dark/70 sm:text-sm">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>

          <div
            className="overflow-hidden border-2 border-accent"
            aria-label="One-and-done email versus looped cadence"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div
                className={cn(
                  "p-5 transition-opacity sm:p-6",
                  mode === "broadcast"
                    ? "bg-[#1a1a18] opacity-100"
                    : "bg-[#141412] opacity-55",
                )}
                aria-hidden={mode !== "broadcast"}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                  One-and-done
                </p>
                <div
                  className="mt-5 flex flex-col items-center gap-2"
                  aria-hidden="true"
                >
                  <div className="h-10 w-full max-w-[10rem] border border-text-on-dark/25 bg-[#0c0c0b] p-2">
                    <div className="h-2 w-2/3 bg-text-on-dark/20" />
                    <div className="mt-2 h-1 w-full bg-text-on-dark/10" />
                  </div>
                  <div className="h-8 w-px bg-text-on-dark/30" />
                  <div className="h-6 w-6 rotate-45 border-2 border-text-on-dark/35" />
                  <p className="font-mono text-[9px] font-bold text-text-on-dark/40">
                    End
                  </p>
                </div>
                <ul className="mt-5 space-y-2 text-xs font-medium text-text-on-dark/55">
                  <li>Single promo after signup</li>
                  <li>No post-purchase follow-through</li>
                  <li>Quiet list stays quiet</li>
                </ul>
              </div>

              <div
                className={cn(
                  "border-t-2 border-accent p-5 transition-opacity sm:border-l-2 sm:border-t-0 sm:p-6",
                  mode === "looped"
                    ? "bg-accent text-primary opacity-100"
                    : "bg-accent/70 text-primary opacity-70",
                )}
                aria-hidden={mode !== "looped"}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/65">
                  Looped cadence
                </p>
                <div className="relative mx-auto mt-4 aspect-square w-full max-w-[7.5rem] overflow-hidden border-2 border-primary">
                  <Image
                    src="/images/services/email-retention-marketing/email-day-journey.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="120px"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-xs font-bold text-primary/90">
                  <li>Welcome through loyalty stages</li>
                  <li>Timing matched to purchase cadence</li>
                  <li>Win-back before list decay</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
