import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstProofProps {
  service: ServicePageConfig;
}

/** Index-growth ticks under metrics — not plain proof cards. */
export function LstProof({ service }: LstProofProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-results-heading"
    >
      <ServicePageShell>
        <h2
          id="service-results-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {results.heading}
        </h2>
        <ul className="mt-8 space-y-0 border-2 border-primary">
          {results.items.map((item, index) => (
            <li
              key={item.metric}
              className={cn(
                index > 0 && "border-t-2 border-primary",
              )}
            >
              <Link
                href={item.href}
                className="grid gap-4 bg-[#F4F4F4] p-5 transition-colors hover:bg-accent/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_minmax(0,8rem)] sm:items-center sm:p-6"
              >
                <p className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                  {item.metric}
                </p>
                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase tracking-[0.06em] text-text-secondary">
                    {item.brand}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                    {item.description}
                  </p>
                  <div
                    className="mt-3 flex h-2 items-end gap-0.5"
                    aria-hidden="true"
                  >
                    {[28, 36, 44, 52, 48, 62, 70, 78, 74, 88].map((h, i) => (
                      <span
                        key={i}
                        className="w-1.5 flex-1 bg-primary"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary sm:text-right">
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
