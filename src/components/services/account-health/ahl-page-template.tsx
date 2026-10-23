import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { FsGrowthShots } from "@/components/services/full-service/fs-growth-shots";
import { AhlAudienceTiers } from "./ahl-audience-tiers";
import { AhlClose } from "./ahl-close";
import { AhlDiffer } from "./ahl-differ";
import { AhlFaq } from "./ahl-faq";
import { AhlGaugeHero } from "./ahl-gauge-hero";
import { AhlMonitorDeliverables } from "./ahl-monitor-deliverables";
import { AhlNoticeProblem } from "./ahl-notice-problem";
import { AhlResponseTrack } from "./ahl-response-track";
import { AhlResults } from "./ahl-results";
import { AhlThresholdLanes } from "./ahl-threshold-lanes";
import { AhlWeeklyBoard } from "./ahl-weekly-board";

interface AhlPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Account health gauge composition (layout accountHealthGauge).
 * Dark compliance panel with horizontal policy bars — not PPC dials or listing meters.
 */
export function AhlPageTemplate({ service, site }: AhlPageTemplateProps) {
  return (
    <>
      <AhlGaugeHero service={service} site={site} />
      <AhlNoticeProblem service={service} />
      <AhlAudienceTiers service={service} />
      <AhlResponseTrack service={service} />
      <AhlMonitorDeliverables service={service} />
      <AhlThresholdLanes service={service} />
      <AhlWeeklyBoard service={service} />
      <FsGrowthShots service={service} />
      <AhlDiffer service={service} />
      <AhlResults service={service} />
      <AhlFaq service={service} />
      <AhlClose service={service} />
    </>
  );
}
