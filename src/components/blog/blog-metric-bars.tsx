export interface MetricBarItem {
  label: string;
  percent: number;
}

interface BlogMetricBarsProps {
  items: MetricBarItem[];
}

export function BlogMetricBars({ items }: BlogMetricBarsProps) {
  if (items.length === 0) return null;

  return (
    <ul className="my-8 list-none space-y-5 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
      {items.map((item) => {
        const clamped = Math.max(0, Math.min(100, item.percent));
        const labelHasPct = /%/.test(item.label);
        return (
          <li key={item.label}>
            <div className="mb-2 flex items-start justify-between gap-3">
              <span className="text-small font-semibold leading-snug text-text-primary">
                {item.label}
              </span>
              {labelHasPct ? null : (
                <span className="shrink-0 text-small text-text-secondary">
                  {clamped}%
                </span>
              )}
            </div>
            <div className="h-3 w-full border-2 border-primary bg-surface-muted">
              <div
                className="h-full bg-accent"
                style={{ width: `${clamped}%` }}
                role="presentation"
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function parseMetricBarsBody(body: string): MetricBarItem[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const sep = line.indexOf("|");
      if (sep < 0) return null;
      const label = line.slice(0, sep).trim();
      const pctRaw = line.slice(sep + 1).trim().replace(/%/g, "");
      const percent = Number.parseFloat(pctRaw);
      if (!label || Number.isNaN(percent)) return null;
      return { label, percent };
    })
    .filter((item): item is MetricBarItem => item !== null);
}
