import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntOpsLanesProps {
  service: ServicePageConfig;
}

const LANE_SRC = [
  "/images/services/amazon-company-registration/ent-rung-formation-v2.jpg",
  "/images/services/amazon-company-registration/ent-lane-bank-v2.jpg",
  "/images/services/amazon-company-registration/ent-rung-amazon-v2.jpg",
] as const;

/** Filing coordination lanes with stills + issue/fix/verify. */
export function EntOpsLanes({ service }: EntOpsLanesProps) {
  const lanes = service.opsLanes;
  if (!lanes?.lanes?.length) return null;

  return (
    <section
      id="service-ops-lanes"
      className={cn("bg-[#12100e] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-ops-lanes-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-accent">
          Filing lanes
        </p>
        <h2
          id="service-ops-lanes-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
        >
          {lanes.heading}
        </h2>
        {lanes.subheading ? (
          <p className="mt-3 max-w-2xl text-base font-medium text-text-on-dark/70">
            {lanes.subheading}
          </p>
        ) : null}

        <ul className="mt-9 grid gap-4 lg:grid-cols-3">
          {lanes.lanes.map((lane, index) => (
            <li
              key={lane.title}
              className="flex flex-col overflow-hidden border-2 border-accent/55 bg-[#1a1814]"
            >
              <div className="relative aspect-[5/4] w-full border-b-2 border-accent/40">
                <Image
                  src={LANE_SRC[index % LANE_SRC.length]}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1814] via-transparent to-transparent" />
                <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-accent">
                    Rung {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-xl font-black text-text-on-dark">
                    {lane.title}
                  </h3>
                </div>
              </div>
              <div className="flex flex-1 flex-col">
                {(
                  [
                    { label: "Issue", body: lane.issue },
                    { label: "Fix", body: lane.fix },
                    { label: "Verify", body: lane.verify },
                  ] as const
                ).map((row, rowIndex) => (
                  <div
                    key={row.label}
                    className={cn(
                      "px-4 py-3.5",
                      rowIndex < 2 && "border-b border-accent/20",
                    )}
                  >
                    <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-accent/80">
                      {row.label}
                    </p>
                    <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/85">
                      {row.body}
                    </p>
                  </div>
                ))}
              </div>
            </li>
          ))}
        </ul>
        {lanes.note ? (
          <p className="mt-4 text-sm font-medium text-text-on-dark/50">
            {lanes.note}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
