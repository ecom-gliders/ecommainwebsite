export interface CompareColumn {
  title: string;
  items: string[];
}

interface BlogCompareColumnsProps {
  columns: CompareColumn[];
}

/** Side-by-side compare layout (A9 vs A10, Before/After, Pros/Cons). */
export function BlogCompareColumns({ columns }: BlogCompareColumnsProps) {
  if (columns.length === 0) return null;

  return (
    <div
      className={`my-8 grid gap-3 ${
        columns.length >= 3 ? "md:grid-cols-3" : "md:grid-cols-2"
      }`}
    >
      {columns.map((column, index) => (
        <div
          key={column.title}
          className={
            index === 0
              ? "border-2 border-primary bg-background p-5 shadow-[3px_3px_0_0_#131311]"
              : "border-2 border-primary bg-accent/30 p-5 shadow-[3px_3px_0_0_#131311]"
          }
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {column.title}
          </p>
          <ul className="m-0 list-none space-y-2 p-0">
            {column.items.map((item) => (
              <li
                key={item}
                className="border-l-2 border-primary pl-3 text-small text-text-primary"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/**
 * Body:
 * ## Column title
 * - item
 * - item
 */
export function parseCompareColumnsBody(body: string): CompareColumn[] {
  const columns: CompareColumn[] = [];
  let current: CompareColumn | null = null;

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const heading = line.match(/^##\s+(.+)$/);
    if (heading) {
      current = { title: heading[1].trim(), items: [] };
      columns.push(current);
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet && current) {
      current.items.push(bullet[1].trim());
    }
  }

  return columns.filter((column) => column.title && column.items.length > 0);
}
