import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvStockLanesProps {
  service: ServicePageConfig;
}

/** opsLanes as bay-door panels — not FS lime lanes or AOS handoff rail. */
export function InvStockLanes({ service }: InvStockLanesProps) {
  const lanes = service.opsLanes;
  if (!lanes?.lanes?.length) return null;

  return (
    <section
      id="service-ops-lanes"
      className={cn("bg-background", serviceSectionPad)}
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

        <ul className="mt-8 grid gap-4 lg:grid-cols-3">
          {lanes.lanes.map((lane, index) => (
            <li
              key={lane.title}
              className="flex flex-col border-2 border-primary bg-[#E8E8E4]"
            >
              <div className="border-b-2 border-primary bg-primary px-4 py-3">
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                  Door {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 text-base font-black text-text-on-dark">
                  {lane.title}
                </h3>
              </div>
              <div className="flex flex-1 flex-col gap-0 bg-background">
                <div className="border-b border-primary/20 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                    Issue
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-primary">
                    {lane.issue}
                  </p>
                </div>
                <div className="border-b border-primary/20 p-4">
                  <p className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                    Fix
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-primary">
                    {lane.fix}
                  </p>
                </div>
                <div className="p-4">
                  <p className="font-mono text-[9px] font-bold uppercase text-text-secondary">
                    Verify
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-primary">
                    {lane.verify}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
        {lanes.note ? (
          <p className="mt-3 text-xs font-medium text-text-secondary">
            {lanes.note}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
