import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyRedlinesProps {
  service: ServicePageConfig;
}

/** Editorial redlines from opsLanes — not ink handoff rail. */
export function CpyRedlines({ service }: CpyRedlinesProps) {
  const lanes = service.opsLanes;
  if (!lanes?.lanes?.length) return null;

  return (
    <section
      id="service-redlines"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-redlines-heading"
    >
      <ServicePageShell>
        <h2
          id="service-redlines-heading"
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
          {lanes.lanes.map((lane, index) => (
            <li
              key={lane.title}
              className="grid gap-0 overflow-hidden border-2 border-primary lg:grid-cols-[minmax(0,8rem)_minmax(0,1fr)_minmax(0,1fr)_minmax(0,1fr)]"
            >
              <div className="flex items-center bg-primary px-4 py-3 text-accent lg:justify-center">
                <p className="font-mono text-xs font-black uppercase tracking-[0.08em]">
                  {String(index + 1).padStart(2, "0")} · {lane.title}
                </p>
              </div>
              <div className="border-t-2 border-primary bg-[#F7F3EA] p-4 lg:border-t-0 lg:border-l-2">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  Issue
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-text-secondary line-through decoration-primary/40">
                  {lane.issue}
                </p>
              </div>
              <div className="border-t-2 border-primary bg-background p-4 lg:border-t-0 lg:border-l-2">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                  Fix
                </p>
                <p className="mt-1 text-sm font-medium leading-snug text-primary">
                  {lane.fix}
                </p>
              </div>
              <div className="border-t-2 border-primary bg-accent p-4 lg:border-t-0 lg:border-l-2">
                <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-primary/70">
                  Verify
                </p>
                <p className="mt-1 text-sm font-bold leading-snug text-primary">
                  {lane.verify}
                </p>
              </div>
            </li>
          ))}
        </ul>
        {lanes.note ? (
          <p className="mt-4 text-xs font-medium text-text-secondary">{lanes.note}</p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
