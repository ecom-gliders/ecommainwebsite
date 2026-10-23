import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidPlacementFilmstripProps {
  service: ServicePageConfig;
}

/** Placement priority as vertical film frames — not horizontal DSP bars. */
export function VidPlacementFilmstrip({ service }: VidPlacementFilmstripProps) {
  const chart = service.modules?.find((module) => module.type === "metricChart");
  if (!chart || chart.type !== "metricChart") return null;

  const max = Math.max(...chart.points.map((point) => point.value), 1);

  return (
    <section
      id="service-placement"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-placement-heading"
    >
      <ServicePageShell>
        <h2
          id="service-placement-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {chart.heading}
        </h2>
        {chart.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-text-on-dark/75 sm:text-base">
            {chart.subheading}
          </p>
        ) : null}

        <p className="mt-4 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-accent">
          {chart.chartLabel}
        </p>

        <ul className="mt-6 flex flex-wrap items-end justify-center gap-3 sm:gap-4">
          {chart.points.map((point) => {
            const heightPct = Math.max(28, Math.round((point.value / max) * 100));
            return (
              <li
                key={point.label}
                className="flex w-[4.5rem] flex-col items-center sm:w-[5.5rem]"
              >
                <span className="mb-1 font-mono text-[10px] font-bold tabular-nums text-accent">
                  {point.value}
                </span>
                <div
                  className="relative flex w-full flex-col justify-end border-2 border-accent/60 bg-[#1a1a18]"
                  style={{ height: `${heightPct * 1.4}px`, minHeight: "5rem", maxHeight: "9rem" }}
                  aria-hidden="true"
                >
                  <div className="absolute left-0 top-0 flex h-full w-2 flex-col justify-around py-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className="mx-auto block h-1 w-1 rounded-sm bg-text-on-dark/30"
                      />
                    ))}
                  </div>
                  <div className="absolute right-0 top-0 flex h-full w-2 flex-col justify-around py-1">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <span
                        key={i}
                        className="mx-auto block h-1 w-1 rounded-sm bg-text-on-dark/30"
                      />
                    ))}
                  </div>
                  <div className="mx-2 mb-2 mt-auto h-2 bg-accent" />
                </div>
                <p className="mt-2 text-center text-[10px] font-bold leading-snug text-text-on-dark sm:text-xs">
                  {point.label}
                </p>
              </li>
            );
          })}
        </ul>
        {chart.footnote ? (
          <p className="mt-6 text-xs font-medium leading-snug text-text-on-dark/65">
            {chart.footnote}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
