import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VisFramePipelineProps {
  service: ServicePageConfig;
}

/** Horizontal frame pipeline — light-table sequence, not zigzag ops rail. */
export function VisFramePipeline({ service }: VisFramePipelineProps) {
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

        <div className="relative mt-10 overflow-x-auto pb-2">
          <div
            className="pointer-events-none absolute left-8 right-8 top-[4.25rem] hidden h-0.5 bg-primary/20 lg:block"
            aria-hidden="true"
          />
          <ol className="flex min-w-[36rem] gap-3 lg:min-w-0 lg:grid lg:grid-cols-4 lg:gap-4">
            {solution.steps.map((step, index) => (
              <li
                key={step.title}
                className="relative flex min-w-[9rem] flex-1 flex-col lg:min-w-0"
              >
                <div className="relative mx-auto w-full max-w-[10rem] border-2 border-primary bg-[#F4F4F4] p-2 shadow-[3px_3px_0_0_#131311]">
                  <div className="aspect-[4/5] bg-gradient-to-b from-[#EDE8DF] to-background" />
                  <span className="absolute -right-1 -top-1 flex h-7 w-7 items-center justify-center border-2 border-primary bg-accent font-mono text-[10px] font-black text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-4 flex flex-1 flex-col border-t-2 border-primary pt-3">
                  <h3 className="text-sm font-black text-primary sm:text-base">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
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
