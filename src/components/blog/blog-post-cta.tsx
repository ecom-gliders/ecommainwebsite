import Link from "next/link";
import type { SiteConfig } from "@/domain/content/schemas";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SectionShell } from "@/components/sections/section-shell";

interface BlogPostCtaProps {
  site: SiteConfig;
}

export function BlogPostCta({ site }: BlogPostCtaProps) {
  const { preFooter } = site;
  const headingId = "blog-post-cta-heading";

  return (
    <SectionShell id="blog-post-cta" tone="primary" ariaLabelledBy={headingId}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 id={headingId} className="text-h2 text-text-on-dark">
          {preFooter.headline}
        </h2>
        <p className="mt-4 text-body text-text-on-dark/90">{preFooter.subheadline}</p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
          <PrimaryButton
            asChild
            variant="onDark"
            className="focus-visible:ring-offset-primary"
          >
            <Link href={preFooter.cta.href}>{preFooter.cta.label}</Link>
          </PrimaryButton>
          <a
            href={`tel:${preFooter.phone.tel}`}
            className="inline-flex min-h-11 items-center text-small font-medium text-text-on-dark underline-offset-4 hover:text-accent hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
          >
            {preFooter.phone.display}
          </a>
        </div>
      </div>
    </SectionShell>
  );
}
