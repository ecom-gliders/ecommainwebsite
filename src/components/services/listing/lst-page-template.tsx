import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { LstAudience } from "./lst-audience";
import { LstClose } from "./lst-close";
import { LstCvrChart } from "./lst-cvr-chart";
import { LstDiffer } from "./lst-differ";
import { LstFaq } from "./lst-faq";
import { LstFields } from "./lst-fields";
import { LstKeywordMiss } from "./lst-keyword-miss";
import { LstPdpHero } from "./lst-pdp-hero";
import { LstPipeline } from "./lst-pipeline";
import { LstProof } from "./lst-proof";
import { LstScorecard } from "./lst-scorecard";

interface LstPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Listing SERP→PDP composition (layout listingPdpStack).
 * Search bar + mini PDP, index heatmap, buyer path, zigzag rewrite,
 * placement matrix, field meters, vertical CVR — not shared service chrome.
 */
export function LstPageTemplate({ service, site }: LstPageTemplateProps) {
  return (
    <>
      <LstPdpHero service={service} site={site} />
      <LstKeywordMiss service={service} />
      <LstAudience service={service} />
      <LstPipeline service={service} />
      <LstFields service={service} />
      <LstScorecard service={service} />
      <LstCvrChart service={service} />
      <LstDiffer service={service} />
      <LstProof service={service} />
      <LstFaq service={service} />
      <LstClose service={service} />
    </>
  );
}
