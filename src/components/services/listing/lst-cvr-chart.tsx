import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LstCvrChartProps {
  service: ServicePageConfig;
}

/** Vertical CVR lift columns — not horizontal ranked bars (PPC). */
export function LstCvrChart({ service }: LstCvrChartProps) {
  const chart = service.modules?.find((module) => module.type === "metricChart");
  if (!chart || chart.type !== "metricChart") return null;

  const max = Math.max(...chart.points.map((p) => p.value), 1);

  return (
    <section
      id="service-cvr-chart"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-cvr-chart-heading"
    >
      <ServicePageShell>
        <h2
          id="service-cvr-chart-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {chart.heading}
        </h2>
        {chart.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {chart.subheading}
          </p>
        ) : null}

        <div className="mt-8 border-2 border-primary bg-[#F4F4F4] p-4 sm:p-6">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary">
            {chart.chartLabel}
          </p>
          <ul className="mt-6 flex h-56 items-end justify-around gap-3 sm:h-64 sm:gap-6">
            {chart.points.map((point, index) => {
              const height = Math.max(12, (point.value / max) * 100);
              return (
                <li
                  key={point.label}
                  className="flex h-full min-w-0 flex-1 flex-col items-center justify-end"
                >
                  <p className="mb-2 font-mono text-sm font-black tabular-nums text-primary">
                    {point.value}%
                  </p>
                  <div
                    className={cn(
                      "w-full max-w-[4.5rem] border-2 border-primary",
                      index === chart.points.length - 1
                        ? "bg-accent"
                        : "bg-primary",
                    )}
                    style={{ height: `${height}%` }}
                    aria-hidden="true"
                  />
                  <p className="mt-3 text-center text-xs font-bold leading-snug text-primary sm:text-sm">
                    {point.label}
                  </p>
                </li>
              );
            })}
          </ul>
          {chart.footnote ? (
            <p className="mt-5 text-xs font-medium leading-snug text-text-secondary">
              {chart.footnote}
            </p>
          ) : null}
        </div>
      </ServicePageShell>
    </section>
  );
}
