import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvStockLanesProps {
  service: ServicePageConfig;
}

const DOOR_META = [
  {
    code: "D-01",
    src: "/images/services/amazon-inventory-management/inv-door-stockout.jpg",
  },
  {
    code: "D-02",
    src: "/images/services/amazon-inventory-management/inv-door-restock.jpg",
  },
  {
    code: "D-03",
    src: "/images/services/amazon-inventory-management/inv-door-launch.jpg",
  },
] as const;

/** Tall dock-door lanes for issue / fix / verify — not generic cards. */
export function InvStockLanes({ service }: InvStockLanesProps) {
  const lanes = service.opsLanes;
  if (!lanes?.lanes?.length) return null;

  return (
    <section
      id="service-ops-lanes"
      className={cn("bg-[#0f0f0d] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-ops-lanes-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
          Dock doors
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
          {lanes.lanes.map((lane, index) => {
            const door = DOOR_META[index % DOOR_META.length];
            return (
              <li
                key={lane.title}
                className="flex flex-col overflow-hidden border-2 border-accent/55 bg-[#161614]"
              >
                <div className="relative aspect-[5/4] w-full border-b-2 border-accent/40">
                  <Image
                    src={door.src}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#161614] via-transparent to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 px-4 pb-4">
                    <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
                      Door {door.code}
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
                      <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent/80">
                        {row.label}
                      </p>
                      <p className="mt-1.5 text-sm font-medium leading-snug text-text-on-dark/85 sm:text-[0.95rem]">
                        {row.body}
                      </p>
                    </div>
                  ))}
                </div>
              </li>
            );
          })}
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
