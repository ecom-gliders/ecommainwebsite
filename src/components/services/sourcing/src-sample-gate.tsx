import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { CatalogHealthBoard } from "@/components/services/modules/catalog-health-board";
import { cn } from "@/lib/utils";

interface SrcSampleGateProps {
  service: ServicePageConfig;
}

export function SrcSampleGate({ service }: SrcSampleGateProps) {
  const board = service.modules?.find(
    (module) => module.id === "sample-scorecard",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id={board.id}
      className={cn("bg-background", serviceSectionPad)}
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
