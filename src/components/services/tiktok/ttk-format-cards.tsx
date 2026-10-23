import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkFormatCardsProps {
  service: ServicePageConfig;
}

const FORMAT_TAGS = [
  "Shop",
  "Spark",
  "Video",
  "Offer",
  "Track",
  "Report",
  "Scale",
  "Ready",
] as const;

/** Shop ad format cards with vertical thumb — not PDP film tags or paper stack. */
export function TtkFormatCards({ service }: TtkFormatCardsProps) {
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

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col border-2 border-primary bg-background p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  {FORMAT_TAGS[index % FORMAT_TAGS.length]}
                </span>
                <span className="font-mono text-[9px] font-bold text-text-secondary/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-3 flex justify-center">
                <div
                  className="aspect-[9/16] w-full max-w-[4rem] border border-dashed border-primary/30 bg-[#1a1a18]"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mt-3 text-sm font-black leading-snug text-primary sm:text-base">
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
