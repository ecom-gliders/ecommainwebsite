import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvControlTilesProps {
  service: ServicePageConfig;
}

const FILL = [92, 78, 64, 86, 54, 70, 60, 82] as const;

/** Deliverables as rack control slots with cover fill meters. */
export function InvControlTiles({ service }: InvControlTilesProps) {
  const { deliverables } = service;
  const items = deliverables.items;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#E6E6E0]", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
              Control rack
            </p>
            <h2
              id="service-deliverables-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
            >
              {deliverables.heading}
            </h2>
          </div>
          <p className="border-2 border-primary bg-accent px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary">
            {items.length} active controls
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const fill = FILL[index % FILL.length];
            return (
              <li
                key={item.title}
                className="flex flex-col border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311]"
              >
                <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2.5">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
                    Ctrl {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="h-2.5 w-2.5 bg-accent"
                    aria-hidden="true"
                  />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <div className="flex items-end gap-3">
                    <div
                      className="relative h-16 w-4 shrink-0 overflow-hidden border border-primary/40 bg-[#E8E8E4]"
                      aria-hidden="true"
                    >
                      <div
                        className="absolute inset-x-0 bottom-0 bg-accent"
                        style={{ height: `${fill}%` }}
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-text-secondary">
                        Cover signal
                      </p>
                      <p className="mt-0.5 font-mono text-lg font-black tabular-nums text-primary">
                        {fill}%
                      </p>
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-black leading-snug text-primary">
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
