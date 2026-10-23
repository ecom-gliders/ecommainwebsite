import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkOrganicProblemProps {
  service: ServicePageConfig;
}

/** Organic-only feed versus paid spark split — not listing silent strip or draft dump. */
export function TtkOrganicProblem({ service }: TtkOrganicProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)] lg:items-stretch lg:gap-8">
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
                  <p className="mt-1 text-xs font-medium leading-snug text-text-on-dark/70 sm:text-sm">
                    {point.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div
            className="flex flex-col overflow-hidden border-2 border-accent"
            aria-label="Organic-only versus paid spark"
          >
            <div className="grid flex-1 grid-cols-1 sm:grid-cols-2">
              <div className="bg-[#1a1a18] p-5 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-on-dark/50">
                  Organic only
                </p>
                <div className="mt-4 flex justify-center">
                  <div
                    className="aspect-[9/16] w-full max-w-[8rem] border border-text-on-dark/20 bg-[#0c0c0b]"
                    aria-hidden="true"
                  >
                    <div className="flex h-full flex-col gap-2 p-2">
                      <span className="h-2 w-8 rounded-sm bg-text-on-dark/15" />
                      <span className="flex-1 rounded-sm border border-dashed border-text-on-dark/20" />
                      <span className="h-1 w-full bg-text-on-dark/10" />
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-xs font-medium text-text-on-dark/55">
                  <li>Reach tied to posting cadence</li>
                  <li>Amazon stills in a vertical feed</li>
                  <li>No structured hook learning</li>
                </ul>
              </div>
              <div className="border-t-2 border-accent bg-accent p-5 text-primary sm:border-l-2 sm:border-t-0 sm:p-6">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/65">
                  Paid spark
                </p>
                <div className="mt-4 flex justify-center">
                  <div
                    className="aspect-[9/16] w-full max-w-[8rem] border-2 border-primary bg-[#0c0c0b]"
                    aria-hidden="true"
                  >
                    <div className="flex h-full flex-col gap-2 p-2">
                      <span className="h-2 w-10 rounded-sm bg-accent/80" />
                      <span className="flex-1 rounded-sm border border-accent/50 bg-[#141412]" />
                      <span className="h-1.5 w-full bg-accent" />
                    </div>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-xs font-bold text-primary/90">
                  <li>Shop destination with tracking</li>
                  <li>Native hooks tested before scale</li>
                  <li>SKU role defined beside Amazon</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
