import Link from "next/link";
import type {
  BlogPost,
  ServicePageConfig,
  SiteConfig,
} from "@/domain/content/schemas";
import { BlogPostCta } from "@/components/blog/blog-post-cta";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { ServicesSection } from "@/components/sections/services-section";
import { cn } from "@/lib/utils";
import { ServiceLeadBand } from "./service-lead-band";
import {
  getServiceHeroPresentation,
  heroDefersForm,
} from "./service-hero";
import { ServiceModules } from "./modules/service-modules";
import { ServiceAudienceSection } from "./sections/service-audience-section";
import { ServiceCaseOutcomes } from "./sections/service-case-outcomes";
import { ServiceDepthBand } from "./sections/service-depth-band";
import { ServiceOpsLanes } from "./sections/service-ops-lanes";
import { ServiceProblemSection } from "./sections/service-problem-section";
import { ServiceSolutionSection } from "./sections/service-solution-section";
import { ServiceRelatedArticles } from "./service-related-articles";
import { serviceHardPanel } from "./service-hard-panel";
import { ServiceHero } from "./service-hero";
import { ServiceStatsStrip } from "./service-stats-strip";

interface ServicePageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
  relatedPosts?: BlogPost[];
}

const EARLY_VISUAL_TYPES = new Set([
  "infographicSpotlight",
  "browserProof",
  "proofGallery",
  "metricChart",
  "catalogHealthBoard",
  "brandPathwayBoard",
  "brandUnlockGrid",
]);

const LATE_OPS_TYPES = new Set([
  "processSteps",
  "checklistMatrix",
  "comparisonTable",
]);

type TailDeliverables = "grid" | "sheet" | "rail" | "omit";
type TailResults = "cards" | "strip" | "omit";
type TailFaq = "panel" | "plain";
type TailRelated = "cards" | "links" | "omit";

/**
 * Editorial proof rows (AMZ Dudes / boutique agency pattern):
 * oversized metric + brand line — no stacked hard boxes.
 */
