import { cn } from "@/lib/utils";
import type { BrowserTab } from "./browser-mockup.types";

interface BrowserMockupContentProps {
  current: BrowserTab;
  compact?: boolean;
}

export function BrowserMockupContent({
  current,
  compact = false,
}: BrowserMockupContentProps) {
  const textSize = compact ? "text-[11px]" : "text-small";
  const statSize = compact ? "text-base" : "text-lg";
  const tableRows = current.table.slice(0, compact ? 3 : 3);

  return (
    <div>
      <div className="grid grid-cols-3 gap-2">
        {current.stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-[8px] border-2 border-primary/20 bg-background px-2.5 py-2 shadow-[2px_2px_0_0_#131311] sm:px-3 sm:py-2.5"
          >
            <p className={cn(statSize, "font-bold text-text-primary")}>
              {stat.value}
            </p>
            <p
              className={cn(
                "mt-0.5 text-text-secondary",
                compact ? "text-[10px]" : "text-xs",
              )}
            >
              {stat.label}
            </p>
            <div className="mt-2 h-1 overflow-hidden rounded-full bg-primary/10">
              <div
                className="h-full rounded-full bg-accent"
                style={{ width: `${stat.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 overflow-hidden rounded-[8px] border-2 border-primary/20 bg-background shadow-[2px_2px_0_0_#131311]">
        <table className={cn("w-full text-left", textSize)}>
          <thead>
            <tr className="border-b-2 border-primary/15 bg-surface">
              <th
                className="px-2.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary sm:px-3"
                scope="col"
              >
                Item
              </th>
              <th
                className="px-2.5 py-2.5 text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary sm:px-3"
                scope="col"
              >
                Value
              </th>
              <th
                className="px-2.5 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.1em] text-text-secondary sm:px-3"
                scope="col"
              >
                Change
              </th>
            </tr>
          </thead>
          <tbody>
            {tableRows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-primary/10 last:border-0"
              >
                <td className="px-2.5 py-2.5 font-medium text-text-primary sm:px-3">
                  {row.label}
                </td>
                <td className="px-2.5 py-2.5 font-bold text-text-primary sm:px-3">
                  {row.value}
                </td>
                <td
                  className={cn(
                    "px-2.5 py-2.5 text-right font-bold sm:px-3",
                    row.positive ? "text-primary" : "text-text-secondary",
                  )}
                >
                  {row.positive ? (
                    <span className="inline-flex rounded-full bg-accent/80 px-2 py-0.5 text-[10px] font-bold tracking-tight text-primary">
                      {row.change}
                    </span>
                  ) : (
                    row.change
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
