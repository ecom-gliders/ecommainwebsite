import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncChecklistTilesProps {
  service: ServicePageConfig;
}

const CHECK_TAGS = ["Gate", "Ads", "Stock", "Offer", "Rank", "Board", "Handoff", "Scope"] as const;

/** Launch checklist deliverable tiles — not paper stack or Shop format cards. */
export function LncChecklistTiles({ service }: LncChecklistTilesProps) {
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
              className="flex flex-col border-2 border-primary bg-[#F4F4F4] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  {CHECK_TAGS[index % CHECK_TAGS.length]}
                </span>
                <span
                  className="flex h-4 w-4 shrink-0 items-center justify-center border-2 border-primary bg-accent"
                  aria-hidden="true"
                >
                  <span className="block h-2 w-1 border-b-2 border-r-2 border-primary rotate-45 translate-y-[-1px]" />
                </span>
              </div>
              <p className="mt-2 font-mono text-[9px] font-bold tabular-nums text-text-secondary/70">
                Item {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-sm font-black leading-snug text-primary sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 flex-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
