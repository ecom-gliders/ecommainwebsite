import { Check } from "lucide-react";
import type { FreeAuditPageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface AuditScopeSegmentsProps {
  scope: FreeAuditPageConfig["scope"];
}

export function AuditScopeSegments({ scope }: AuditScopeSegmentsProps) {
  return (
    <div>
      <div className="max-w-xl">
        <h2
          id="audit-scope-heading"
          className="text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-text-primary"
        >
          {scope.heading}
        </h2>
        <p className="mt-3 text-base font-medium text-text-secondary">
          {scope.subheading}
        </p>
      </div>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2">
        {scope.pillars.map((pillar, index) => {
          const ink = index === 0 || index === 3;
          return (
            <li
              key={pillar.id}
              className={cn(
                "border-2 border-primary p-5 sm:p-6",
                ink
                  ? "bg-primary text-text-on-dark"
                  : "bg-background text-text-primary",
              )}
            >
              <p
                className={cn(
                  "font-mono text-xs font-bold uppercase tracking-[0.12em]",
                  ink ? "text-accent" : "text-text-secondary",
                )}
              >
                {String(index + 1).padStart(2, "0")} · {pillar.label}
              </p>
              <p
                className={cn(
                  "mt-4 text-lg font-bold leading-snug tracking-tight",
                  ink ? "text-text-on-dark" : "text-text-primary",
                )}
              >
                {pillar.summary}
              </p>
              <ul className="mt-5 space-y-2.5">
                {pillar.checks.map((check) => (
                  <li key={check} className="flex gap-2.5">
                    <Check
                      className={cn(
                        "mt-0.5 h-4 w-4 shrink-0",
                        ink ? "text-accent" : "text-primary",
                      )}
                      aria-hidden="true"
                      strokeWidth={2.5}
                    />
                    <span
                      className={cn(
                        "text-sm font-medium leading-relaxed",
                        ink ? "text-text-on-dark/80" : "text-text-secondary",
                      )}
                    >
                      {check}
                    </span>
                  </li>
                ))}
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
