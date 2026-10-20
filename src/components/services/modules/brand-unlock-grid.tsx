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
 * Open 2-col scope/access list — hairlines, not nested hard boxes.
 */
export function BrandUnlockGrid({
  items,
  note,
  sheetLabel = "Brand Registry · tool access",
}: BrandUnlockGridProps) {
  const openCount = items.filter((item) => item.unlocked).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-primary pb-3">
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
          {sheetLabel}
        </p>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
          {openCount}/{items.length} available
        </p>
      </div>
      <ul className="grid gap-0 sm:grid-cols-2 sm:gap-x-10">
        {items.map((item, index) => {
          const status =
            item.statusLabel ??
            (item.unlocked ? "After enrollment" : "Needs Brand Registry");
          const odd = index % 2 === 1;
          return (
            <li
              key={item.title}
              className={cn(
                "border-b border-primary/15 py-5",
                odd && "sm:border-l sm:border-primary/15 sm:pl-10",
              )}
            >
              <p
                className={cn(
                  "font-mono text-[11px] font-bold uppercase tracking-[0.12em]",
                  item.unlocked ? "text-primary" : "text-text-secondary",
                )}
              >
                {item.unlocked ? "Open" : "Locked"}
                <span className="ml-2 font-medium normal-case tracking-normal text-text-secondary">
                  · {status}
                </span>
              </p>
              <h3 className="mt-2 text-[1.125rem] font-bold leading-snug text-primary sm:text-[1.1875rem]">
                {item.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-base">
                {item.description}
              </p>
            </li>
          );
        })}
      </ul>
      {note ? <p className="text-sm text-text-secondary">{note}</p> : null}
    </div>
  );
}
