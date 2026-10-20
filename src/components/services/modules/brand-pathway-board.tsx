import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BrandPathwayStage {
  label: string;
  detail: string;
  state: "done" | "current" | "upcoming";
}

export interface BrandPathwayBoardProps {
  urlLabel: string;
  disclaimer: string;
  stages: BrandPathwayStage[];
  /** mac = browser chrome grid; rail = linear timeline; stamp = numbered hard stamps. */
  variant?: "mac" | "rail" | "stamp";
}

export function BrandPathwayBoard({
  urlLabel,
  disclaimer,
  stages,
  variant = "mac",
}: BrandPathwayBoardProps) {
  if (variant === "rail") {
    return (
      <div className="space-y-3">
        <p className="font-mono text-[11px] text-text-secondary">{urlLabel}</p>
        <ol className="relative space-y-0 border-l-4 border-accent pl-6 sm:pl-8">
          {stages.map((stage) => (
            <li key={stage.label} className="relative pb-8 last:pb-0">
              <span
                className={cn(
                  "absolute -left-[1.4rem] top-1 h-3.5 w-3.5 rounded-full border-2 border-primary sm:-left-[1.65rem]",
                  stage.state === "current" && "bg-accent",
                  stage.state === "done" && "bg-primary",
                  stage.state === "upcoming" && "bg-background",
                )}
                aria-hidden="true"
              />
              <p
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.12em]",
                  stage.state === "upcoming"
                    ? "text-text-secondary"
                    : "text-primary",
                )}
              >
                {stage.state === "done"
                  ? "Complete"
                  : stage.state === "current"
                    ? "Current"
                    : "Next"}
              </p>
              <h3 className="mt-1 text-h4 text-primary">{stage.label}</h3>
              <p className="mt-1.5 text-small text-text-secondary">
                {stage.detail}
              </p>
            </li>
          ))}
        </ol>
        <p className="text-xs text-text-secondary">{disclaimer}</p>
      </div>
    );
  }

  if (variant === "stamp") {
    return (
      <div className="space-y-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
          {urlLabel}
        </p>
        <ol className="flex gap-0 overflow-x-auto border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]">
          {stages.map((stage, index) => (
            <li
              key={stage.label}
              className={cn(
                "min-w-[200px] flex-1 border-primary/20 p-4 sm:min-w-0 sm:p-5",
                index > 0 && "border-l-2",
                stage.state === "current" && "bg-accent/30",
                stage.state === "upcoming" && "bg-surface-muted/50",
              )}
            >
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-lg font-black text-primary/30">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-[0.12em]",
                    stage.state === "upcoming"
                      ? "text-text-secondary"
                      : "text-primary",
                  )}
                >
                  {stage.state === "done"
                    ? "Complete"
                    : stage.state === "current"
                      ? "Current"
                      : "Next"}
                </p>
              </div>
              <h3 className="mt-2 text-body font-semibold text-primary">
                {stage.label}
              </h3>
              <p className="mt-1.5 text-small text-text-secondary">
                {stage.detail}
              </p>
            </li>
          ))}
        </ol>
        <p className="text-xs text-text-secondary">{disclaimer}</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div
        className={cn(
          "overflow-hidden rounded-[12px] border border-white/15 bg-[#ececef]",
          "shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] ring-1 ring-black/20",
        )}
      >
        <div className="flex h-10 items-center gap-3 bg-[#e4e4e7] px-3.5">
          <div className="flex shrink-0 items-center gap-1.5" aria-hidden="true">
            <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
            <span className="h-3 w-3 rounded-full bg-[#FFBD2E]" />
            <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded-md border border-black/8 bg-white px-2.5 py-1 shadow-sm">
            <Lock
              className="h-3 w-3 shrink-0 text-neutral-400"
              aria-hidden="true"
            />
            <span className="truncate text-[11px] font-medium text-neutral-500">
              {urlLabel}
            </span>
          </div>
        </div>

        <ol className="grid gap-0 bg-background sm:grid-cols-2 lg:grid-cols-4">
          {stages.map((stage, index) => (
            <li
              key={stage.label}
              className={cn(
                "relative border-b border-primary/10 p-5 sm:p-6",
                index % 2 === 0 && "sm:border-r",
                index < stages.length - 2 && "lg:border-b",
                index === stages.length - 1 && "border-b-0",
                stage.state === "current" && "bg-accent/25",
              )}
            >
              <p
                className={cn(
                  "text-[11px] font-bold uppercase tracking-[0.12em]",
                  stage.state === "done" && "text-primary",
                  stage.state === "current" && "text-primary",
                  stage.state === "upcoming" && "text-text-secondary",
                )}
              >
                {stage.state === "done"
                  ? "Complete"
                  : stage.state === "current"
                    ? "Current"
                    : "Next"}
              </p>
              <h3 className="mt-2 text-h4 text-primary">{stage.label}</h3>
              <p className="mt-2 text-small text-text-secondary">{stage.detail}</p>
            </li>
          ))}
        </ol>
      </div>
      <p className="text-xs text-text-secondary">{disclaimer}</p>
    </div>
  );
}
