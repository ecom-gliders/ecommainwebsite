import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EmlDayLoopSheetProps {
  service: ServicePageConfig;
}

/** Day 0–45 cadence table from catalogHealthBoard JSON — loop timing, not generic ops sheet. */
export function EmlDayLoopSheet({ service }: EmlDayLoopSheetProps) {
  const board = service.modules?.find((m) => m.type === "catalogHealthBoard");
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id={board.id}
      className={cn("bg-[#E6E2EC]", serviceSectionPad)}
      aria-labelledby={`${board.id}-heading`}
    >
      <ServicePageShell>
        <h2
          id={`${board.id}-heading`}
          className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
        >
          {board.heading}
        </h2>
        {board.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
            {board.subheading}
          </p>
        ) : null}

        <div className="mt-8 border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-primary bg-primary px-3 py-2">
            <span className="font-mono text-xs font-bold text-accent">
              {board.urlLabel}
            </span>
            {board.boardLabel ? (
              <span className="font-mono text-xs font-bold text-text-on-dark/60">
                {board.boardLabel}
              </span>
            ) : null}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-primary bg-[#F3F0F8]">
                  {board.columns.map((col) => (
                    <th
                      key={col}
                      scope="col"
                      className="px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.06em] text-primary"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {board.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={cn(
                      "border-b border-primary/15",
                      rowIndex % 2 === 0 ? "bg-background" : "bg-[#FAFAF8]",
                    )}
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className={cn(
                          "px-3 py-2.5 text-xs font-medium leading-snug sm:text-sm",
                          cellIndex === 0 ? "font-black text-primary" : "text-text-secondary",
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {board.disclaimer ? (
            <p className="border-t-2 border-primary bg-[#F3F0F8] px-3 py-2 text-xs font-medium text-text-secondary">
              {board.disclaimer}
            </p>
          ) : null}
        </div>
      </ServicePageShell>
    </section>
  );
}
