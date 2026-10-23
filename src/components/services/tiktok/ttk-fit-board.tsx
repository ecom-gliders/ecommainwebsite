import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface TtkFitBoardProps {
  service: ServicePageConfig;
}

/** Fit gates as vertical phone-column board — not horizontal beat timeline or sheet table. */
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
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="service-fit-board-heading"
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
            <p className="border-2 border-primary bg-[#0c0c0b] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
              {board.boardLabel}
            </p>
          ) : null}
        </div>

        <div className="mt-8 overflow-x-auto pb-2">
          <ol
            className="grid min-w-[48rem] grid-cols-3 gap-3 sm:grid-cols-6"
            aria-label={board.urlLabel ?? "TikTok Shop fit gates"}
          >
            {board.rows.map((row, index) => {
              const [gate, check, why, missing] = row.cells;
              return (
                <li
                  key={gate}
                  className={cn(
                    "flex flex-col border-2 border-primary bg-[#F7F3EA]",
                    index === 0 && "ring-2 ring-accent ring-offset-2",
                  )}
                >
                  <div className="border-b-2 border-primary bg-primary px-2 py-1.5">
                    <p className="font-mono text-[9px] font-black uppercase text-accent">
                      {gate}
                    </p>
                  </div>
                  <div className="flex flex-1 flex-col p-2.5">
                    <div
                      className="mx-auto aspect-[9/16] w-full max-w-[2.75rem] border border-primary/25 bg-[#1a1a18]"
                      aria-hidden="true"
                    />
                    <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.05em] text-text-secondary">
                      {check}
                    </p>
                    <p className="mt-1.5 text-[11px] font-medium leading-snug text-text-secondary">
                      {why}
                    </p>
                    <p className="mt-auto border-t border-primary/15 pt-2 text-[10px] font-bold leading-snug text-primary">
                      {missing}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
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
