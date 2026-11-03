import { headers } from "next/headers";
import { FooterBottom } from "@/components/layout/footer-bottom";
import { FooterMain } from "@/components/layout/footer-main";
import { PreFooterCta } from "@/components/layout/pre-footer-cta";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";
import {
  FOOTER_RECENT_ITEM_LIMIT,
  selectFooterRecentBlogLinks,
  selectFooterRecentCaseStudyLinks,
} from "@/lib/footer/select-footer-recent-links";

/**
 * Project One footer chrome — ink slab, 20px top radius, lime CTA strip.
 * Service pages omit the shared “Ready to scale” pre-footer (they already close with a service-specific CTA).
 */
export async function SiteFooter() {
  const repository = getContentRepository();
  const [navigation, site, serviceSlugs, recentPosts, caseStudies, headerStore] =
    await Promise.all([
      repository.getNavigation(),
      repository.getSiteConfig(),
      repository.getAllServiceSlugs(),
      repository.getRecentBlogPosts(FOOTER_RECENT_ITEM_LIMIT),
      repository.getCaseStudies(),
      headers(),
    ]);

  const pathname = headerStore.get("x-pathname") ?? "";
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const suppressPreFooter =
    slug === "services" ||
    slug === "about-us" ||
    slug === "contact" ||
    slug === "free-audit" ||
    slug === "privacy-policy" ||
    slug === "terms-conditions" ||
    serviceSlugs.includes(slug);

  const recentBlogLinks = selectFooterRecentBlogLinks(
    recentPosts,
    FOOTER_RECENT_ITEM_LIMIT,
  );
  const recentCaseStudyLinks = selectFooterRecentCaseStudyLinks(
    caseStudies,
    FOOTER_RECENT_ITEM_LIMIT,
  );

  return (
    <footer className="relative mt-6 overflow-hidden rounded-t-[20px] bg-primary text-text-on-dark sm:mt-8">
      {suppressPreFooter ? null : <PreFooterCta preFooter={site.preFooter} />}
      <FooterMain
        footer={navigation.footer}
        site={site}
        recentBlogLinks={recentBlogLinks}
        recentCaseStudyLinks={recentCaseStudyLinks}
      />
      <FooterBottom legal={navigation.footer.legal} copyright={site.copyright} />
    </footer>
  );
}
