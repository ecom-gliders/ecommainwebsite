export interface RadialGaugeItem {
  label: string;
  percent: number;
  display?: string;
}

interface BlogRadialGaugeProps {
  title?: string;
  items: RadialGaugeItem[];
}

/** Circular / radial progress gauges (one or a row). */
export function BlogRadialGauge({ title, items }: BlogRadialGaugeProps) {
  if (items.length === 0) return null;

  const size = 112;
  const stroke = 10;
  const r = (size - stroke) / 2 - 1;
  const c = 2 * Math.PI * r;

  return (
    <div className="my-8 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
      {title ? (
        <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
          {title}
        </p>
      ) : null}
      <ul className="m-0 flex list-none flex-wrap justify-center gap-6 p-0 sm:justify-start">
        {items.map((item) => {
          const pct = Math.max(0, Math.min(100, item.percent));
          const offset = c - (pct / 100) * c;
          return (
            <li key={item.label} className="flex w-28 flex-col items-center">
              <svg
                width={size}
                height={size}
                viewBox={`0 0 ${size} ${size}`}
                role="img"
                aria-label={`${item.label} ${item.display ?? `${pct}%`}`}
              >
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke="#E5E7EB"
                  strokeWidth={stroke}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r}
                  fill="none"
                  stroke="#C6FD50"
                  strokeWidth={stroke}
                  strokeDasharray={c}
                  strokeDashoffset={offset}
                  transform={`rotate(-90 ${size / 2} ${size / 2})`}
                />
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={r + stroke / 2}
                  fill="none"
                  stroke="#131311"
                  strokeWidth={2}
                />
                <text
                  x="50%"
                  y="50%"
                  dominantBaseline="central"
                  textAnchor="middle"
                  fontSize={16}
                  fontWeight={800}
                  fill="#131311"
                >
                  {item.display ?? `${pct}%`}
                </text>
              </svg>
              <p className="mt-2 text-center text-[11px] font-semibold leading-snug text-text-primary">
                {item.label}
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function parseRadialGaugeBody(body: string): {
  title?: string;
  items: RadialGaugeItem[];
} {
  let title: string | undefined;
  const items: RadialGaugeItem[] = [];

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 2) continue;
    const percent = Number.parseFloat(parts[1].replace(/%/g, ""));
    if (Number.isNaN(percent)) continue;
    items.push({
      label: parts[0],
      percent,
      display: parts[2] ?? `${Math.round(percent)}%`,
    });
  }

  return { title, items };
}
