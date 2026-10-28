export interface RankedChartItem {
  label: string;
  detail?: string;
  percent: number;
}

interface BlogChartRankedProps {
  items: RankedChartItem[];
}

/**
 * Ranked impact chart — ordinal badges + proportional bars.
 * Use when % ranges matter more than multi-column notes.
 */
export function BlogChartRanked({ items }: BlogChartRankedProps) {
  if (items.length === 0) return null;

  const sorted = [...items].sort((a, b) => b.percent - a.percent);

  return (
    <ol className="my-8 list-none space-y-3 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
      {sorted.map((item, index) => {
        const clamped = Math.max(0, Math.min(100, item.percent));
        return (
          <li key={item.label} className="flex gap-3">
            <span
              className="flex h-8 w-8 shrink-0 items-center justify-center bg-accent text-small font-bold text-primary"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex flex-wrap items-baseline justify-between gap-2">
                <span className="text-small font-semibold text-text-primary">
                  {item.label}
                </span>
                {item.detail ? (
                  <span className="text-xs text-text-secondary">
                    {item.detail}
                  </span>
                ) : (
                  <span className="text-xs font-semibold text-text-secondary">
                    {clamped}%
                  </span>
                )}
              </div>
              <div className="h-2.5 w-full border border-primary bg-background">
                <div
                  className="h-full bg-accent"
                  style={{ width: `${clamped}%` }}
                  role="presentation"
                />
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

/** Body: `label | detail | pct` or `label | pct` */
export function parseChartRankedBody(body: string): RankedChartItem[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const parts = line.split("|").map((part) => part.trim());
      if (parts.length < 2) return null;
      const last = parts[parts.length - 1].replace(/%/g, "");
      const percent = Number.parseFloat(last);
      if (Number.isNaN(percent)) return null;
      if (parts.length === 2) {
        return { label: parts[0], percent };
      }
      return {
        label: parts[0],
        detail: parts.slice(1, -1).join(" — "),
        percent,
      };
    })
    .filter((item): item is RankedChartItem => item !== null);
}
