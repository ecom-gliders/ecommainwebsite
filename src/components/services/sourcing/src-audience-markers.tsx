import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcAudienceMarkersProps {
  service: ServicePageConfig;
}

const MARKERS = [
  {
    code: "IMP-A",
    src: "/images/services/amazon-product-sourcing/src-audience-import-v2.jpg",
  },
  {
    code: "IMP-B",
    src: "/images/services/amazon-product-sourcing/src-lane-research-v2.jpg",
  },
  {
    code: "IMP-C",
    src: "/images/services/amazon-product-sourcing/src-audience-sample-v2.jpg",
  },
  {
    code: "IMP-D",
    src: "/images/services/amazon-product-sourcing/src-lane-ship-v2.jpg",
  },
] as const;

/** Importer roles as mile markers on one supply corridor. */
export function SrcAudienceMarkers({ service }: SrcAudienceMarkersProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-[#E4EBE9]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              Corridor markers
            </p>
            <h2
              id="service-audience-heading"
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
            >
              {audience.heading}
            </h2>
          </div>
          <p className="border-2 border-primary bg-background px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
            4 importer lanes
          </p>
        </div>

        <div className="relative mt-8">
          <div
            className="pointer-events-none absolute left-0 right-0 top-[5.5rem] hidden h-0.5 bg-primary/30 lg:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-0 overflow-hidden border-2 border-primary sm:grid-cols-2 lg:grid-cols-4">
            {points.map((point, index) => {
              const marker = MARKERS[index] ?? MARKERS[0];
              return (
                <li
                  key={point.title}
                  className={cn(
                    "flex flex-col bg-background",
                    index > 0 &&
                      "border-t-2 border-primary sm:border-t-0 sm:border-l-2",
                    index === 2 && "sm:border-t-2 lg:border-t-0",
                    index === 3 && "sm:border-t-2 lg:border-t-0",
                  )}
                >
                  <div className="relative h-36 w-full shrink-0 border-b-2 border-primary sm:h-40">
                    <Image
                      src={marker.src}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                    <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-primary/90 px-3 py-2">
                      <span className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
                        Marker
                      </span>
                      <span className="font-mono text-[11px] font-black text-text-on-dark">
                        {marker.code}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <span
                      className="mb-3 h-1 w-10 bg-accent"
                      aria-hidden="true"
                    />
                    <h3 className="text-lg font-black leading-snug text-primary">
                      {point.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary sm:text-base">
                      {point.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
