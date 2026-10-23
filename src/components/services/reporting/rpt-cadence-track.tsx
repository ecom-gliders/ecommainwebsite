import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface RptCadenceTrackProps {
  service: ServicePageConfig;
}

/**
 * Solution as dual cadence track (weekly ops / monthly strategy).
 */
export function RptCadenceTrack({ service }: RptCadenceTrackProps) {
  const { solution } = service;
  const steps = solution.steps;

  return (
    <section
      id="service-solution"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-medium text-text-on-dark/85">
          Weekly ops pack and monthly strategy review on one shared metric
          language.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="border-2 border-accent bg-primary p-4 sm:p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
              Track A — Weekly
            </p>
            <div className="mt-4 flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 8 }).map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "h-3 flex-1 border border-accent/40",
                    i % 2 === 0 ? "bg-accent" : "bg-transparent",
                  )}
                />
              ))}
            </div>
            <ul className="mt-5 space-y-3">
              {steps.slice(0, 2).map((step, index) => (
                <li key={step.title}>
                  <p className="font-mono text-[10px] font-bold text-accent">
                    Step {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-base font-black text-text-on-dark">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-on-dark/85">
                    {step.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-2 border-accent bg-primary p-4 sm:p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
              Track B — Monthly
            </p>
            <div className="mt-4 flex items-center gap-1" aria-hidden="true">
              {Array.from({ length: 4 }).map((_, i) => (
                <span
                  key={i}
                  className="h-3 flex-1 border border-accent/40 bg-accent/70"
                />
              ))}
            </div>
            <ul className="mt-5 space-y-3">
              {steps.slice(2).map((step, index) => (
                <li key={step.title}>
                  <p className="font-mono text-[10px] font-bold text-accent">
                    Step {String(index + 3).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-base font-black text-text-on-dark">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-on-dark/85">
                    {step.description}
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
