import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function ToolPanel({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]",
        className,
      )}
    >
      <div className="border-b-2 border-primary bg-surface-muted px-4 py-3 sm:px-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
          {title}
        </p>
        {description ? (
          <p className="mt-1 text-sm font-medium text-text-primary">
            {description}
          </p>
        ) : null}
      </div>
      <div className="p-4 sm:p-5">{children}</div>
    </div>
  );
}

export function ToolResultsPanel({
  children,
  emptyLabel = "Results appear here after you run the tool.",
  hasResults,
}: {
  children: ReactNode;
  emptyLabel?: string;
  hasResults: boolean;
}) {
  return (
    <div
      className="border-2 border-primary bg-accent p-4 text-primary sm:p-5"
      aria-live="polite"
    >
      <p className="text-xs font-bold uppercase tracking-[0.12em]">Results</p>
      {!hasResults ? (
        <p className="mt-4 text-sm font-medium text-primary/75">{emptyLabel}</p>
      ) : (
        children
      )}
    </div>
  );
}

export function ToolAlert({ children }: { children: ReactNode }) {
  return (
    <p
      className="border-2 border-primary bg-accent px-3 py-2 text-sm font-bold text-primary"
      role="alert"
    >
      {children}
    </p>
  );
}
