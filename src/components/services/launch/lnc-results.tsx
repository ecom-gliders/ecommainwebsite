import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncResultsProps {
  service: ServicePageConfig;
}

/** Case results with countdown pad headers — not spark frames or DSP area charts. */
export function LncResults({ service }: LncResultsProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

  return (
    <section
      id="service-results"
      className={cn("bg-[#0c0c0b] text-text-on-dark", serviceSectionPad)}
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
          {results.items.map((item, index) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="group flex h-full flex-col overflow-hidden border-2 border-accent/50 bg-[#141412] hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-[#0c0c0b]"
              >
                <div className="flex items-center justify-between border-b border-accent/30 px-4 py-2">
                  <span className="font-mono text-[10px] font-black tabular-nums text-accent">
                    PAD {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-text-on-dark/45">
                    Verified case
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <p className="text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.65rem]">
                    {item.metric}
                  </p>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.06em] text-text-on-dark/55">
                    {item.brand}
                  </p>
                  <p className="mt-3 flex-1 text-sm font-medium leading-snug text-text-on-dark/75">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex w-fit border border-accent bg-transparent px-2 py-1 font-mono text-[10px] font-black uppercase text-accent group-hover:bg-accent group-hover:text-primary">
                    Open case study
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
