import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface BrdAudienceProps {
  service: ServicePageConfig;
}

/** Passport-stamp audience cards — not seat columns or binder tabs. */
export function BrdAudience({ service }: BrdAudienceProps) {
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

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-3">
          {points.map((point, index) => (
            <li
              key={point.title}
              className="relative flex flex-col border-2 border-primary bg-[#FAF6EF] p-5 pt-8"
            >
              <span
                className="absolute -top-3 left-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-accent font-mono text-xs font-black leading-tight text-primary"
                aria-hidden="true"
              >
                BR
                <span className="sr-only">Passport stamp {index + 1}</span>
              </span>
              <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                Holder {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-base font-black leading-snug text-primary">
                {point.title}
              </h3>
              <p className="mt-2 flex-1 text-sm font-medium leading-snug text-text-secondary">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
