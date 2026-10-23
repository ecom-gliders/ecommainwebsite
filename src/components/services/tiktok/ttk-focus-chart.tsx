import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkFocusChartProps {
  service: ServicePageConfig;
}

/** Creative-before-scale as spark-height phone bars — not DSP filmstrip or horizontal bars only. */
export function TtkFocusChart({ service }: TtkFocusChartProps) {
  const chart = service.modules?.find((module) => module.type === "metricChart");
  if (!chart || chart.type !== "metricChart") return null;

  const max = Math.max(...chart.points.map((point) => point.value), 1);

  return (
    <section
      id="service-focus-chart"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-focus-chart-heading"
    >
      <ServicePageShell>
        <h2
          id="service-focus-chart-heading"
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

        <ul className="mt-6 flex flex-wrap items-end justify-center gap-3 sm:gap-5">
          {chart.points.map((point) => {
            const heightPct = Math.max(28, Math.round((point.value / max) * 100));
            return (
              <li
                key={point.label}
                className="flex w-[4.25rem] flex-col items-center sm:w-[5.25rem]"
              >
                <span className="mb-1 font-mono text-[10px] font-bold tabular-nums text-accent">
                  {point.value}
                </span>
                <div
                  className="relative flex w-full flex-col items-center justify-end border-2 border-accent/50 bg-[#0c0c0b]"
                  style={{
                    height: `${heightPct * 1.35}px`,
                    minHeight: "5rem",
                    maxHeight: "9.5rem",
                  }}
                  aria-hidden="true"
                >
                  <div className="absolute inset-x-2 top-2 aspect-[9/16] max-h-[70%] border border-text-on-dark/25" />
                  <div className="mx-1 mb-1.5 mt-auto h-1.5 w-[calc(100%-0.5rem)] bg-accent" />
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
