import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcCheckpointsProps {
  service: ServicePageConfig;
}

/** Deliverables as checkpoint cards along a horizontal route. */
export function SrcCheckpoints({ service }: SrcCheckpointsProps) {
  const { deliverables } = service;
  const items = deliverables.items;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <h2
          id="service-deliverables-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <div className="relative mt-10">
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-0.5 bg-primary/25 sm:block"
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
                <div className="mt-3 border-2 border-primary bg-background p-4 pt-8 sm:pt-10">
                  <h3 className="text-sm font-black leading-snug text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
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
