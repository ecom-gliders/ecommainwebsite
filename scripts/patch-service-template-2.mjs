import fs from "fs";

const p = "src/components/services/service-page-template.tsx";
let s = fs.readFileSync(p, "utf8");

// Insert depth band before every leadBand + CustomTail block in custom layouts
const needle = `{leadBand}
        <ServiceCustomTail
          service={service}
          site={site}`;

const replacement = `<ServiceDepthBand service={service} />
        {leadBand}
        <ServiceCustomTail
          service={service}
          site={site}
          relatedPosts={relatedPosts}`;

if (!s.includes("<ServiceDepthBand service={service} />")) {
  const count = s.split(needle).length - 1;
  s = s.replaceAll(needle, replacement);
  console.log("depth+relatedPosts inserts:", count);
} else {
  console.log("depth already present");
}

// Fix pods heading if still present
s = s.replace(
  "Pods inside the account roadmap",
  "Related services under full-account management",
);

// Default layout green metrics + related articles
s = s.replace(
  `<p className="text-stat font-black tracking-tight text-primary">
                  {item.metric}
                </p>`,
  `<p className="services-hub-metric text-success">
                  {item.metric}
                </p>`,
);

if (!s.includes('id="service-related-articles-default"')) {
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
  console.log("default related articles added");
}

fs.writeFileSync(p, s);
console.log("done");
