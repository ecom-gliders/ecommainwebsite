import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyDraftProblemProps {
  service: ServicePageConfig;
}

/** Spec-dump vs shopper-scan — not keyword heatmap. */
export function CpyDraftProblem({ service }: CpyDraftProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.3fr)] lg:items-stretch lg:gap-8">
          <div className="flex flex-col justify-center">
            <h2
              id="service-problem-heading"
              className="max-w-md text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 space-y-3">
              {problem.points.map((point, index) => (
                <li key={point.title} className="border-l-2 border-accent pl-3">
                  <p className="font-mono text-[10px] font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-0.5 text-sm font-black leading-snug text-text-on-dark sm:text-base">
                    {point.title}
                  </h3>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="grid grid-cols-1 gap-0 overflow-hidden border-2 border-accent sm:grid-cols-2"
            aria-label="Draft versus shopper scan"
          >
            <div className="bg-[#1a1a18] p-5 sm:p-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                Spec dump
              </p>
              <ul className="mt-4 space-y-3 text-sm font-medium text-text-on-dark/45 line-through decoration-text-on-dark/40">
                <li>100% premium quality materials</li>
                <li>Advanced technology features</li>
                <li>Perfect for everyday use</li>
                <li>Must-have bestseller style</li>
                <li>New arrival hot sale 2024</li>
              </ul>
            </div>
            <div className="border-t-2 border-accent bg-accent p-5 text-primary sm:border-t-0 sm:border-l-2">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/70">
                Shopper scan
              </p>
              <ul className="mt-4 space-y-3 text-sm font-black leading-snug text-primary">
                <li>What job does this product do?</li>
                <li>Why this over the next ASIN?</li>
                <li>Will it fit / last / ship now?</li>
                <li>Proof I can trust in one glance</li>
                <li>Clear next step to buy</li>
              </ul>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
