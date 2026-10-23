import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CatBuyboxProblemProps {
  service: ServicePageConfig;
}

const SUPPRESSED_SKU = {
  asin: "B0XX-SUPP",
  title: "Men's boot · Size 11",
  issues: ["Missing required attribute", "Detail page conflict", "Not in search"],
};

const BUYABLE_SKU = {
  asin: "B0XX-LIVE",
  title: "Men's boot · Size 10",
  signals: ["Offer active", "Variation linked", "Indexed in search"],
};

/** Suppressed vs buyable SKU contrast — not heatmap or spec dump. */
export function CatBuyboxProblem({ service }: CatBuyboxProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <h2
          id="service-problem-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {problem.heading}
        </h2>

        <div className="mt-8 grid gap-0 overflow-hidden border-2 border-accent lg:grid-cols-2">
          <div className="bg-[#1a1a18] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                Suppressed SKU
              </p>
              <span className="border border-text-on-dark/30 px-1.5 py-px font-mono text-[9px] font-bold uppercase text-text-on-dark/60 line-through">
                No buy box path
              </span>
            </div>
            <p className="mt-3 font-mono text-xs font-bold text-accent">
              {SUPPRESSED_SKU.asin}
            </p>
            <p className="mt-1 text-base font-black text-text-on-dark">
              {SUPPRESSED_SKU.title}
            </p>
            <ul className="mt-4 space-y-2">
              {SUPPRESSED_SKU.issues.map((issue) => (
                <li
                  key={issue}
                  className="flex gap-2 text-sm font-medium text-text-on-dark/55 line-through decoration-text-on-dark/35"
                >
                  <span
                    className="mt-2 h-1 w-1 shrink-0 bg-text-on-dark/40"
                    aria-hidden="true"
                  />
                  {issue}
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 border-t border-text-on-dark/15 pt-4">
              {problem.points.slice(0, 2).map((point) => (
                <li key={point.title}>
                  <h3 className="text-sm font-black text-accent">{point.title}</h3>
                  <p className="mt-0.5 text-xs font-medium leading-snug text-text-on-dark/75">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t-2 border-accent bg-accent p-5 text-primary sm:p-6 lg:border-t-0 lg:border-l-2">
            <div className="flex items-center justify-between gap-2">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/70">
                Buyable SKU
              </p>
              <span className="border-2 border-primary bg-background px-1.5 py-px font-mono text-[9px] font-black uppercase text-primary">
                Live offer
              </span>
            </div>
            <p className="mt-3 font-mono text-xs font-bold text-primary">
              {BUYABLE_SKU.asin}
            </p>
            <p className="mt-1 text-base font-black text-primary">
              {BUYABLE_SKU.title}
            </p>
            <ul className="mt-4 space-y-2">
              {BUYABLE_SKU.signals.map((signal) => (
                <li
                  key={signal}
                  className="flex gap-2 text-sm font-bold leading-snug text-primary"
                >
                  <span
                    className="mt-1.5 h-2 w-2 shrink-0 border-2 border-primary bg-background"
                    aria-hidden="true"
                  />
                  {signal}
                </li>
              ))}
            </ul>
            <ul className="mt-6 space-y-3 border-t-2 border-primary/20 pt-4">
              {problem.points.slice(2, 4).map((point) => (
                <li key={point.title}>
                  <h3 className="text-sm font-black text-primary">{point.title}</h3>
                  <p className="mt-0.5 text-xs font-medium leading-snug text-primary/80">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
