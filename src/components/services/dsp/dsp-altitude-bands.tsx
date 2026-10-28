import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface DspAltitudeBandsProps {
  service: ServicePageConfig;
}

/** Solution as stacked altitude / flight bands — not PPC funnel, not FS runway. */
export function DspAltitudeBands({ service }: DspAltitudeBandsProps) {
  const { solution } = service;
  const opacities = ["bg-accent", "bg-accent/80", "bg-accent/60", "bg-accent/45"];

  return (
    <section
      id="service-approach"
      className={cn("bg-accent text-primary", serviceSectionPad)}
      aria-labelledby="service-approach-heading"
    >
      <ServicePageShell>
        <h2
          id="service-approach-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <ol className="mt-8 space-y-0 overflow-hidden border-2 border-primary">
          {solution.steps.map((step, index) => (
            <li
              key={step.title}
              className={cn(
                "grid gap-3 border-primary p-4 sm:grid-cols-[5.5rem_1fr] sm:items-center sm:gap-6 sm:p-5",
                opacities[index] ?? "bg-accent/40",
                index > 0 && "border-t-2",
              )}
            >
              <div className="flex items-center gap-2 sm:flex-col sm:items-start sm:gap-1">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary/70">
                  Band {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="hidden h-1 w-full max-w-[4rem] bg-primary sm:block"
                  aria-hidden="true"
                  style={{ width: `${100 - index * 18}%` }}
                />
              </div>
              <div>
                <h3 className="text-base font-black sm:text-lg">{step.title}</h3>
                <p className="mt-1 text-sm font-medium leading-relaxed text-primary/80">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
