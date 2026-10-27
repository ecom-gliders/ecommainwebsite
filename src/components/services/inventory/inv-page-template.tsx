import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { InvBayAudience } from "./inv-bay-audience";
import { InvClose } from "./inv-close";
import { InvControlTiles } from "./inv-control-tiles";
import { InvCoverageProblem } from "./inv-coverage-problem";
import { InvDiffer } from "./inv-differ";
import { InvFaq } from "./inv-faq";
import { InvGrowthShots } from "./inv-growth-shots";
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
 * Stock-cover terminal composition (layout inventoryPulseBoard).
 * Dark rack terminal, dock doors, replen conveyor — not launch countdown or SC console.
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
      <InvGrowthShots service={service} />
      <InvProof service={service} />
      <InvFaq service={service} />
      <InvClose service={service} />
    </>
  );
}
