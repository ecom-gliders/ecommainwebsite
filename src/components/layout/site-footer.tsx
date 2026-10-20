import { headers } from "next/headers";
import { FooterBottom } from "@/components/layout/footer-bottom";
import { FooterMain } from "@/components/layout/footer-main";
import { PreFooterCta } from "@/components/layout/pre-footer-cta";
import { getContentRepository } from "@/infrastructure/content/get-content-repository";

/**
 * Project One footer chrome — ink slab, 20px top radius, lime CTA strip.
 * Service pages omit the shared “Ready to scale” pre-footer (they already close with a service-specific CTA).
 */
export async function SiteFooter() {
  const repository = getContentRepository();
  const [navigation, site, serviceSlugs, headerStore] = await Promise.all([
    repository.getNavigation(),
    repository.getSiteConfig(),
    repository.getAllServiceSlugs(),
    headers(),
  ]);

  const pathname = headerStore.get("x-pathname") ?? "";
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  const suppressPreFooter = serviceSlugs.includes(slug);

  return (
    <footer className="relative mt-4 overflow-hidden rounded-t-[20px] bg-primary text-text-on-dark sm:mt-6">
      {suppressPreFooter ? null : <PreFooterCta preFooter={site.preFooter} />}
      <FooterMain footer={navigation.footer} site={site} />
      <FooterBottom legal={navigation.footer.legal} copyright={site.copyright} />
      <p
        className="pointer-events-none relative z-0 select-none px-3 pb-5 pt-2 text-center text-[clamp(2.75rem,12vw,7.5rem)] font-black leading-none tracking-[-0.06em] text-text-on-dark/[0.07] sm:pb-6"
        aria-hidden="true"
      >
        eCom Gliders
      </p>
    </footer>
  );
}
