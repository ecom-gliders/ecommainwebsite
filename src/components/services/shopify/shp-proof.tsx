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

/** Case-study proof cards — verified metrics only; no decorative dual-channel bars. */
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
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
          Verified outcomes
        </p>
        <h2
          id="service-results-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
        >
          {results.heading}
        </h2>
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {results.items.map((item, index) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="flex h-full flex-col border-2 border-primary bg-background p-5 transition-colors hover:bg-accent/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:p-6"
              >
                <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                  Case {String(index + 1).padStart(2, "0")}
                </span>
                <p className="mt-2 text-2xl font-black tracking-tight text-primary sm:text-3xl">
                  {item.metric}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.06em] text-text-secondary">
                  {item.brand}
                </p>
                <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary sm:text-base">
                  {item.description}
                </p>
                <span className="mt-5 font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary">
                  Read case study
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
