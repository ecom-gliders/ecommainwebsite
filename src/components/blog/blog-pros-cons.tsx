import { Check, X } from "lucide-react";

export interface ProsConsData {
  prosTitle: string;
  consTitle: string;
  pros: string[];
  cons: string[];
}

interface BlogProsConsProps {
  data: ProsConsData;
}

export function BlogProsCons({ data }: BlogProsConsProps) {
  return (
    <div className="my-8 grid gap-3 md:grid-cols-2">
      <div className="border-2 border-primary bg-accent/25 p-5 shadow-[3px_3px_0_0_#131311]">
        <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
          <Check className="h-4 w-4" aria-hidden="true" />
          {data.prosTitle}
        </p>
        <ul className="m-0 list-none space-y-2 p-0">
          {data.pros.map((item) => (
            <li key={item} className="text-small text-text-primary">
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="border-2 border-primary bg-surface p-5 shadow-[3px_3px_0_0_#131311]">
        <p className="mb-3 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
          <X className="h-4 w-4" aria-hidden="true" />
          {data.consTitle}
        </p>
        <ul className="m-0 list-none space-y-2 p-0">
          {data.cons.map((item) => (
            <li key={item} className="text-small text-text-primary">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/** Body: ## Pros / ## Cons with bullets */
export function parseProsConsBody(body: string): ProsConsData | null {
  const pros: string[] = [];
  const cons: string[] = [];
  let mode: "pros" | "cons" | null = null;
  let prosTitle = "Pros";
  let consTitle = "Cons";

  for (const raw of body.split("\n")) {
    const line = raw.trim();
    if (!line) continue;
    const h = line.match(/^##\s+(.+)$/i);
    if (h) {
      const title = h[1].trim();
      if (/con|against|risk|caution/i.test(title)) {
        mode = "cons";
        consTitle = title;
      } else {
        mode = "pros";
        prosTitle = title;
      }
      continue;
    }
    const bullet = line.match(/^[-*]\s+(.+)$/);
    if (bullet && mode === "pros") pros.push(bullet[1].trim());
    if (bullet && mode === "cons") cons.push(bullet[1].trim());
  }

  if (pros.length === 0 && cons.length === 0) return null;
  return { prosTitle, consTitle, pros, cons };
}
