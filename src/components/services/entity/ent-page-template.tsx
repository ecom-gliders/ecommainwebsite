import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { EntAccessProblem } from "./ent-access-problem";
import { EntAudienceLandings } from "./ent-audience-landings";
import { EntClose } from "./ent-close";
import { EntDocBoard } from "./ent-doc-board";
import { EntDocTiles } from "./ent-doc-tiles";
import { EntFaq } from "./ent-faq";
import { EntHandoffBoard } from "./ent-handoff-board";
import { EntLadderHero } from "./ent-ladder-hero";
import { EntOpsLanes } from "./ent-ops-lanes";
import { EntResults } from "./ent-results";
import { EntRungSteps } from "./ent-rung-steps";

interface EntPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Entity setup ladder composition (layout entitySetupLadder).
 * Dark contained ladder hero, blocked vs ready contrast, founder landings,
 * ascending rung rail, document dossier — not sourcing corridor or brand seal.
 */
export function EntPageTemplate({ service, site }: EntPageTemplateProps) {
  return (
    <>
      <EntLadderHero service={service} site={site} />
      <EntAccessProblem service={service} />
      <EntAudienceLandings service={service} />
      <EntRungSteps service={service} />
      <EntDocTiles service={service} />
      <EntDocBoard service={service} />
      <EntHandoffBoard service={service} />
      <EntOpsLanes service={service} />
      <EntResults service={service} />
      <EntFaq service={service} />
      <EntClose service={service} />
    </>
  );
}
