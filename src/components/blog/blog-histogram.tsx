export interface HistogramBin {
  label: string;
  value: number;
}

interface BlogHistogramProps {
  title?: string;
  bins: HistogramBin[];
  yLabel?: string;
}

/** Frequency / distribution columns (histogram). */
export function BlogHistogram({ title, bins, yLabel }: BlogHistogramProps) {
  if (bins.length === 0) return null;

  const max = Math.max(...bins.map((bin) => bin.value), 1);
  const height = 180;
  const gap = 4;
  const barWidth = Math.max(12, Math.floor(280 / bins.length) - gap);

  return (
    <div className="my-8 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
      {title ? (
        <p className="mb-1 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
          {title}
        </p>
      ) : null}
      {yLabel ? (
        <p className="mb-3 text-xs text-text-secondary">{yLabel}</p>
      ) : null}
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${bins.length * (barWidth + gap) + 8} ${height + 36}`}
          className="h-56 min-w-full"
          role="img"
          aria-label={title ?? "Histogram"}
        >
          <line
            x1={0}
            y1={height}
            x2={bins.length * (barWidth + gap)}
            y2={height}
            stroke="#131311"
            strokeWidth={2}
          />
          {bins.map((bin, index) => {
            const h = Math.max(2, (bin.value / max) * (height - 8));
            const x = index * (barWidth + gap) + 2;
            const y = height - h;
            return (
              <g key={bin.label}>
                <rect
                  x={x}
                  y={y}
                  width={barWidth}
                  height={h}
                  fill="#C6FD50"
                  stroke="#131311"
                  strokeWidth={2}
                />
                <text
                  x={x + barWidth / 2}
                  y={y - 4}
                  textAnchor="middle"
                  className="fill-text-secondary"
                  fontSize={10}
                  fontWeight={600}
                >
                  {bin.value}
                </text>
                <text
                  x={x + barWidth / 2}
                  y={height + 14}
                  textAnchor="middle"
                  className="fill-text-primary"
                  fontSize={9}
                  fontWeight={600}
                >
                  {bin.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

export function parseHistogramBody(body: string): {
  title?: string;
  yLabel?: string;
  bins: HistogramBin[];
} {
  let title: string | undefined;
  let yLabel: string | undefined;
  const bins: HistogramBin[] = [];

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    if (/^Y:\s*/i.test(line)) {
      yLabel = line.replace(/^Y:\s*/i, "").trim();
      continue;
    }
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 2) continue;
    const value = Number.parseFloat(parts[1]);
    if (Number.isNaN(value)) continue;
    bins.push({ label: parts[0], value });
  }

  return { title, yLabel, bins };
}
