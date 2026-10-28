import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CatOpsLanesProps {
  service: ServicePageConfig;
}

/** Issue-fix-verify lanes as stacked catalog tickets. */
export function CatOpsLanes({ service }: CatOpsLanesProps) {
  const lanes = service.opsLanes;
  if (!lanes?.lanes?.length) return null;

  return (
    <section
      id="service-ops-lanes"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-ops-lanes-heading"
    >
      <ServicePageShell>
        <h2
          id="service-ops-lanes-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {lanes.heading}
        </h2>
        {lanes.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {lanes.subheading}
          </p>
        ) : null}

        <ul className="mt-8 space-y-3">
          {lanes.lanes.map((lane, index) => (
            <li
              key={lane.title}
              className="grid gap-0 overflow-hidden border-2 border-primary bg-background lg:grid-cols-[minmax(0,10rem)_1fr_1fr_1fr]"
            >
              <div className="flex flex-col justify-center border-b-2 border-primary bg-primary px-4 py-3 lg:border-b-0 lg:border-r-2">
                <p className="font-mono text-xs font-bold tabular-nums text-accent">
                  Lane {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-sm font-black text-text-on-dark">
                  {lane.title}
                </h3>
              </div>
              <div className="border-b-2 border-primary p-4 lg:border-b-0 lg:border-r-2">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                  Issue
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-text-secondary">
                  {lane.issue}
                </p>
              </div>
              <div className="border-b-2 border-primary bg-accent p-4 lg:border-b-0 lg:border-r-2">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-primary/70">
                  Fix
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-primary">
                  {lane.fix}
                </p>
              </div>
              <div className="p-4">
                <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                  Verify
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-primary">
                  {lane.verify}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {lanes.note ? (
          <p className="mt-4 text-xs font-medium text-text-secondary">
            {lanes.note}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
