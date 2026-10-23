import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VisFlatProblemProps {
  service: ServicePageConfig;
}

/** Flat packshot vs conversion frame set — side split visual. */
export function VisFlatProblem({ service }: VisFlatProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <h2
          id="service-problem-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {problem.heading}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:items-stretch">
          <div
            className="flex flex-col border-2 border-primary/30 bg-background p-5 sm:p-6"
            aria-label="Flat packshot gallery"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
              Flat packshot
            </p>
            <div className="mt-4 flex flex-1 flex-col gap-2">
              <div className="aspect-[4/3] w-full border-2 border-dashed border-primary/25 bg-[#EDE8DF]" />
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="h-12 border border-primary/15 bg-[#F4F4F4] opacity-60"
                  aria-hidden="true"
                />
              ))}
            </div>
            <p className="mt-4 text-sm font-medium text-text-secondary line-through decoration-primary/40">
              Same angle repeated · no story · weak mobile scan
            </p>
          </div>

          <div
            className="flex flex-col border-2 border-primary bg-primary p-5 text-text-on-dark sm:p-6"
            aria-label="Conversion frame set"
          >
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
              Conversion set
            </p>
            <div className="mt-4 grid flex-1 grid-cols-3 gap-2">
              {["Main", "Feature", "Scale", "Lifestyle", "Compare", "A+"].map(
                (label) => (
                  <div
                    key={label}
                    className="flex flex-col border border-accent/40 bg-[#1a1a18] p-1.5"
                  >
                    <div className="aspect-square bg-gradient-to-br from-accent/20 to-transparent" />
                    <p className="mt-1 text-center font-mono text-[8px] font-bold uppercase text-accent">
                      {label}
                    </p>
                  </div>
                ),
              )}
            </div>
            <ul className="mt-4 space-y-2">
              {problem.points.slice(0, 3).map((point) => (
                <li key={point.title} className="text-sm font-bold text-text-on-dark">
                  {point.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {problem.points.map((point, index) => (
            <li
              key={point.title}
              className="border-l-2 border-accent bg-background px-3 py-2"
            >
              <p className="font-mono text-[10px] font-bold text-text-secondary">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-0.5 text-sm font-black text-primary">
                {point.title}
              </h3>
              <p className="mt-1 text-xs font-medium leading-snug text-text-secondary">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
