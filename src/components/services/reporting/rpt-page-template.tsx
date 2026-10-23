import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { FsGrowthShots } from "@/components/services/full-service/fs-growth-shots";
import { RptCadenceTrack } from "./rpt-cadence-track";
import { RptClose } from "./rpt-close";
import { RptDecisionSeats } from "./rpt-decision-seats";
import { RptExportDump } from "./rpt-export-dump";
import { RptFaq } from "./rpt-faq";
import { RptLedgerHero } from "./rpt-ledger-hero";
import { RptMetricPacks } from "./rpt-metric-packs";
import { RptProof } from "./rpt-proof";
import { RptWeeklyBoard } from "./rpt-weekly-board";

interface RptPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Dedicated Reporting composition (layout reportingLedger).
 * Decision-ledger metaphor — not PPC cockpit dials, not DSP reach lattice.
 */
export function RptPageTemplate({ service, site }: RptPageTemplateProps) {
  return (
    <>
      <RptLedgerHero service={service} site={site} />
      <RptExportDump service={service} />
      <RptDecisionSeats service={service} />
      <RptCadenceTrack service={service} />
      <RptMetricPacks service={service} />
      <RptWeeklyBoard service={service} />
      <FsGrowthShots service={service} />
      <RptProof service={service} />
      <RptFaq service={service} />
      <RptClose service={service} />
    </>
  );
}
