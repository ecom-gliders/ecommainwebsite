import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidFormatCardsProps {
  service: ServicePageConfig;
}

const FORMAT_TAGS = [
  "PDP",
  "A+",
  "SB",
  "Store",
  "DSP",
  "Short",
  "Launch",
  "Specs",
] as const;

/** Placement format cards — not overlapping paper sheets. */
export function VidFormatCards({ service }: VidFormatCardsProps) {
  const { deliverables } = service;
  const items = deliverables.items;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#131311] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <h2
          id="service-deliverables-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col border border-accent/40 bg-[#1a1a18] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent">
                  {FORMAT_TAGS[index % FORMAT_TAGS.length]}
                </span>
                <span className="font-mono text-[9px] font-bold text-text-on-dark/35">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div
                className="mt-3 aspect-[16/10] w-full border border-dashed border-text-on-dark/20 bg-[#131311]"
                aria-hidden="true"
              />
              <h3 className="mt-3 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                {item.title}
              </h3>
              <p className="mt-1.5 flex-1 text-xs font-medium leading-snug text-text-on-dark/65 sm:text-sm">
                {item.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
