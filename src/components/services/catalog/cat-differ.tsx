import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CatDifferProps {
  service: ServicePageConfig;
}

const REACTIVE = [
  "Fix only when revenue already dropped",
  "Flat-file batches without revenue sort",
  "Variation edits with no rollback plan",
  "PPC spend on unverified listing health",
];

/** Buyability contrast differ — not quote blocks or listing split. */
export function CatDiffer({ service }: CatDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {differ.heading}
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div className="border-2 border-text-on-dark/30 bg-[#1a1a18] p-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
              Reactive catalog work
            </p>
            <ul className="mt-4 space-y-2">
              {REACTIVE.map((line) => (
                <li
                  key={line}
                  className="border-l-2 border-text-on-dark/25 pl-3 text-sm font-medium text-text-on-dark/55 line-through decoration-text-on-dark/30"
                >
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <ul className="space-y-0 border-2 border-accent">
            {differ.points.map((point, index) => (
              <li
                key={point.title}
                className={cn(
                  "bg-[#222220] p-5",
                  index > 0 && "border-t border-accent/35",
                )}
              >
                <p className="font-mono text-xs font-bold uppercase tracking-[0.08em] text-accent">
                  Buyability system
                </p>
                <h3 className="mt-1 text-base font-black text-text-on-dark">
                  {point.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/85">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
