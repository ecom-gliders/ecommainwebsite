import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface FsCadenceProps {
  service: ServicePageConfig;
}

/** Equal-width cadence columns — fills the shell, no empty right rail. */
export function FsCadence({ service }: FsCadenceProps) {
  const cadence = service.fullService?.cadence;
  if (!cadence) return null;

  return (
    <section
      id="service-process"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-process-heading"
    >
      <ServicePageShell>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between sm:gap-8">
          <h2
            id="service-process-heading"
            className="max-w-2xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
          >
            {cadence.heading}
          </h2>
          {cadence.subheading ? (
            <p className="max-w-md text-sm font-medium leading-snug text-text-secondary sm:text-right">
              {cadence.subheading}
            </p>
          ) : null}
        </div>

        <ol className="mt-8 grid gap-0 overflow-hidden border-2 border-primary sm:grid-cols-3">
          {cadence.phases.map((phase, index) => (
            <li
              key={phase.title}
              className={cn(
                "bg-[#F4F4F4] p-5 sm:p-6",
                index > 0 && "border-t-2 border-primary sm:border-l-2 sm:border-t-0",
              )}
            >
              <span className="inline-flex border-2 border-primary bg-accent px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary">
                {phase.marker}
              </span>
              <h3 className="mt-4 text-lg font-black tracking-tight text-primary">
                {phase.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                {phase.description}
              </p>
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
