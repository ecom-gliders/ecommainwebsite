import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlResponseTrackProps {
  service: ServicePageConfig;
}

export function AhlResponseTrack({ service }: AhlResponseTrackProps) {
  const { solution } = service;

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
        <ol className="relative mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solution.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative border-2 border-accent/50 bg-[#1a1a18] p-4 sm:p-5"
            >
              {index < solution.steps.length - 1 ? (
                <span
                  className="pointer-events-none absolute right-0 top-1/2 hidden h-0.5 w-4 translate-x-full bg-accent/60 lg:block"
                  aria-hidden="true"
                />
              ) : null}
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                Phase {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-black text-text-on-dark sm:text-lg">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/85">
                {step.description}
              </p>
              <div
                className="mt-4 h-1.5 w-full bg-[#0d0d0c]"
                aria-hidden="true"
              >
                <div
                  className="h-full bg-accent"
                  style={{ width: `${((index + 1) / solution.steps.length) * 100}%` }}
                />
              </div>
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
