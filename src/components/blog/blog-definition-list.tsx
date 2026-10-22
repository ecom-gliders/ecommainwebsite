export interface DefinitionItem {
  term: string;
  definition: string;
}

interface BlogDefinitionListProps {
  items: DefinitionItem[];
}

export function BlogDefinitionList({ items }: BlogDefinitionListProps) {
  if (items.length === 0) return null;

  return (
    <dl className="my-8 border-2 border-primary bg-surface shadow-[3px_3px_0_0_#131311]">
      {items.map((item) => (
        <div
          key={item.term}
          className="border-b border-border px-5 py-4 last:border-b-0"
        >
          <dt className="text-small font-bold uppercase tracking-[0.08em] text-primary">
            {item.term}
          </dt>
          <dd className="mt-1 text-body font-medium text-text-secondary">{item.definition}</dd>
        </div>
      ))}
    </dl>
  );
}

/** Body: `term | definition` lines */
export function parseDefinitionListBody(body: string): DefinitionItem[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const sep = line.indexOf("|");
      if (sep < 0) return null;
      const term = line.slice(0, sep).trim();
      const definition = line.slice(sep + 1).trim();
      if (!term || !definition) return null;
      return { term, definition };
    })
    .filter((item): item is DefinitionItem => item !== null);
}
