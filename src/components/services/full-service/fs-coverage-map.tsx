import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface FsCoverageMapProps {
  service: ServicePageConfig;
}

/** Coverage grid as a station map — visual cells, not text walls. */
export function FsCoverageMap({ service }: FsCoverageMapProps) {
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

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {deliverables.items.map((station, index) => (
            <li
              key={station.title}
              className="relative border-2 border-accent bg-primary p-4"
            >
              <div
                className="mb-3 flex h-8 w-8 items-center justify-center border-2 border-accent bg-accent font-mono text-xs font-bold text-primary"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </div>
              <h3 className="text-base font-bold leading-snug text-text-on-dark">
                {station.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-text-on-dark/90">
                {station.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
