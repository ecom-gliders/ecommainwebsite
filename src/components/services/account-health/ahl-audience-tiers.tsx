import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface AhlAudienceTiersProps {
  service: ServicePageConfig;
}

export function AhlAudienceTiers({ service }: AhlAudienceTiersProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

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
        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {audience.points.map((point, index) => (
            <li
              key={point.title}
              className="flex flex-col border-2 border-primary bg-background p-4 sm:p-5"
              style={{ marginTop: index > 0 ? undefined : 0 }}
            >
              <div
                className="flex items-center gap-2"
                aria-hidden="true"
              >
                <span className="h-1 flex-1 bg-primary/20" />
                <span className="font-mono text-[10px] font-bold text-text-secondary">
                  Tier {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-1 flex-1 bg-accent" />
              </div>
              <h3 className="mt-3 text-base font-black leading-snug text-primary">
                {point.title}
              </h3>
              <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                {point.description}
              </p>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
