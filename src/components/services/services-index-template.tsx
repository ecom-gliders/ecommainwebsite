import type { ServicesIndexConfig, SiteConfig } from "@/domain/content/schemas";
import { BlogPostCta } from "@/components/blog/blog-post-cta";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { ServicesIndexAlsoAvailable } from "./services-index-also-available";
import { ServicesIndexAudience } from "./services-index-audience";
import { ServicesIndexCapabilityRail } from "./services-index-capability-rail";
import { ServicesIndexFlagship } from "./services-index-flagship";
import { ServicesIndexHero } from "./services-index-hero";
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
    <div className="services-hub">
      <ServicesIndexHero hero={index.hero} />
      <ServicesIndexAudience audience={index.audience} />
      <ServicesIndexFlagship flagship={index.flagship} />
      <ServicesIndexCapabilityRail
        capabilityRail={index.capabilityRail}
        focusedPaths={index.focusedPaths}
      />
      <ServicesIndexStack engagement={index.engagement} />
      <ServicesIndexResults results={index.results} />
      <ServicesIndexAlsoAvailable alsoAvailable={index.alsoAvailable} />

      <SectionShell
        id="services-faq"
        ariaLabelledBy="services-faq-heading"
        className="py-14 sm:py-16 lg:py-20"
      >
        <SectionHeading
          heading="Frequently asked questions"
          headingId="services-faq-heading"
          className="max-w-4xl"
        />
        <div className="mt-8 w-full">
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
    </div>
  );
}
