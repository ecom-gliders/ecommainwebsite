import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { FsGrowthShots } from "@/components/services/full-service/fs-growth-shots";
import { InvBayAudience } from "./inv-bay-audience";
import { InvClose } from "./inv-close";
import { InvControlTiles } from "./inv-control-tiles";
import { InvCoverageProblem } from "./inv-coverage-problem";
import { InvDiffer } from "./inv-differ";
import { InvFaq } from "./inv-faq";
import { InvProof } from "./inv-proof";
import { InvPulseHero } from "./inv-pulse-hero";
import { InvReplenCycle } from "./inv-replen-cycle";
import { InvStockLanes } from "./inv-stock-lanes";
import { InvWeeklyBoard } from "./inv-weekly-board";

interface InvPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * FBA inventory pulse-board composition (layout inventoryPulseBoard).
 * Warehouse bay grid and stock-level pulses — not reporting ledger or launch countdown.
 */
export function InvPageTemplate({ service, site }: InvPageTemplateProps) {
  return (
    <>
      <InvPulseHero service={service} site={site} />
      <InvCoverageProblem service={service} />
      <InvBayAudience service={service} />
      <InvReplenCycle service={service} />
      <InvControlTiles service={service} />
      <InvStockLanes service={service} />
      <InvWeeklyBoard service={service} />
      <InvDiffer service={service} />
      <FsGrowthShots service={service} />
      <InvProof service={service} />
      <InvFaq service={service} />
      <InvClose service={service} />
    </>
  );
}
