import { cn } from "@/lib/utils";

export interface BrandUnlockItem {
  title: string;
  description: string;
  unlocked: boolean;
  /** Overrides Brand Registry default labels for other services (e.g. DSP). */
  statusLabel?: string;
}

export interface BrandUnlockGridProps {
  items: BrandUnlockItem[];
  note?: string;
  sheetLabel?: string;
}

/**
 * Tool access sheet — row permissions, not a four-card marketing grid.
 */
export function BrandUnlockGrid({
  items,
  note,
  sheetLabel = "brandregistry · tool access",
}: BrandUnlockGridProps) {
  return (
    <div className="space-y-3">
      <div className="overflow-hidden rounded-[12px] border border-primary/20 bg-background">
        <div className="flex items-center justify-between border-b border-primary/15 bg-surface-muted/80 px-4 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary sm:px-5">
          <span>{sheetLabel}</span>
          <span>
            {items.filter((item) => item.unlocked).length}/{items.length} open
          </span>
        </div>
        <ul className="divide-y divide-primary/10">
          {items.map((item) => {
            const status =
              item.statusLabel ??
              (item.unlocked
                ? "Unlocked after enrollment"
                : "Requires Brand Registry");
            return (
              <li
                key={item.title}
                className="grid gap-2 px-4 py-3.5 sm:grid-cols-[9rem_1fr] sm:items-start sm:gap-5 sm:px-5"
              >
                <p
                  className={cn(
                    "font-mono text-[10px] font-bold uppercase tracking-[0.1em]",
                    item.unlocked ? "text-primary" : "text-text-secondary",
                  )}
                >
                  {item.unlocked ? "OPEN" : "LOCKED"}
                </p>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                    <h3 className="text-body font-semibold text-primary">
                      {item.title}
                    </h3>
                    <span className="text-[11px] text-text-secondary">
                      {status}
                    </span>
                  </div>
                  <p className="mt-1 text-small text-text-secondary">
                    {item.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      {note ? <p className="text-xs text-text-secondary">{note}</p> : null}
    </div>
  );
}
