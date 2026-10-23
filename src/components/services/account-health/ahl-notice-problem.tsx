import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlNoticeProblemProps {
  service: ServicePageConfig;
}

export function AhlNoticeProblem({ service }: AhlNoticeProblemProps) {
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
            <div className="border-2 border-primary bg-[#F4F4F4] p-3">
              <p className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                Unread inbox
              </p>
              <ul className="mt-2 space-y-1.5">
                {["Policy", "Performance", "Listing"].map((row) => (
                  <li
                    key={row}
                    className="h-2 w-full bg-primary/15"
                  />
                ))}
              </ul>
            </div>
            <p className="my-3 text-center font-mono text-[10px] font-bold uppercase text-text-secondary">
              vs
            </p>
            <div className="border-2 border-primary bg-primary p-3 text-text-on-dark">
              <p className="font-mono text-[9px] font-bold uppercase text-accent">
                Monitored
              </p>
              <ul className="mt-2 space-y-2">
                {["Owner", "Evidence", "Due"].map((col) => (
                  <li key={col} className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 bg-accent" />
                    <span className="text-[10px] font-bold">{col}</span>
                    <span className="h-1 flex-1 bg-accent/40" />
                  </li>
                ))}
              </ul>
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
                    Risk {String(index + 1).padStart(2, "0")}
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
