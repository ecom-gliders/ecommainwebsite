export interface StepItem {
  title: string;
  description: string;
}

interface BlogStepsProps {
  steps: StepItem[];
}

export function BlogSteps({ steps }: BlogStepsProps) {
  if (steps.length === 0) return null;

  return (
    <ol className="my-8 list-none space-y-4 p-0">
      {steps.map((step, index) => (
        <li
          key={`${index}-${step.title}`}
          className="flex gap-4 border-2 border-primary bg-background p-4 shadow-[3px_3px_0_0_#131311]"
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-accent text-small font-bold text-primary"
            aria-hidden="true"
          >
            {index + 1}
          </span>
          <div className="min-w-0">
            <p className="text-h4 mb-1 text-text-primary">{step.title}</p>
            {step.description ? (
              <p className="text-body font-medium text-text-secondary">{step.description}</p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

export function parseStepsBody(body: string): StepItem[] {
  return body
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const numbered = line.match(/^\d+[.)]\s*(.+)$/);
      const raw = numbered ? numbered[1] : line;
      const sep = raw.indexOf("|");
      if (sep < 0) {
        return { title: raw.trim(), description: "" };
      }
      return {
        title: raw.slice(0, sep).trim(),
        description: raw.slice(sep + 1).trim(),
      };
    })
    .filter((step) => step.title);
}
