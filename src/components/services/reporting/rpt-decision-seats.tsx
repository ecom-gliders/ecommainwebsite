import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface RptDecisionSeatsProps {
  service: ServicePageConfig;
}

/**
 * Audience seats: vertical bars beside text (side by side), titles parallel.
 */
export function RptDecisionSeats({ service }: RptDecisionSeatsProps) {
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
        <ul className="mt-8 grid grid-cols-1 overflow-hidden border-2 border-primary sm:grid-cols-2 lg:grid-cols-4">
          {audience.points.map((point, index) => (
            <li
              key={point.title}
              className={cn(
                "flex items-stretch gap-3 bg-background p-4 sm:gap-4 sm:p-5",
                index > 0 && "border-t-2 border-primary sm:border-t-0",
                index % 2 === 1 && "sm:border-l-2 sm:border-primary",
                index >= 2 && "sm:border-t-2 lg:border-t-0",
                index > 0 && "lg:border-l-2 lg:border-primary",
              )}
            >
              {/* Left: chip above, bars below */}
              <div className="flex w-11 shrink-0 flex-col items-center gap-2 self-stretch">
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center border-2 border-primary bg-accent font-mono text-xs font-black text-primary"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div
                  className="flex min-h-[2.5rem] w-full flex-1 items-end justify-center gap-0.5"
                  aria-hidden="true"
                >
                  {[55, 80, 65, 95].map((h, i) => (
                    <span
                      key={i}
                      className="w-1.5 bg-primary sm:w-2"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              </div>
              {/* Right: text */}
              <div className="min-w-0 flex-1 pt-0.5">
                <h3 className="text-base font-black leading-snug text-primary">
                  {point.title}
                </h3>
                <p className="mt-1 text-sm font-medium leading-snug text-text-secondary">
                  {point.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </ServicePageShell>
    </section>
  );
}
