import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EmlFlowCardsProps {
  service: ServicePageConfig;
}

const FLOW_TAGS = [
  "Welcome",
  "Post-buy",
  "Segment",
  "Build",
  "Calendar",
  "Capture",
  "Report",
  "Amazon tie-in",
] as const;

function FlowCardThumb({ index }: { index: number }) {
  const variant = index % 3;
  if (variant === 0) {
    return (
      <div className="flex h-full flex-col gap-1.5 p-2" aria-hidden="true">
        <div className="h-2 w-8 rounded-sm bg-primary/25" />
        <div className="flex-1 border border-dashed border-primary/20 bg-[#E6E2EC]/50" />
        <div className="h-1.5 w-full bg-accent/80" />
      </div>
    );
  }
  if (variant === 1) {
    return (
      <div className="flex h-full flex-col gap-1 p-2" aria-hidden="true">
        {[1, 2, 3].map((n) => (
          <div key={n} className="flex gap-1">
            <div className="h-2 w-2 rounded-full bg-accent/70" />
            <div className="h-2 flex-1 bg-primary/12" />
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="flex h-full items-center justify-center p-2" aria-hidden="true">
      <div className="h-8 w-10 border-2 border-primary bg-background">
        <div className="h-2 border-b border-primary bg-accent/60" />
      </div>
    </div>
  );
}

/** Lifecycle flow deliverable cards — not vertical phone thumbs or paper stacks. */
export function EmlFlowCards({ service }: EmlFlowCardsProps) {
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
              className="flex flex-col border-2 border-primary bg-[#F3F0F8] p-4"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  {FLOW_TAGS[index % FLOW_TAGS.length]}
                </span>
                <span className="font-mono text-[9px] font-bold text-text-secondary/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <div className="mt-3 aspect-[4/3] w-full border border-primary/25 bg-background">
                <FlowCardThumb index={index} />
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
