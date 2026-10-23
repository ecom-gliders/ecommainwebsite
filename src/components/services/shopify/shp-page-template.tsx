import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { ShpBuildRail } from "./shp-build-rail";
import { ShpChannelOps } from "./shp-channel-ops";
import { ShpChannelSplitProblem } from "./shp-channel-split-problem";
import { ShpClose } from "./shp-close";
import { ShpFloorAudience } from "./shp-floor-audience";
import { ShpFaq } from "./shp-faq";
import { ShpMilestoneRail } from "./shp-milestone-rail";
import { ShpModuleDeliverables } from "./shp-module-deliverables";
import { ShpProof } from "./shp-proof";
import { ShpScopeSlots } from "./shp-scope-slots";
import { ShpStorefrontRailHero } from "./shp-storefront-rail-hero";

interface ShpPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Shopify DTC composition (layout dtcStorefrontRail).
 * Browser-chrome storefront rail hero, channel split, floor audience,
 * build rail, module deliverables, JSON channel/milestone/scope visuals.
 */
export function ShpPageTemplate({ service, site }: ShpPageTemplateProps) {
  return (
    <>
      <ShpStorefrontRailHero service={service} site={site} />
      <ShpChannelSplitProblem service={service} />
      <ShpFloorAudience service={service} />
      <ShpBuildRail service={service} />
      <ShpModuleDeliverables service={service} />
      <ShpChannelOps service={service} />
      <ShpMilestoneRail service={service} />
      <ShpScopeSlots service={service} />
      <ShpProof service={service} />
      <ShpFaq service={service} />
      <ShpClose service={service} />
    </>
  );
}
