import { SquareCheck } from "lucide-react";

interface BlogChecklistProps {
  title?: string;
  items: string[];
}

export function BlogChecklist({ title, items }: BlogChecklistProps) {
  if (items.length === 0) return null;

  return (
    <div className="my-8 border-2 border-primary bg-background p-5 shadow-[3px_3px_0_0_#131311]">
      {title ? (
        <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
          {title}
        </p>
      ) : null}
      <ul className="m-0 list-none space-y-2.5 p-0">
        {items.map((item) => (
          <li key={item} className="flex gap-2.5 text-small text-text-primary">
            <SquareCheck
              className="mt-0.5 h-4 w-4 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Body: optional TITLE: then `- item` lines */
export function parseChecklistBody(body: string): {
  title?: string;
  items: string[];
} {
  const lines = body.split("\n").map((l) => l.trim()).filter(Boolean);
  let title: string | undefined;
  const items: string[] = [];
  for (const line of lines) {
    if (/^TITLE:\s*/i.test(line)) {
      title = line.replace(/^TITLE:\s*/i, "").trim();
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    items.push(bullet ? bullet[1].trim() : line);
  }
  return { title, items };
}
