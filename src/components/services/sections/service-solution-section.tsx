import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface ServiceSolutionSectionProps {
  solution: ServicePageConfig["solution"];
  /** When audience exists, use default tone; otherwise muted. */
  tone?: "default" | "muted";
}

/** Vertical stage spine — must not twin Problem primary+satellites grid. */
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
      <ol className="relative mt-8 max-w-3xl space-y-0">
        {solution.steps.map((step, index) => {
          const isLast = index === solution.steps.length - 1;
          return (
            <li key={step.title} className="relative flex gap-4 pb-8 last:pb-0">
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className="absolute left-[15px] top-10 bottom-0 w-0.5 bg-accent sm:left-[17px]"
                />
              ) : null}
              <span
                aria-hidden="true"
                className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-accent text-[11px] font-bold text-primary shadow-[2px_2px_0_0_#131311] sm:h-9 sm:w-9"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <div
                className={cn(
                  "min-w-0 flex-1 rounded-[12px] border-2 border-primary bg-[#F4F4F4] p-4 shadow-[3px_3px_0_0_#131311] sm:p-5",
                )}
              >
                <h3 className="text-h4 text-primary">{step.title}</h3>
                <p className="mt-2 text-body text-text-secondary">
                  {step.description}
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </SectionShell>
  );
}
