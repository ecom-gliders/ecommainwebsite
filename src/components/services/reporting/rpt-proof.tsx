import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface RptProofProps {
  service: ServicePageConfig;
}

/** Case results as metric-led proof cards. */
export function RptProof({ service }: RptProofProps) {
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
        <ul className="mt-8 grid gap-4 lg:grid-cols-2">
          {results.items.map((item) => (
            <li key={item.metric}>
              <Link
                href={item.href}
                className="flex h-full flex-col border-2 border-primary bg-[#F4F4F4] p-5 hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:p-6"
              >
                <p className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
                  {item.metric}
                </p>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.06em] text-text-secondary">
                  {item.brand}
                </p>
                <p className="mt-3 text-sm font-medium leading-snug text-text-secondary">
                  {item.description}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
