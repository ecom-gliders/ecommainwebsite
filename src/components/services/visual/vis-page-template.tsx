import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { VisAudienceStrip } from "./vis-audience-strip";
import { VisClose } from "./vis-close";
import { VisDeliverableTiles } from "./vis-deliverable-tiles";
import { VisDiffer } from "./vis-differ";
import { VisFaq } from "./vis-faq";
import { VisFlatProblem } from "./vis-flat-problem";
import { VisFrameHero } from "./vis-frame-hero";
import { VisFramePipeline } from "./vis-frame-pipeline";
import { VisModules } from "./vis-modules";
import { VisProof } from "./vis-proof";

interface VisPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Visual creativity composition (layout visualFrameStack).
 * Creative frame stack metaphor — not copy desk, PDP mock, or visual-ops card stack.
 */
export function VisPageTemplate({ service, site }: VisPageTemplateProps) {
  return (
    <>
      <VisFrameHero service={service} site={site} />
      <VisFlatProblem service={service} />
      <VisAudienceStrip service={service} />
      <VisFramePipeline service={service} />
      <VisDeliverableTiles service={service} />
      <VisModules service={service} />
      <VisDiffer service={service} />
      <VisProof service={service} />
      <VisFaq service={service} />
      <VisClose service={service} />
    </>
  );
}
