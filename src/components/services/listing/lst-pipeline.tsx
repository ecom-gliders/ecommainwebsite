import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstPipelineProps {
  service: ServicePageConfig;
}

/** Zigzag rewrite layers — not equal 4-up cards or connected ops pipeline. */
export function LstPipeline({ service }: LstPipelineProps) {
  const { solution } = service;

  return (
    <section
      id="service-solution"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <ol className="relative mt-10 space-y-0">
          <span
            className="pointer-events-none absolute left-4 top-2 bottom-2 w-0.5 bg-primary/25 sm:left-1/2 sm:-translate-x-px"
            aria-hidden="true"
          />
          {solution.steps.map((step, index) => {
            const right = index % 2 === 1;
            return (
              <li
                key={step.title}
                className={cn(
                  "relative grid gap-3 py-4 sm:grid-cols-2 sm:gap-8 sm:py-5",
                )}
              >
                <div
                  className={cn(
                    "relative z-[1] border-2 border-primary bg-[#F4F4F4] p-4 sm:p-5",
                    right ? "sm:col-start-2" : "sm:col-start-1",
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-5 flex h-8 w-8 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-black text-primary",
                      right
                        ? "left-0 -translate-x-1/2 sm:left-0"
                        : "left-0 -translate-x-1/2 sm:left-auto sm:right-0 sm:translate-x-1/2",
                    )}
                    aria-hidden="true"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="pl-6 text-base font-black text-primary sm:pl-0 sm:pr-0">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 pl-6 text-sm font-medium leading-snug text-text-secondary sm:pl-0">
                    {step.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ol>
      </ServicePageShell>
    </section>
  );
}
