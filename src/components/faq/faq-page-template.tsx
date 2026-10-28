import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { FaqItem, FaqPageConfig } from "@/domain/content/schemas";
import { FaqAccordion } from "@/components/sections/faq-accordion";
import { PrimaryButton } from "@/components/ui/primary-button";

interface FaqPageTemplateProps {
  page: FaqPageConfig;
  items: FaqItem[];
}

export function FaqPageTemplate({ page, items }: FaqPageTemplateProps) {
  return (
    <>
      <section
        id="faq-hero"
        aria-labelledby="faq-hero-heading"
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
              <li className="text-text-primary">FAQ</li>
            </ol>
          </nav>
          <p className="mt-6 text-xs font-bold uppercase tracking-[0.14em] text-text-secondary">
            {page.hero.eyebrow}
          </p>
          <h1
            id="faq-hero-heading"
            className="mt-3 max-w-3xl text-[clamp(2rem,4.5vw,3.25rem)] font-bold tracking-tight text-text-primary"
          >
            {page.hero.title}
          </h1>
          <p className="mt-4 max-w-2xl text-base font-medium leading-relaxed text-text-secondary sm:text-lg">
            {page.hero.subtitle}
          </p>
        </div>
      </section>

      <section
        id="faq-items"
        aria-labelledby="faq-items-heading"
        className="py-12 sm:py-16"
      >
        <div className="container-page">
          <h2 id="faq-items-heading" className="sr-only">
            Questions and answers
          </h2>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-[16px] border-2 border-primary bg-accent px-4 py-6 text-primary sm:px-6 sm:py-8">
            <FaqAccordion items={items} variant="lime" />
          </div>
        </div>
      </section>

      <section
        id="faq-cta"
        aria-labelledby="faq-cta-heading"
        className="border-t-2 border-primary bg-primary py-12 text-text-on-dark sm:py-16"
      >
        <div className="container-page flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <h2
            id="faq-cta-heading"
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
