import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntDocTilesProps {
  service: ServicePageConfig;
}

/** Document checklist deliverable tiles — checkbox grid, not frame stack. */
export function EntDocTiles({ service }: EntDocTilesProps) {
  const { deliverables } = service;
  const items = deliverables.items;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-background", serviceSectionPad)}
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
              className="flex gap-3 border-2 border-primary bg-[#F7F3EA] p-4"
            >
              <span
                className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center border-2 border-primary bg-background"
                aria-hidden="true"
              />
              <div className="min-w-0">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  Item {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-sm font-black text-primary">{item.title}</h3>
                <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
                  {item.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
