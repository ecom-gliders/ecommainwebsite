import type { ServicePageConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { cn } from "@/lib/utils";

type OpsLanes = NonNullable<ServicePageConfig["opsLanes"]>;

interface ServiceOpsLanesProps {
  opsLanes: OpsLanes;
  /** columns = 3-up band; tickets = stacked triage rows (less “card grid”). */
  variant?: "columns" | "tickets";
}

export function ServiceOpsLanes({
  opsLanes,
  variant = "columns",
}: ServiceOpsLanesProps) {
  return (
    <SectionShell
      id="service-ops-lanes"
      density="tight"
      ariaLabelledBy="service-ops-lanes-heading"
    >
      <SectionHeading
        heading={opsLanes.heading}
        subheading={opsLanes.subheading}
        headingId="service-ops-lanes-heading"
        className="mb-0 max-w-3xl md:mb-0"
      />
      {variant === "tickets" ? (
        <div className="mt-6 border-t border-primary/20">
          <div className="flex items-center justify-between border-b border-primary/10 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary">
            <span>Triage queue</span>
            <span>{opsLanes.lanes.length} lanes</span>
          </div>
          <ul className="divide-y divide-primary/10">
            {opsLanes.lanes.map((lane, index) => (
              <li
                key={lane.title}
                className="grid gap-3 py-4 sm:grid-cols-[7rem_1fr] sm:gap-6"
              >
                <div>
                  <p className="font-mono text-[10px] font-bold tabular-nums text-text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-body font-semibold text-primary">
                    {lane.title}
                  </h3>
                </div>
                <dl className="grid gap-3 sm:grid-cols-3">
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                      Issue
                    </dt>
                    <dd className="mt-1 text-small font-medium text-text-secondary">
                      {lane.issue}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary">
                      Fix
                    </dt>
                    <dd className="mt-1 border-l-2 border-accent pl-2.5 text-small text-primary">
                      {lane.fix}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                      Verify
                    </dt>
                    <dd className="mt-1 text-small font-medium text-text-secondary">
                      {lane.verify}
                    </dd>
                  </div>
                </dl>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className={cn(
            "mt-8 grid overflow-hidden rounded-[16px] border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]",
            "md:grid-cols-3 md:divide-x-2 md:divide-primary",
          )}
        >
          {opsLanes.lanes.map((lane, index) => (
            <article
              key={lane.title}
              className={cn(
                "flex flex-col gap-4 p-5 sm:p-6",
                index < opsLanes.lanes.length - 1 &&
                  "border-b-2 border-primary md:border-b-0",
              )}
            >
              <h3 className="text-h4 text-primary">{lane.title}</h3>
              <dl className="space-y-3 text-small">
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                    Issue
                  </dt>
                  <dd className="mt-1 text-text-secondary">{lane.issue}</dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
                    Fix
                  </dt>
                  <dd className="mt-1 border-l-4 border-accent pl-3 text-primary">
                    {lane.fix}
                  </dd>
                </div>
                <div>
                  <dt className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                    Verify
                  </dt>
                  <dd className="mt-1 text-text-secondary">{lane.verify}</dd>
                </div>
              </dl>
            </article>
          ))}
        </div>
      )}
      {opsLanes.note ? (
        <p className="mt-4 text-small font-medium text-text-secondary">{opsLanes.note}</p>
      ) : null}
    </SectionShell>
  );
}
