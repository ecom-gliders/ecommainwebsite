import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AosPipelineProps {
  service: ServicePageConfig;
}

/** Solution as connected horizontal pipeline. */
export function AosPipeline({ service }: AosPipelineProps) {
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
        <ol className="mt-8 grid gap-0 overflow-hidden border-2 border-accent sm:grid-cols-2 lg:grid-cols-4">
          {solution.steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "relative flex flex-col p-4 sm:p-5",
                index > 0 && "border-t-2 border-accent sm:border-t-0",
                index % 2 === 1 && "sm:border-l-2 sm:border-accent",
                index >= 2 && "sm:border-t-2 lg:border-t-0",
                index > 0 && "lg:border-l-2 lg:border-accent",
              )}
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                Step {String(index + 1).padStart(2, "0")}
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
      </ServicePageShell>
    </section>
  );
}
