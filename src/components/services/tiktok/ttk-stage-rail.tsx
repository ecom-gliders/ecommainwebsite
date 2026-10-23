import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkStageRailProps {
  service: ServicePageConfig;
}

const STAGES = ["Test", "Scale", "Refresh", "Handoff"] as const;

/** Campaign stage rail — not production sprocket or ops pipeline zigzag. */
export function TtkStageRail({ service }: TtkStageRailProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);

  return (
    <section
      id="service-solution"
      className={cn("bg-[#0c0c0b] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <div className="relative mt-10">
          <div
            className="absolute left-0 right-0 top-6 hidden h-0.5 bg-accent/40 sm:block"
            aria-hidden="true"
          />

          <ol className="relative grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li key={step.title} className="relative flex flex-col">
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex border-2 border-accent bg-accent px-2 py-0.5 font-mono text-[10px] font-black uppercase text-primary">
                    {STAGES[index] ?? `Stage ${index + 1}`}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-text-on-dark/45">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col border border-accent/35 bg-[#141412] p-4">
                  <div
                    className="mb-3 aspect-[9/16] w-full max-w-[3.5rem] border border-text-on-dark/20 bg-[#0c0c0b]"
                    aria-hidden="true"
                  />
                  <h3 className="text-base font-black text-text-on-dark">{step.title}</h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/70">
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
