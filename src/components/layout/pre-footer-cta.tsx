import type { SiteConfig } from "@/domain/content/schemas";
import { FooterNewsletter } from "@/components/layout/footer-newsletter";

interface PreFooterCtaProps {
  preFooter: SiteConfig["preFooter"];
}

/**
 * One composition: headline + subscribe. Phone/email stay in the footer Contact column.
 */
export function PreFooterCta({ preFooter }: PreFooterCtaProps) {
  return (
    <section
      id="pre-footer-cta"
      className="border-b border-white/10 text-text-on-dark"
      aria-labelledby="pre-footer-heading"
    >
      <div className="container-page flex flex-col items-stretch justify-between gap-6 py-8 sm:gap-8 sm:py-10 md:flex-row md:items-end md:gap-10 md:py-11 lg:py-12">
        <div className="min-w-0 max-w-xl">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-accent">
            Newsletter
          </p>
          <h2
            id="pre-footer-heading"
            className="mt-2 text-[1.5rem] font-black leading-[1.08] tracking-[-0.04em] text-text-on-dark sm:text-[2.25rem] lg:text-[2.5rem]"
          >
            {preFooter.headline}
          </h2>
          {preFooter.subheadline ? (
            <p className="mt-3 max-w-md text-sm font-medium leading-snug text-text-on-dark/65 sm:text-lg">
              {preFooter.subheadline}
            </p>
          ) : null}
        </div>

        <FooterNewsletter className="w-full min-w-0 md:w-auto md:max-w-[26rem] md:shrink-0" />
      </div>
    </section>
  );
}
