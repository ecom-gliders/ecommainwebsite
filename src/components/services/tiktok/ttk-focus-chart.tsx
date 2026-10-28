import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkFocusChartProps {
  service: ServicePageConfig;
}

/** Compact horizontal focus rows — no tall empty phone-bar tower. */
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
        <div className="grid gap-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)] lg:items-end lg:gap-10">
          <div>
            <h2
              id="service-focus-chart-heading"
              className="text-[clamp(1.5rem,2.8vw,1.85rem)] font-black tracking-tight text-text-on-dark"
            >
              {chart.heading}
            </h2>
            {chart.subheading ? (
              <p className="mt-2 text-sm font-medium leading-snug text-text-on-dark/75 sm:text-base">
                {chart.subheading}
              </p>
            ) : null}
            <p className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
              {chart.chartLabel} · not ROAS or GMV
            </p>
          </div>

          <ul className="space-y-3">
            {chart.points.map((point) => {
              const widthPct = Math.max(12, Math.round((point.value / max) * 100));
              return (
                <li key={point.label}>
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="text-sm font-bold text-text-on-dark sm:text-base">
                      {point.label}
                    </p>
                    <span className="shrink-0 font-mono text-xs font-bold tabular-nums text-accent">
                      {point.value}
                    </span>
                  </div>
                  <div
                    className="mt-1.5 h-2.5 w-full border border-accent/35 bg-[#0c0c0b]"
                    aria-hidden="true"
                  >
                    <div
                      className="h-full bg-accent"
                      style={{ width: `${widthPct}%` }}
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
        {chart.footnote ? (
          <p className="mt-6 text-xs font-medium leading-snug text-text-on-dark/65">
            {chart.footnote}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
