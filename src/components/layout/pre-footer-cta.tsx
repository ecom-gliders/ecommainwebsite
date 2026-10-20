import Link from "next/link";
import type { SiteConfig } from "@/domain/content/schemas";
import { PrimaryButton } from "@/components/ui/primary-button";

interface PreFooterCtaProps {
  preFooter: SiteConfig["preFooter"];
}

/**
 * Project One footer punch strip — ink band + lime Free Audit CTA.
 * Lives inside the dark SiteFooter chrome.
 */
export function PreFooterCta({ preFooter }: PreFooterCtaProps) {
  return (
    <section
      id="pre-footer-cta"
      className="border-b border-white/10 text-text-on-dark"
      aria-labelledby="pre-footer-heading"
    >
      <div className="container-page flex flex-col items-start justify-between gap-5 py-8 sm:gap-6 sm:py-10 md:flex-row md:items-center md:py-12 lg:py-14">
        <div className="max-w-2xl">
          <h2
            id="pre-footer-heading"
            className="text-[1.65rem] font-black leading-[1.05] tracking-[-0.04em] text-text-on-dark sm:text-[2.25rem] lg:text-[2.5rem]"
          >
            {preFooter.headline}
          </h2>
          {preFooter.subheadline ? (
            <p className="mt-3 text-base font-medium leading-snug text-text-on-dark/65 sm:text-lg">
              {preFooter.subheadline}
            </p>
          ) : null}
        </div>

        <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center">
          <PrimaryButton asChild variant="accent" size="lg">
            <Link href={preFooter.cta.href}>{preFooter.cta.label}</Link>
          </PrimaryButton>
          <a
            href={`tel:${preFooter.phone.tel}`}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-text-on-dark/85 underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {preFooter.phone.display}
          </a>
          <a
            href={`mailto:${preFooter.email}`}
            className="inline-flex min-h-11 items-center text-sm font-semibold text-text-on-dark/85 underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {preFooter.email}
          </a>
        </div>
      </div>
    </section>
  );
}
