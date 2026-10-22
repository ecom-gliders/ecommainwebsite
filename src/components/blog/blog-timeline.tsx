export interface TimelineItem {
  label: string;
  body: string;
}

interface BlogTimelineProps {
  items: TimelineItem[];
}

export function BlogTimeline({ items }: BlogTimelineProps) {
  if (items.length === 0) return null;

  return (
    <ol className="my-8 list-none space-y-0 border-l-2 border-border-strong p-0 pl-6">
      {items.map((item, index) => (
        <li key={`${index}-${item.label}`} className="relative pb-8 last:pb-0">
          <span
            className="absolute -left-[1.9rem] top-1 h-3 w-3 rounded-full border-2 border-primary bg-accent"
            aria-hidden="true"
          />
          <p className="text-small mb-1 font-semibold uppercase tracking-wide text-text-secondary">
            {item.label}
          </p>
          <p className="text-body text-text-primary">{item.body}</p>
        </li>
      ))}
    </ol>
  );
}

export function parseTimelineBody(body: string): TimelineItem[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const sep = line.indexOf("|");
      if (sep < 0) {
        return { label: line, body: "" };
      }
      return {
        label: line.slice(0, sep).trim(),
        body: line.slice(sep + 1).trim(),
      };
    })
    .filter((item) => item.label && item.body);
}
