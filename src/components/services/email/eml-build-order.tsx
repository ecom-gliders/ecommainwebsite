import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EmlBuildOrderProps {
  service: ServicePageConfig;
}

/** Flow build priority as loop-ordered horizontal bars — not DSP rings or phone bars. */
export function EmlBuildOrder({ service }: EmlBuildOrderProps) {
  const chart = service.modules?.find((module) => module.type === "metricChart");
  if (!chart || chart.type !== "metricChart") return null;

  const max = Math.max(...chart.points.map((point) => point.value), 1);

  return (
    <section
      id="service-build-order"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-build-order-heading"
    >
      <ServicePageShell>
        <h2
          id="service-build-order-heading"
          className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
        >
          {chart.heading}
        </h2>
        {chart.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium leading-relaxed text-text-on-dark/75 sm:text-base">
            {chart.subheading}
          </p>
        ) : null}

        <p className="mt-4 font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
          {chart.chartLabel}
        </p>

        <ul className="mt-6 space-y-3">
          {chart.points.map((point, index) => {
            const widthPct = Math.max(12, Math.round((point.value / max) * 100));
            return (
              <li key={point.label}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="text-sm font-bold text-text-on-dark">{point.label}</p>
                  <span className="font-mono text-xs font-bold tabular-nums text-accent">
                    {String(index + 1).padStart(2, "0")} · {point.value}
                  </span>
                </div>
                <div className="mt-1.5 h-3 w-full border border-accent/30 bg-[#0c0c0b]">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${widthPct}%` }}
                    aria-hidden="true"
                  />
                </div>
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
