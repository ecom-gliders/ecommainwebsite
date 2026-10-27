import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ScCaseLanesProps {
  service: ServicePageConfig;
}

const LANE_IMAGES = [
  "/images/services/amazon-seller-central-services/sc-lane-cases.jpg",
  "/images/services/amazon-seller-central-services/sc-lane-promo.jpg",
  "/images/services/amazon-seller-central-services/sc-lane-queue.jpg",
] as const;

/** opsLanes as case-folder stack - not ink handoff rail or lime FS lanes. */
export function ScCaseLanes({ service }: ScCaseLanesProps) {
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

        <ul className="mt-8 space-y-4">
          {lanes.lanes.map((lane, index) => (
            <li
              key={lane.title}
              className="overflow-hidden border-2 border-primary bg-[#F0F0EC] shadow-[3px_3px_0_0_#131311]"
            >
              <div className="grid gap-0 sm:grid-cols-[8.5rem_minmax(0,1fr)]">
                <div className="relative aspect-[4/3] w-full border-b-2 border-primary bg-[#E4E4E0] sm:aspect-auto sm:min-h-[7rem] sm:border-b-0 sm:border-r-2">
                  <Image
                    src={LANE_IMAGES[index % LANE_IMAGES.length]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="140px"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-3 bg-[#E4E4E0] px-4 py-3">
                  <span
                    className="font-mono text-[10px] font-bold uppercase text-text-secondary"
                    aria-hidden="true"
                  >
                    Folder {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-base font-black text-primary">{lane.title}</h3>
                </div>
              </div>
              <div className="grid gap-0 border-t-2 border-primary lg:grid-cols-3">
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
                        "border-t-2 border-primary/20 lg:border-t-0 lg:border-l-2 lg:border-primary/20",
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
          ))}
        </ul>
        {lanes.note ? (
          <p className="mt-3 text-xs font-medium text-text-secondary">{lanes.note}</p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
