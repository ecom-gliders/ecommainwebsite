export interface PieSlice {
  label: string;
  value: number;
  display?: string;
}

interface BlogPieChartProps {
  title?: string;
  items: PieSlice[];
  /** pie = full wedges; donut = hollow center (radial) */
  variant?: "pie" | "donut";
}

const PALETTE = [
  "#C6FD50", // accent
  "#131311", // primary
  "#9CA3AF",
  "#6B7280",
  "#4B5563",
  "#E5E7EB",
  "#84CC16",
  "#374151",
];

function polar(cx: number, cy: number, r: number, angleDeg: number) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(rad), y: cy + r * Math.sin(rad) };
}

function arcPath(
  cx: number,
  cy: number,
  r: number,
  startAngle: number,
  endAngle: number,
) {
  const start = polar(cx, cy, r, endAngle);
  const end = polar(cx, cy, r, startAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${start.x} ${start.y} A ${r} ${r} 0 ${large} 0 ${end.x} ${end.y} L ${cx} ${cy} Z`;
}

function donutArc(
  cx: number,
  cy: number,
  outer: number,
  inner: number,
  startAngle: number,
  endAngle: number,
) {
  const sOuter = polar(cx, cy, outer, endAngle);
  const eOuter = polar(cx, cy, outer, startAngle);
  const sInner = polar(cx, cy, inner, startAngle);
  const eInner = polar(cx, cy, inner, endAngle);
  const large = endAngle - startAngle > 180 ? 1 : 0;
  return [
    `M ${sOuter.x} ${sOuter.y}`,
    `A ${outer} ${outer} 0 ${large} 0 ${eOuter.x} ${eOuter.y}`,
    `L ${sInner.x} ${sInner.y}`,
    `A ${inner} ${inner} 0 ${large} 1 ${eInner.x} ${eInner.y}`,
    "Z",
  ].join(" ");
}

export function BlogPieChart({
  title,
  items,
  variant = "pie",
}: BlogPieChartProps) {
  if (items.length === 0) return null;

  const total = items.reduce((sum, item) => sum + item.value, 0) || 1;
  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const outer = 88;
  const inner = variant === "donut" ? 48 : 0;

  let angle = 0;
  const slices = items.map((item, index) => {
    const sweep = (item.value / total) * 360;
    const start = angle;
    const end = angle + sweep;
    angle = end;
    const path =
      variant === "donut"
        ? donutArc(cx, cy, outer, inner, start, end)
        : arcPath(cx, cy, outer, start, end);
    return {
      ...item,
      path,
      color: PALETTE[index % PALETTE.length],
      pct: Math.round((item.value / total) * 100),
    };
  });

  return (
    <div className="my-8 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
      {title ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
          {title}
        </p>
      ) : null}
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          className="h-48 w-48 shrink-0"
          role="img"
          aria-label={title ?? "Pie chart"}
        >
          {slices.map((slice) => (
            <path
              key={slice.label}
              d={slice.path}
              fill={slice.color}
              stroke="#131311"
              strokeWidth={2}
            />
          ))}
          {variant === "donut" ? (
            <circle cx={cx} cy={cy} r={inner - 1} fill="#FAFAFA" />
          ) : null}
        </svg>
        <ul className="m-0 w-full list-none space-y-2 p-0">
          {slices.map((slice) => (
            <li
              key={slice.label}
              className="flex items-center justify-between gap-3 text-small"
            >
              <span className="flex min-w-0 items-center gap-2">
                <span
                  className="h-3 w-3 shrink-0 border border-primary"
                  style={{ backgroundColor: slice.color }}
                  aria-hidden="true"
                />
                <span className="truncate font-medium text-text-primary">
                  {slice.label}
                </span>
              </span>
              <span className="shrink-0 text-text-secondary">
                {slice.display ?? `${slice.pct}%`}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Body: TITLE / VARIANT then `label | value | optional display` */
export function parsePieChartBody(body: string): {
  title?: string;
  variant: "pie" | "donut";
  items: PieSlice[];
} {
  let title: string | undefined;
  let variant: "pie" | "donut" = "pie";
  const items: PieSlice[] = [];

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    if (/^VARIANT:\s*/i.test(line)) {
      const v = line.replace(/^VARIANT:\s*/i, "").trim().toLowerCase();
      variant = v === "donut" || v === "radial" ? "donut" : "pie";
      continue;
    }
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 2) continue;
    const value = Number.parseFloat(parts[1].replace(/%/g, ""));
    if (Number.isNaN(value)) continue;
    items.push({ label: parts[0], value, display: parts[2] });
  }

  return { title, variant, items };
}
