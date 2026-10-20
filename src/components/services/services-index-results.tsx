import Link from "next/link";
import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexResultsProps {
  featuredResults: ServicesIndexConfig["featuredResults"];
}

export function ServicesIndexResults({
  featuredResults,
}: ServicesIndexResultsProps) {
  return (
    <SectionShell
      id="services-results"
      ariaLabelledBy="services-results-heading"
      tone="muted"
      className="py-12 sm:py-16"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          heading={featuredResults.heading}
          subheading={featuredResults.subheading}
          headingId="services-results-heading"
          className="mb-0"
        />
        <Button variant="secondary" asChild>
          <Link href={featuredResults.cta.href}>{featuredResults.cta.label}</Link>
        </Button>
      </div>
      <ul className="mt-8 grid gap-4 md:grid-cols-3">
        {featuredResults.items.map((item) => (
          <li key={`${item.href}-${item.metric}`}>
            <article className="flex h-full flex-col rounded-[16px] border-2 border-primary bg-background p-5 shadow-[4px_4px_0_0_#131311] sm:p-6">
              <p className="text-stat text-primary">{item.metric}</p>
              <h3 className="mt-3 text-h4 text-primary">{item.brand}</h3>
              <p className="mt-2 flex-1 text-body text-text-secondary">
                {item.description}
              </p>
              <Link
                href={item.href}
                className="mt-4 inline-flex text-small font-semibold text-primary underline-offset-4 hover:underline"
              >
                Read case study
              </Link>
            </article>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
