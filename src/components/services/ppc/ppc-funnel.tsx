import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface PpcFunnelProps {
  service: ServicePageConfig;
}

const WIDTHS = ["100%", "88%", "76%", "64%"];

/** Solution as a conversion funnel — explicit on-dark text for contrast. */
export function PpcFunnel({ service }: PpcFunnelProps) {
  const { solution } = service;

  return (
    <section
      id="service-approach"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-approach-heading"
    >
      <ServicePageShell>
        <h2
          id="service-approach-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <ol className="mt-8 flex flex-col items-center gap-2">
          {solution.steps.map((step, index) => (
            <li
              key={step.title}
              className="w-full max-w-3xl"
              style={{ width: WIDTHS[index] ?? "60%" }}
            >
              <div className="border-2 border-accent bg-primary px-4 py-4 text-center sm:px-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Stage {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-base font-black text-text-on-dark sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-relaxed text-text-on-dark/90">
                  {step.description}
                </p>
              </div>
              {index < solution.steps.length - 1 ? (
                <div
                  className="mx-auto h-3 w-0.5 bg-accent"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
