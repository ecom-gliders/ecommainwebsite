import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntResultsProps {
  service: ServicePageConfig;
}

export function EntResults({ service }: EntResultsProps) {
  const { results } = service;
  if (!results?.items?.length) return null;

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
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {results.items.map((item) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="group flex h-full flex-col border-2 border-primary bg-background hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <div className="flex border-b-2 border-primary">
                  <p className="flex-1 border-r-2 border-primary bg-primary px-4 py-3 font-mono text-lg font-black text-accent sm:text-xl">
                    {item.metric}
                  </p>
                  <p className="flex items-center px-4 py-3 text-xs font-bold uppercase tracking-[0.06em] text-text-secondary group-hover:text-primary">
                    {item.brand}
                  </p>
                </div>
                <p className="flex-1 p-4 text-sm font-medium leading-snug text-text-secondary group-hover:text-primary">
                  {item.description}
                </p>
                <span className="border-t-2 border-primary px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary">
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
