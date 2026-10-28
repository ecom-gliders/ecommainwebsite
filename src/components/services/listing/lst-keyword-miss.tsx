import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstKeywordMissProps {
  service: ServicePageConfig;
}

/** Problem as keyword index heatmap — right visual leads. */
const HEAT = [
  { term: "waterproof", status: "miss" as const },
  { term: "hiking boots", status: "hit" as const },
  { term: "men wide", status: "miss" as const },
  { term: "gore-tex", status: "miss" as const },
  { term: "trail grip", status: "partial" as const },
  { term: "lightweight", status: "hit" as const },
  { term: "ankle support", status: "miss" as const },
  { term: "mud sole", status: "partial" as const },
  { term: "breathable", status: "hit" as const },
  { term: "wide fit", status: "miss" as const },
  { term: "winter hike", status: "miss" as const },
  { term: "daypack trek", status: "partial" as const },
];

export function LstKeywordMiss({ service }: LstKeywordMissProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.35fr)] lg:items-stretch lg:gap-8">
          <div className="flex flex-col justify-center">
            <h2
              id="service-problem-heading"
              className="max-w-md text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 space-y-3">
              {problem.points.map((point, index) => (
                <li key={point.title} className="border-l-2 border-accent pl-3">
                  <p className="font-mono text-xs font-bold text-accent">
                    Gap {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                    {point.title}
                  </h3>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col border-2 border-accent bg-[#1a1a18] p-5 sm:p-6"
            aria-label="Keyword index status"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-accent/30 pb-3">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
                Index heatmap
              </p>
              <div className="flex flex-wrap items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.08em]">
                <span className="flex items-center gap-1.5 text-accent">
                  <span className="h-2.5 w-2.5 bg-accent" /> Indexed
                </span>
                <span className="flex items-center gap-1.5 text-text-on-dark/70">
                  <span className="h-2.5 w-2.5 border border-accent/50 bg-transparent" />{" "}
                  Partial
                </span>
                <span className="flex items-center gap-1.5 text-text-on-dark/50">
                  <span className="h-2.5 w-2.5 bg-text-on-dark/25" /> Missing
                </span>
              </div>
            </div>
            <ul className="mt-5 grid flex-1 grid-cols-2 content-center gap-2.5 sm:grid-cols-3 sm:gap-3">
              {HEAT.map((item) => (
                <li
                  key={item.term}
                  className={cn(
                    "flex items-center justify-center border-2 px-2 py-3 text-center font-mono text-xs font-bold sm:py-3.5 sm:text-sm",
                    item.status === "hit" &&
                      "border-accent bg-accent text-primary",
                    item.status === "partial" &&
                      "border-accent/50 bg-transparent text-text-on-dark/85",
                    item.status === "miss" &&
                      "border-transparent bg-text-on-dark/10 text-text-on-dark/45 line-through",
                  )}
                >
                  {item.term}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
