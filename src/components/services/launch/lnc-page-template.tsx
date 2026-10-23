import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { LncChecklistTiles } from "./lnc-checklist-tiles";
import { LncClose } from "./lnc-close";
import { LncColdProblem } from "./lnc-cold-problem";
import { LncCountdownHero } from "./lnc-countdown-hero";
import { LncDiffer } from "./lnc-differ";
import { LncFaq } from "./lnc-faq";
import { LncGateLanes } from "./lnc-gate-lanes";
import { LncPadAudience } from "./lnc-pad-audience";
import { LncPhaseRail } from "./lnc-phase-rail";
import { LncReadinessBoard } from "./lnc-readiness-board";
import { LncResults } from "./lnc-results";
import { LncSellerProof } from "./lnc-seller-proof";

interface LncPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Product launch countdown-board composition (layout launchCountdownBoard).
 * Dark launch pad, T-minus phases, pad stations, checklist tiles — not lifecycle loop or PSA stack.
 */
export function LncPageTemplate({ service, site }: LncPageTemplateProps) {
  return (
    <>
      <LncCountdownHero service={service} site={site} />
      <LncColdProblem service={service} />
      <LncPadAudience service={service} />
      <LncPhaseRail service={service} />
      <LncChecklistTiles service={service} />
      <LncGateLanes service={service} />
      <LncReadinessBoard service={service} />
      <LncSellerProof service={service} />
      <LncDiffer service={service} />
      <LncResults service={service} />
      <LncFaq service={service} />
      <LncClose service={service} />
    </>
  );
}
