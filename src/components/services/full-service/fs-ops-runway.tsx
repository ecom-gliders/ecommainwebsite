import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface FsOpsRunwayProps {
  service: ServicePageConfig;
}

/**
 * Issue → Fix → Verify lanes — distinct from continuum (4) and station map (6).
 */
export function FsOpsRunway({ service }: FsOpsRunwayProps) {
  const ops = service.opsLanes;
  const fallbackSteps = service.solution.steps;

  if (ops && ops.lanes.length > 0) {
    return (
      <section
        id="service-approach"
        className={cn("bg-accent text-primary", serviceSectionPad)}
        aria-labelledby="service-approach-heading"
      >
        <ServicePageShell>
          <h2
            id="service-approach-heading"
            className="max-w-3xl text-2xl font-black tracking-tight sm:text-[1.75rem]"
          >
            {ops.heading}
          </h2>
          {ops.subheading ? (
            <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-primary/80 sm:text-base">
              {ops.subheading}
            </p>
          ) : null}

          <div
            className="mt-5 hidden items-center gap-0 lg:flex"
            aria-hidden="true"
          >
            {["Issue", "Fix", "Verify"].map((label, index) => (
              <div key={label} className="flex min-w-0 flex-1 items-center">
                <div className="flex-1 border-2 border-primary bg-primary px-3 py-2 text-center font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
                  {label}
                </div>
                {index < 2 ? (
                  <span className="mx-1 h-0.5 w-6 shrink-0 bg-primary" />
                ) : null}
              </div>
            ))}
          </div>

          <ul className="mt-6 space-y-3">
            {ops.lanes.map((lane, index) => (
              <li
                key={lane.title}
                className="border-2 border-primary bg-background"
              >
                <div className="flex items-center gap-3 border-b-2 border-primary px-3 py-2">
                  <span className="flex h-7 w-7 items-center justify-center border-2 border-primary bg-primary font-mono text-xs font-bold text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-black sm:text-lg">{lane.title}</h3>
                </div>
                <div className="grid gap-0 md:grid-cols-3">
                  <div className="border-primary/15 p-3.5 md:border-r-2">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      Issue
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-primary">
                      {lane.issue}
                    </p>
                  </div>
                  <div className="border-t-2 border-primary/15 p-3.5 md:border-l-0 md:border-r-2 md:border-t-0">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      Fix
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-primary">
                      {lane.fix}
                    </p>
                  </div>
                  <div className="border-t-2 border-primary/15 p-3.5 md:border-t-0">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                      Verify
                    </p>
                    <p className="mt-1 text-sm font-medium leading-snug text-primary">
                      {lane.verify}
                    </p>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {ops.note ? (
            <p className="mt-4 text-xs font-medium leading-relaxed text-primary/70">
              {ops.note}
            </p>
          ) : null}
        </ServicePageShell>
      </section>
    );
  }

  return (
    <section
      id="service-approach"
      className={cn("bg-accent text-primary", serviceSectionPad)}
      aria-labelledby="service-approach-heading"
    >
      <ServicePageShell>
        <h2
          id="service-approach-heading"
          className="max-w-3xl text-2xl font-black tracking-tight sm:text-[1.75rem]"
        >
          {service.solution.heading}
        </h2>
        <ol className="mt-6 space-y-3">
          {fallbackSteps.map((step, index) => (
            <li
              key={step.title}
              className="grid gap-2 border-2 border-primary bg-background p-4 sm:grid-cols-[3rem_1fr] sm:items-start sm:gap-4"
            >
              <span className="flex h-10 w-10 items-center justify-center border-2 border-primary bg-primary font-mono text-sm font-bold text-accent">
                {index + 1}
              </span>
              <div>
                <h3 className="text-base font-black sm:text-lg">{step.title}</h3>
                <p className="mt-1 text-sm font-medium text-text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
