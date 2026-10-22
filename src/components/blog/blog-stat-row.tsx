export interface StatRowItem {
  value: string;
  label: string;
}

interface BlogStatRowProps {
  items: StatRowItem[];
}

/** Big-number strip for verified figures already present in copy. */
export function BlogStatRow({ items }: BlogStatRowProps) {
  if (items.length === 0) return null;

  return (
    <ul className="my-8 grid list-none gap-3 border-2 border-primary bg-primary p-4 text-text-on-dark shadow-[3px_3px_0_0_#131311] sm:grid-cols-3">
      {items.map((item) => (
        <li key={`${item.value}-${item.label}`} className="text-center sm:text-left">
          <p className="text-2xl font-black tracking-tight text-accent sm:text-3xl">
            {item.value}
          </p>
          <p className="mt-1 text-small text-text-on-dark/80">{item.label}</p>
        </li>
      ))}
    </ul>
  );
}

/** Body: `value | label` lines */
export function parseStatRowBody(body: string): StatRowItem[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const sep = line.indexOf("|");
      if (sep < 0) return null;
      const value = line.slice(0, sep).trim();
      const label = line.slice(sep + 1).trim();
      if (!value || !label) return null;
      return { value, label };
    })
    .filter((item): item is StatRowItem => item !== null);
}
