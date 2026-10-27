import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcCheckpointsProps {
  service: ServicePageConfig;
}

/** Deliverables as checkpoint posts along a horizontal route. */
export function SrcCheckpoints({ service }: SrcCheckpointsProps) {
  const { deliverables } = service;
  const items = deliverables.items;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#E4EBE9]", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Route checkpoints
            </p>
            <h2
              id="service-deliverables-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
            >
              {deliverables.heading}
            </h2>
          </div>
          <p className="border-2 border-primary bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
            {items.length} gates
          </p>
        </div>

        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 bg-primary/30 sm:block"
            aria-hidden="true"
          />
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, index) => (
              <li key={item.title} className="relative">
                <span
                  className="absolute -top-1 left-4 z-[1] flex h-7 w-7 items-center justify-center border-2 border-primary bg-accent font-mono text-[10px] font-black text-primary sm:left-1/2 sm:-translate-x-1/2"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div className="mt-3 border-2 border-primary bg-background p-4 pt-9 shadow-[3px_3px_0_0_#131311] sm:pt-10">
                  <h3 className="text-base font-black leading-snug text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm font-medium leading-snug text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
