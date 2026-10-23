import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface DspCoverageLatticeProps {
  service: ServicePageConfig;
}

/** Deliverables as lattice nodes with connector rails — dark + white text. */
export function DspCoverageLattice({ service }: DspCoverageLatticeProps) {
  const { deliverables } = service;

  return (
    <section
      id="service-included"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-included-heading"
    >
      <ServicePageShell>
        <h2
          id="service-included-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <ul className="mt-8 grid gap-0 overflow-hidden border-2 border-accent sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "relative border-accent/40 p-4",
                index > 0 && "border-t sm:border-t-0",
                index % 2 === 1 && "sm:border-l",
                index >= 2 && "sm:border-t",
                index >= 4 && "lg:border-t",
                index % 4 !== 0 && "lg:border-l",
              )}
            >
              <span
                className="mb-3 flex h-3 w-3 border-2 border-accent bg-accent"
                aria-hidden="true"
              />
              <p className="font-mono text-[10px] font-bold text-accent">
                Node {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1.5 text-base font-bold leading-snug text-text-on-dark">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-text-on-dark/90">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
