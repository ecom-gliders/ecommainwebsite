import { cn } from "@/lib/utils";
import type { ChartPoint } from "./browser-mockup.types";

interface BrowserMockupChartProps {
  data: number[];
  points: ChartPoint[];
  chartLabel: string;
  compact?: boolean;
  className?: string;
}

function buildAreaPath(
  data: number[],
  width: number,
  height: number,
  padding: { top: number; right: number; bottom: number; left: number },
): { line: string; coords: { x: number; y: number }[] } {
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;
  const innerWidth = width - padding.left - padding.right;
  const innerHeight = height - padding.top - padding.bottom;

  const coords = data.map((value, index) => ({
    x: padding.left + (index / (data.length - 1)) * innerWidth,
    y: padding.top + (1 - (value - min) / range) * innerHeight,
  }));

  const line = coords
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  return { line, coords };
}

export function BrowserMockupChart({
  data,
  points,
  chartLabel,
  compact = false,
  className,
}: BrowserMockupChartProps) {
  const chartId = chartLabel.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
  const width = compact ? 280 : 480;
  const height = compact ? 72 : 88;
  const padding = compact
    ? { top: 10, right: 8, bottom: 16, left: 8 }
    : { top: 12, right: 10, bottom: 18, left: 10 };

  const { line, coords } = buildAreaPath(data, width, height, padding);
  const lastPoint = coords[coords.length - 1];
  const lastDataPoint = points[points.length - 1];
  const gridLines = [0.33, 0.66].map((ratio) => height * ratio);

  const areaGradientId = `area-${chartId}`;

  return (
    <div
      className={cn(
        "rounded-md border border-border bg-surface",
        compact ? "p-2" : "p-3",
        className,
      )}
      role="img"
      aria-label={`${chartLabel} chart showing ${lastDataPoint.value}`}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <p
          className={cn(
            "font-medium text-text-primary",
            compact ? "text-[10px]" : "text-xs",
          )}
        >
          {chartLabel}
        </p>
        <p
          className={cn(
            "text-text-primary",
            compact ? "text-[10px]" : "text-xs",
          )}
        >
          <span className="font-semibold">{lastDataPoint.value}</span>
          <span className="text-text-secondary">
            {" "}
            ({lastDataPoint.label})
          </span>
        </p>
      </div>

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id={areaGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.16" />
            <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
          </linearGradient>
        </defs>

        {gridLines.map((y) => (
          <line
            key={y}
            x1={padding.left}
            y1={y}
            x2={width - padding.right}
            y2={y}
            stroke="var(--color-border)"
            strokeWidth="1"
            strokeDasharray="2 3"
          />
        ))}

        <path
          d={`${line} L ${coords[coords.length - 1].x} ${height - padding.bottom} L ${coords[0].x} ${height - padding.bottom} Z`}
          fill={`url(#${areaGradientId})`}
        />

        <path
          d={line}
          fill="none"
          stroke="var(--color-accent)"
          strokeWidth={compact ? 1.5 : 2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        <circle
          cx={lastPoint.x}
          cy={lastPoint.y}
          r={compact ? 2.5 : 3}
          fill="var(--color-accent)"
          stroke="var(--color-background)"
          strokeWidth="1.5"
        />
      </svg>

      <div
        className={cn(
          "flex justify-between text-text-secondary",
          compact ? "mt-1 px-0.5 text-[9px]" : "mt-1.5 px-0.5 text-[10px]",
        )}
      >
        <span>{points[0]?.label}</span>
        <span>{points[points.length - 1]?.label}</span>
      </div>
    </div>
  );
}
