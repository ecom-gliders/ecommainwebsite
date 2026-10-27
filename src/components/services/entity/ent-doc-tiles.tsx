import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntDocTilesProps {
  service: ServicePageConfig;
}

/** Document checklist tiles with checked dossier markers. */
export function EntDocTiles({ service }: EntDocTilesProps) {
  const { deliverables } = service;
  const items = deliverables.items;

  return (
    <section
      id="service-deliverables"
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Document dossier
            </p>
            <h2
              id="service-deliverables-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
            >
              {deliverables.heading}
            </h2>
          </div>
          <p className="border-2 border-primary bg-accent px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
            {items.length} checklist items
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <li
              key={item.title}
              className="flex flex-col border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311]"
            >
              <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2.5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Doc {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="flex h-4 w-4 items-center justify-center border border-accent bg-accent"
                  aria-hidden="true"
                >
                  <span className="h-1.5 w-2 border-b-2 border-l-2 border-primary -translate-y-px rotate-[-45deg]" />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="text-base font-black leading-snug text-primary">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-snug text-text-secondary">
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
