import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { FsGrowthShots } from "@/components/services/full-service/fs-growth-shots";
import { AosClose } from "./aos-close";
import { AosDiffer } from "./aos-differ";
import { AosFaq } from "./aos-faq";
import { AosHandoffRail } from "./aos-handoff-rail";
import { AosMixSeats } from "./aos-mix-seats";
import { AosOpsBoard } from "./aos-ops-board";
import { AosPipeline } from "./aos-pipeline";
import { AosProof } from "./aos-proof";
import { AosRunbook } from "./aos-runbook";
import { AosShiftHero } from "./aos-shift-hero";
import { AosVendorTug } from "./aos-vendor-tug";

interface AosPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Dedicated Account Operations composition (layout accountOpsShift).
 * Shift-board / handoff-rail metaphor — not FS command, PPC cockpit, or reporting ledger.
 */
export function AosPageTemplate({ service, site }: AosPageTemplateProps) {
  return (
    <>
      <AosShiftHero service={service} site={site} />
      <AosVendorTug service={service} />
      <AosMixSeats service={service} />
      <AosPipeline service={service} />
      <AosRunbook service={service} />
      <AosHandoffRail service={service} />
      <AosOpsBoard service={service} />
      <AosDiffer service={service} />
      <FsGrowthShots service={service} />
      <AosProof service={service} />
      <AosFaq service={service} />
      <AosClose service={service} />
    </>
  );
}
