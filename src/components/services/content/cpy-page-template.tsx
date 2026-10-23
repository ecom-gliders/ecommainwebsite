import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { CpyAudience } from "./cpy-audience";
import { CpyClaimGates } from "./cpy-claim-gates";
import { CpyClose } from "./cpy-close";
import { CpyDeskHero } from "./cpy-desk-hero";
import { CpyDiffer } from "./cpy-differ";
import { CpyDraftProblem } from "./cpy-draft-problem";
import { CpyFaq } from "./cpy-faq";
import { CpyModules } from "./cpy-modules";
import { CpyOutcome } from "./cpy-outcome";
import { CpyProof } from "./cpy-proof";
import { CpyRedlines } from "./cpy-redlines";
import { CpyTypeRail } from "./cpy-type-rail";

interface CpyPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Content copy-desk composition (layout contentCopyDesk).
 * Manuscript rewrite board, draft vs scan, binder tabs, type rail,
 * paper modules, claim gates, paired outcomes — not listing/PPC/ops chrome.
 */
export function CpyPageTemplate({ service, site }: CpyPageTemplateProps) {
  return (
    <>
      <CpyDeskHero service={service} site={site} />
      <CpyDraftProblem service={service} />
      <CpyAudience service={service} />
      <CpyTypeRail service={service} />
      <CpyModules service={service} />
      <CpyClaimGates service={service} />
      <CpyOutcome service={service} />
      <CpyDiffer service={service} />
      <CpyRedlines service={service} />
      <CpyProof service={service} />
      <CpyFaq service={service} />
      <CpyClose service={service} />
    </>
  );
}
