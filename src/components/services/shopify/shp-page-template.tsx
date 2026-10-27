import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { ShpBuildRail } from "./shp-build-rail";
import { ShpChannelOps } from "./shp-channel-ops";
import { ShpChannelSplitProblem } from "./shp-channel-split-problem";
import { ShpClose } from "./shp-close";
import { ShpFloorAudience } from "./shp-floor-audience";
import { ShpFaq } from "./shp-faq";
import { ShpModuleDeliverables } from "./shp-module-deliverables";
import { ShpProof } from "./shp-proof";
import { ShpScopeSlots } from "./shp-scope-slots";
import { ShpStorefrontRailHero } from "./shp-storefront-rail-hero";

interface ShpPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Interactive DTC storefront rail (layout dtcStorefrontRail).
 * CSS wireframe previews + section-wise tabs — no photo jam.
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
      <ShpScopeSlots service={service} />
      <ShpProof service={service} />
      <ShpFaq service={service} />
      <ShpClose service={service} />
    </>
  );
}
