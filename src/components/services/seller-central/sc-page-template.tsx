import type { ServicePageConfig, SiteConfig } from "@/domain/content/schemas";
import { FsGrowthShots } from "@/components/services/full-service/fs-growth-shots";
import { ScAudiencePanes } from "./sc-audience-panes";
import { ScBacklogProblem } from "./sc-backlog-problem";
import { ScCaseLanes } from "./sc-case-lanes";
import { ScClose } from "./sc-close";
import { ScConsoleHero } from "./sc-console-hero";
import { ScDiffer } from "./sc-differ";
import { ScFaq } from "./sc-faq";
import { ScResults } from "./sc-results";
import { ScTaskDeliverables } from "./sc-task-deliverables";
import { ScWeeklyBoard } from "./sc-weekly-board";
import { ScWorkflowRail } from "./sc-workflow-rail";

interface ScPageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}

/**
 * Seller Central console composition (layout sellerCentralConsole).
 * Gray console / task-queue metaphor — not shift spine, ledger box, or PPC cockpit.
 */
export function ScPageTemplate({ service, site }: ScPageTemplateProps) {
  return (
    <>
      <ScConsoleHero service={service} site={site} />
      <ScBacklogProblem service={service} />
      <ScAudiencePanes service={service} />
      <ScWorkflowRail service={service} />
      <ScTaskDeliverables service={service} />
      <ScCaseLanes service={service} />
      <ScWeeklyBoard service={service} />
      <FsGrowthShots service={service} />
      <ScDiffer service={service} />
      <ScResults service={service} />
      <ScFaq service={service} />
      <ScClose service={service} />
    </>
  );
}
