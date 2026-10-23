import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface SrcAudienceMarkersProps {
  service: ServicePageConfig;
}

const MARKER_CODES = ["IMP-A", "IMP-B", "IMP-C", "IMP-D"];

/** Importer roles as mile markers along one supply route. */
export function SrcAudienceMarkers({ service }: SrcAudienceMarkersProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>

        <div className="relative mt-10 border-2 border-primary bg-[#EEF3F2] p-4 sm:p-6">
          <div
            className="pointer-events-none absolute left-6 right-6 top-1/2 hidden h-1 -translate-y-1/2 bg-primary/30 sm:block"
            aria-hidden="true"
          />
          <ol className="relative grid gap-4 sm:grid-cols-4 sm:gap-3">
            {points.map((point, index) => (
              <li key={point.title} className="relative flex flex-col">
                <div className="mx-auto flex w-full max-w-[11rem] flex-col border-2 border-primary bg-background sm:max-w-none">
                  <div className="flex items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
                      Marker
                    </span>
                    <span className="font-mono text-[10px] font-black text-text-on-dark">
                      {MARKER_CODES[index] ?? `M${index + 1}`}
                    </span>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="text-sm font-black leading-snug text-primary sm:text-base">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                      {point.description}
                    </p>
                  </div>
                </div>
                <span
                  className="mx-auto mt-2 hidden h-3 w-3 rotate-45 border-2 border-primary bg-accent sm:block"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
