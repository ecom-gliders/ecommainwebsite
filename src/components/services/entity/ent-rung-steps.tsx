import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntRungStepsProps {
  service: ServicePageConfig;
}

/** Ascending rung steps — diagonal climb, not vertical fix ladder. */
export function EntRungSteps({ service }: EntRungStepsProps) {
  const { solution } = service;

  return (
    <section
      id="service-solution"
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <ol className="relative mt-10 max-w-3xl">
          {solution.steps.map((step, index) => (
            <li
              key={step.title}
              className="relative pb-6 last:pb-0"
              style={{ marginLeft: `${index * 1.25}rem` }}
            >
              {index < solution.steps.length - 1 ? (
                <div
                  className="pointer-events-none absolute left-4 top-10 h-[calc(100%-1rem)] w-0.5 bg-primary/30"
                  aria-hidden="true"
                />
              ) : null}
              <div className="flex gap-3">
                <span
                  className="relative z-[1] flex h-9 w-9 shrink-0 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-black text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1 border-2 border-primary bg-background p-4 shadow-[2px_2px_0_0_#131311]">
                  <h3 className="text-base font-black text-primary">{step.title}</h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
