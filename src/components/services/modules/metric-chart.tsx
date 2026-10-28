import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";

export interface MetricChartPoint {
  label: string;
  value: number;
}

export interface MetricChartProps {
  chartLabel: string;
  points: MetricChartPoint[];
  footnote: string;
  /** bars = horizontal lime tracks; columns = vertical bars; stack = ranked index list. */
  variant?: "bars" | "columns" | "stack";
}

export function MetricChart({
  chartLabel,
  points,
  footnote,
  variant = "bars",
}: MetricChartProps) {
  const max = Math.max(...points.map((entry) => entry.value), 1);

  if (variant === "columns") {
    return (
      <div className={cn(serviceHardPanel, "p-5 sm:p-6")}>
        <p className="text-small font-semibold text-primary">{chartLabel}</p>
        <ul className="mt-8 flex items-end gap-2 sm:gap-3">
          {points.map((point) => {
            const height = Math.max(12, Math.round((point.value / max) * 100));
            return (
              <li
                key={point.label}
                className="flex min-w-0 flex-1 flex-col items-center gap-2"
              >
                <span className="text-sm font-black tabular-nums text-primary sm:text-base">
                  {point.value}
                </span>
                <div className="flex h-36 w-full items-end justify-center sm:h-44">
                  <div
                    className="w-full max-w-[48px] rounded-t-[4px] border-2 border-b-0 border-primary bg-accent"
                    style={{ height: `${height}%` }}
                  />
                </div>
                <span className="line-clamp-3 text-center text-xs leading-snug text-text-secondary">
                  {point.label}
                </span>
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-xs text-text-secondary">{footnote}</p>
      </div>
    );
  }

  if (variant === "stack") {
    const ranked = [...points].sort((a, b) => b.value - a.value);
    return (
      <div
        className={cn(
          "overflow-hidden rounded-[4px] border-2 border-primary bg-background",
          "shadow-[4px_4px_0_0_#131311]",
        )}
      >
        <div className="border-b-2 border-primary bg-primary px-4 py-3 sm:px-5">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
            {chartLabel}
          </p>
        </div>
        <ol className="divide-y divide-primary/15">
          {ranked.map((point, index) => (
            <li
              key={point.label}
              className="flex items-center gap-4 px-4 py-3.5 sm:px-5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center border-2 border-primary bg-accent text-xs font-black text-primary">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1 text-small font-medium text-text-secondary">
                {point.label}
              </span>
              <span className="text-stat font-black tabular-nums text-primary">
                {point.value}
              </span>
            </li>
          ))}
        </ol>
        <p className="border-t border-primary/15 px-4 py-3 text-xs text-text-secondary sm:px-5">
          {footnote}
        </p>
      </div>
    );
  }

  return (
    <div className={cn(serviceHardPanel, "p-5 sm:p-6")}>
      <p className="text-small font-semibold text-primary">{chartLabel}</p>
      <ul className="mt-6 space-y-5">
        {points.map((point) => {
          const width = Math.max(8, Math.round((point.value / max) * 100));
          return (
            <li key={point.label}>
              <div className="mb-2 flex items-end justify-between gap-3">
                <span className="text-small font-medium text-text-secondary">
                  {point.label}
                </span>
                <span className="text-stat font-black tracking-tight text-primary">
                  {point.value}
                </span>
              </div>
              <div className="h-8 overflow-hidden rounded-[8px] border-2 border-primary bg-surface-muted sm:h-10">
                <div
                  className="h-full bg-accent transition-[width] duration-500"
                  style={{ width: `${width}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-5 text-xs text-text-secondary">{footnote}</p>
    </div>
  );
}
