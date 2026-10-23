import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcProofProps {
  service: ServicePageConfig;
}

/** Case outcomes with lane-progress ticks — not plain metric cards. */
export function SrcProof({ service }: SrcProofProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-results-heading"
    >
      <ServicePageShell>
        <h2
          id="service-results-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {results.heading}
        </h2>
        <ul className="mt-8 space-y-0 border-2 border-accent">
          {results.items.map((item, index) => (
            <li
              key={item.metric}
              className={cn(index > 0 && "border-t-2 border-accent")}
            >
              <Link
                href={item.href}
                className="grid gap-4 bg-[#1a1a18] p-5 transition-colors hover:bg-[#222220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)_minmax(0,7rem)] sm:items-center sm:p-6"
              >
                <p className="text-2xl font-black tracking-tight text-accent sm:text-3xl">
                  {item.metric}
                </p>
                <div className="min-w-0">
                  <p className="text-sm font-bold uppercase tracking-[0.06em] text-text-on-dark/70">
                    {item.brand}
                  </p>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/90">
                    {item.description}
                  </p>
                </div>
                <div
                  className="flex h-2 items-end gap-0.5 sm:justify-end"
                  aria-hidden="true"
                >
                  {[20, 32, 28, 44, 40, 56, 52, 68].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 flex-1 bg-accent"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
