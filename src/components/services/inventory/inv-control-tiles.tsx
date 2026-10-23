import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvControlTilesProps {
  service: ServicePageConfig;
}

/** Deliverables as warehouse control-panel tiles. */
export function InvControlTiles({ service }: InvControlTilesProps) {
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
              className="flex flex-col border-2 border-primary bg-background"
            >
              <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-[#E8E8E4] px-3 py-2">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.08em] text-text-secondary">
                  Control {String(index + 1).padStart(2, "0")}
                </span>
                <span
                  className="h-2.5 w-2.5 border border-primary bg-accent"
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-1 flex-col p-3 sm:p-4">
                <div
                  className="flex gap-1"
                  aria-hidden="true"
                >
                  {[0, 1, 2].map((seg) => (
                    <span
                      key={seg}
                      className={cn(
                        "h-1.5 flex-1 border border-primary/30",
                        seg <= index % 3 ? "bg-accent" : "bg-[#E8E8E4]",
                      )}
                    />
                  ))}
                </div>
                <h3 className="mt-3 text-sm font-black text-primary">{item.title}</h3>
                <p className="mt-1.5 text-xs font-medium leading-snug text-text-secondary">
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
