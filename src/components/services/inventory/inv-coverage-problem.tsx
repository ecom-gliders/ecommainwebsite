import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvCoverageProblemProps {
  service: ServicePageConfig;
}

const STOCKOUT_BARS = [4, 8, 3, 0, 6, 2];
const HEALTHY_BARS = [78, 92, 85, 88, 74, 90];

/** Stockout vs healthy coverage contrast — warehouse fill, not KPI ledger. */
export function InvCoverageProblem({ service }: InvCoverageProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-[#E8E8E4]", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:items-stretch lg:gap-8">
          <div className="flex flex-col justify-center">
            <h2
              id="service-problem-heading"
              className="max-w-md text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 space-y-3">
              {problem.points.map((point, index) => (
                <li
                  key={point.title}
                  className="border-l-4 border-primary bg-background/85 py-2 pl-3"
                >
                  <p className="font-mono text-[10px] font-bold text-text-secondary">
                    Gap {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-sm font-black leading-snug text-primary sm:text-base">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-secondary">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid min-h-[18rem] grid-cols-2 gap-0 border-2 border-primary bg-background">
            <div
              className="flex flex-col border-r-2 border-primary bg-[#F4F4F4] p-4 sm:p-5"
              aria-label="Stockout coverage pattern"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                Stockout pattern
              </p>
              <p className="mt-1 text-xs font-medium text-text-secondary">
                Ads still running, bays empty
              </p>
              <div className="mt-4 flex flex-1 items-end gap-2">
                {STOCKOUT_BARS.map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col justify-end"
                    aria-hidden="true"
                  >
                    <div
                      className="w-full border border-primary/40 bg-[#D4A0A0]"
                      style={{ height: `${Math.max(height, 2) * 3}px` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[9px] font-bold uppercase text-primary/60">
                Cover below reorder point
              </p>
            </div>

            <div
              className="flex flex-col bg-[#DDE8D0] p-4 sm:p-5"
              aria-label="Healthy coverage pattern"
            >
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
                Healthy coverage
              </p>
              <p className="mt-1 text-xs font-medium text-primary/80">
                Inbound paced to demand
              </p>
              <div className="mt-4 flex flex-1 items-end gap-2">
                {HEALTHY_BARS.map((height, index) => (
                  <div
                    key={index}
                    className="flex flex-1 flex-col justify-end"
                    aria-hidden="true"
                  >
                    <div
                      className={cn(
                        "w-full border border-primary/40",
                        index % 3 === 0 ? "bg-accent" : "bg-[#B8CF9E]",
                      )}
                      style={{ height: `${height * 0.45}px` }}
                    />
                  </div>
                ))}
              </div>
              <p className="mt-3 font-mono text-[9px] font-bold uppercase text-primary">
                Cover holds through ad scale
              </p>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
