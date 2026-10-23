import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyTypeRailProps {
  service: ServicePageConfig;
}

/** Horizontal typeset ruler — not zigzag or connected ops pipeline. */
export function CpyTypeRail({ service }: CpyTypeRailProps) {
  const { solution } = service;

  return (
    <section
      id="service-solution"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute left-0 right-0 top-[1.15rem] hidden h-0.5 bg-primary sm:block"
            aria-hidden="true"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
            {solution.steps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col">
                <span
                  className="relative z-[1] mb-3 flex h-9 w-9 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-black text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="flex flex-1 flex-col border-2 border-primary bg-background p-4">
                  <h3 className="text-base font-black text-primary">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
