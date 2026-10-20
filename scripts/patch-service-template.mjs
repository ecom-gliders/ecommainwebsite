import fs from "fs";

const p = "src/components/services/service-page-template.tsx";
let s = fs.readFileSync(p, "utf8");

if (!s.includes("ServiceDepthBand")) {
  s = s.replace(
    'import { ServiceAudienceSection } from "./sections/service-audience-section";',
    `import { ServiceAudienceSection } from "./sections/service-audience-section";
import { ServiceDepthBand } from "./sections/service-depth-band";
import { ServiceRelatedArticles } from "./service-related-articles";
import type { BlogPost } from "@/domain/content/schemas";`,
  );
}

s = s.replace(
  `interface ServicePageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
}`,
  `interface ServicePageTemplateProps {
  service: ServicePageConfig;
  site: SiteConfig;
  relatedPosts?: BlogPost[];
}`,
);

s = s.replace(
  "export function ServicePageTemplate({ service, site }: ServicePageTemplateProps)",
  "export function ServicePageTemplate({ service, site, relatedPosts = [] }: ServicePageTemplateProps)",
);

s = s.replace(
  `function ServiceCustomTail({
  service,
  site,
  relatedSubheading,
  presentation,
}: {
  service: ServicePageConfig;
  site: SiteConfig;
  relatedSubheading: string;
  presentation: TailPresentation;
})`,
  `function ServiceCustomTail({
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
})`,
);

s = s.replace(
  "Pods inside the account roadmap",
  "Related services under full-account management",
);

// Pass relatedPosts into every ServiceCustomTail call
s = s.replace(
  /<ServiceCustomTail\n(\s+)service=\{service\}\n(\s+)site=\{site\}/g,
  `<ServiceCustomTail\n$1service={service}\n$2site={site}\n$2relatedPosts={relatedPosts}`,
);

// Insert depth band before leadBand in custom layouts
s = s.replaceAll(
  `{leadBand}
        <ServiceCustomTail`,
  `<ServiceDepthBand service={service} />
        {leadBand}
        <ServiceCustomTail`,
);

// Related articles before BlogPostCta inside CustomTail only
const customTailCta = `      <BlogPostCta
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

export function ServicePageTemplate`;

if (!s.includes("ServiceRelatedArticles posts={relatedPosts}")) {
  s = s.replace(
    customTailCta,
    `      <ServiceRelatedArticles posts={relatedPosts} />
${customTailCta}`,
  );
}

// Default layout: related articles + green result metrics
s = s.replace(
  `<p className="text-stat font-black tracking-tight text-primary">
                  {item.metric}
                </p>`,
  `<p className="services-hub-metric text-success">
                  {item.metric}
                </p>`,
);

if (!s.includes("service-related-articles-default")) {
  s = s.replace(
    `      <ServicesSection
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

      <BlogPostCta`,
    `      <ServicesSection
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

      <div id="service-related-articles-default">
        <ServiceRelatedArticles posts={relatedPosts} />
      </div>

      <BlogPostCta`,
  );
}

fs.writeFileSync(p, s);
console.log("patched", p);
