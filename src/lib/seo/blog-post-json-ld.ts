import type { BlogPost, FaqItem, SiteConfig } from "@/domain/content/schemas";
import { absoluteUrl, getSiteUrl } from "./site-url";

interface BuildBlogPostJsonLdInput {
  post: BlogPost;
  site: SiteConfig;
  faqItems?: FaqItem[];
}

export function buildBlogPostJsonLd({
  post,
  site,
  faqItems = [],
}: BuildBlogPostJsonLdInput): Record<string, unknown> {
  const pageUrl = absoluteUrl(post.seo.canonical);

  const blogPosting = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: site.name,
      url: getSiteUrl(),
    },
    image: post.featuredImage ? absoluteUrl(post.featuredImage) : undefined,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    url: pageUrl,
  };

  const graph: Record<string, unknown>[] = [blogPosting];

  if (faqItems.length > 0) {
    graph.push({
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer,
        },
      })),
    });
  }

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}
