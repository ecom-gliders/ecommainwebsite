import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpMilestoneRailProps {
  service: ServicePageConfig;
}

const STATE_STYLE = {
  done: "bg-accent text-primary border-primary",
  current: "bg-background text-primary border-primary ring-2 ring-accent ring-offset-2",
  upcoming: "border-dashed border-primary/40 bg-background/90 text-text-secondary",
} as const;

/** Build milestones on a horizontal rail — not stamp pathway board. */
export function ShpMilestoneRail({ service }: ShpMilestoneRailProps) {
  const module = service.modules?.find((m) => m.type === "brandPathwayBoard");
  if (!module || module.type !== "brandPathwayBoard") return null;

  return (
    <section
      id={module.id}
      className={cn("bg-[#FAFAF7]", serviceSectionPad)}
      aria-labelledby={`${module.id}-heading`}
    >
      <ServicePageShell>
        <h2
          id={`${module.id}-heading`}
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {module.heading}
        </h2>
        {module.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {module.subheading}
          </p>
        ) : null}

        <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
          {module.urlLabel}
        </p>

        <ol className="relative mt-6 flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <span
            className="pointer-events-none absolute left-4 right-4 top-5 hidden h-0.5 bg-primary/25 sm:block"
            aria-hidden="true"
          />
          {module.stages.map((stage, index) => (
            <li
              key={stage.label}
              className={cn(
                "relative flex flex-1 flex-col border-2 border-primary bg-background p-4",
                index > 0 && "sm:-ml-px",
              )}
            >
              <span
                className={cn(
                  "relative z-[1] flex h-10 w-10 items-center justify-center border-2 font-mono text-xs font-black",
                  STATE_STYLE[stage.state],
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 text-base font-black text-primary">{stage.label}</h3>
              <p className="mt-1 flex-1 text-sm font-medium leading-snug text-text-secondary">
                {stage.detail}
              </p>
            </li>
          ))}
        </ol>
        {module.disclaimer ? (
          <p className="mt-4 text-xs font-medium text-text-secondary">{module.disclaimer}</p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
