import type { ServicesIndexConfig, SiteConfig } from "@/domain/content/schemas";
import { BlogPostCta } from "@/components/blog/blog-post-cta";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { ServicesIndexCategories } from "./services-index-categories";
import { ServicesIndexHero } from "./services-index-hero";
import { ServicesIndexProof } from "./services-index-proof";
import { ServicesIndexResults } from "./services-index-results";
import { ServicesIndexStack } from "./services-index-stack";

interface ServicesIndexTemplateProps {
  index: ServicesIndexConfig;
  site: SiteConfig;
}

export function ServicesIndexTemplate({
  index,
  site,
}: ServicesIndexTemplateProps) {
  return (
    <>
      <ServicesIndexHero hero={index.hero} flagshipCta={index.flagship.cta} />
      <ServicesIndexCategories categories={index.categories} />
      <ServicesIndexStack stack={index.stack} />
      <ServicesIndexProof proof={index.proof} />
      <ServicesIndexResults featuredResults={index.featuredResults} />

      <SectionShell
        id="services-faq"
        ariaLabelledBy="services-faq-heading"
        className="py-12 sm:py-16"
      >
        <SectionHeading
          heading="Frequently asked questions"
          headingId="services-faq-heading"
        />
        <div className="mt-8">
          <FaqAccordion items={index.faq} />
        </div>
      </SectionShell>

      <BlogPostCta
        site={{
          ...site,
          preFooter: {
            ...site.preFooter,
            headline: index.cta.heading,
            subheadline: index.cta.subheading,
            cta: index.cta.button,
          },
        }}
      />
    </>
  );
}
