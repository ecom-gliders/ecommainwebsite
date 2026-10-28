import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface PpcAudienceBarsProps {
  service: ServicePageConfig;
}

const WIDTHS = [92, 78, 70, 64];

/** Audience as ranked horizontal bars — distinct from Full-Service donut. */
export function PpcAudienceBars({ service }: PpcAudienceBarsProps) {
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

        <ul className="mt-8 space-y-5">
          {audience.points.map((point, index) => {
            const width = WIDTHS[index] ?? 60;
            return (
              <li key={point.title}>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-base font-bold text-primary">
                    {point.title}
                  </h3>
                  <span className="shrink-0 font-mono text-xs font-bold text-text-secondary">
                    Fit {width}
                  </span>
                </div>
                <div
                  className="mt-2 h-3 w-full border-2 border-primary bg-background"
                  aria-hidden="true"
                >
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${width}%` }}
                  />
                </div>
                <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                  {point.description}
                </p>
              </li>
            );
          })}
        </ul>
      </ServicePageShell>
    </section>
  );
}
