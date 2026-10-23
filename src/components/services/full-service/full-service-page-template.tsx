import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { FsCadence } from "./fs-cadence";
import { FsClose } from "./fs-close";
import { FsCommandHero } from "./fs-command-hero";
import { FsCoverageMap } from "./fs-coverage-map";
import { FsFaq } from "./fs-faq";
import { FsFitContinuum } from "./fs-fit-continuum";
import { FsGrowthShots } from "./fs-growth-shots";
import { FsManifesto } from "./fs-manifesto";
import { FsOpsRunway } from "./fs-ops-runway";
import { FsProof } from "./fs-proof";
import { FsTicketRail } from "./fs-ticket-rail";

interface FullServicePageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Dedicated Full-Service composition (layout fullServiceCommand).
 * Hero includes the intake form. Every section includes a distinct visual.
 * Does not reuse About/Contact chrome or the shared ServicePageTemplate.
 */
export function FullServicePageTemplate({
  service,
  site,
}: FullServicePageTemplateProps) {
  return (
    <>
      <FsCommandHero service={service} site={site} />
      <FsManifesto service={service} />
      <FsTicketRail service={service} />
      <FsFitContinuum service={service} />
      <FsOpsRunway service={service} />
      <FsCoverageMap service={service} />
      <FsCadence service={service} />
      <FsGrowthShots service={service} />
      <FsProof service={service} />
      <FsFaq service={service} />
      <FsClose service={service} />
    </>
  );
}
