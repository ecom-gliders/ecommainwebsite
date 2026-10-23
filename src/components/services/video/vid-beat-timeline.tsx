import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface VidBeatTimelineProps {
  service: ServicePageConfig;
}

/** Horizontal beat timeline from catalogHealthBoard — not gate stamps or sheet table. */
export function VidBeatTimeline({ service }: VidBeatTimelineProps) {
  const board = service.modules?.find(
    (module) => module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id="service-beat-board"
      className={cn("bg-background", serviceSectionPad)}
      aria-labelledby="service-beat-board-heading"
    >
      <ServicePageShell>
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <h2
              id="service-beat-board-heading"
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
            <p className="border-2 border-primary bg-[#1a1a18] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.08em] text-accent">
              {board.boardLabel}
            </p>
          ) : null}
        </div>

        <div className="mt-8 overflow-x-auto pb-2">
          <ol
            className="flex min-w-[48rem] gap-0 border-2 border-primary"
            aria-label={board.urlLabel ?? "Storyboard beats"}
          >
            {board.rows.map((row, index) => {
              const [beat, job, weak, signal] = row.cells;
              return (
                <li
                  key={beat}
                  className={cn(
                    "flex min-w-[8.5rem] max-w-[10rem] flex-1 flex-col border-r border-primary last:border-r-0",
                    index === 0 && "bg-accent/20",
                  )}
                >
                  <div className="border-b-2 border-primary bg-primary px-2 py-1.5">
                    <p className="font-mono text-[10px] font-black text-accent">{beat}</p>
                  </div>
                  <div className="flex flex-1 flex-col p-2.5">
                    <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-text-secondary">
                      {job}
                    </p>
                    <p className="mt-2 text-[11px] font-medium leading-snug text-text-secondary line-through decoration-primary/35">
                      {weak}
                    </p>
                    <p className="mt-auto border-t border-primary/15 pt-2 text-xs font-bold leading-snug text-primary">
                      {signal}
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
