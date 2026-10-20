import type { HomepageSection, SiteConfig } from "@/domain/content/schemas";
import { AskAiSection } from "./ask-ai-section";
import { BlogPreviewSection } from "./blog-preview-section";
import { BrandValuesSection } from "./brand-values-section";
import { CaseStudiesSection } from "./case-studies-section";
import { ChecklistTickerSection } from "./checklist-ticker-section";
import { ComparisonSection } from "./comparison-section";
import { CreativeShowcaseSection } from "./creative-showcase-section";
import { CtaSection } from "./cta-section";
import { FaqSection } from "./faq-section";
import { FreeAuditCardSection } from "./free-audit-card-section";
import { HeroSection } from "./hero-section";
import { MarketsSection } from "./markets-section";
import { PainStripSection } from "./pain-strip-section";
import { ProcessSection } from "./process-section";
import { PromoCampaignSliderSection } from "./promo-campaign-slider-section";
import { SellerSegmentsSection } from "./seller-segments-section";
import { ServicesSection } from "./services-section";
import { StatsSection } from "./stats-section";
import { TestimonialsSection } from "./testimonials-section";
import { TrustBarSection } from "./trust-bar-section";
import { VideoReviewsSection } from "./video-reviews-section";

interface HomepageSectionRendererProps {
  section: HomepageSection;
  site: SiteConfig;
}

export function HomepageSectionRenderer({
  section,
  site,
}: HomepageSectionRendererProps) {
  if (!section.enabled) {
    return null;
  }

  switch (section.type) {
    case "hero":
      return <HeroSection id={section.id} data={section.data} />;
    case "promoCampaignSlider":
      return (
        <PromoCampaignSliderSection id={section.id} data={section.data} />
      );
    case "checklistTicker":
      return <ChecklistTickerSection id={section.id} data={section.data} />;
    case "painStrip":
      return <PainStripSection id={section.id} data={section.data} />;
    case "trustBar":
      return <TrustBarSection id={section.id} data={section.data} />;
    case "markets":
      return <MarketsSection id={section.id} data={section.data} />;
    case "stats":
      return <StatsSection id={section.id} data={section.data} />;
    case "services":
      return <ServicesSection id={section.id} data={section.data} />;
    case "creativeShowcase":
      return <CreativeShowcaseSection id={section.id} data={section.data} />;
    case "sellerSegments":
      return <SellerSegmentsSection id={section.id} data={section.data} />;
    case "caseStudies":
      return <CaseStudiesSection id={section.id} data={section.data} />;
    case "videoReviews":
      return <VideoReviewsSection id={section.id} data={section.data} />;
    case "brandValues":
      return <BrandValuesSection id={section.id} data={section.data} />;
    case "process":
      return <ProcessSection id={section.id} data={section.data} />;
    case "freeAuditCard":
      return <FreeAuditCardSection id={section.id} data={section.data} />;
    case "comparison":
      return <ComparisonSection id={section.id} data={section.data} />;
    case "testimonials":
      return <TestimonialsSection id={section.id} data={section.data} />;
    case "blogPreview":
      return <BlogPreviewSection id={section.id} data={section.data} />;
    case "faq":
      return <FaqSection id={section.id} data={section.data} />;
    case "cta":
      return <CtaSection id={section.id} data={section.data} />;
    case "askAi":
      return (
        <AskAiSection
          id={section.id}
          data={section.data}
          announcementBar={site.announcementBar}
        />
      );
    case "contactTeaser":
      return null;
    default:
      return null;
  }
}

interface HomepageSectionsProps {
  sections: HomepageSection[];
  site: SiteConfig;
}

export function HomepageSections({ sections, site }: HomepageSectionsProps) {
  return (
    <>
      {sections.map((section) => (
        <HomepageSectionRenderer
          key={section.id}
          section={section}
          site={site}
        />
      ))}
    </>
  );
}
