import Image from "next/image";
import type { ServicePageConfig } from "@/domain/content/schemas";
import {
  ServicePageShell,
  serviceSectionPad,
} from "@/components/services/shared/service-page-shell";
import { CatalogHealthBoard } from "@/components/services/modules/catalog-health-board";
import { cn } from "@/lib/utils";

interface SrcShortlistBoardProps {
  service: ServicePageConfig;
}

export function SrcShortlistBoard({ service }: SrcShortlistBoardProps) {
  const board = service.modules?.find(
    (module) => module.id === "supplier-shortlist-board",
  );
  if (!board || board.type !== "catalogHealthBoard") return null;

  return (
    <section
      id={board.id}
      className={cn("bg-[#0b1211] text-text-on-dark", serviceSectionPad)}
      aria-labelledby={`${board.id}-heading`}
    >
      <ServicePageShell>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] lg:items-stretch lg:gap-7">
          <aside className="relative hidden min-h-[16rem] overflow-hidden border-2 border-accent/50 lg:block">
            <Image
              src="/images/services/amazon-product-sourcing/src-lane-qc-v2.jpg"
              alt=""
              fill
              className="object-cover opacity-85"
              sizes="224px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0b1211] via-[#0b1211]/40 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
                Shortlist terminal
              </p>
              <p className="mt-1 text-sm font-bold text-text-on-dark">
                Fit · sample · risk
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-accent">
              Supplier board
            </p>
            <h2
              id={`${board.id}-heading`}
              className="mt-2 max-w-3xl text-[clamp(1.6rem,3vw,2.15rem)] font-black tracking-tight text-text-on-dark"
            >
              {board.heading}
            </h2>
            {board.subheading ? (
              <p className="mt-2 max-w-2xl text-base font-medium text-text-on-dark/70">
                {board.subheading}
              </p>
            ) : null}
            <div className="mt-6 [&_*]:border-accent/40 [&_table]:bg-[#101816] [&_th]:bg-[#141a19] [&_th]:text-accent [&_td]:text-text-on-dark/80">
              <CatalogHealthBoard
                urlLabel={board.urlLabel}
                disclaimer={board.disclaimer}
                columns={board.columns}
                rows={board.rows}
                variant={board.variant ?? "sheet"}
                boardLabel={board.boardLabel}
              />
            </div>
          </div>
        </div>
      </ServicePageShell>
    </section>
  );
}
