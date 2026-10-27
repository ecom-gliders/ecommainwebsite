"use client";

import Image from "next/image";
import { useState } from "react";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkOrganicProblemProps {
  service: ServicePageConfig;
}

type FeedMode = "organic" | "paid";

/**
 * Organic vs paid spark — both panels stay in DOM (council Brand-SEO).
 * Toggle only changes visual emphasis / aria-selected.
 */
export function TtkOrganicProblem({ service }: TtkOrganicProblemProps) {
  const { problem } = service;
  const [mode, setMode] = useState<FeedMode>("organic");
  if (!problem?.points?.length) return null;

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

        <div
          className="mt-6 flex w-full max-w-md border-2 border-accent"
          role="tablist"
          aria-label="Organic versus paid spark"
        >
          {(
            [
              { id: "organic" as const, label: "Organic only" },
              { id: "paid" as const, label: "Paid spark" },
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
            aria-label="Organic-only versus paid spark"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2">
              <div
                className={cn(
                  "p-5 transition-opacity sm:p-6",
                  mode === "organic"
                    ? "bg-[#1a1a18] opacity-100"
                    : "bg-[#141412] opacity-55",
                )}
                aria-hidden={mode !== "organic"}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                  Organic only
                </p>
                <div className="relative mx-auto mt-4 aspect-[9/16] w-full max-w-[8rem] overflow-hidden border border-text-on-dark/20">
                  <Image
                    src="/images/services/tiktok-shop-ads/ttk-phone-hook.jpg"
                    alt=""
                    fill
                    className="object-cover opacity-60 grayscale"
                    sizes="128px"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-xs font-medium text-text-on-dark/55">
                  <li>Reach tied to posting cadence</li>
                  <li>Amazon stills in a vertical feed</li>
                  <li>No structured hook learning</li>
                </ul>
              </div>

              <div
                className={cn(
                  "border-t-2 border-accent p-5 transition-opacity sm:border-l-2 sm:border-t-0 sm:p-6",
                  mode === "paid"
                    ? "bg-accent text-primary opacity-100"
                    : "bg-accent/70 text-primary opacity-70",
                )}
                aria-hidden={mode !== "paid"}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/65">
                  Paid spark
                </p>
                <div className="relative mx-auto mt-4 aspect-[9/16] w-full max-w-[8rem] overflow-hidden border-2 border-primary">
                  <Image
                    src="/images/services/tiktok-shop-ads/ttk-phone-demo.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <ul className="mt-4 space-y-2 text-xs font-bold text-primary/90">
                  <li>Shop destination with tracking</li>
                  <li>Native hooks tested before scale</li>
                  <li>SKU role defined beside Amazon</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
