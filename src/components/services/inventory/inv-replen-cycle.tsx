import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvReplenCycleProps {
  service: ServicePageConfig;
}

/** Replenishment cycle ring — distinct from linear account-ops pipeline. */
export function InvReplenCycle({ service }: InvReplenCycleProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);

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

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] lg:items-center">
          <div
            className="relative mx-auto aspect-square w-full max-w-[16rem] border-2 border-accent"
            aria-hidden="true"
          >
            <div className="absolute inset-4 border-2 border-accent/40" />
            <div className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 bg-accent" />
            {steps.map((step, index) => {
              const angle = index * 90 - 90;
              const rad = (angle * Math.PI) / 180;
              const x = 50 + Math.cos(rad) * 38;
              const y = 50 + Math.sin(rad) * 38;
              return (
                <span
                  key={step.title}
                  className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center border-2 border-accent bg-primary font-mono text-[10px] font-black text-accent"
                  style={{ left: `${x}%`, top: `${y}%` }}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              );
            })}
          </div>

          <ol className="grid gap-0 overflow-hidden border-2 border-accent sm:grid-cols-2">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "flex flex-col p-4 sm:p-5",
                  index > 0 && "border-t-2 border-accent sm:border-t-0",
                  index % 2 === 1 && "sm:border-l-2 sm:border-accent",
                  index >= 2 && "sm:border-t-2 sm:border-accent",
                )}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                  Cycle {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-base font-black text-text-on-dark sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/85">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
