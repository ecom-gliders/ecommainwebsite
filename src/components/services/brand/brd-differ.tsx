import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdDifferProps {
  service: ServicePageConfig;
}

const MISSTEPS = [
  "Treating filing and enrollment as unrelated tasks",
  "Expecting A+ before Brand Registry approval",
  "Mismatched brand name across USPTO and Seller Central",
  "Positioning agency support as legal counsel",
];

/** Seal contrast differ — not quote blocks or 2x2 PPC matrix. */
export function BrdDiffer({ service }: BrdDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {differ.heading}
        </h2>

        <div className="mt-8 grid gap-0 overflow-hidden border-2 border-primary lg:grid-cols-2">
          <div className="border-b-2 border-primary bg-[#F4F4F4] p-5 sm:p-6 lg:border-b-0 lg:border-r-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
              Common missteps
            </p>
            <ul className="mt-4 space-y-3">
              {MISSTEPS.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 text-sm font-medium text-text-secondary"
                >
                  <span
                    className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-dashed border-primary/40 font-mono text-[8px] font-bold text-text-secondary"
                    aria-hidden="true"
                  >
                    X
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <ul className="divide-y-2 divide-primary">
            {differ.points.map((point) => (
              <li key={point.title} className="bg-[#FAF6EF] p-5 sm:p-6">
                <div className="flex gap-3">
                  <span
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-accent font-mono text-xs font-black text-primary"
                    aria-hidden="true"
                  >
                    OK
                  </span>
                  <div>
                    <h3 className="text-base font-black text-primary">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                      {point.description}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
