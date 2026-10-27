import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlMonitorDeliverablesProps {
  service: ServicePageConfig;
}

/** Deliverables as threshold-monitor tiles with limit markers. */
export function AhlMonitorDeliverables({
  service,
}: AhlMonitorDeliverablesProps) {
  const { deliverables } = service;
  const items = deliverables.items.slice(0, 8);

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#E6E6E0]", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Monitor rack
            </p>
            <h2
              id="service-deliverables-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
            >
              {deliverables.heading}
            </h2>
          </div>
          <p className="border-2 border-primary bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
            {items.length} controls
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const fill = 55 + (index % 4) * 10;
            return (
              <li
                key={item.title}
                className="flex flex-col border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311]"
              >
                <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2.5">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                    Mon {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-2.5 w-2.5 bg-accent" aria-hidden="true" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div
                    className="relative h-2.5 w-full border border-primary/25 bg-[#E8E8E4]"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${fill}%` }}
                    />
                    <div
                      className="absolute inset-y-0 w-0.5 bg-primary"
                      style={{ left: "75%" }}
                    />
                  </div>
                  <h3 className="mt-3 text-base font-black leading-snug text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-snug text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
