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

type FormatTag = (typeof FORMAT_TAGS)[number];

/** Unique CSS thumb per deliverable — no repeated lifestyle stills. */
function FormatThumb({ tag }: { tag: FormatTag }) {
  if (tag === "Shop") {
    return (
      <div className="flex h-full flex-col justify-between p-2" aria-hidden="true">
        <span className="h-1.5 w-1/2 bg-accent" />
        <div className="grid grid-cols-2 gap-1">
          <span className="aspect-square bg-primary/15" />
          <span className="aspect-square bg-primary/10" />
          <span className="aspect-square bg-primary/10" />
          <span className="aspect-square bg-accent/40" />
        </div>
        <span className="h-2 w-full bg-primary" />
      </div>
    );
  }
  if (tag === "Spark") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-1.5 p-2" aria-hidden="true">
        <span className="h-2 w-8 bg-accent" />
        <span className="h-10 w-10 border-2 border-dashed border-primary/40" />
        <span className="h-1.5 w-full bg-primary/20" />
      </div>
    );
  }
  if (tag === "Video") {
    return (
      <div className="relative flex h-full items-center justify-center p-2" aria-hidden="true">
        <span className="absolute inset-2 border border-primary/20 bg-[#ECECE6]" />
        <span className="relative h-0 w-0 border-y-[6px] border-l-[10px] border-y-transparent border-l-primary" />
      </div>
    );
  }
  if (tag === "Offer") {
    return (
      <div className="flex h-full flex-col justify-end gap-1 p-2" aria-hidden="true">
        <span className="h-2 w-2/3 bg-primary" />
        <span className="h-2 w-1/3 bg-accent" />
        <span className="mt-1 h-6 w-full border-2 border-primary bg-accent/50" />
      </div>
    );
  }
  if (tag === "Track") {
    return (
      <div className="flex h-full items-end gap-0.5 p-2" aria-hidden="true">
        {[35, 55, 45, 70, 90].map((h, i) => (
          <span
            key={i}
            className="flex-1 bg-primary"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    );
  }
  if (tag === "Report") {
    return (
      <div className="flex h-full flex-col gap-1.5 p-2" aria-hidden="true">
        <span className="h-1.5 w-full bg-primary/20" />
        <span className="h-1.5 w-4/5 bg-primary/20" />
        <span className="mt-auto flex items-center gap-1">
          <span className="h-3 w-3 border border-primary bg-accent" />
          <span className="h-1.5 flex-1 bg-primary/15" />
        </span>
        <span className="flex items-center gap-1">
          <span className="h-3 w-3 border border-primary bg-accent" />
          <span className="h-1.5 flex-1 bg-primary/15" />
        </span>
      </div>
    );
  }
  if (tag === "Scale") {
    return (
      <div className="flex h-full flex-col justify-center gap-1 p-2" aria-hidden="true">
        <span className="h-2 w-1/3 bg-primary/20" />
        <span className="h-2 w-1/2 bg-primary/35" />
        <span className="h-2 w-2/3 bg-primary/55" />
        <span className="h-2 w-full bg-accent" />
      </div>
    );
  }
  return (
    <div className="flex h-full flex-col justify-center gap-1.5 p-2" aria-hidden="true">
      {[1, 2, 3].map((n) => (
        <span key={n} className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 border border-primary bg-accent" />
          <span className="h-1.5 flex-1 bg-primary/15" />
        </span>
      ))}
    </div>
  );
}

/** Deliverable format cards — unique diagram thumb per item, no photo reuse. */
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
          className="max-w-3xl text-[clamp(1.5rem,2.8vw,1.85rem)] font-black tracking-tight text-primary"
        >
          {deliverables.heading}
        </h2>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => {
            const tag = FORMAT_TAGS[index % FORMAT_TAGS.length];
            return (
              <li
                key={item.title}
                className="flex flex-col border-2 border-primary bg-background p-4"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                    {tag}
                  </span>
                  <span className="font-mono text-xs font-bold text-text-secondary/60">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="mt-3 h-16 border border-primary/25 bg-[#FAFAF7]">
                  <FormatThumb tag={tag} />
                </div>
                <h3 className="mt-3 text-sm font-black leading-snug text-primary sm:text-base">
                  {item.title}
                </h3>
                <p className="mt-1.5 flex-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
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
