import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidProductionTimelineProps {
  service: ServicePageConfig;
}

const PHASES = ["Pre", "Shoot", "Edit", "Publish"] as const;

/** Production timeline rail — not typeset ruler or ops pipeline zigzag. */
export function VidProductionTimeline({ service }: VidProductionTimelineProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);

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
            className="absolute left-0 right-0 top-5 hidden h-8 overflow-hidden sm:block"
            aria-hidden="true"
          >
            <div className="h-full border-y-2 border-primary bg-primary">
              <div className="flex h-full items-center justify-around px-2">
                {Array.from({ length: 24 }).map((_, i) => (
                  <span
                    key={i}
                    className="h-2 w-2 shrink-0 rounded-sm bg-background/80"
                  />
                ))}
              </div>
            </div>
          </div>

          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative pt-0 sm:pt-10">
                <div className="mb-3 flex items-center gap-2 sm:absolute sm:left-4 sm:top-0 sm:mb-0">
                  <span className="inline-flex border-2 border-primary bg-accent px-2 py-0.5 font-mono text-[10px] font-black uppercase text-primary">
                    {PHASES[index] ?? `Step ${index + 1}`}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="border-2 border-primary bg-background p-4">
                  <h3 className="text-base font-black text-primary">{step.title}</h3>
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
