import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { FsGrowthShots } from "@/components/services/full-service/fs-growth-shots";
import { PpcAudienceBars } from "./ppc-audience-bars";
import { PpcChannelMix } from "./ppc-channel-mix";
import { PpcClose } from "./ppc-close";
import { PpcCockpitHero } from "./ppc-cockpit-hero";
import { PpcDifferMatrix } from "./ppc-differ-matrix";
import { PpcFaq } from "./ppc-faq";
import { PpcFunnel } from "./ppc-funnel";
import { PpcProofSparklines } from "./ppc-proof-sparklines";
import { PpcWasteRadar } from "./ppc-waste-radar";

interface PpcPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Dedicated PPC composition (layout ppcCockpit).
 * Ads-cockpit metaphor — not the Full-Service command board.
 * Hero includes intake form. Every section includes a distinct visual.
 */
export function PpcPageTemplate({ service, site }: PpcPageTemplateProps) {
  return (
    <>
      <PpcCockpitHero service={service} site={site} />
      <PpcWasteRadar service={service} />
      <PpcAudienceBars service={service} />
      <PpcDifferMatrix service={service} />
      <PpcFunnel service={service} />
      <PpcChannelMix service={service} />
      <FsGrowthShots service={service} />
      <PpcProofSparklines service={service} />
      <PpcFaq service={service} />
      <PpcClose service={service} />
    </>
  );
}
