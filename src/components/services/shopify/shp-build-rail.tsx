import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpBuildRailProps {
  service: ServicePageConfig;
}

/** Solution steps as horizontal build rail with track — not zigzag rewrite timeline. */
export function ShpBuildRail({ service }: ShpBuildRailProps) {
  const { solution } = service;

  return (
    <section
      id="service-solution"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <h2
          id="service-solution-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {solution.heading}
        </h2>

        <div className="relative mt-10 overflow-x-auto pb-2">
          <span
            className="pointer-events-none absolute left-8 right-8 top-[2.125rem] hidden h-1 bg-primary/20 sm:block"
            aria-hidden="true"
          />
          <ol className="flex min-w-[36rem] gap-0 sm:min-w-0 sm:grid sm:grid-cols-4">
            {solution.steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "relative flex flex-1 flex-col border-2 border-primary bg-[#FAFAF7] p-4",
                  index > 0 && "sm:-ml-px",
                )}
              >
                <span
                  className="relative z-[1] mx-auto flex h-9 w-9 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-black text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-center text-sm font-black leading-snug text-primary sm:text-base">
                  {step.title}
                </h3>
                <p className="mt-2 flex-1 text-center text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
