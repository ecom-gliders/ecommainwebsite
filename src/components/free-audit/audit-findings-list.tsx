import type { FreeAuditPageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";

interface AuditFindingsListProps {
  findings: FreeAuditPageConfig["findings"];
}

const SEVERITY_LABEL: Record<
  FreeAuditPageConfig["findings"]["items"][number]["severity"],
  string
> = {
  high: "Fix first",
  medium: "Next",
  low: "Later",
};

export function AuditFindingsList({ findings }: AuditFindingsListProps) {
  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <h2
          id="audit-findings-heading"
          className="text-[clamp(1.85rem,3.2vw,2.5rem)] font-bold leading-[1.08] tracking-[-0.025em] text-text-on-dark"
        >
          {findings.heading}
        </h2>
        <p className="mt-4 text-base font-medium text-text-on-dark/75">
          {findings.subheading}
        </p>
      </div>

      <ul className="space-y-3 lg:col-span-8">
        {findings.items.map((item) => (
          <li
            key={item.title}
            className="grid gap-3 border-2 border-text-on-dark/20 bg-primary p-4 sm:grid-cols-[6.5rem_1fr] sm:gap-5 sm:p-5"
          >
            <span
              className={cn(
                "inline-flex h-8 w-fit items-center px-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em]",
                item.severity === "high" && "bg-accent text-primary",
                item.severity === "medium" &&
                  "border border-accent/50 text-accent",
                item.severity === "low" &&
                  "border border-text-on-dark/30 text-text-on-dark/60",
              )}
            >
              {SEVERITY_LABEL[item.severity]}
            </span>
            <div className="min-w-0">
              <p className="text-base font-bold leading-snug text-text-on-dark sm:text-lg">
                {item.title}
              </p>
              <p className="mt-1.5 text-sm font-medium leading-relaxed text-text-on-dark/70">
                {item.impact}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
