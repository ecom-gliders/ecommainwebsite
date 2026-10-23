import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { CatAttributeGrid } from "./cat-attribute-grid";
import { CatAudienceMatrix } from "./cat-audience-matrix";
import { CatBuyboxProblem } from "./cat-buybox-problem";
import { CatClose } from "./cat-close";
import { CatDiffer } from "./cat-differ";
import { CatFaq } from "./cat-faq";
import { CatFixLadder } from "./cat-fix-ladder";
import { CatGridHero } from "./cat-grid-hero";
import { CatHealthConsole } from "./cat-health-console";
import { CatOpsLanes } from "./cat-ops-lanes";
import { CatProof } from "./cat-proof";
import { CatResults } from "./cat-results";

interface CatPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Catalog buy-box grid composition (layout catalogBuyBoxGrid).
 * Variation tree hero, buyability contrast, operator matrix, fix ladder,
 * attribute coverage grid — not copy-desk, SERP stack, or shared PSA chrome.
 */
export function CatPageTemplate({ service, site }: CatPageTemplateProps) {
  return (
    <>
      <CatGridHero service={service} site={site} />
      <CatBuyboxProblem service={service} />
      <CatAudienceMatrix service={service} />
      <CatFixLadder service={service} />
      <CatAttributeGrid service={service} />
      <CatHealthConsole service={service} />
      <CatOpsLanes service={service} />
      <CatProof service={service} />
      <CatDiffer service={service} />
      <CatResults service={service} />
      <CatFaq service={service} />
      <CatClose service={service} />
    </>
  );
}
