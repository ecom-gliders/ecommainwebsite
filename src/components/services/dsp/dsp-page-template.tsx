import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { FsGrowthShots } from "@/components/services/full-service/fs-growth-shots";
import { DspAltitudeBands } from "./dsp-altitude-bands";
import { DspAudienceOrbit } from "./dsp-audience-orbit";
import { DspClose } from "./dsp-close";
import { DspCoverageLattice } from "./dsp-coverage-lattice";
import { DspFaq } from "./dsp-faq";
import { DspOrbitHero } from "./dsp-orbit-hero";
import { DspProof } from "./dsp-proof";
import { DspReadinessGates } from "./dsp-readiness-gates";
import { DspRoleChart } from "./dsp-role-chart";
import { DspSignalLeak } from "./dsp-signal-leak";

interface DspPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Dedicated DSP composition (layout dspReachLattice).
 * Audience reach-lattice metaphor — not Full-Service command board, not PPC cockpit.
 */
export function DspPageTemplate({ service, site }: DspPageTemplateProps) {
  return (
    <>
      <DspOrbitHero service={service} site={site} />
      <DspSignalLeak service={service} />
      <DspAudienceOrbit service={service} />
      <DspAltitudeBands service={service} />
      <DspCoverageLattice service={service} />
      <DspReadinessGates service={service} />
      <DspRoleChart service={service} />
      <FsGrowthShots service={service} />
      <DspProof service={service} />
      <DspFaq service={service} />
      <DspClose service={service} />
    </>
  );
}
