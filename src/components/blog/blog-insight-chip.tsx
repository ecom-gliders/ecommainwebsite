import { Lightbulb } from "lucide-react";

interface BlogInsightChipProps {
  label?: string;
  text: string;
}

export function BlogInsightChip({
  label = "Expert note",
  text,
}: BlogInsightChipProps) {
  if (!text) return null;

  return (
    <aside className="my-6 flex gap-3 border-l-4 border-accent bg-surface px-4 py-3">
      <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
          {label}
        </p>
        <p className="mt-1 text-small text-text-primary">{text}</p>
      </div>
    </aside>
  );
}

export function parseInsightChipBody(body: string): {
  label?: string;
  text: string;
} {
  const title = body.match(/^TITLE:\s*(.+)\n([\s\S]*)$/);
  if (title) {
    return { label: title[1].trim(), text: title[2].trim() };
  }
  return { text: body.trim() };
}
