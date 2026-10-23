import Link from "next/link";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface PpcProofSparklinesProps {
  service: ServicePageConfig;
}

const SPARKS = [
  [20, 28, 24, 40, 36, 52, 48, 62],
  [45, 42, 38, 35, 30, 28, 24, 22],
  [15, 22, 30, 28, 40, 48, 55, 70],
  [50, 48, 52, 45, 40, 38, 35, 42],
];

/** Results with SVG sparklines — distinct from Full-Service column bars. */
export function PpcProofSparklines({ service }: PpcProofSparklinesProps) {
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

        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {results.items.map((item, index) => {
            const points = SPARKS[index % SPARKS.length];
            const max = Math.max(...points);
            const path = points
              .map((y, i) => {
                const x = (i / (points.length - 1)) * 100;
                const py = 100 - (y / max) * 90;
                return `${i === 0 ? "M" : "L"} ${x} ${py}`;
              })
              .join(" ");

            return (
              <li key={`${item.metric}-${item.brand}`}>
                <Link
                  href={item.href}
                  className="flex h-full flex-col border-2 border-primary bg-background p-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:p-5"
                >
                  <svg
                    viewBox="0 0 100 100"
                    className="mb-3 h-12 w-full text-primary"
                    aria-hidden="true"
                    preserveAspectRatio="none"
                  >
                    <path
                      d={path}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="3"
                      vectorEffect="non-scaling-stroke"
                    />
                    <path
                      d={`${path} L 100 100 L 0 100 Z`}
                      fill="var(--color-accent)"
                      opacity="0.35"
                    />
                  </svg>
                  <p className="text-2xl font-black tracking-tight text-primary sm:text-3xl">
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
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
