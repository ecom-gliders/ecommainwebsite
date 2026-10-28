import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkFitBoardProps {
  service: ServicePageConfig;
}

/** Static fit gate table — readable sheet (council: no mid-page tab monoculture). */
export function TtkFitBoard({ service }: TtkFitBoardProps) {
  const board = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id="service-fit-board"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-fit-board-heading"
    >
      <ServicePageShell>
        <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
          Fit board
        </p>
        <h2
          id="service-fit-board-heading"
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
        >
          {board.heading}
        </h2>
        {board.subheading ? (
          <p className="mt-2 max-w-2xl text-sm font-medium text-text-secondary sm:text-base">
            {board.subheading}
          </p>
        ) : null}

        <div className="mt-8 overflow-hidden border-2 border-primary shadow-[4px_4px_0_0_#131311]">
          <div className="flex items-center gap-2 border-b-2 border-primary bg-[#F0F0EB] px-3 py-2">
            <span className="font-mono text-xs font-bold text-text-secondary">
              {board.boardLabel ?? "Fit gates"} · {board.urlLabel}
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] border-collapse text-left">
              <thead>
                <tr className="border-b-2 border-primary bg-primary text-text-on-dark">
                  {board.columns.map((col) => (
                    <th
                      key={col}
                      className="px-3 py-2.5 font-mono text-xs font-bold uppercase tracking-[0.08em] text-accent sm:px-4"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {board.rows.map((row, index) => (
                  <tr
                    key={row.cells[0]}
                    className={cn(
                      "border-b border-primary/20 last:border-b-0",
                      index % 2 === 0 ? "bg-background" : "bg-[#FAFAF7]",
                    )}
                  >
                    {row.cells.map((cell, cellIndex) => (
                      <td
                        key={`${row.cells[0]}-${cellIndex}`}
                        className={cn(
                          "px-3 py-3 text-sm font-medium text-primary sm:px-4 sm:text-base",
                          cellIndex === 0 && "font-black",
                          cellIndex === 3 && "text-text-secondary",
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
        </div>
        {board.disclaimer ? (
          <p className="mt-4 text-xs font-medium text-text-secondary">
            {board.disclaimer}
          </p>
        ) : null}
      </ServicePageShell>
    </section>
  );
}
