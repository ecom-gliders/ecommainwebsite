import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidCutLanesProps {
  service: ServicePageConfig;
}

/** Cut-risk lanes as vertical film strips — not editorial redline grid. */
export function VidCutLanes({ service }: VidCutLanesProps) {
  const lanes = service.opsLanes;
  if (!lanes?.lanes?.length) return null;

  return (
    <section
      id="service-cut-lanes"
      className={cn("bg-[#EDE8DF]", serviceSectionPad)}
      aria-labelledby="service-cut-lanes-heading"
    >
      <ServicePageShell>
        <h2
          id="service-cut-lanes-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {lanes.heading}
        </h2>
        {lanes.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {lanes.subheading}
          </p>
        ) : null}

        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {lanes.lanes.map((lane, index) => (
            <li
              key={lane.title}
              className="flex flex-col overflow-hidden border-2 border-primary bg-[#1a1a18] text-text-on-dark"
            >
              <div className="flex items-center gap-2 border-b border-accent/30 bg-primary px-3 py-2">
                <span className="font-mono text-[10px] font-black text-accent">
                  CUT {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-xs font-black text-text-on-dark">{lane.title}</span>
              </div>
              <div className="flex flex-1 flex-col gap-0 p-0">
                <div className="border-b border-text-on-dark/15 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase text-text-on-dark/45">
                    Risk
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-on-dark/55 line-through decoration-accent/50">
                    {lane.issue}
                  </p>
                </div>
                <div className="border-b border-text-on-dark/15 bg-[#222220] p-4">
                  <p className="font-mono text-[9px] font-bold uppercase text-accent">
                    Fix
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-text-on-dark/90">
                    {lane.fix}
                  </p>
                </div>
                <div className="bg-accent p-4 text-primary">
                  <p className="font-mono text-[9px] font-bold uppercase text-primary/70">
                    Verify
                  </p>
                  <p className="mt-1 text-sm font-bold leading-snug text-primary">
                    {lane.verify}
                  </p>
                </div>
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
