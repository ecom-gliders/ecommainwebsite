import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface DspAudienceOrbitProps {
  service: ServicePageConfig;
}

/** Audience as orbital cards on a cross axis — distinct from FS ownership ring. */
export function DspAudienceOrbit({ service }: DspAudienceOrbitProps) {
  const audience = service.audience;
  if (!audience) return null;

  return (
    <section
      id="service-audience"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>

        <div className="relative mt-8">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-primary/25 lg:block"
            aria-hidden="true"
          />
          <ul className="grid gap-4 sm:grid-cols-2">
            {audience.points.map((point, index) => (
              <li
                key={point.title}
                className={cn(
                  "relative border-2 border-primary bg-background p-5",
                  index % 2 === 0 ? "lg:translate-y-2" : "lg:-translate-y-2",
                )}
              >
                <span
                  className="mb-3 inline-flex h-8 w-8 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-bold text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-base font-black text-primary sm:text-lg">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
