import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdUnlockDeliverablesProps {
  service: ServicePageConfig;
}

/** Unlock capability tiles from deliverables — not overlapping paper sheets. */
export function BrdUnlockDeliverables({ service }: BrdUnlockDeliverablesProps) {
  const { deliverables } = service;
  const items = deliverables.items;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <h2
          id="service-deliverables-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col border-2 border-primary bg-background p-4 sm:p-5"
            >
              <div className="flex items-start justify-between gap-2">
                <span
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-accent font-mono text-[10px] font-black text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="border border-primary/40 px-1.5 py-0.5 font-mono text-[9px] font-bold uppercase text-primary">
                  Capability
                </span>
              </div>
              <h3 className="mt-3 text-base font-black leading-snug text-primary">
                {item.title}
              </h3>
              <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
