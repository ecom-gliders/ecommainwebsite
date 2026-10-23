import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { EmlBroadcastProblem } from "./eml-broadcast-problem";
import { EmlBuildOrder } from "./eml-build-order";
import { EmlCadenceStages } from "./eml-cadence-stages";
import { EmlCaptureGates } from "./eml-capture-gates";
import { EmlClose } from "./eml-close";
import { EmlDayLoopSheet } from "./eml-day-loop-sheet";
import { EmlFaq } from "./eml-faq";
import { EmlFlowCards } from "./eml-flow-cards";
import { EmlLoopHero } from "./eml-loop-hero";
import { EmlNodeAudience } from "./eml-node-audience";
import { EmlProof } from "./eml-proof";

interface EmlPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Email retention composition (layout lifecycleCadenceLoop).
 * Cadence loop hero, broadcast vs loop problem, node audience,
 * stage solution, flow cards, JSON timing and capture modules.
 */
export function EmlPageTemplate({ service, site }: EmlPageTemplateProps) {
  return (
    <>
      <EmlLoopHero service={service} site={site} />
      <EmlBroadcastProblem service={service} />
      <EmlNodeAudience service={service} />
      <EmlCadenceStages service={service} />
      <EmlFlowCards service={service} />
      <EmlDayLoopSheet service={service} />
      <EmlBuildOrder service={service} />
      <EmlCaptureGates service={service} />
      <EmlProof service={service} />
      <EmlFaq service={service} />
      <EmlClose service={service} />
    </>
  );
}
