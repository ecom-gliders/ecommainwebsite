import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface FsFitContinuumProps {
  service: ServicePageConfig;
}

/**
 * Fit as a single horizontal continuum axis — distinct from ticket cards (3)
 * and from the issue/fix/verify stack (5).
 */
export function FsFitContinuum({ service }: FsFitContinuumProps) {
  const fit = service.fullService?.fitContinuum;
  if (!fit) return null;

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
          {fit.heading}
        </h2>

        <div
          className="relative mt-8 hidden h-3 w-full border-2 border-primary bg-background md:block"
          aria-hidden="true"
        >
          <div className="absolute inset-y-0 left-0 w-1/2 bg-accent" />
          <span className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 border-2 border-primary bg-primary" />
        </div>
        <div
          className="mt-2 hidden justify-between text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary md:flex"
          aria-hidden="true"
        >
          <span>{fit.fitHeading}</span>
          <span>{fit.notFitHeading}</span>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-3 w-8 border-2 border-primary bg-accent"
                aria-hidden="true"
              />
              <h3 className="text-base font-black text-primary sm:text-lg">
                {fit.fitHeading}
              </h3>
            </div>
            <ol className="space-y-3">
              {fit.fitBullets.map((bullet, index) => (
                <li
                  key={bullet}
                  className="flex gap-3 border-l-4 border-accent bg-background py-2.5 pl-3 pr-3"
                >
                  <span className="font-mono text-[10px] font-bold text-text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium leading-snug text-primary">
                    {bullet}
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <div className="mb-3 flex items-center gap-2">
              <span
                className="h-3 w-8 border-2 border-primary bg-primary/20"
                aria-hidden="true"
              />
              <h3 className="text-base font-black text-text-secondary sm:text-lg">
                {fit.notFitHeading}
              </h3>
            </div>
            <ol className="space-y-3">
              {fit.notFitBullets.map((bullet, index) => (
                <li
                  key={bullet}
                  className="flex gap-3 border-l-4 border-primary/25 bg-background py-2.5 pl-3 pr-3"
                >
                  <span className="font-mono text-[10px] font-bold text-text-secondary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-medium leading-snug text-text-secondary">
                    {bullet}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
