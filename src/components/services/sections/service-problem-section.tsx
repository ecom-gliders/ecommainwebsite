import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";

interface ServiceProblemSectionProps {
  problem: ServicePageConfig["problem"];
}

/** Primary issue full-width + satellite rails — distinct from Solution spine. */
export function ServiceProblemSection({ problem }: ServiceProblemSectionProps) {
  const [primary, ...satellites] = problem.points;

  return (
    <SectionShell id="service-problem" ariaLabelledBy="service-problem-heading">
      <SectionHeading
        kicker="The problem"
        heading={problem.heading}
        headingId="service-problem-heading"
      />
      <ul className="mt-8 flex flex-col gap-4">
        {primary ? (
          <li
            className={cn(
              serviceHardPanel,
              "flex gap-4 border-l-4 border-l-accent bg-primary p-5 text-text-on-dark sm:p-6",
            )}
          >
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-[6px] border-2 border-accent bg-accent text-xs font-bold text-primary"
            >
              01
            </span>
            <div className="min-w-0">
              <h3 className="text-h4 text-text-on-dark">{primary.title}</h3>
              <p className="mt-2 text-body text-text-on-dark/80">
                {primary.description}
              </p>
            </div>
          </li>
        ) : null}
        {satellites.length > 0 ? (
          <li className="list-none">
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {satellites.map((point, index) => (
                <li
                  key={point.title}
                  className={cn(
                    serviceHardPanel,
                    "flex gap-3 bg-background p-4 sm:p-5",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-[6px] border-2 border-primary bg-primary text-xs font-bold text-text-on-dark"
                  >
                    {String(index + 2).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-body font-semibold text-primary">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-small font-medium text-text-secondary">
                      {point.description}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ) : null}
      </ul>
    </SectionShell>
  );
}