function InlineCaseResults({
  id,
  label,
  items,
  withDescription = false,
}: {
  id: string;
  label: string;
  items: ServicePageConfig["results"]["items"];
  withDescription?: boolean;
}) {
  if (items.length === 0) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={`${id}-heading`}
      className="py-10 sm:py-12 lg:py-14"
    >
      <SectionHeading
        kicker="Proof"
        heading={label}
        headingId={`${id}-heading`}
        className="max-w-4xl"
      />
      <ul className="mt-8 border-t-2 border-primary">
        {items.map((item) => (
          <li key={`${item.metric}-${item.brand}`} className="border-b-2 border-primary">
            <Link
              href={item.href}
              className={cn(
                "group grid gap-3 py-7 sm:grid-cols-[minmax(11rem,18rem)_minmax(0,1fr)_auto] sm:items-end sm:gap-8 sm:py-8",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              )}
            >
              <p className="text-[clamp(1.75rem,3.2vw,2.5rem)] font-black leading-[0.95] tracking-tight text-primary">
                {item.metric}
              </p>
              <div className="min-w-0">
                <h3 className="text-[1.125rem] font-bold leading-snug text-primary group-hover:underline group-hover:underline-offset-4 sm:text-[1.25rem]">
                  {item.brand}
                </h3>
                {withDescription && item.description ? (
                  <p className="mt-2 max-w-2xl text-[0.9375rem] leading-[1.65] text-text-secondary sm:text-base">
                    {item.description}
                  </p>
                ) : null}
              </div>
              <span className="shrink-0 text-sm font-bold uppercase tracking-[0.06em] text-primary underline-offset-4 group-hover:underline">
                Read case study
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}

type TailPresentation = {
  deliverables: TailDeliverables;
  results: TailResults;
  faq: TailFaq;
  related: TailRelated;
  faqHeading?: string;
  relatedHeading?: string;
};

function ServiceCustomTail({
  service,
  site,
  relatedSubheading,
  presentation,
  relatedPosts = [],
}: {
  service: ServicePageConfig;
  site: SiteConfig;
  relatedSubheading: string;
  presentation: TailPresentation;
  relatedPosts?: BlogPost[];
}) {
  const faqHeading = presentation.faqHeading ?? "Questions about this service";
  const relatedHeading = presentation.relatedHeading ?? "Related services";

  return (
    <>
      {presentation.deliverables !== "omit" ? (
        <SectionShell
          id="service-deliverables"
          tone={presentation.deliverables === "rail" ? "default" : "muted"}
          ariaLabelledBy="service-deliverables-heading"
        >
          <SectionHeading
            heading={service.deliverables.heading}
            headingId="service-deliverables-heading"
          />
          {presentation.deliverables === "rail" ? (
            <ol className="mt-8 space-y-0 border-l-2 border-primary/20 pl-5 sm:pl-6">
              {service.deliverables.items.map((item, index) => (
                <li key={item.title} className="relative pb-6 last:pb-0">
                  <span
                    aria-hidden="true"
                    className="absolute -left-[1.4rem] top-1 flex h-5 w-5 items-center justify-center rounded-full border border-primary bg-background font-mono text-[10px] font-bold text-primary sm:-left-[1.65rem]"
                  >
                    {index + 1}
                  </span>
                  <h3 className="text-body font-semibold text-primary">
                    {item.title}
                  </h3>
                  <p className="mt-1 max-w-2xl text-small text-text-secondary">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>
          ) : presentation.deliverables === "sheet" ? (
            <div className="mt-8 overflow-x-auto rounded-[12px] border border-primary/20 bg-background">
              <table className="min-w-full text-left text-small">
                <thead className="border-b border-primary/15 bg-surface-muted/80 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                  <tr>
                    <th className="px-4 py-2.5 sm:px-5">#</th>
                    <th className="px-4 py-2.5 sm:px-5">Scope item</th>
                    <th className="hidden px-4 py-2.5 sm:table-cell sm:px-5">
                      What it covers
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-primary/10">
                  {service.deliverables.items.map((item, index) => (
                    <tr key={item.title}>
                      <td className="px-4 py-3 font-mono text-[11px] tabular-nums text-text-secondary sm:px-5">
                        {String(index + 1).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-3 font-semibold text-primary sm:px-5">
                        {item.title}
                        <p className="mt-1 font-normal text-text-secondary sm:hidden">
                          {item.description}
                        </p>
                      </td>
                      <td className="hidden px-4 py-3 text-text-secondary sm:table-cell sm:px-5">
                        {item.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div
              className={cn(
                "mt-8 overflow-hidden rounded-[16px] border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]",
                "border-t-4 border-t-accent",
              )}
            >
              <ul className="grid md:grid-cols-2 md:divide-x-2 md:divide-primary/15">
                {service.deliverables.items.map((item, index) => {
                  const oddRow = Math.floor(index / 2) % 2 === 1;
                  const oddMobile = index % 2 === 1;
                  return (
                    <li
                      key={item.title}
                      className={cn(
                        "flex gap-3 border-b border-primary/10 px-5 py-3.5 last:border-b-0 sm:px-6 sm:py-4",
                        "md:[&:nth-last-child(-n+2)]:border-b-0",
                        oddMobile && "bg-surface-muted/60 md:bg-transparent",
                        oddRow && "md:bg-surface-muted/60",
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 shrink-0 font-mono text-[11px] font-bold tabular-nums text-text-secondary"
                      >
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <div className="min-w-0">
                        <h3 className="text-body font-semibold text-primary">
                          {item.title}
                        </h3>
                        <p className="mt-1 text-small text-text-secondary">
                          {item.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </SectionShell>
      ) : null}

      {presentation.results !== "omit" ? (
        <SectionShell
          id="service-results"
          ariaLabelledBy="service-results-heading"
        >
          <SectionHeading
            heading={service.results.heading}
            headingId="service-results-heading"
          />
          {presentation.results === "strip" ? (
            <ul className="mt-8 divide-y divide-primary/10 overflow-hidden rounded-[12px] border border-primary/20 bg-background">
              {service.results.items.map((item) => (
                <li
                  key={item.brand}
                  className="grid gap-2 px-4 py-4 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6 sm:px-5"
                >
                  <p className="text-h4 font-black tracking-tight text-primary">
                    {item.metric}
                  </p>
                  <div className="min-w-0">
                    <h3 className="text-body font-semibold text-primary">
                      {item.brand}
                    </h3>
                    <p className="mt-1 text-small text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                  <Link
                    href={item.href}
                    className="text-small font-semibold text-primary underline-offset-4 hover:underline sm:justify-self-end"
                  >
                    Case study
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <ul className="mt-8 grid gap-4 md:grid-cols-2">
              {service.results.items.map((item) => (
                <li key={item.brand}>
                  <article className={cn("h-full p-6 sm:p-7", serviceHardPanel)}>
                    <p className="text-stat font-black tracking-tight text-primary">
                      {item.metric}
                    </p>
                    <h3 className="mt-3 text-h4 text-primary">{item.brand}</h3>
                    <p className="mt-2 text-body text-text-secondary">
                      {item.description}
                    </p>
                    <Link
                      href={item.href}
                      className="mt-4 inline-flex text-small font-semibold text-primary underline-offset-4 hover:underline"
                    >
                      View case study
                    </Link>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </SectionShell>
      ) : null}

      <SectionShell
        id="service-faq"
        ariaLabelledBy="service-faq-heading"
        tone={presentation.faq === "panel" ? "muted" : "default"}
      >
        <SectionHeading
          heading={faqHeading}
          headingId="service-faq-heading"
          className="max-w-4xl"
        />
        {/* Open FAQ band — hairline rules only (less “boxed section” chrome) */}
        <div className="mt-8 w-full border-t-2 border-primary">
          <FaqAccordion items={service.faq} variant="lime" />
        </div>
      </SectionShell>

      {presentation.related === "omit" ? null : (
        <ServicesSection
          id="service-related"
          data={{
            heading: relatedHeading,
            subheading: relatedSubheading,
            items: service.relatedServices.map((related) => ({
              title: related.title,
              description: related.description,
              href: related.href,
              icon: related.icon ?? "briefcase",
            })),
          }}
        />
      )}

      <ServiceRelatedArticles posts={relatedPosts} />

      <BlogPostCta
        site={{
          ...site,
          preFooter: {
            ...site.preFooter,
            headline: service.cta.heading,
            subheadline: service.cta.subheading ?? site.preFooter.subheadline,
            cta: service.cta.button,
          },
        }}
      />
    </>
  );
}

export function ServicePageTemplate({ service, site, relatedPosts = [] }: ServicePageTemplateProps) {
  const isCatalogOps = service.layout === "catalog-ops";
  const isBrandPathway = service.layout === "brand-pathway";
  const isEntitySetup = service.layout === "entity-setup";
  const isSourcingOps = service.layout === "sourcing-ops";
  const isDtcChannel = service.layout === "dtc-channel";
  const isLifecycleOps = service.layout === "lifecycle-ops";
  const isPpcOps = service.layout === "ppc-ops";
  const isReportingOps = service.layout === "reporting-ops";
  const isDspOps = service.layout === "dsp-ops";
  const isAccountOps = service.layout === "account-ops";
  const isListingSeo = service.layout === "listing-seo";
  const isCopyOps = service.layout === "copy-ops";
  const isVisualOps = service.layout === "visual-ops";
  const isVideoOps = service.layout === "video-ops";
  const isTiktokOps = service.layout === "tiktok-ops";
  const deferredLead = heroDefersForm(getServiceHeroPresentation(service.layout));
  const leadBand = deferredLead ? (
    <ServiceLeadBand
      service={service}
      chrome={
        isCatalogOps ? "ink" : isPpcOps || isAccountOps ? "sheet" : "plain"
      }
    />
  ) : null;

  /** Keep process/checklist; drop comparison when Differ Contrast Board exists. */
  const modules = (service.modules ?? [])
    .filter((module) => {
      if (module.type === "comparisonTable" && service.differ) return false;
      return true;
    })
    .slice(0, 5);

  const earlyVisuals = modules.filter((module) =>
    EARLY_VISUAL_TYPES.has(module.type),
  );
  const lateOps = modules.filter((module) => LATE_OPS_TYPES.has(module.type));

  if (isCatalogOps) {
    const proof = earlyVisuals.filter((m) => m.type === "browserProof");

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {proof.length > 0 ? (
          <ServiceModules modules={proof} band="proof-lead" />
        ) : null}
        {service.opsLanes ? (
          <ServiceOpsLanes opsLanes={service.opsLanes} variant="tickets" />
        ) : null}
        <SectionShell
          id="service-results"
          density="tight"
          ariaLabelledBy="service-results-heading"
        >
          <p
            id="service-results-heading"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-text-secondary"
          >
            Catalog-linked case outcomes
          </p>
          <ul className="mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2">
            {service.results.items.map((item) => (
              <li key={item.brand} className="min-w-0 text-small">
                <Link
                  href={item.href}
                  className="font-semibold text-primary underline-offset-4 hover:underline"
                >
                  {item.metric}
                </Link>
                <span className="text-text-secondary">
                  {" "}
                  · {item.brand}
                </span>
              </li>
            ))}
          </ul>
        </SectionShell>
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Listing, account, and brand work that pairs with catalog operations."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "links",
            faqHeading: "Catalog operations questions",
            relatedHeading: "Work that follows catalog cleanup",
          }}
        />
      </>
    );
  }

  if (isBrandPathway) {
    const pathwayBoard = earlyVisuals.filter(
      (m) => m.type === "brandPathwayBoard",
    );
    const unlockGrid = earlyVisuals.filter((m) => m.type === "brandUnlockGrid");

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {pathwayBoard.length > 0 ? (
          <ServiceModules modules={pathwayBoard} band="flat" />
        ) : null}
        {unlockGrid.length > 0 ? (
          <ServiceModules modules={unlockGrid} band="flat" />
        ) : null}
        <InlineCaseResults
          id="brand-case-results"
          label="Brand-ready growth outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Company setup, content, and catalog work that usually follows enrollment."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "cards",
            faqHeading: "Trademark and Brand Registry questions",
            relatedHeading: "Next steps after Brand Registry",
          }}
        />
      </>
    );
  }

  if (isEntitySetup) {
    const docBoard = earlyVisuals.filter((m) => m.type === "catalogHealthBoard");
    const handoffBoard = earlyVisuals.filter(
      (m) => m.type === "brandPathwayBoard",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {docBoard.length > 0 ? (
          <ServiceModules modules={docBoard} band="flat" />
        ) : null}
        {handoffBoard.length > 0 ? (
          <ServiceModules modules={handoffBoard} band="flat" />
        ) : null}
        <InlineCaseResults
          id="entity-case-results"
          label="After foundations · case outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Brand Registry and Amazon growth work after entity foundations are ready."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "omit",
            faqHeading: "US entity and Seller Central questions",
          }}
        />
      </>
    );
  }

  if (isSourcingOps) {
    const shortlistBoard = earlyVisuals.filter(
      (m) => m.id === "supplier-shortlist-board",
    );
    const costChart = earlyVisuals.filter((m) => m.type === "metricChart");
    const sampleScorecard = earlyVisuals.filter(
      (m) => m.id === "sample-scorecard",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {shortlistBoard.length > 0 ? (
          <ServiceModules modules={shortlistBoard} band="flat" />
        ) : null}
        {costChart.length > 0 ? (
          <ServiceModules modules={costChart} band="flat" />
        ) : null}
        {sampleScorecard.length > 0 ? (
          <ServiceModules modules={sampleScorecard} band="flat" />
        ) : null}
        <InlineCaseResults
          id="sourcing-case-results"
          label="After sourcing · catalog expansion outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Catalog, listing, and account work after sourcing decisions are locked."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "links",
            faqHeading: "Product sourcing questions",
            relatedHeading: "After the sample is approved",
          }}
        />
      </>
    );
  }

  if (isDtcChannel) {
    const syncBoard = earlyVisuals.filter((m) => m.type === "catalogHealthBoard");
    const buildPath = earlyVisuals.filter((m) => m.type === "brandPathwayBoard");
    const scopeGrid = earlyVisuals.filter((m) => m.type === "brandUnlockGrid");

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {syncBoard.length > 0 ? (
          <ServiceModules modules={syncBoard} band="flat" />
        ) : null}
        {buildPath.length > 0 ? (
          <ServiceModules modules={buildPath} band="flat" />
        ) : null}
        {scopeGrid.length > 0 ? (
          <ServiceModules modules={scopeGrid} band="flat" />
        ) : null}
        <InlineCaseResults
          id="shopify-case-results"
          label="Brand-channel outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Email, creative, and Amazon account work that pair with an owned storefront."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "cards",
            faqHeading: "Shopify for Amazon brands — questions",
            relatedHeading: "Channels that pair with Shopify",
          }}
        />
      </>
    );
  }

  if (isLifecycleOps) {
    const journeyBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const flowChart = earlyVisuals.filter((m) => m.type === "metricChart");
    const captureSheet = earlyVisuals.filter(
      (m) => m.type === "brandUnlockGrid",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {journeyBoard.length > 0 ? (
          <ServiceModules modules={journeyBoard} band="flat" />
        ) : null}
        {flowChart.length > 0 ? (
          <ServiceModules modules={flowChart} band="flat" />
        ) : null}
        {captureSheet.length > 0 ? (
          <ServiceModules modules={captureSheet} band="flat" />
        ) : null}
        <InlineCaseResults
          id="email-case-results"
          label="Brand growth retention extends"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Shopify, content, and Amazon account work that feeds owned-list retention."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "panel",
            related: "omit",
            faqHeading: "Email and retention questions",
          }}
        />
      </>
    );
  }

  if (isPpcOps) {
    const proof = earlyVisuals.filter((m) => m.type === "browserProof");
    const structureBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const charts = earlyVisuals.filter((m) => m.type === "metricChart");

    return (
      <>
        <ServiceHero service={service} site={site} />
        {proof.length > 0 ? (
          <ServiceModules modules={proof} band="proof-lead" />
        ) : null}
        <ServiceDepthBand service={service} />
        {structureBoard.length > 0 ? (
          <ServiceModules modules={structureBoard} band="flat" />
        ) : null}
        {charts.length > 0 ? (
          <ServiceModules modules={charts} band="flat" />
        ) : null}
        <InlineCaseResults
          id="ppc-case-results"
          label="PPC case outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Listing, DSP, and full-account work that pairs with Sponsored Ads."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "panel",
            related: "cards",
            faqHeading: "Amazon PPC questions",
            relatedHeading: "Services that support ad efficiency",
          }}
        />
      </>
    );
  }

  if (isReportingOps) {
    const proof = earlyVisuals.filter((m) => m.type === "browserProof");
    const kpiBoard = earlyVisuals.filter((m) => m.type === "catalogHealthBoard");
    const charts = earlyVisuals.filter((m) => m.type === "metricChart");
    const definitionSheet = earlyVisuals.filter(
      (m) => m.type === "brandUnlockGrid",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {proof.length > 0 ? (
          <ServiceModules modules={proof} band="proof-lead" />
        ) : null}
        {kpiBoard.length > 0 ? (
          <ServiceModules modules={kpiBoard} band="flat" />
        ) : null}
        {definitionSheet.length > 0 ? (
          <ServiceModules modules={definitionSheet} band="flat" />
        ) : null}
        {charts.length > 0 ? (
          <ServiceModules modules={charts} band="flat" />
        ) : null}
        <InlineCaseResults
          id="reporting-case-results"
          label="Data-led case outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="PPC, listing, and full-account work guided by the same metric definitions."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "panel",
            related: "omit",
            faqHeading: "Reporting and analytics questions",
          }}
        />
      </>
    );
  }

  if (isDspOps) {
    const proof = earlyVisuals.filter((m) => m.type === "browserProof");
    const readinessBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const funnelChart = earlyVisuals.filter((m) => m.type === "metricChart");
    const measurementGates = earlyVisuals.filter(
      (m) => m.type === "brandUnlockGrid",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {proof.length > 0 ? (
          <ServiceModules modules={proof} band="proof-lead" />
        ) : null}
        {readinessBoard.length > 0 ? (
          <ServiceModules modules={readinessBoard} band="flat" />
        ) : null}
        {funnelChart.length > 0 ? (
          <ServiceModules modules={funnelChart} band="flat" />
        ) : null}
        {measurementGates.length > 0 ? (
          <ServiceModules modules={measurementGates} band="flat" />
        ) : null}
        <InlineCaseResults
          id="dsp-case-results"
          label="DSP-supported growth"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Sponsored Ads, video creative, and full-account work that DSP expands—not replaces."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "links",
            faqHeading: "Amazon DSP questions",
            relatedHeading: "Lower-funnel and creative partners",
          }}
        />
      </>
    );
  }

  if (isAccountOps) {
    const proof = earlyVisuals.filter((m) => m.type === "browserProof");
    const ownershipBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const programPath = earlyVisuals.filter(
      (m) => m.type === "brandPathwayBoard",
    );
    const spotlightModules = earlyVisuals.filter(
      (m) => m.type === "infographicSpotlight",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {proof.length > 0 ? (
          <ServiceModules modules={proof} band="proof-lead" />
        ) : null}
        {ownershipBoard.length > 0 ? (
          <ServiceModules modules={ownershipBoard} band="flat" />
        ) : null}
        {service.opsLanes ? (
          <ServiceOpsLanes opsLanes={service.opsLanes} variant="tickets" />
        ) : null}
        <ServiceCaseOutcomes
          id="account-case-results"
          heading={service.results.heading}
          subheading="Verified metrics from named case studies. Not a guarantee of identical results."
          items={service.results.items}
        />
        {programPath.length > 0 ? (
          <ServiceModules modules={programPath} band="flat" />
        ) : null}
        {spotlightModules.length > 0 ? (
          <ServiceModules modules={spotlightModules} band="flat" />
        ) : null}
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="PPC, listing, and reporting work that run under the same account roadmap."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "panel",
            related: "cards",
            faqHeading: "Full-account management questions",
            relatedHeading: "Related services under full-account management",
          }}
        />
      </>
    );
  }

  if (isListingSeo) {
    const fieldBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const cvrChart = earlyVisuals.filter((m) => m.type === "metricChart");

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {cvrChart.length > 0 ? (
          <ServiceModules modules={cvrChart} band="flat" />
        ) : null}
        {fieldBoard.length > 0 ? (
          <ServiceModules modules={fieldBoard} band="flat" />
        ) : null}
        <InlineCaseResults
          id="listing-case-results"
          label="Listing-led case outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Content writing, visuals, and PPC that land on conversion-ready listings."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "links",
            faqHeading: "Listing optimization questions",
            relatedHeading: "Build the PDP stack",
          }}
        />
      </>
    );
  }

  if (isCopyOps) {
    const claimBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const outcomeChart = earlyVisuals.filter((m) => m.type === "metricChart");
    const publishGates = earlyVisuals.filter(
      (m) => m.type === "brandUnlockGrid",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {claimBoard.length > 0 ? (
          <ServiceModules modules={claimBoard} band="flat" />
        ) : null}
        {publishGates.length > 0 ? (
          <ServiceModules modules={publishGates} band="flat" />
        ) : null}
        {service.opsLanes ? (
          <ServiceOpsLanes opsLanes={service.opsLanes} variant="tickets" />
        ) : null}
        {outcomeChart.length > 0 ? (
          <ServiceModules modules={outcomeChart} band="flat" />
        ) : null}
        <InlineCaseResults
          id="copy-case-results"
          label="Copy and A+ case outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Listing SEO, visuals, and account work that carry the same voice into publish."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "omit",
            faqHeading: "Amazon copy and A+ questions",
          }}
        />
      </>
    );
  }

  if (isVisualOps) {
    const physicalProof = earlyVisuals.filter((m) => m.type === "proofGallery");
    const sequenceBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const sequenceChart = earlyVisuals.filter((m) => m.type === "metricChart");
    const spotlightModules = earlyVisuals.filter(
      (m) => m.type === "infographicSpotlight",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {physicalProof.length > 0 ? (
          <ServiceModules modules={physicalProof} band="proof-lead" />
        ) : null}
        {sequenceBoard.length > 0 ? (
          <ServiceModules modules={sequenceBoard} band="flat" />
        ) : null}
        {sequenceChart.length > 0 ? (
          <ServiceModules modules={sequenceChart} band="flat" />
        ) : null}
        {spotlightModules.length > 0 ? (
          <ServiceModules modules={spotlightModules} band="flat" />
        ) : null}
        <InlineCaseResults
          id="visual-case-results"
          label="Creative outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Video, copy, and listing SEO that complete the same PDP story."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "links",
            faqHeading: "Visual creative questions",
            relatedHeading: "Creative that completes the listing",
          }}
        />
      </>
    );
  }

  if (isVideoOps) {
    const beatBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const placementChart = earlyVisuals.filter((m) => m.type === "metricChart");

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {beatBoard.length > 0 ? (
          <ServiceModules modules={beatBoard} band="flat" />
        ) : null}
        {service.opsLanes ? (
          <ServiceOpsLanes opsLanes={service.opsLanes} variant="columns" />
        ) : null}
        {placementChart.length > 0 ? (
          <ServiceModules modules={placementChart} band="flat" />
        ) : null}
        <InlineCaseResults
          id="video-case-results"
          label="Video-supported creative outcomes"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Still creative, PPC, and DSP placements that use the same product proof."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "panel",
            related: "omit",
            faqHeading: "Amazon video creative questions",
          }}
        />
      </>
    );
  }

  if (isTiktokOps) {
    const fitBoard = earlyVisuals.filter(
      (m) => m.type === "catalogHealthBoard",
    );
    const scaleChart = earlyVisuals.filter((m) => m.type === "metricChart");
    const scaleGates = earlyVisuals.filter(
      (m) => m.type === "brandUnlockGrid",
    );

    return (
      <>
        <ServiceHero service={service} site={site} />
        <ServiceDepthBand service={service} />
        {fitBoard.length > 0 ? (
          <ServiceModules modules={fitBoard} band="flat" />
        ) : null}
        {scaleChart.length > 0 ? (
          <ServiceModules modules={scaleChart} band="flat" />
        ) : null}
        {scaleGates.length > 0 ? (
          <ServiceModules modules={scaleGates} band="flat" />
        ) : null}
        {service.opsLanes ? (
          <ServiceOpsLanes opsLanes={service.opsLanes} variant="tickets" />
        ) : null}
        <InlineCaseResults
          id="tiktok-case-results"
          label="Amazon foundations Shop tests respect"
          items={service.results.items}
          withDescription
        />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}
          relatedSubheading="Amazon PPC, video, and Shopify work that stay primary while TikTok tests complementary demand."
          presentation={{
            deliverables: "omit",
            results: "omit",
            faq: "plain",
            related: "links",
            faqHeading: "TikTok Shop ads questions",
            relatedHeading: "Keep Amazon primary",
          }}
        />
      </>
    );
  }

  return (
    <>
      <ServiceHero service={service} site={site} />

      <ServiceStatsStrip stats={service.stats} />

      <ServiceProblemSection problem={service.problem} />

      {service.audience ? (
        <ServiceAudienceSection audience={service.audience} />
      ) : null}

      <ServiceSolutionSection
        solution={service.solution}
        tone={service.audience ? "default" : "muted"}
      />

      {earlyVisuals.length > 0 ? (
        <ServiceModules modules={earlyVisuals} band="flat" />
      ) : null}

      {/* Deliverables — Spec Sheet with index codes */}
      <SectionShell
        id="service-deliverables"
        tone="muted"
        ariaLabelledBy="service-deliverables-heading"
      >
        <SectionHeading
          kicker="What you get"
          heading={service.deliverables.heading}
          headingId="service-deliverables-heading"
        />
        <div
          className={cn(
            "mt-8 overflow-hidden rounded-[16px] border-2 border-primary bg-background shadow-[4px_4px_0_0_#131311]",
            "border-t-4 border-t-accent",
          )}
        >
          <p className="border-b-2 border-primary px-5 py-3 text-[11px] font-bold uppercase tracking-[0.14em] text-primary sm:px-6">
            Includes
          </p>
          <ul className="grid md:grid-cols-2 md:divide-x-2 md:divide-primary/15">
            {service.deliverables.items.map((item, index) => {
              const oddRow = Math.floor(index / 2) % 2 === 1;
              const oddMobile = index % 2 === 1;
              return (
                <li
                  key={item.title}
                  className={cn(
                    "flex gap-3 border-b border-primary/10 px-5 py-3.5 last:border-b-0 sm:px-6 sm:py-4 md:odd:border-r-0",
                    "md:[&:nth-last-child(-n+2)]:border-b-0",
                    oddMobile && "bg-surface-muted/60 md:bg-transparent",
                    oddRow && "md:bg-surface-muted/60",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="mt-0.5 shrink-0 font-mono text-[11px] font-bold tabular-nums text-text-secondary"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-body font-semibold text-primary">
                      {item.title}
                    </h3>
                    <p className="mt-1 text-small text-text-secondary">
                      {item.description}
                    </p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </SectionShell>

      {/* Differ — Contrast Board + desktop lime column rule */}
      {service.differ ? (
        <SectionShell id="service-differ" ariaLabelledBy="service-differ-heading">
          <SectionHeading
            kicker="Why us"
            heading={service.differ.heading}
            headingId="service-differ-heading"
          />
          <ul
            className={cn(
              "relative mt-8 grid overflow-hidden rounded-[16px] border-2 border-primary bg-primary shadow-[6px_6px_0_0_#131311] md:grid-cols-2",
              "md:before:pointer-events-none md:before:absolute md:before:inset-y-0 md:before:left-1/2 md:before:z-10 md:before:w-0.5 md:before:-translate-x-1/2 md:before:bg-accent",
            )}
          >
            {service.differ.points.map((point, index) => {
              const count = service.differ!.points.length;
              const isLead = index === 0;
              return (
                <li
                  key={point.title}
                  className={cn(
                    "border-accent/25 p-5 sm:p-6",
                    index < count - 1 && "border-b md:border-b-0",
                    index % 2 === 0 && "md:border-r md:border-r-transparent",
                    index < count - 2 && "md:border-b",
                    isLead ? "bg-accent text-primary" : "bg-primary text-text-on-dark",
                  )}
                >
                  <p
                    className={cn(
                      "text-[11px] font-bold uppercase tracking-[0.14em]",
                      isLead ? "text-primary/70" : "text-accent",
                    )}
                  >
                    {isLead ? "Lead difference" : String(index + 1).padStart(2, "0")}
                  </p>
                  <h3
                    className={cn(
                      "mt-2 text-h4",
                      isLead ? "text-primary" : "text-text-on-dark",
                    )}
                  >
                    {point.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-2 text-body",
                      isLead ? "text-primary/85" : "text-text-on-dark/80",
                    )}
                  >
                    {point.description}
                  </p>
                </li>
              );
            })}
          </ul>
        </SectionShell>
      ) : null}

      {lateOps.length > 0 ? <ServiceModules modules={lateOps} band="flat" /> : null}

      <SectionShell
        id="service-results"
        tone="muted"
        ariaLabelledBy="service-results-heading"
      >
        <SectionHeading
          kicker="Proof"
          heading={service.results.heading}
          headingId="service-results-heading"
        />
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {service.results.items.map((item) => (
            <li key={item.brand}>
              <article className={cn("h-full p-6 sm:p-7", serviceHardPanel)}>
                <p className="text-stat font-black tracking-tight text-primary">
                  {item.metric}
                </p>
                <h3 className="mt-3 text-h4 text-primary">{item.brand}</h3>
                <p className="mt-2 text-body text-text-secondary">
                  {item.description}
                </p>
                <Link
                  href={item.href}
                  className="mt-4 inline-flex text-small font-semibold text-primary underline-offset-4 hover:underline"
                >
                  View case studies
                </Link>
              </article>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell id="service-faq" ariaLabelledBy="service-faq-heading">
        <SectionHeading
          heading="Frequently asked questions"
          headingId="service-faq-heading"
          className="max-w-4xl"
        />
        <div className="mt-8 w-full border-t-2 border-primary">
          <FaqAccordion items={service.faq} variant="lime" />
        </div>
      </SectionShell>

      <ServicesSection
        id="service-related"
        data={{
          heading: "Related services",
          subheading: "Explore additional capabilities from our in-house team.",
          items: service.relatedServices.map((related) => ({
            title: related.title,
            description: related.description,
            href: related.href,
            icon: related.icon ?? "briefcase",
          })),
        }}
      />

      <BlogPostCta
        site={{
          ...site,
          preFooter: {
            ...site.preFooter,
            headline: service.cta.heading,
            subheadline: service.cta.subheading ?? site.preFooter.subheadline,
            cta: service.cta.button,
          },
        }}
      />
    </>
  );
}
