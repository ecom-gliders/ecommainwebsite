import type { ContentRepository } from "@/domain/content/content-repository";
import type { HtmlSitemapGroup } from "@/components/resources/html-sitemap-template";

type SitemapLink = { label: string; href: string };

function normalizeHref(href: string): string {
  if (href === "/") return "/";
  return href.endsWith("/") ? href : `${href}/`;
}

function dedupeLinks(links: SitemapLink[]): SitemapLink[] {
  const seen = new Set<string>();
  const result: SitemapLink[] = [];

  for (const link of links) {
    const href = normalizeHref(link.href);
    if (seen.has(href)) continue;
    seen.add(href);
    result.push({ label: link.label, href });
  }

  return result;
}

function isIndexableSeo(seo: { robots?: { index?: boolean } } | undefined): boolean {
  return seo?.robots?.index !== false;
}

/**
 * Visitor-facing HTML sitemap groups — public, canonical paths only.
 * Keeps the directory compact and aligned with footer Resources → Sitemap.
 */
export async function buildHtmlSitemapGroups(
  repository: ContentRepository,
): Promise<HtmlSitemapGroup[]> {
  const [navigation, serviceSlugs, caseStudies, toolSlugs, toolsPage] =
    await Promise.all([
      repository.getNavigation(),
      repository.getAllServiceSlugs(),
      repository.getCaseStudies(),
      repository.getAllFreeAmazonToolSlugs(),
      repository.getFreeAmazonToolsPage(),
    ]);

  const tools = (
    await Promise.all(
      toolSlugs.map((slug) => repository.getFreeAmazonTool(slug)),
    )
  ).filter((tool): tool is NonNullable<typeof tool> => tool !== null);

  const services = (
    await Promise.all(serviceSlugs.map((slug) => repository.getService(slug)))
  ).filter(
    (service): service is NonNullable<typeof service> =>
      service !== null && isIndexableSeo(service.seo),
  );

  const indexableCases = caseStudies.filter((study) =>
    isIndexableSeo(study.seo),
  );

  const groups: HtmlSitemapGroup[] = [
    {
      title: "Main pages",
      links: dedupeLinks([
        { label: "Home", href: "/" },
        { label: "Services", href: "/services/" },
        { label: "Free Audit", href: "/free-audit/" },
        { label: "Case Studies", href: "/case-studies/" },
        { label: "Blog", href: "/blog/" },
        { label: "Contact Us", href: "/contact/" },
      ]),
    },
    {
      title: "Company",
      links: dedupeLinks([
        { label: "About us", href: "/about-us/" },
        { label: "Agency Partnership", href: "/agency-partnership/" },
        { label: "Careers", href: "/careers/" },
      ]),
    },
    {
      title: "Resources",
      links: dedupeLinks([
        { label: "FAQ", href: "/faq/" },
        { label: "Sitemap", href: "/site-map/" },
        { label: "Free Amazon Tools", href: "/free-amazon-tools/" },
      ]),
    },
    {
      title: "Free Amazon Tools",
      links: dedupeLinks([
        { label: toolsPage.hero.title, href: "/free-amazon-tools/" },
        ...tools.map((tool) => ({
          label: tool.hero.title,
          href: `/free-amazon-tools/${tool.slug}/`,
        })),
      ]),
    },
    {
      title: "Services",
      links: dedupeLinks(
        services.map((service) => ({
          label: service.breadcrumbLabel,
          href: `/${service.slug}/`,
        })),
      ),
    },
    {
      title: "Case studies",
      links: dedupeLinks([
        ...indexableCases.map((study) => ({
          label: study.title,
          href: `/${study.slug}/`,
        })),
        { label: "All case studies", href: "/case-studies/" },
      ]),
    },
    {
      title: "Legal",
      links: dedupeLinks(
        navigation.footer.legal.map((link) => ({
          label: link.label,
          href: link.href,
        })),
      ),
    },
  ];

  return groups.filter((group) => group.links.length > 0);
}
