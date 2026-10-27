import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { SrcAudienceMarkers } from "./src-audience-markers";
import { SrcCheckpoints } from "./src-checkpoints";
import { SrcClose } from "./src-close";
import { SrcFaq } from "./src-faq";
import { SrcGateProblem } from "./src-gate-problem";
import { SrcLandedIndex } from "./src-landed-index";
import { SrcLaneHero } from "./src-lane-hero";
import { SrcProof } from "./src-proof";
import { SrcRouteMap } from "./src-route-map";
import { SrcSampleGate } from "./src-sample-gate";
import { SrcShortlistBoard } from "./src-shortlist-board";

interface SrcPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Gated supply corridor composition (layout sourcingLaneMap).
 * Dark corridor hero, open-vs-gated contrast, mile markers, route merge —
 * not inventory pulse, compliance gauges, or PPC cockpit.
 */
export function SrcPageTemplate({ service, site }: SrcPageTemplateProps) {
  return (
    <>
      <SrcLaneHero service={service} site={site} />
      <SrcGateProblem service={service} />
      <SrcAudienceMarkers service={service} />
      <SrcRouteMap service={service} />
      <SrcCheckpoints service={service} />
      <SrcShortlistBoard service={service} />
      <SrcLandedIndex service={service} />
      <SrcSampleGate service={service} />
      <SrcProof service={service} />
      <SrcFaq service={service} />
      <SrcClose service={service} />
    </>
  );
}
