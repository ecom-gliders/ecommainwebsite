import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyProofProps {
  service: ServicePageConfig;
}

/** Typographic pull-quote proof — not tick rows or sparkline cards. */
export function CpyProof({ service }: CpyProofProps) {
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
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {results.items.map((item) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="flex h-full flex-col border-2 border-accent bg-[#1a1a18] p-5 hover:bg-[#222220] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary sm:p-6"
              >
                <p
                  className="font-mono text-4xl font-black leading-none text-accent"
                  aria-hidden="true"
                >
                  &ldquo;
                </p>
                <p className="-mt-3 text-2xl font-black tracking-tight text-text-on-dark sm:text-3xl">
                  {item.metric}
                </p>
                <p className="mt-3 text-sm font-bold uppercase tracking-[0.06em] text-accent">
                  {item.brand}
                </p>
                <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-on-dark/80">
                  {item.description}
                </p>
                <span className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
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
