import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlThresholdLanesProps {
  service: ServicePageConfig;
}

export function AhlThresholdLanes({ service }: AhlThresholdLanesProps) {
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

        <ul className="mt-8 space-y-4">
          {lanes.lanes.map((lane, index) => {
            const fill = 35 + index * 18;
            const threshold = 72;
            return (
              <li
                key={lane.title}
                className="overflow-hidden border-2 border-primary bg-background shadow-[3px_3px_0_0_#131311]"
              >
                <div className="border-b-2 border-primary bg-primary px-4 py-3">
                  <h3 className="text-base font-black text-text-on-dark">
                    {lane.title}
                  </h3>
                </div>
                <div
                  className="relative mx-4 mt-4 h-3 border border-primary/30 bg-[#ECECE6]"
                  aria-hidden="true"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-accent"
                    style={{ width: `${fill}%` }}
                  />
                  <div
                    className="absolute inset-y-0 w-0.5 bg-primary"
                    style={{ left: `${threshold}%` }}
                  />
                </div>
                <div className="grid gap-0 lg:grid-cols-3">
                  {(
                    [
                      ["Issue", lane.issue],
                      ["Fix", lane.fix],
                      ["Verify", lane.verify],
                    ] as const
                  ).map(([label, text], cellIndex) => (
                    <div
                      key={label}
                      className={cn(
                        "p-4 sm:p-5",
                        cellIndex > 0 &&
                          "border-t-2 border-primary/20 lg:border-t-0 lg:border-l-2",
                      )}
                    >
                      <p className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                        {label}
                      </p>
                      <p className="mt-1 text-sm font-medium leading-snug text-primary">
                        {text}
                      </p>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
        </ul>
        {lanes.note ? (
          <p className="mt-3 text-xs font-medium text-text-secondary">{lanes.note}</p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
