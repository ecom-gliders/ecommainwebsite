import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcRouteMapProps {
  service: ServicePageConfig;
}

const LANE_TINTS = [
  "bg-[#EEF3F2]",
  "bg-[#E2EBE9]",
  "bg-[#D8E4E2]",
  "bg-[#C5D6D3]",
];

/** Solution as parallel supply lanes that merge at launch handoff. */
export function SrcRouteMap({ service }: SrcRouteMapProps) {
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

        <div className="mt-8 overflow-hidden border-2 border-accent">
          <div className="grid grid-cols-2 gap-px bg-accent sm:grid-cols-4">
            {solution.steps.map((step, index) => (
              <div
                key={step.title}
                className={cn(
                  "relative flex min-h-[10rem] flex-col p-4 text-primary sm:min-h-[11rem] sm:p-5",
                  LANE_TINTS[index] ?? "bg-[#EEF3F2]",
                )}
              >
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  Lane {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-base font-black leading-snug sm:text-lg">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary">
                  {step.description}
                </p>
                <div
                  className="mt-3 h-1.5 border border-primary/20 bg-background"
                  aria-hidden="true"
                >
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${55 + index * 12}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="border-t-2 border-accent bg-primary px-4 py-3 sm:px-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
              Merge point
            </p>
            <p className="mt-1 text-sm font-medium text-text-on-dark/90">
              Approved product specs pass to catalog, listing, creative, and ads
              planning.
            </p>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
