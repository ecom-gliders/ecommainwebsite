import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface LncReadinessBoardProps {
  service: ServicePageConfig;
}

const ROW_PHASE = ["T-14", "T-3", "T-0", "T+14"] as const;

/** Launch readiness sheet from catalogHealthBoard — dark pad console, not AOS white table. */
export function LncReadinessBoard({ service }: LncReadinessBoardProps) {
  const board = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id="service-readiness-board"
      className={cn("bg-primary text-text-on-dark", serviceSectionPad)}
      aria-labelledby="service-readiness-board-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="service-readiness-board-heading"
              className="max-w-3xl text-2xl font-black tracking-tight text-text-on-dark sm:text-[1.75rem]"
            >
              {board.heading}
            </h2>
            {board.subheading ? (
              <p className="mt-2 max-w-2xl text-sm font-medium text-text-on-dark/75">
                {board.subheading}
              </p>
            ) : null}
          </div>
          {board.boardLabel ? (
            <p className="border-2 border-accent bg-[#0c0c0b] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
              {board.boardLabel}
            </p>
          ) : null}
        </div>

        <div className="mt-6 overflow-x-auto border-2 border-accent/50 bg-[#0c0c0b] shadow-[4px_4px_0_0_#C6F135]">
          <table className="w-full min-w-[44rem] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-accent/40 bg-[#141412]">
                <th className="px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent sm:px-4">
                  Phase
                </th>
                {board.columns.map((col) => (
                  <th
                    key={col}
                    className="px-3 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-text-on-dark/80 sm:px-4"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {board.rows.map((row, rowIndex) => (
                <tr
                  key={row.cells.join("-")}
                  className={cn(
                    "border-b border-text-on-dark/12 last:border-b-0",
                    rowIndex % 2 === 1 && "bg-[#141412]/60",
                  )}
                >
                  <td className="px-3 py-2.5 font-mono text-[10px] font-black tabular-nums text-accent sm:px-4">
                    {ROW_PHASE[rowIndex] ?? "T+?"}
                  </td>
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className={cn(
                        "px-3 py-2.5 font-medium sm:px-4",
                        cellIndex === 0
                          ? "font-black text-text-on-dark"
                          : "text-text-on-dark/70",
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
          <p className="mt-3 text-xs font-medium text-text-on-dark/60">{board.disclaimer}</p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
