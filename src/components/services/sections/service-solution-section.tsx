import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface ServiceSolutionSectionProps {
  solution: ServicePageConfig["solution"];
  /** When audience exists, use default tone; otherwise muted. */
  tone?: "default" | "muted";
}

/**
 * Zigzag process steps — alternating left/right cards so the full section width is used.
 */
export function ServiceSolutionSection({
  solution,
  tone = "default",
}: ServiceSolutionSectionProps) {
  return (
    <SectionShell
      id="service-solution"
      tone={tone}
      ariaLabelledBy="service-solution-heading"
    >
      <SectionHeading
        kicker="How we work"
        heading={solution.heading}
        headingId="service-solution-heading"
      />
      <ol className="relative mt-10">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-4 top-6 w-0.5 bg-accent md:left-1/2 md:-translate-x-1/2"
        />
        {solution.steps.map((step, index) => {
          const alignRight = index % 2 === 1;
          return (
            <li
              key={step.title}
              className="relative grid grid-cols-[2.25rem_minmax(0,1fr)] items-start gap-4 pb-10 last:pb-0 md:grid-cols-[1fr_2.5rem_1fr] md:gap-6 md:pb-14"
            >
              {/* Desktop: left column */}
              <div
                className={cn(
                  "hidden md:block",
                  alignRight ? "md:col-start-1" : "md:col-start-1",
                )}
              >
                {!alignRight ? (
                  <div className="ml-auto max-w-md rounded-[14px] border-2 border-primary bg-background p-5 text-right shadow-[4px_4px_0_0_#131311] sm:p-6">
                    <h3 className="text-h4 text-primary">{step.title}</h3>
                    <p className="mt-2 text-body font-medium text-text-secondary">
                      {step.description}
                    </p>
                  </div>
                ) : null}
              </div>

              {/* Number node */}
              <span
                aria-hidden="true"
                className="relative z-10 col-start-1 row-start-1 flex h-9 w-9 items-center justify-center rounded-full border-2 border-primary bg-accent text-xs font-bold text-primary shadow-[2px_2px_0_0_#131311] md:col-start-2 md:justify-self-center"
              >
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Mobile card + desktop right column */}
              <div
                className={cn(
                  "col-start-2 row-start-1 md:col-start-3",
                  !alignRight && "md:hidden",
                )}
              >
                <div className="max-w-md rounded-[14px] border-2 border-primary bg-background p-5 shadow-[4px_4px_0_0_#131311] sm:p-6 md:max-w-none">
                  <h3 className="text-h4 text-primary">{step.title}</h3>
                  <p className="mt-2 text-body font-medium text-text-secondary">
                    {step.description}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
