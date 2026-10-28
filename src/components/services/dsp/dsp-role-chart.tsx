import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface DspRoleChartProps {
  service: ServicePageConfig;
}

/** DSP vs Sponsored Ads role index chart from modules. */
export function DspRoleChart({ service }: DspRoleChartProps) {
  const chart = service.modules?.find((module) => module.type === "metricChart");
  if (!chart || chart.type !== "metricChart") return null;

  const max = Math.max(...chart.points.map((point) => point.value), 1);

  return (
    <section
      id="service-roles"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-roles-heading"
    >
      <ServicePageShell>
        <h2
          id="service-roles-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {chart.heading}
        </h2>
        {chart.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-text-secondary sm:text-base">
            {chart.subheading}
          </p>
        ) : null}

        <ul className="mt-8 space-y-4 border-2 border-primary bg-background p-5 sm:p-6">
          <li className="mb-2 text-xs font-bold uppercase tracking-[0.1em] text-text-secondary">
            {chart.chartLabel}
          </li>
          {chart.points.map((point) => {
            const width = Math.round((point.value / max) * 100);
            return (
              <li key={point.label}>
                <div className="flex items-baseline justify-between gap-3">
                  <p className="text-sm font-bold text-primary">{point.label}</p>
                  <span className="font-mono text-xs font-bold tabular-nums text-text-secondary">
                    {point.value}
                  </span>
                </div>
                <div
                  className="mt-1.5 h-4 w-full border-2 border-primary bg-[#F4F4F4]"
                  aria-hidden="true"
                >
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${width}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
        {chart.footnote ? (
          <p className="mt-3 text-xs font-medium text-text-secondary">
            {chart.footnote}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
