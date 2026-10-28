import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface InvWeeklyBoardProps {
  service: ServicePageConfig;
}

/** Weekly inventory ownership as a dark terminal sheet. */
export function InvWeeklyBoard({ service }: InvWeeklyBoardProps) {
  const board = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id="service-ops-board"
      className={cn("bg-[#E6E6E0]", serviceSectionPad)}
      aria-labelledby="service-ops-board-heading"
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-stretch lg:gap-7">
          <aside className="relative hidden min-h-[16rem] overflow-hidden border-2 border-primary bg-primary lg:block">
            <Image
              src="/images/services/amazon-inventory-management/inv-inbound-stage-v2.jpg"
              alt=""
              fill
              className="object-cover opacity-80"
              sizes="224px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
                Inbound stage
              </p>
              <p className="mt-1 text-sm font-bold text-text-on-dark">
                Cover · ETA · ad sync
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
                  Operating terminal
                </p>
                <h2
                  id="service-ops-board-heading"
                  className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
                >
                  {board.heading}
                </h2>
                {board.subheading ? (
                  <p className="mt-2 max-w-2xl text-base font-medium text-text-secondary">
                    {board.subheading}
                  </p>
                ) : null}
              </div>
              {board.boardLabel ? (
                <p className="border-2 border-primary bg-accent px-2.5 py-1 font-mono text-xs font-bold uppercase tracking-[0.08em] text-primary">
                  {board.boardLabel}
                </p>
              ) : null}
            </div>

            <div className="mt-6 overflow-x-auto border-2 border-primary bg-[#0f0f0d] shadow-[4px_4px_0_0_#131311]">
              <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b-2 border-accent/50 bg-[#161614] text-accent">
                    {board.columns.map((col) => (
                      <th
                        key={col}
                        className="px-3 py-3 font-mono text-xs font-bold uppercase tracking-[0.1em] sm:px-4"
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
                        "border-b border-text-on-dark/10 last:border-b-0",
                        rowIndex % 2 === 1 && "bg-[#141412]",
                      )}
                    >
                      {row.cells.map((cell, cellIndex) => (
                        <td
                          key={`${rowIndex}-${cellIndex}`}
                          className={cn(
                            "px-3 py-3 font-medium sm:px-4",
                            cellIndex === 0
                              ? "font-black text-accent"
                              : "text-text-on-dark/75",
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
              <p className="mt-3 text-sm font-medium text-text-secondary">
                {board.disclaimer}
              </p>
            ) : null}
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
