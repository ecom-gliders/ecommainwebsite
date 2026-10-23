import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpProofProps {
  service: ServicePageConfig;
}

/** Dual-channel growth bars — Amazon base plus owned-site extension cue. */
export function ShpProof({ service }: ShpProofProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-[#F4F4F0]", serviceSectionPad)}
      aria-labelledby="service-results-heading"
    >
      <ServicePageShell>
        <h2
          id="service-results-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {results.heading}
        </h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {results.items.map((item) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="flex h-full flex-col border-2 border-primary bg-background p-5 transition-colors hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:p-6"
              >
                <p className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                  {item.metric}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.06em] text-text-secondary">
                  {item.brand}
                </p>
                <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary">
                  {item.description}
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3" aria-hidden="true">
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                      Amazon
                    </p>
                    <div className="mt-1 flex h-12 items-end gap-0.5">
                      {[40, 55, 48, 72, 88, 95].map((h, i) => (
                        <span
                          key={i}
                          className="flex-1 bg-primary"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                      Owned site
                    </p>
                    <div className="mt-1 flex h-12 items-end gap-0.5">
                      {[20, 28, 35, 42, 50, 58].map((h, i) => (
                        <span
                          key={i}
                          className="flex-1 bg-accent"
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
                  Case study
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
