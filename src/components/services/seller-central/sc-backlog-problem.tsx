import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ScBacklogProblemProps {
  service: ServicePageConfig;
}

/** Problem: reactive sticky notes vs owned task queue columns. */
export function ScBacklogProblem({ service }: ScBacklogProblemProps) {
  const { problem } = service;

  return (
    <section
      id="service-problem"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-problem-heading"
    >
      <ServicePageShell>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <div className="mx-auto w-full max-w-[14rem]" aria-hidden="true">
            <p className="font-mono text-[10px] font-bold uppercase text-text-secondary">
              No queue
            </p>
            <ul className="mt-2 space-y-2">
              {["Case?", "Promo?", "Listing fix"].map((note, index) => (
                <li
                  key={note}
                  className={cn(
                    "border-2 border-primary bg-[#F4F4F4] px-2 py-2 text-xs font-bold text-primary shadow-[2px_2px_0_0_#131311]",
                    index % 2 === 1 && "ml-3 rotate-1",
                    index === 2 && "-rotate-1 ml-1",
                  )}
                >
                  {note}
                </li>
              ))}
            </ul>
            <p className="mt-4 font-mono text-[10px] font-bold uppercase text-accent">
              vs
            </p>
            <div className="mt-2 border-2 border-primary bg-background">
              {["Owner", "Due", "Status"].map((col) => (
                <div
                  key={col}
                  className="border-b border-primary/20 px-2 py-1.5 last:border-b-0"
                >
                  <span className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                    {col}
                  </span>
                  <div className="mt-1 h-1.5 bg-accent/60" />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2
              id="service-problem-heading"
              className="text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {problem.heading}
            </h2>
            <ul className="mt-6 grid grid-cols-1 overflow-hidden border-2 border-primary sm:grid-cols-2">
              {problem.points.map((point, index) => (
                <li
                  key={point.title}
                  className={cn(
                    "bg-[#F4F4F4] p-4 sm:p-5",
                    index % 2 === 1 && "sm:border-l-2 sm:border-primary",
                    index >= 2 && "border-t-2 border-primary",
                    index === 1 && "border-t-2 border-primary sm:border-t-0",
                  )}
                >
                  <p className="font-mono text-[10px] font-bold text-text-secondary">
                    Gap {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-base font-bold text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
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
