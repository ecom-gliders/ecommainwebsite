import Link from "next/link";
import type { AboutPageConfig, SiteConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { Card, CardContent } from "@/components/ui/card";
import { PrimaryButton } from "@/components/ui/primary-button";
import { TrustLogo } from "@/components/sections/trust-logo";

interface AboutPageTemplateProps {
  page: AboutPageConfig;
  site: SiteConfig;
}

export function AboutPageTemplate({ page, site }: AboutPageTemplateProps) {
  const partnerBadge = site.partnerBadges[0];

  return (
    <>
      <SectionShell id="about-hero" ariaLabelledBy="about-hero-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h1 id="about-hero-heading" className="text-h1">
            {page.hero.title}
          </h1>
          <p className="mt-4 text-body text-text-secondary">{page.hero.subtitle}</p>
        </div>
      </SectionShell>

      <SectionShell id="about-story" tone="muted" ariaLabelledBy="about-story-heading">
        <SectionHeading heading={page.story.heading} headingId="about-story-heading" />
        <div className="mx-auto mt-8 max-w-3xl space-y-4">
          {page.story.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)} className="text-body text-text-secondary">
              {paragraph}
            </p>
          ))}
        </div>
      </SectionShell>

      <SectionShell id="about-stats">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {page.stats.map((stat) => (
            <li key={`${stat.value}-${stat.label}`}>
              <Card className="h-full border-border bg-surface">
                <CardContent className="p-6">
                  <p className="text-stat text-text-primary">{stat.value}</p>
                  <p className="mt-2 text-small text-text-secondary">{stat.label}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell id="about-values" tone="muted" ariaLabelledBy="about-values-heading">
        <SectionHeading heading={page.values.heading} headingId="about-values-heading" />
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {page.values.items.map((item) => (
            <li
              key={item.title}
              className="rounded-lg border border-border bg-background p-6"
            >
              <h3 className="text-h4">{item.title}</h3>
              <p className="mt-2 text-body text-text-secondary">{item.description}</p>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell id="about-approach" ariaLabelledBy="about-approach-heading">
        <SectionHeading
          heading={page.approach.heading}
          subheading={page.approach.subheading}
          headingId="about-approach-heading"
        />
        <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {page.approach.steps.map((step) => (
            <li key={step.number} className="rounded-md border border-border bg-surface p-6">
              <p className="text-small font-mono font-medium text-primary">{step.number}</p>
              <h3 className="mt-3 text-h4">{step.title}</h3>
              <p className="mt-2 text-body text-text-secondary">{step.description}</p>
            </li>
          ))}
        </ol>
      </SectionShell>

      <SectionShell id="about-team" tone="muted" ariaLabelledBy="about-team-heading">
        <SectionHeading
          heading={page.team.heading}
          subheading={page.team.subheading}
          headingId="about-team-heading"
        />
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {page.team.members.map((member) => (
            <li key={member.name}>
              <Card className="h-full border-border bg-background">
                <CardContent className="p-6">
                  <h3 className="text-h4">{member.name}</h3>
                  <p className="mt-1 text-small font-medium text-text-secondary">{member.role}</p>
                  <p className="mt-3 text-body text-text-secondary">{member.bio}</p>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </SectionShell>

      <SectionShell id="about-certifications" ariaLabelledBy="about-certifications-heading">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="about-certifications-heading" className="text-h2">
            {page.certifications.heading}
          </h2>
          <p className="mt-4 text-body text-text-secondary">
            {page.certifications.description}
          </p>
          {partnerBadge ? (
            <div className="mt-8 flex justify-center">
              <TrustLogo
                label={partnerBadge.label}
                image={partnerBadge.image ?? ""}
                alt={partnerBadge.label}
              />
            </div>
          ) : null}
        </div>
      </SectionShell>

      <SectionShell id="about-cta" tone="primary" ariaLabelledBy="about-cta-heading">
        <div className="mx-auto max-w-3xl text-center">
          <h2 id="about-cta-heading" className="text-h2 text-text-on-dark">
            {page.cta.heading}
          </h2>
          <p className="mt-4 text-body text-text-on-dark/90">{page.cta.subheading}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <PrimaryButton asChild>
              <Link href={page.cta.primaryCta.href}>{page.cta.primaryCta.label}</Link>
            </PrimaryButton>
            <a
              href={`tel:${site.phone.tel}`}
              className="inline-flex min-h-11 items-center text-small font-medium text-text-on-dark underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
            >
              {site.phone.display}
            </a>
          </div>
        </div>
      </SectionShell>
    </>
  );
}
