export interface BarChartItem {
  label: string;
  value: number;
  display?: string;
}

interface BlogBarChartProps {
  title?: string;
  items: BarChartItem[];
  /** vertical = classic column chart; horizontal = bars (alias of metric) */
  orientation?: "vertical" | "horizontal";
}

/**
 * Explicit bar/column chart for published series.
 * Values must already exist in article data — component does not invent them.
 */
export function BlogBarChart({
  title,
  items,
  orientation = "vertical",
}: BlogBarChartProps) {
  if (items.length === 0) return null;

  const max = Math.max(...items.map((item) => item.value), 1);

  if (orientation === "horizontal") {
    return (
      <div className="my-8 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
        {title ? (
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
            {title}
          </p>
        ) : null}
        <ul className="m-0 list-none space-y-3 p-0">
          {items.map((item) => {
            const pct = Math.round((item.value / max) * 100);
            return (
              <li key={item.label}>
                <div className="mb-1 flex justify-between gap-2 text-small">
                  <span className="font-semibold text-text-primary">
                    {item.label}
                  </span>
                  <span className="text-text-secondary">
                    {item.display ?? item.value}
                  </span>
                </div>
                <div className="h-3 border-2 border-primary bg-background">
                  <div
                    className="h-full bg-accent"
                    style={{ width: `${pct}%` }}
                    role="presentation"
                  />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  return (
    <div className="my-8 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
      {title ? (
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
          {title}
        </p>
      ) : null}
      <div className="flex h-48 items-end justify-around gap-2 border-b-2 border-primary px-2 pb-0 pt-4">
        {items.map((item) => {
          const pct = Math.round((item.value / max) * 100);
          return (
            <div
              key={item.label}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
            >
              <span className="text-[11px] font-semibold text-text-secondary">
                {item.display ?? item.value}
              </span>
              <div
                className="w-full max-w-[3rem] border-2 border-primary border-b-0 bg-accent"
                style={{ height: `${Math.max(pct, 4)}%` }}
                role="presentation"
              />
            </div>
          );
        })}
      </div>
      <ul className="mt-3 flex list-none justify-around gap-2 p-0">
        {items.map((item) => (
          <li
            key={item.label}
            className="min-w-0 flex-1 text-center text-[11px] font-medium leading-snug text-text-primary"
          >
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

/**
 * Body:
 * TITLE: optional
 * ORIENTATION: vertical|horizontal
 * label | value | optional display
 */
export function parseBarChartBody(body: string): {
  title?: string;
  orientation: "vertical" | "horizontal";
  items: BarChartItem[];
} {
  let title: string | undefined;
  let orientation: "vertical" | "horizontal" = "vertical";
  const items: BarChartItem[] = [];

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    if (/^ORIENTATION:\s*/i.test(line)) {
      const v = line.replace(/^ORIENTATION:\s*/i, "").trim().toLowerCase();
      orientation = v === "horizontal" ? "horizontal" : "vertical";
      continue;
    }
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 2) continue;
    const value = Number.parseFloat(parts[1].replace(/%/g, ""));
    if (Number.isNaN(value)) continue;
    items.push({
      label: parts[0],
      value,
      display: parts[2] ?? parts[1],
    });
  }

  return { title, orientation, items };
}
