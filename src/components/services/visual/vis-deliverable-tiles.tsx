import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VisDeliverableTilesProps {
  service: ServicePageConfig;
}

/** Framed deliverable tiles - 3x2 primary grid with overflow row. */
export function VisDeliverableTiles({ service }: VisDeliverableTilesProps) {
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
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.9rem]"
        >
          {deliverables.heading}
        </h2>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="relative border-2 border-primary bg-background p-4 shadow-[3px_3px_0_0_#131311] sm:p-5"
            >
              <div
                className="pointer-events-none absolute inset-2 border border-dashed border-primary/20"
                aria-hidden="true"
              />
              <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                Tile {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-lg font-black text-primary">
                {item.title}
              </h3>
              <p className="mt-1.5 text-base font-medium leading-snug text-text-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
