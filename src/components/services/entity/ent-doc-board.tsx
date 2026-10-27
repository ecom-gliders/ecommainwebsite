import type { ServicePageConfig } from "@/domain/content/schemas";
import { CatalogHealthBoard } from "@/components/services/modules/catalog-health-board";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { cn } from "@/lib/utils";

interface EntDocBoardProps {
  service: ServicePageConfig;
}

/** Document readiness board from catalogHealthBoard module JSON. */
export function EntDocBoard({ service }: EntDocBoardProps) {
  const board = service.modules?.find(
    (module) => module.id === "entity-doc-board" && module.type === "catalogHealthBoard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id={board.id}
      className={cn("bg-[#F4F4F4]", serviceSectionPad)}
      aria-labelledby={`${board.id}-heading`}
    >
      <ServicePageShell>
        <p className="font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
          Document readiness
        </p>
        <h2
          id={`${board.id}-heading`}
          className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-primary"
        >
          {board.heading}
        </h2>
        {board.subheading ? (
          <p className="mt-2 max-w-2xl text-base font-medium text-text-secondary">
            {board.subheading}
          </p>
        ) : null}
        <div className="mt-8">
          <CatalogHealthBoard
            urlLabel={board.urlLabel}
            disclaimer={board.disclaimer}
            columns={board.columns}
            rows={board.rows}
            variant={board.variant ?? "sheet"}
            boardLabel={board.boardLabel}
          />
        </div>
      </ServicePageShell>
    </section>
  );
}
