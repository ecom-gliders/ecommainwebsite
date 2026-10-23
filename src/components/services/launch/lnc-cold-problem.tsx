import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncColdProblemProps {
  service: ServicePageConfig;
}

const COLD_SIGNALS = [
  "Ads start before listing gates clear",
  "Stock and spend on different clocks",
  "No week-one scale or pause rules",
];

const STAGED_SIGNALS = [
  "Readiness checklist before traffic",
  "Inventory cover matched to push window",
  "Named gates for scale, pause, or fix",
];

/** Cold launch versus staged countdown split — not lifecycle loop or spark phones. */
export function LncColdProblem({ service }: LncColdProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-8">
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
          </div>

          <div
            className="flex flex-col overflow-hidden border-2 border-accent"
            aria-label="Cold launch versus staged launch"
          >
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
              <div className="flex flex-col bg-[#1a1a18] p-5 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                  Cold launch
                </p>
                <div
                  className="mt-4 flex flex-1 flex-col justify-center border border-dashed border-text-on-dark/25 bg-[#0c0c0b] p-4"
                  aria-hidden="true"
                >
                  <p className="text-center font-mono text-2xl font-black text-text-on-dark/25">
                    T-0
                  </p>
                  <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-[0.08em] text-text-on-dark/40">
                    All channels at once
                  </p>
                  <div className="mt-4 grid grid-cols-3 gap-1">
                    {[1, 2, 3].map((n) => (
                      <span
                        key={n}
                        className="h-8 border border-red-400/30 bg-red-950/40"
                      />
                    ))}
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-xs font-medium text-text-on-dark/55">
                  {COLD_SIGNALS.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col border-t-2 border-accent bg-accent p-5 text-primary sm:border-l-2 sm:border-t-0 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/65">
                  Staged launch
                </p>
                <div
                  className="mt-4 flex flex-1 flex-col justify-center border-2 border-primary bg-[#0c0c0b] p-3"
                  aria-hidden="true"
                >
                  <ol className="grid grid-cols-4 gap-1">
                    {["T-14", "T-3", "T-0", "T+14"].map((label, i) => (
                      <li
                        key={label}
                        className={cn(
                          "flex flex-col items-center border border-primary/40 py-2",
                          i === 2 && "bg-accent text-primary",
                        )}
                      >
                        <span className="font-mono text-[8px] font-black">{label}</span>
                        <span className="mt-1 h-4 w-full max-w-[1.75rem] bg-primary/20" />
                      </li>
                    ))}
                  </ol>
                </div>
                <ul className="mt-4 space-y-2 text-xs font-bold text-primary/90">
                  {STAGED_SIGNALS.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
