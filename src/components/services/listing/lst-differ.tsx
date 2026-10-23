import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstDifferProps {
  service: ServicePageConfig;
}

const GENERIC = [
  "Keyword stuffing that tanks CVR",
  "One-off freelance rewrite",
  "Listings ignored after go-live",
  "Ads pointed at weak PDPs",
];

/** Split compare rail — generic pitfalls vs system — not numbered dark cards. */
export function LstDiffer({ service }: LstDifferProps) {
  const differ = service.differ;
  if (!differ?.points?.length) return null;

  return (
    <section
      id="service-differ"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-differ-heading"
    >
      <ServicePageShell>
        <h2
          id="service-differ-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {differ.heading}
        </h2>

        <div className="mt-8 grid gap-0 overflow-hidden border-2 border-primary lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div className="bg-background p-5 sm:p-6 lg:border-r-2 lg:border-primary">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
              Common listing shortcuts
            </p>
            <ul className="mt-4 space-y-3">
              {GENERIC.map((line) => (
                <li
                  key={line}
                  className="flex gap-2 text-sm font-medium leading-snug text-text-secondary line-through decoration-primary/40"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-primary/40" aria-hidden="true" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <div className="border-t-2 border-primary bg-primary p-5 text-text-on-dark sm:p-6 lg:border-t-0">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
              Listing SEO system
            </p>
            <ul className="mt-4 space-y-4">
              {differ.points.map((point) => (
                <li key={point.title} className="border-l-2 border-accent pl-3">
                  <h3 className="text-sm font-black text-text-on-dark sm:text-base">
                    {point.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-on-dark/85">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
