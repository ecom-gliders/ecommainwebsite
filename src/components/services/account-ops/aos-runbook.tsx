import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AosRunbookProps {
  service: ServicePageConfig;
}

/** Deliverables as runbook cards with status rail. */
export function AosRunbook({ service }: AosRunbookProps) {
  const { deliverables } = service;
  const items = deliverables.items.slice(0, 8);

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
              className="flex flex-col border-2 border-primary bg-[#F4F4F4] p-4"
            >
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-accent ring-2 ring-primary" />
                <span className="h-px flex-1 bg-primary/30" />
                <span className="font-mono text-xs font-bold text-text-secondary">
                  RB-{String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 text-sm font-black text-primary sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
