export interface LinePoint {
  label: string;
  value: number;
}

interface BlogLineChartProps {
  title?: string;
  points: LinePoint[];
  /** line | area */
  variant?: "line" | "area";
}

export function BlogLineChart({
  title,
  points,
  variant = "line",
}: BlogLineChartProps) {
  if (points.length < 2) return null;

  const width = 360;
  const height = 160;
  const padX = 28;
  const padY = 16;
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;

  const coords = points.map((point, index) => {
    const x =
      padX + (index / (points.length - 1)) * (width - padX * 2);
    const y =
      padY + (1 - (point.value - min) / span) * (height - padY * 2);
    return { ...point, x, y };
  });

  const lineD = coords
    .map((c, i) => `${i === 0 ? "M" : "L"} ${c.x} ${c.y}`)
    .join(" ");
  const areaD = `${lineD} L ${coords[coords.length - 1].x} ${height - padY} L ${coords[0].x} ${height - padY} Z`;

  return (
    <div className="my-8 border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]">
      {title ? (
        <p className="mb-4 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
          {title}
        </p>
      ) : null}
      <svg
        viewBox={`0 0 ${width} ${height + 24}`}
        className="h-48 w-full"
        role="img"
        aria-label={title ?? "Line chart"}
      >
        <line
          x1={padX}
          y1={height - padY}
          x2={width - padX}
          y2={height - padY}
          stroke="#131311"
          strokeWidth={2}
        />
        {variant === "area" ? (
          <path d={areaD} fill="#C6FD50" fillOpacity={0.45} stroke="none" />
        ) : null}
        <path
          d={lineD}
          fill="none"
          stroke="#131311"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {coords.map((c) => (
          <circle
            key={c.label}
            cx={c.x}
            cy={c.y}
            r={4}
            fill="#C6FD50"
            stroke="#131311"
            strokeWidth={2}
          />
        ))}
        {coords.map((c) => (
          <text
            key={`${c.label}-label`}
            x={c.x}
            y={height + 14}
            textAnchor="middle"
            fontSize={9}
            fontWeight={600}
            className="fill-text-primary"
          >
            {c.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

export function parseLineChartBody(body: string): {
  title?: string;
  variant: "line" | "area";
  points: LinePoint[];
} {
  let title: string | undefined;
  let variant: "line" | "area" = "line";
  const points: LinePoint[] = [];

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    if (/^VARIANT:\s*/i.test(line)) {
      const v = line.replace(/^VARIANT:\s*/i, "").trim().toLowerCase();
      variant = v === "area" ? "area" : "line";
      continue;
    }
    const parts = line.split("|").map((p) => p.trim());
    if (parts.length < 2) continue;
    const value = Number.parseFloat(parts[1]);
    if (Number.isNaN(value)) continue;
    points.push({ label: parts[0], value });
  }

  return { title, variant, points };
}
