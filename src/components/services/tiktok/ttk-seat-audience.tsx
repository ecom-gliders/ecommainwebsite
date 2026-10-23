import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkSeatAudienceProps {
  service: ServicePageConfig;
}

const SEAT_LABELS = ["Creator seat", "Brand seat", "Ops seat", "Amazon seat"] as const;

/** Creator and brand audience as equal phone tiles — not orbit cards or film sprockets. */
export function TtkSeatAudience({ service }: TtkSeatAudienceProps) {
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

        <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="flex min-h-[14rem] flex-col border-2 border-primary bg-[#F4F4F4] p-4"
            >
              <p className="font-mono text-[9px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                {SEAT_LABELS[index] ?? `Seat ${index + 1}`}
              </p>
              <div
                className="mx-auto mt-3 aspect-[9/16] w-full max-w-[5.5rem] border-2 border-primary bg-[#1a1a18]"
                aria-hidden="true"
              >
                <div className="flex h-full flex-col items-center justify-center gap-2 p-2">
                  <span className="h-2 w-6 rounded-sm bg-accent/70" />
                  <span className="h-8 w-8 rounded-full border border-accent/40" />
                  <span className="mt-auto h-1 w-full bg-text-on-dark/30" />
                </div>
              </div>
              <h3 className="mt-3 text-sm font-black leading-snug text-primary sm:text-base">
                {point.title}
              </h3>
              <p className="mt-2 flex-1 text-xs font-medium leading-snug text-text-secondary sm:text-sm">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
