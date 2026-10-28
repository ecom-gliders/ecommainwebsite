import Image from "next/image";
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
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,16rem)] lg:items-end lg:gap-8">
          <div>
            <p className="font-mono text-xs font-bold uppercase tracking-[0.12em] text-text-secondary">
              Sample scorecard
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
          </div>
          <div className="relative hidden h-28 overflow-hidden border-2 border-primary lg:block">
            <Image
              src="/images/services/amazon-product-sourcing/src-lane-sample-v2.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="256px"
            />
          </div>
        </div>
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
