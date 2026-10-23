import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyModulesProps {
  service: ServicePageConfig;
}

/** Overlapping paper module stack — not placement matrix or equal cards. */
export function CpyModules({ service }: CpyModulesProps) {
  const { deliverables } = service;
  const items = deliverables.items.slice(0, 6);

  return (
    <section
      id="service-deliverables"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-deliverables-heading"
    >
      <ServicePageShell>
        <h2
          id="service-deliverables-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {deliverables.heading}
        </h2>

        <ul className="relative mt-10 space-y-0">
          {items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                "relative border-2 border-accent bg-[#F7F3EA] p-4 text-primary sm:p-5",
                index > 0 && "-mt-2",
              )}
              style={{
                marginLeft: `${(index % 4) * 0.4}rem`,
                marginRight: `${((3 - (index % 4)) % 4) * 0.25}rem`,
                zIndex: items.length - index,
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                    Sheet {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-base font-black text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                    {item.description}
                  </p>
                </div>
                <span
                  className="shrink-0 border-2 border-primary bg-accent px-2 py-1 font-mono text-[10px] font-black text-primary"
                  aria-hidden="true"
                >
                  Copy
                </span>
              </div>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
