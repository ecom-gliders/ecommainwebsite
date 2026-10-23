import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { TtkClose } from "./ttk-close";
import { TtkDiffer } from "./ttk-differ";
import { TtkFaq } from "./ttk-faq";
import { TtkFitBoard } from "./ttk-fit-board";
import { TtkFocusChart } from "./ttk-focus-chart";
import { TtkFormatCards } from "./ttk-format-cards";
import { TtkOrganicProblem } from "./ttk-organic-problem";
import { TtkProof } from "./ttk-proof";
import { TtkSeatAudience } from "./ttk-seat-audience";
import { TtkSparkHero } from "./ttk-spark-hero";
import { TtkSparkLanes } from "./ttk-spark-lanes";
import { TtkStageRail } from "./ttk-stage-rail";

interface TtkPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * TikTok Shop ads composition (layout tiktokSparkRail).
 * Spark canvas hero, organic vs paid, phone-seat audience, stage rail,
 * ad format cards, fit board, focus chart — not shared PSA stack or storefront rail.
 */
export function TtkPageTemplate({ service, site }: TtkPageTemplateProps) {
  return (
    <>
      <TtkSparkHero service={service} site={site} />
      <TtkOrganicProblem service={service} />
      <TtkSeatAudience service={service} />
      <TtkStageRail service={service} />
      <TtkFormatCards service={service} />
      <TtkFitBoard service={service} />
      <TtkFocusChart service={service} />
      <TtkSparkLanes service={service} />
      <TtkDiffer service={service} />
      <TtkProof service={service} />
      <TtkFaq service={service} />
      <TtkClose service={service} />
    </>
  );
}
