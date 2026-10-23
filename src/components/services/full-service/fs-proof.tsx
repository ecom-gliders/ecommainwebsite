import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface FsProofProps {
  service: ServicePageConfig;
}

const BAR_SCALES = [
  [0.45, 0.7, 1, 0.85],
  [0.55, 0.9, 0.75, 1],
  [0.4, 0.65, 0.85, 0.95],
  [0.5, 0.8, 0.7, 1],
];

/** Proof as full-width metric rows with inline spar bars — fills shell evenly. */
export function FsProof({ service }: FsProofProps) {
  const { results } = service;
  if (results.items.length === 0) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-results-heading"
    >
      <ServicePageShell>
        <h2
          id="service-results-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {results.heading}
        </h2>

        <ul className="mt-8 border-2 border-primary bg-background">
          {results.items.map((item, index) => {
            const scales = BAR_SCALES[index % BAR_SCALES.length];
            return (
              <li
                key={`${item.metric}-${item.brand}`}
                className={cn(
                  index > 0 && "border-t-2 border-primary",
                )}
              >
                <Link
                  href={item.href}
                  className="grid gap-4 p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:grid-cols-[7rem_minmax(0,1fr)_8rem] sm:items-center sm:gap-6 sm:p-5 lg:grid-cols-[8rem_minmax(0,1fr)_minmax(8rem,12rem)_7rem]"
                >
                  <p className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]">
                    {item.metric}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-primary sm:text-lg">
                      {item.brand}
                    </h3>
                    <p className="mt-1 text-sm font-medium leading-snug text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                  <div
                    className="hidden h-10 items-end gap-1 lg:flex"
                    aria-hidden="true"
                  >
                    {scales.map((scale, barIndex) => (
                      <div
                        key={barIndex}
                        className="flex-1 border border-primary/30 bg-accent"
                        style={{ height: `${scale * 100}%` }}
                      />
                    ))}
                  </div>
                  <span className="text-xs font-bold uppercase tracking-[0.06em] text-primary sm:text-right">
                    Read case study
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
