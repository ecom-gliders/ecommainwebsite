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
      className={cn("bg-[#E4EBE9]", serviceSectionPad)}
      aria-labelledby={`${chart.id}-heading`}
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
          Landed cost index
        </p>
        <h2
          id={`${chart.id}-heading`}
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
        >
          {chart.heading}
        </h2>
        {chart.subheading ? (
          <p className="mt-2 max-w-2xl text-base font-medium text-text-secondary">
            {chart.subheading}
          </p>
        ) : null}
        <div className="mt-8 border-2 border-primary bg-background p-4 shadow-[4px_4px_0_0_#131311] sm:p-6">
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
