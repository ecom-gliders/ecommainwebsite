import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpChannelSplitProblemProps {
  service: ServicePageConfig;
}

/** Amazon-only vs owned storefront split — not heatmap or ledger dump. */
export function ShpChannelSplitProblem({ service }: ShpChannelSplitProblemProps) {
  const { problem } = service;
  if (!problem?.points?.length) return null;

  const points = problem.points.slice(0, 4);

  return (
    <section
      id="service-problem"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <h2
          id="service-problem-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {problem.heading}
        </h2>

        <div className="mt-8 grid gap-0 border-2 border-primary lg:grid-cols-2">
          <div className="border-b-2 border-primary bg-[#ECECE6] p-4 sm:p-5 lg:border-b-0 lg:border-r-2">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
              Amazon-only
            </p>
            <div
              className="mt-4 space-y-3 border-2 border-primary/25 bg-background/80 p-4"
              aria-hidden="true"
            >
              <div className="h-2 w-3/4 bg-primary/20" />
              <div className="grid grid-cols-4 gap-1">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="aspect-square bg-primary/10" />
                ))}
              </div>
              <div className="h-8 w-full bg-primary/15" />
              <p className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                Marketplace template
              </p>
            </div>
            <ul className="mt-5 space-y-3">
              {points.slice(0, 2).map((point) => (
                <li key={point.title}>
                  <h3 className="text-sm font-black text-primary">{point.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-secondary">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FAFAF7] p-4 sm:p-5">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
              Owned storefront
            </p>
            <div
              className="mt-4 border-2 border-primary bg-background p-4 shadow-[3px_3px_0_0_#C6F135]"
              aria-hidden="true"
            >
              <div className="h-2 w-1/2 bg-accent" />
              <div className="mt-3 h-4 w-4/5 bg-primary" />
              <div className="mt-4 grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="aspect-[4/3] border border-primary/20 bg-[#ECECE6]" />
                ))}
              </div>
              <span className="mt-3 inline-block h-7 w-28 border-2 border-primary bg-accent" />
            </div>
            <ul className="mt-5 space-y-3">
              {points.slice(2, 4).map((point) => (
                <li key={point.title}>
                  <h3 className="text-sm font-black text-primary">{point.title}</h3>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-secondary">
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
