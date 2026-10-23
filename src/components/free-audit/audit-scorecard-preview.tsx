import type { FreeAuditPageConfig } from "@/domain/content/schemas";

interface AuditScorecardPreviewProps {
  scorecard: FreeAuditPageConfig["scorecard"];
  caption: string;
}

export function AuditScorecardPreview({
  scorecard,
  caption,
}: AuditScorecardPreviewProps) {
  return (
    <aside aria-label="Sample audit scores">
      <div className="flex items-end justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-primary">
          {scorecard.title}
        </p>
        <span className="font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary/50">
          Sample
        </span>
      </div>
      <ul className="mt-4 grid grid-cols-2 gap-3">
        {scorecard.pillars.map((pillar, index) => {
          const punch = index % 2 === 0;
          return (
            <li
              key={pillar.label}
              className={
                punch
                  ? "border-2 border-primary bg-primary p-4 text-text-on-dark sm:p-5"
                  : "border-2 border-primary bg-background p-4 text-primary sm:p-5"
              }
            >
              <p
                className={
                  punch
                    ? "text-[11px] font-bold uppercase tracking-[0.1em] text-accent"
                    : "text-[11px] font-bold uppercase tracking-[0.1em] text-text-secondary"
                }
              >
                {pillar.label}
              </p>
              <p className="mt-3 font-mono text-[clamp(2.5rem,6vw,3.25rem)] font-bold leading-none tracking-tight">
                {pillar.scoreLabel}
              </p>
              <div
                className={
                  punch
                    ? "mt-4 h-1.5 w-full bg-text-on-dark/15"
                    : "mt-4 h-1.5 w-full bg-primary/10"
                }
                role="presentation"
              >
                <div
                  className={punch ? "h-full bg-accent" : "h-full bg-primary"}
                  style={{ width: `${pillar.scorePercent}%` }}
                />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 text-xs font-medium text-primary/70">{caption}</p>
    </aside>
  );
}
