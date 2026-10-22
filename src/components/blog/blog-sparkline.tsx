export interface SparklineSeries {
  label: string;
  values: number[];
}

interface BlogSparklineProps {
  title?: string;
  series: SparklineSeries[];
}

/** Compact inline trend lines for small series. */
export function BlogSparkline({ title, series }: BlogSparklineProps) {
  if (series.length === 0) return null;

  const w = 120;
  const h = 36;

  return (
    <div className="my-8 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
      {title ? (
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
          {title}
        </p>
      ) : null}
      <ul className="m-0 list-none space-y-3 p-0">
        {series.map((item) => {
          if (item.values.length < 2) return null;
          const min = Math.min(...item.values);
          const max = Math.max(...item.values);
          const span = max - min || 1;
          const points = item.values
            .map((v, i) => {
              const x = (i / (item.values.length - 1)) * w;
              const y = h - ((v - min) / span) * (h - 4) - 2;
              return `${x},${y}`;
            })
            .join(" ");
          const last = item.values[item.values.length - 1];
          return (
            <li
              key={item.label}
              className="flex items-center justify-between gap-4"
            >
              <span className="min-w-0 truncate text-small font-semibold text-text-primary">
                {item.label}
              </span>
              <svg
                viewBox={`0 0 ${w} ${h}`}
                className="h-9 w-28 shrink-0"
                role="img"
                aria-label={`${item.label} trend`}
              >
                <polyline
                  points={points}
                  fill="none"
                  stroke="#131311"
                  strokeWidth={2}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                <polyline
                  points={points}
                  fill="none"
                  stroke="#C6FD50"
                  strokeWidth={1.25}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
              </svg>
              <span className="w-12 shrink-0 text-right text-small text-text-secondary">
                {last}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/** Body: TITLE then `label | v1, v2, v3…` */
export function parseSparklineBody(body: string): {
  title?: string;
  series: SparklineSeries[];
} {
  let title: string | undefined;
  const series: SparklineSeries[] = [];

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 2) continue;
    const values = parts[1]
      .split(/[,\s]+/)
      .map((v) => Number.parseFloat(v))
      .filter((n) => !Number.isNaN(n));
    if (values.length < 2) continue;
    series.push({ label: parts[0], values });
  }

  return { title, series };
}
