export interface ChartCardRow {
  title: string;
  primary: string;
  secondary?: string;
}

interface BlogChartCardsProps {
  rows: ChartCardRow[];
  headers?: string[];
  title?: string;
}

function extractPct(text: string): number | null {
  const range = text.match(/(\d+)\s*[-–]\s*(\d+)\s*%/);
  if (range) return Math.min(100, Number(range[2]));
  const single = text.match(/(\d+)\s*%/);
  if (single) return Math.min(100, Number(single[1]));
  return null;
}

/**
 * Multi-column chart: visual bars when % values exist, plus labeled notes
 * (e.g. cost). Prefer this over plain cards for "Chart:" captions.
 */
export function BlogChartCards({ rows, headers, title }: BlogChartCardsProps) {
  if (rows.length === 0) return null;

  const withPct = rows.map((row) => ({
    ...row,
    percent: extractPct(row.primary),
  }));
  const hasBars = withPct.every((row) => row.percent != null);
  const max = hasBars
    ? Math.max(...withPct.map((row) => row.percent ?? 0), 1)
    : 1;

  const h0 = headers?.[0] ?? "Item";
  const h1 = headers?.[1] ?? "Value";
  const h2 = headers?.[2];

  if (hasBars) {
    return (
      <div className="my-8 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
        {title ? (
          <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
            {title}
          </p>
        ) : null}
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
          {h1}
        </p>
        <div className="flex h-52 items-end justify-around gap-3 border-b-2 border-primary px-1 pb-0 pt-2">
          {withPct.map((row) => {
            const pct = Math.round(((row.percent ?? 0) / max) * 100);
            return (
              <div
                key={row.title}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="px-1 text-center text-[11px] font-semibold leading-snug text-text-secondary">
                  {row.primary}
                </span>
                <div
                  className="w-full max-w-[4.5rem] border-2 border-primary bg-accent"
                  style={{ height: `${Math.max(pct, 8)}%` }}
                  role="presentation"
                  aria-hidden="true"
                />
              </div>
            );
          })}
        </div>
        <ul className="m-0 mt-4 grid list-none gap-3 p-0 sm:grid-cols-3">
          {withPct.map((row) => (
            <li key={`${row.title}-meta`} className="min-w-0 text-center sm:text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                {h0}
              </p>
              <p className="mt-0.5 text-small font-semibold text-text-primary">
                {row.title}
              </p>
              {row.secondary && h2 ? (
                <>
                  <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                    {h2}
                  </p>
                  <p className="mt-0.5 text-[12px] leading-snug text-text-secondary">
                    {row.secondary}
                  </p>
                </>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <ul className="my-8 grid list-none gap-3 p-0 sm:grid-cols-3">
      {rows.map((row) => (
        <li
          key={row.title}
          className="flex flex-col border-2 border-primary bg-background p-4 shadow-[3px_3px_0_0_#131311]"
        >
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
            {h0}
          </p>
          <p className="mt-1 text-body font-semibold text-text-primary">
            {row.title}
          </p>
          <div className="mt-4 border-t border-border pt-3">
            <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
              {h1}
            </p>
            <p className="mt-1 text-small font-semibold text-primary">
              {row.primary}
            </p>
          </div>
          {row.secondary ? (
            <div className="mt-3">
              <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                {h2 ?? "Notes"}
              </p>
              <p className="mt-1 text-small text-text-secondary">
                {row.secondary}
              </p>
            </div>
          ) : null}
        </li>
      ))}
    </ul>
  );
}

/** Body: optional `HEADERS: a | b | c` then `title | primary | secondary` rows. */
export function parseChartCardsBody(body: string): {
  rows: ChartCardRow[];
  headers?: string[];
  title?: string;
} {
  const lines = body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  let headers: string[] | undefined;
  let title: string | undefined;
  const rows: ChartCardRow[] = [];

  for (const line of lines) {
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    if (/^HEADERS:\s*/i.test(line)) {
      headers = line
        .replace(/^HEADERS:\s*/i, "")
        .split("|")
        .map((part) => part.trim())
        .filter(Boolean);
      continue;
    }
    const parts = line.split("|").map((part) => part.trim());
    if (parts.length < 2 || !parts[0]) continue;
    rows.push({
      title: parts[0],
      primary: parts[1],
      secondary: parts[2],
    });
  }

  return { rows, headers, title };
}
