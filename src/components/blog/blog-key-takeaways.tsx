import { ListChecks } from "lucide-react";

interface BlogKeyTakeawaysProps {
  items: string[];
  compact?: boolean;
}

export function BlogKeyTakeaways({
  items,
  compact = false,
}: BlogKeyTakeawaysProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="blog-key-takeaways-heading"
      className={
        compact
          ? "border border-border bg-surface p-3"
          : "border-2 border-primary bg-surface p-4 shadow-[3px_3px_0_0_#131311]"
      }
    >
      <div className="mb-2 flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center bg-accent text-primary">
          <ListChecks className="h-3.5 w-3.5" aria-hidden="true" />
        </span>
        <h2
          id="blog-key-takeaways-heading"
          className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary"
        >
          Key takeaways
        </h2>
      </div>
      <ol className="m-0 list-none space-y-2 p-0">
        {items.map((item, index) => (
          <li
            key={item}
            className="flex gap-2 text-xs leading-snug text-text-primary"
          >
            <span
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center bg-primary text-xs font-bold text-text-on-dark"
              aria-hidden="true"
            >
              {index + 1}
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
