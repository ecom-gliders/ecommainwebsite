import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcRouteMapProps {
  service: ServicePageConfig;
}

const LANE_SRC = [
  "/images/services/amazon-product-sourcing/src-lane-research-v2.jpg",
  "/images/services/amazon-product-sourcing/src-lane-sample-v2.jpg",
  "/images/services/amazon-product-sourcing/src-lane-qc-v2.jpg",
  "/images/services/amazon-product-sourcing/src-lane-ship-v2.jpg",
] as const;

/** Solution as parallel supply lanes that merge at launch handoff. */
export function SrcRouteMap({ service }: SrcRouteMapProps) {
  const { solution } = service;
  const steps = solution.steps.slice(0, 4);

  return (
    <section
      id="service-solution"
      className={cn("bg-[#0b1211] text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-solution-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
              Supply route map
            </p>
            <h2
              id="service-solution-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
            >
              {solution.heading}
            </h2>
          </div>
          <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-on-dark/45">
            Four lanes · one merge
          </p>
        </div>

        <div className="mt-8 overflow-hidden border-2 border-accent/60">
          <ol className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => (
              <li
                key={step.title}
                className={cn(
                  "flex flex-col border-accent/40 bg-[#101816]",
                  index > 0 && "border-t sm:border-t-0 sm:border-l",
                  index === 2 && "sm:border-t lg:border-t-0",
                  index === 3 && "sm:border-t lg:border-t-0",
                )}
              >
                <div className="relative aspect-[16/10] w-full border-b border-accent/30">
                  <Image
                    src={LANE_SRC[index] ?? LANE_SRC[0]}
                    alt=""
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                  <span className="absolute left-3 top-3 border border-accent bg-[#101816]/90 px-1.5 py-0.5 font-mono text-xs font-black text-accent">
                    Lane {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-4 sm:p-5">
                  <h3 className="text-lg font-black text-text-on-dark">
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-on-dark/70 sm:text-base">
                    {step.description}
                  </p>
                  <div
                    className="mt-4 h-1.5 overflow-hidden border border-accent/25 bg-[#0b1211]"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${55 + index * 12}%` }}
                    />
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <div className="border-t-2 border-accent bg-primary px-4 py-4 sm:px-5">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
              Merge point
            </p>
            <p className="mt-1.5 text-sm font-medium text-text-on-dark/90 sm:text-base">
              Approved product specs pass to catalog, listing, creative, and ads
              planning.
            </p>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
