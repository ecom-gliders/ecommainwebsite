import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ShpFloorAudienceProps {
  service: ServicePageConfig;
}

const FLOOR_LABELS = ["Ground", "Level 1", "Level 2", "Penthouse"];

/** Brand stages as stacked storefront floors — not passport stamps or seat cards. */
export function ShpFloorAudience({ service }: ShpFloorAudienceProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

  return (
    <section
      id="service-audience"
      className={cn("bg-[#F4F4F0]", serviceSectionPad)}
      aria-labelledby="service-audience-heading"
    >
      <ServicePageShell>
        <h2
          id="service-audience-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {audience.heading}
        </h2>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-stretch">
          <div
            className="relative flex flex-col-reverse justify-end border-2 border-primary bg-background"
            aria-hidden="true"
          >
            {points.map((_, index) => (
              <div
                key={index}
                className={cn(
                  "flex h-14 items-center border-t-2 border-primary px-3 sm:h-16",
                  index === points.length - 1 && "border-t-0",
                  index % 2 === 0 ? "bg-[#FAFAF7]" : "bg-[#ECECE6]",
                )}
              >
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-text-secondary">
                  {FLOOR_LABELS[index] ?? `Floor ${index + 1}`}
                </span>
              </div>
            ))}
            <div className="absolute -right-3 top-1/2 hidden h-8 w-8 -translate-y-1/2 border-2 border-primary bg-accent lg:block" />
          </div>

          <ol className="flex flex-col gap-0">
            {points.map((point, index) => (
              <li
                key={point.title}
                className={cn(
                  "border-2 border-primary bg-background p-4 sm:p-5",
                  index > 0 && "-mt-px",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
                      {FLOOR_LABELS[index]}
                    </p>
                    <h3 className="mt-1 text-base font-black leading-snug text-primary">
                      {point.title}
                    </h3>
                    <p className="mt-1.5 text-sm font-medium leading-snug text-text-secondary">
                      {point.description}
                    </p>
                  </div>
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-black text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </ServicePageShell>
    </section>
  );
}
