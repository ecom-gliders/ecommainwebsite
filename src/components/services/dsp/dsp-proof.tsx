import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface DspProofProps {
  service: ServicePageConfig;
}

const AREA = [
  "M0 80 L15 70 L30 72 L45 50 L60 45 L75 30 L90 28 L100 18 L100 100 L0 100 Z",
  "M0 60 L20 55 L40 58 L55 40 L70 35 L85 42 L100 25 L100 100 L0 100 Z",
];

/** Foundation proof with area-chart accents — not FS bars, not PPC sparklines. */
export function DspProof({ service }: DspProofProps) {
  const { results } = service;
  if (results.items.length === 0) return null;

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
          {results.items.map((item, index) => (
            <li key={`${item.metric}-${item.brand}`}>
              <Link
                href={item.href}
                className="flex h-full flex-col border-2 border-primary bg-[#F4F4F4] p-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                <svg
                  viewBox="0 0 100 100"
                  className="mb-4 h-16 w-full text-primary"
                  aria-hidden="true"
                  preserveAspectRatio="none"
                >
                  <path
                    d={AREA[index % AREA.length]}
                    fill="var(--color-accent)"
                    opacity="0.85"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                </svg>
                <p className="text-xl font-black tracking-tight text-primary sm:text-2xl">
                  {item.metric}
                </p>
                <h3 className="mt-2 text-base font-bold text-primary">
                  {item.brand}
                </h3>
                <p className="mt-1.5 flex-1 text-sm font-medium leading-snug text-text-secondary">
                  {item.description}
                </p>
                <span className="mt-3 text-xs font-bold uppercase tracking-[0.06em] text-primary">
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
