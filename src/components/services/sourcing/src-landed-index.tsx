import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { MetricChart } from "@/components/services/modules/metric-chart";
import { cn } from "@/lib/utils";

interface SrcLandedIndexProps {
  service: ServicePageConfig;
}

export function SrcLandedIndex({ service }: SrcLandedIndexProps) {
  const chart = service.modules?.find(
    (module) => module.id === "landed-cost-waterfall",
  );
  if (!chart || chart.type !== "metricChart") return null;

  return (
    <section
      id={chart.id}
      className={cn("bg-[#EEF3F2]", serviceSectionPad)}
      aria-labelledby={`${chart.id}-heading`}
    >
      <ServicePageShell>
        <h2
          id={`${chart.id}-heading`}
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {chart.heading}
        </h2>
        {chart.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {chart.subheading}
          </p>
        ) : null}
        <div className="mt-8">
          <MetricChart
            chartLabel={chart.chartLabel ?? "Index weights"}
            points={chart.points}
            footnote={chart.footnote ?? ""}
            variant={chart.variant ?? "bars"}
          />
        </div>
      </ServicePageShell>
    </section>
  );
}
