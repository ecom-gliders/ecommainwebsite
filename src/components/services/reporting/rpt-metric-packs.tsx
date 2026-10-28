import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface RptMetricPacksProps {
  service: ServicePageConfig;
}

/**
 * Deliverables as metric packs with mini sparkline bars.
 */
export function RptMetricPacks({ service }: RptMetricPacksProps) {
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
              <div className="flex items-end gap-0.5" aria-hidden="true">
                {[3, 5, 4, 7, 6, 8, 5].map((h, i) => (
                  <span
                    key={i}
                    className={cn(
                      "w-2",
                      i === 6 ? "bg-accent" : "bg-primary/40",
                    )}
                    style={{ height: `${h * 3}px` }}
                  />
                ))}
              </div>
              <p className="mt-3 font-mono text-xs font-bold text-text-secondary">
                Pack {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-sm font-black text-primary sm:text-base">
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
