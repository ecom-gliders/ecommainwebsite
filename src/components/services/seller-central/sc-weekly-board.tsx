import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface ScWeeklyBoardProps {
  service: ServicePageConfig;
}

export function ScWeeklyBoard({ service }: ScWeeklyBoardProps) {
  const board = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id="service-ops-board"
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby="service-ops-board-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="service-ops-board-heading"
              className="max-w-3xl text-2xl font-black tracking-tight text-primary sm:text-[1.75rem]"
            >
              {board.heading}
            </h2>
            {board.subheading ? (
              <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary">
                {board.subheading}
              </p>
            ) : null}
          </div>
          {board.boardLabel ? (
            <p className="border-2 border-primary bg-[#E8E8E4] px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary">
              {board.boardLabel}
            </p>
          ) : null}
        </div>

        <div className="mt-6 overflow-x-auto border-2 border-primary bg-[#F0F0EC] shadow-[4px_4px_0_0_#131311]">
          <div className="border-b-2 border-primary bg-primary px-3 py-2">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.1em] text-accent">
              {board.urlLabel ?? "Seller Central weekly board"}
            </p>
          </div>
          <table className="w-full min-w-[40rem] border-collapse bg-background text-left text-sm">
            <thead>
              <tr className="border-b-2 border-primary bg-[#E4E4E0]">
                {board.columns.map((col) => (
                  <th
                    key={col}
                    className="px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary sm:px-4"
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
                    "border-b border-primary/20 last:border-b-0",
                    rowIndex % 2 === 1 && "bg-[#F4F4F4]",
                  )}
                >
                  {row.cells.map((cell, cellIndex) => (
                    <td
                      key={`${rowIndex}-${cellIndex}`}
                      className={cn(
                        "px-3 py-2.5 font-medium sm:px-4",
                        cellIndex === 0
                          ? "font-black text-primary"
                          : "text-text-secondary",
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
          <p className="mt-3 text-xs font-medium text-text-secondary">
            {board.disclaimer}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
