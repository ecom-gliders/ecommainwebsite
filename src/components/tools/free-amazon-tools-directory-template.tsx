import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FreeAmazonToolsPageConfig } from "@/domain/content/schemas";
import { PrimaryButton } from "@/components/ui/primary-button";

interface FreeAmazonToolsDirectoryTemplateProps {
  page: FreeAmazonToolsPageConfig;
}

function toolHref(slug: string): string {
  return `/free-amazon-tools/${slug}/`;
}

/**
 * Directory for free Amazon tools.
 * Add a card in free-amazon-tools-page.json and a matching tools/{slug}.json
 * plus toolKind handler — no directory rebuild required.
 */
export function FreeAmazonToolsDirectoryTemplate({
  page,
}: FreeAmazonToolsDirectoryTemplateProps) {
  return (
    <>
      <section
        id="tools-hero"
        aria-labelledby="tools-hero-heading"
        className="border-b-2 border-primary bg-surface-muted"
      >
        <div className="container-page py-12 sm:py-16 lg:py-20">
          <nav aria-label="Breadcrumb" className="text-small text-text-secondary">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-text-primary">Free Amazon Tools</li>
            </ol>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {page.hero.eyebrow}
          </p>
          <h1
            id="tools-hero-heading"
            className="mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight text-text-primary"
          >
            {page.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary sm:text-lg">
            {page.hero.subtitle}
          </p>
          <p className="mt-4 max-w-2xl text-sm font-medium leading-relaxed text-text-secondary">
            {page.intro}
          </p>
        </div>
      </section>

      <section
        id="tools-directory"
        aria-labelledby="tools-directory-heading"
        className="py-12 sm:py-16"
      >
        <div className="container-page">
          <h2
            id="tools-directory-heading"
            className="text-lg font-bold tracking-tight text-text-primary"
          >
            Available tools
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {page.tools.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={toolHref(tool.slug)}
                  className="flex h-full flex-col border-2 border-primary bg-background p-5 shadow-[4px_4px_0_0_#131311] transition-colors hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  <span className="inline-flex w-fit border border-primary/30 bg-accent px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.08em] text-primary">
                    {tool.badge}
                  </span>
                  <span className="mt-3 text-lg font-bold tracking-tight text-text-primary">
                    {tool.title}
                  </span>
                  <span className="mt-2 flex-1 text-sm font-medium leading-relaxed text-text-secondary">
                    {tool.description}
                  </span>
                  <span className="mt-4 inline-flex items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-primary">
                    Open tool
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section
        id="tools-cta"
        aria-labelledby="tools-cta-heading"
        className="border-t-2 border-primary bg-primary py-12 text-text-on-dark sm:py-16"
      >
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="tools-cta-heading"
            className="max-w-xl text-2xl font-bold tracking-tight sm:text-3xl"
          >
            {page.cta.heading}
          </h2>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <PrimaryButton asChild variant="accent" size="lg">
              <Link href={page.cta.primaryCta.href}>
                {page.cta.primaryCta.label}
              </Link>
            </PrimaryButton>
            <Link
              href={page.cta.secondaryCta.href}
              className="inline-flex min-h-11 items-center gap-2 text-small font-bold uppercase tracking-[0.06em] text-accent hover:opacity-90"
            >
              {page.cta.secondaryCta.label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
