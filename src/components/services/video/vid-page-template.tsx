import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { VidBeatTimeline } from "./vid-beat-timeline";
import { VidClose } from "./vid-close";
import { VidCutLanes } from "./vid-cut-lanes";
import { VidDiffer } from "./vid-differ";
import { VidFaq } from "./vid-faq";
import { VidFormatCards } from "./vid-format-cards";
import { VidPlacementFilmstrip } from "./vid-placement-filmstrip";
import { VidProductionTimeline } from "./vid-production-timeline";
import { VidProof } from "./vid-proof";
import { VidSilentProblem } from "./vid-silent-problem";
import { VidSprocketAudience } from "./vid-sprocket-audience";
import { VidStoryboardHero } from "./vid-storyboard-hero";

interface VidPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Video storyboard composition (layout videoStoryboard).
 * Ink hero frames, silent vs lift, sprocket audience, production rail,
 * format cards, beat timeline, cut lanes, placement filmstrip — not shared PSA stack.
 */
export function VidPageTemplate({ service, site }: VidPageTemplateProps) {
  return (
    <>
      <VidStoryboardHero service={service} site={site} />
      <VidSilentProblem service={service} />
      <VidSprocketAudience service={service} />
      <VidProductionTimeline service={service} />
      <VidFormatCards service={service} />
      <VidBeatTimeline service={service} />
      <VidCutLanes service={service} />
      <VidPlacementFilmstrip service={service} />
      <VidDiffer service={service} />
      <VidProof service={service} />
      <VidFaq service={service} />
      <VidClose service={service} />
    </>
  );
}
