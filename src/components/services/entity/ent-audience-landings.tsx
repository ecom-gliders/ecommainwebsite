import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntAudienceLandingsProps {
  service: ServicePageConfig;
}

const LANDING_HEIGHTS = ["0%", "12%", "24%", "36%"] as const;

/** Founder stages as ladder landings — not equal seat cards or matrix. */
export function EntAudienceLandings({ service }: EntAudienceLandingsProps) {
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

        <div className="relative mt-10 min-h-[18rem] border-2 border-primary bg-[#F4F4F4] p-4 sm:p-6">
          <div
            className="pointer-events-none absolute bottom-6 left-8 top-6 w-0.5 bg-primary"
            aria-hidden="true"
          />
          <ul className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:items-end lg:gap-4">
            {points.map((point, index) => (
              <li
                key={point.title}
                className="relative lg:pb-0"
                style={
                  index > 0
                    ? { paddingBottom: LANDING_HEIGHTS[index] }
                    : undefined
                }
              >
                <div
                  className="absolute -left-4 top-1/2 hidden h-0.5 w-4 bg-primary lg:block"
                  aria-hidden="true"
                />
                <div className="border-2 border-primary bg-background p-4 shadow-[3px_3px_0_0_#131311]">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                    Landing {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1.5 text-base font-black text-primary">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </ServicePageShell>
    </section>
  );
}
