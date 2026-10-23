import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface CpyAudienceProps {
  service: ServicePageConfig;
}

/** Vertical binder tabs — not chevrons or seat columns. */
export function CpyAudience({ service }: CpyAudienceProps) {
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

        <ul className="mt-8 grid gap-0 border-2 border-primary lg:grid-cols-4">
          {points.map((point, index) => (
            <li
              key={point.title}
              className={cn(
                "relative bg-[#F7F3EA] p-5",
                index > 0 && "border-t-2 border-primary lg:border-t-0 lg:border-l-2",
              )}
            >
              <span
                className="absolute -top-px left-4 inline-block border-2 border-primary border-b-0 bg-accent px-2 py-1 font-mono text-[10px] font-black text-primary lg:left-1/2 lg:-translate-x-1/2"
                aria-hidden="true"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-base font-black leading-snug text-primary">
                {point.title}
              </h3>
              <p className="mt-2 text-sm font-medium leading-snug text-text-secondary">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
