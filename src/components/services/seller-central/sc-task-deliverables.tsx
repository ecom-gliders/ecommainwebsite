import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ScTaskDeliverablesProps {
  service: ServicePageConfig;
}

export function ScTaskDeliverables({ service }: ScTaskDeliverablesProps) {
  const { deliverables } = service;
  const items = deliverables.items.slice(0, 8);

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
        <ul className="mt-8 overflow-hidden border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311]">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "grid gap-2 px-4 py-3 sm:grid-cols-[auto_minmax(0,1fr)] sm:items-start sm:gap-4 sm:px-5 sm:py-4",
                index > 0 && "border-t-2 border-primary/20",
              )}
            >
              <span
                className="flex h-6 w-6 shrink-0 items-center justify-center border-2 border-primary bg-accent font-mono text-[10px] font-black text-primary"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="text-sm font-black text-primary sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
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
