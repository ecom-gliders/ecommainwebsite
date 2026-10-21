"use client";

import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface A11yFeatureTileProps {
  label: string;
  icon: LucideIcon;
  active: boolean;
  detail?: string;
  onClick: () => void;
}

export function A11yFeatureTile({
  label,
  icon: Icon,
  active,
  detail,
  onClick,
}: A11yFeatureTileProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        "flex min-h-[5.5rem] flex-col items-center justify-center gap-1.5 rounded-[10px] border-2 px-2 py-3 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent",
        active
          ? "border-primary bg-accent text-primary shadow-[2px_2px_0_0_#131311]"
          : "border-primary/25 bg-background text-primary hover:border-primary hover:bg-surface-muted",
      )}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span className="text-[11px] font-bold leading-tight">{label}</span>
      {detail ? (
        <span className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
          {detail}
        </span>
      ) : null}
    </button>
  );
}
