import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { BrdAudience } from "./brd-audience";
import { BrdClose } from "./brd-close";
import { BrdDiffer } from "./brd-differ";
import { BrdFaq } from "./brd-faq";
import { BrdGatedProblem } from "./brd-gated-problem";
import { BrdPathwayBoardSection } from "./brd-pathway-board";
import { BrdPathwaySpine } from "./brd-pathway-spine";
import { BrdProof } from "./brd-proof";
import { BrdSealHero } from "./brd-seal-hero";
import { BrdUnlockDeliverables } from "./brd-unlock-deliverables";
import { BrdUnlockGridSection } from "./brd-unlock-grid";

interface BrdPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Trademark / Brand Registry composition (layout brandPathwaySeal).
 * Pathway seal hero, gated contrast, passport audience, seal spine,
 * JSON pathway board + unlock grid — not listing/PPC/ops/copy chrome.
 */
export function BrdPageTemplate({ service, site }: BrdPageTemplateProps) {
  return (
    <>
      <BrdSealHero service={service} site={site} />
      <BrdGatedProblem service={service} />
      <BrdAudience service={service} />
      <BrdPathwaySpine service={service} />
      <BrdPathwayBoardSection service={service} />
      <BrdUnlockDeliverables service={service} />
      <BrdUnlockGridSection service={service} />
      <BrdDiffer service={service} />
      <BrdProof service={service} />
      <BrdFaq service={service} />
      <BrdClose service={service} />
    </>
  );
}
