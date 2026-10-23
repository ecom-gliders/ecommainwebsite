import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlMonitorDeliverablesProps {
  service: ServicePageConfig;
}

export function AhlMonitorDeliverables({ service }: AhlMonitorDeliverablesProps) {
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
          {items.map((item, index) => {
            const fill = 55 + (index % 4) * 10;
            return (
              <li
                key={item.title}
                className="flex flex-col border-2 border-primary bg-[#F4F4F4] p-4"
              >
                <div
                  className="relative h-2 w-full border border-primary/25 bg-background"
                  aria-hidden="true"
                >
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${fill}%` }}
                  />
                  <div
                    className="absolute inset-y-0 w-px bg-primary/60"
                    style={{ left: "75%" }}
                  />
                </div>
                <h3 className="mt-3 text-sm font-black text-primary sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                  {item.description}
                </p>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
