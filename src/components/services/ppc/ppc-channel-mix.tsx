import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface PpcChannelMixProps {
  service: ServicePageConfig;
}

/** Deliverables with stacked channel mix chart. */
export function PpcChannelMix({ service }: PpcChannelMixProps) {
  const { deliverables } = service;
  const items = deliverables.items;
  const segmentPct = Math.round(100 / Math.max(items.length, 1));

  return (
    <section
      id="service-included"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-included-heading"
    >
      <ServicePageShell>
        <h2
          id="service-included-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <div
          className="mt-6 flex h-8 w-full overflow-hidden border-2 border-primary"
          aria-hidden="true"
        >
          {items.map((_, index) => (
            <div
              key={index}
              className={cn(
                "h-full border-r border-primary last:border-r-0",
                index % 2 === 0 ? "bg-accent" : "bg-[#F4F4F4]",
              )}
              style={{ width: `${segmentPct}%` }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs font-medium text-text-secondary">
          Coverage mix across PPC workstreams—scope set in the audit.
        </p>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="border-2 border-primary bg-[#F4F4F4] p-4"
            >
              <div className="mb-2 flex items-center gap-2">
                <span
                  className={cn(
                    "h-3 w-3 shrink-0 border border-primary",
                    index % 2 === 0 ? "bg-accent" : "bg-background",
                  )}
                  aria-hidden="true"
                />
                <span className="font-mono text-[10px] font-bold text-text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="text-base font-bold leading-snug text-primary">
                {item.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
