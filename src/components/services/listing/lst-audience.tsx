import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstAudienceProps {
  service: ServicePageConfig;
}

const STAGE_LABELS = ["Discover", "Compare", "Decide", "Purchase"];

/** Buyer path as connected chevron stages — not equal seat cards. */
export function LstAudience({ service }: LstAudienceProps) {
  const audience = service.audience;
  if (!audience?.points?.length) return null;

  const points = audience.points.slice(0, 4);

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

        <ol className="mt-8 flex flex-col gap-0 lg:flex-row lg:items-stretch">
          {points.map((point, index) => (
            <li
              key={point.title}
              className={cn(
                "relative flex flex-1 flex-col border-2 border-primary bg-background p-4 sm:p-5",
                index > 0 && "lg:-ml-px",
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
                  {STAGE_LABELS[index] ?? `Stage ${index + 1}`}
                </span>
                <span
                  className="flex h-7 w-7 items-center justify-center bg-accent font-mono text-xs font-black text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-3 text-base font-black leading-snug text-primary">
                {point.title}
              </h3>
              <p className="mt-1.5 flex-1 text-sm font-medium leading-snug text-text-secondary">
                {point.description}
              </p>
              {index < points.length - 1 ? (
                <span
                  className="pointer-events-none absolute -bottom-3 left-1/2 z-[1] hidden h-0 w-0 -translate-x-1/2 border-x-[10px] border-t-[12px] border-x-transparent border-t-primary lg:left-auto lg:right-[-11px] lg:top-1/2 lg:bottom-auto lg:translate-x-0 lg:-translate-y-1/2 lg:border-y-[10px] lg:border-l-[12px] lg:border-t-0 lg:border-y-transparent lg:border-l-primary"
                  aria-hidden="true"
                />
              ) : null}
            </li>
          ))}
        </ol>
      </ServicePageShell>
    </section>
  );
}
