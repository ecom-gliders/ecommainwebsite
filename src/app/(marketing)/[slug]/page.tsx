import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  BlogPostArticle,
  getBlogPostFaqItems,
} from "@/components/blog/blog-post-article";
import { CaseStudyDetailTemplate } from "@/components/case-studies/case-study-detail-template";
import { DspPageTemplate } from "@/components/services/dsp/dsp-page-template";
import { FullServicePageTemplate } from "@/components/services/full-service/full-service-page-template";
import { PpcPageTemplate } from "@/components/services/ppc/ppc-page-template";
import { AosPageTemplate } from "@/components/services/account-ops/aos-page-template";
import { CatPageTemplate } from "@/components/services/catalog/cat-page-template";
import { CpyPageTemplate } from "@/components/services/content/cpy-page-template";
import { VidPageTemplate } from "@/components/services/video/vid-page-template";
import { VisPageTemplate } from "@/components/services/visual/vis-page-template";
import { LstPageTemplate } from "@/components/services/listing/lst-page-template";
import { BrdPageTemplate } from "@/components/services/brand/brd-page-template";
import { EntPageTemplate } from "@/components/services/entity/ent-page-template";
import { SrcPageTemplate } from "@/components/services/sourcing/src-page-template";
import { RptPageTemplate } from "@/components/services/reporting/rpt-page-template";
import { TtkPageTemplate } from "@/components/services/tiktok/ttk-page-template";
import { ShpPageTemplate } from "@/components/services/shopify/shp-page-template";
import { ScPageTemplate } from "@/components/services/seller-central/sc-page-template";
import { AhlPageTemplate } from "@/components/services/account-health/ahl-page-template";
import { InvPageTemplate } from "@/components/services/inventory/inv-page-template";
import { LncPageTemplate } from "@/components/services/launch/lnc-page-template";
import { EmlPageTemplate } from "@/components/services/email/eml-page-template";
import { ServicePageTemplate } from "@/components/services/service-page-template";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import { buildBlogPostJsonLd } from "@/lib/seo/blog-post-json-ld";
import { buildCaseStudyDetailJsonLd } from "@/lib/seo/case-studies-json-ld";
import { JsonLdScript } from "@/lib/seo/json-ld-script";
import { pageSeoToMetadata } from "@/lib/seo/page-metadata";
import { buildServicePageJsonLd } from "@/lib/seo/service-page-json-ld";

export const dynamicParams = false;

interface SlugPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const repository = getContentRepository();
  const [blogSlugs, serviceSlugs, caseStudySlugs] = await Promise.all([
    repository.getAllBlogSlugs(),
    repository.getAllServiceSlugs(),
    repository.getAllCaseStudySlugs(),
  ]);

  const allSlugs = [...new Set([...blogSlugs, ...serviceSlugs, ...caseStudySlugs])];
  return allSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const repository = getContentRepository();
  const service = await repository.getService(slug);

  if (service) {
    return pageSeoToMetadata(service.seo);
  }

  const caseStudy = await repository.getCaseStudy(slug);

  if (caseStudy) {
    return pageSeoToMetadata(caseStudy.seo, { openGraphType: "article" });
  }

  const post = await repository.getBlogPost(slug);

  if (!post) {
    return {
      title: "Page not found | eCom Gliders",
      robots: { index: false, follow: false },
    };
  }

  return pageSeoToMetadata(post.seo, { openGraphType: "article" });
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const repository = getContentRepository();
  const site = await repository.getSiteConfig();
  const service = await repository.getService(slug);

  if (service) {
    const { loadServiceRelatedPosts } = await import(
      "@/lib/blog/select-service-related-posts"
    );
    const relatedPosts = await loadServiceRelatedPosts(
      () => repository.getAllBlogPostFrontmatter(),
      (postSlug) => repository.getBlogPost(postSlug),
      service.slug,
      3,
    );
    const jsonLd = buildServicePageJsonLd({ service, site });

    return (
      <>
        <JsonLdScript data={jsonLd} />
        <main id="main-content">
          {service.layout === "fullServiceCommand" ? (
            <FullServicePageTemplate service={service} site={site} />
          ) : service.layout === "ppcCockpit" ? (
            <PpcPageTemplate service={service} site={site} />
          ) : service.layout === "dspReachLattice" ? (
            <DspPageTemplate service={service} site={site} />
          ) : service.layout === "reportingLedger" ? (
            <RptPageTemplate service={service} site={site} />
          ) : service.layout === "accountOpsShift" ? (
            <AosPageTemplate service={service} site={site} />
          ) : service.layout === "listingPdpStack" ? (
            <LstPageTemplate service={service} site={site} />
          ) : service.layout === "contentCopyDesk" ? (
            <CpyPageTemplate service={service} site={site} />
          ) : service.layout === "catalogBuyBoxGrid" ? (
            <CatPageTemplate service={service} site={site} />
          ) : service.layout === "visualFrameStack" ? (
            <VisPageTemplate service={service} site={site} />
          ) : service.layout === "videoStoryboard" ? (
            <VidPageTemplate service={service} site={site} />
          ) : service.layout === "brandPathwaySeal" ? (
            <BrdPageTemplate service={service} site={site} />
          ) : service.layout === "entitySetupLadder" ? (
            <EntPageTemplate service={service} site={site} />
          ) : service.layout === "sourcingLaneMap" ? (
            <SrcPageTemplate service={service} site={site} />
          ) : service.layout === "tiktokSparkRail" ? (
            <TtkPageTemplate service={service} site={site} />
          ) : service.layout === "dtcStorefrontRail" ? (
            <ShpPageTemplate service={service} site={site} />
          ) : service.layout === "launchCountdownBoard" ? (
            <LncPageTemplate service={service} site={site} />
          ) : service.layout === "inventoryPulseBoard" ? (
            <InvPageTemplate service={service} site={site} />
          ) : service.layout === "sellerCentralConsole" ? (
            <ScPageTemplate service={service} site={site} />
          ) : service.layout === "accountHealthGauge" ? (
            <AhlPageTemplate service={service} site={site} />
          ) : service.layout === "lifecycleCadenceLoop" ? (
            <EmlPageTemplate service={service} site={site} />
          ) : (
            <ServicePageTemplate
              service={service}
              site={site}
              relatedPosts={relatedPosts}
            />
          )}
        </main>
      </>
    );
  }

  const caseStudy = await repository.getCaseStudy(slug);

  if (caseStudy) {
    const allStudies = await repository.getCaseStudies();
    const relatedStudies = (caseStudy.relatedSlugs ?? [])
      .map((relatedSlug) => allStudies.find((study) => study.slug === relatedSlug))
      .filter((study): study is NonNullable<typeof study> => Boolean(study))
      .slice(0, 3);
    const jsonLd = buildCaseStudyDetailJsonLd({ study: caseStudy, site });

    return (
      <>
        <JsonLdScript data={jsonLd} />
        <main id="main-content">
          <CaseStudyDetailTemplate
            study={caseStudy}
            site={site}
            relatedStudies={relatedStudies}
          />
        </main>
      </>
    );
  }

  const [post, relatedPosts] = await Promise.all([
    repository.getBlogPost(slug),
    repository.getRelatedBlogPosts(slug, 3),
  ]);

  if (!post) {
    notFound();
  }

  const faqItems = getBlogPostFaqItems(post.content);
  const jsonLd = buildBlogPostJsonLd({ post, site, faqItems });

  return (
    <>
      <JsonLdScript data={jsonLd} />
      <main id="main-content">
        <BlogPostArticle post={post} relatedPosts={relatedPosts} site={site} />
      </main>
    </>
  );
}
