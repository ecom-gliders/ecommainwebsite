import Link from "next/link";
import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexResultsProps {
  results: ServicesIndexConfig["results"];
}

export function ServicesIndexResults({ results }: ServicesIndexResultsProps) {
  return (
    <SectionShell
      id="services-results"
      ariaLabelledBy="services-results-heading"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          heading={results.heading}
          subheading={results.subheading}
          headingId="services-results-heading"
          className="mb-0"
        />
        <Button variant="secondary" asChild>
          <Link href={results.cta.href}>{results.cta.label}</Link>
        </Button>
      </div>

      <ul className="mt-10 space-y-5">
        {results.items.map((item) => (
          <li key={`${item.href}-${item.metric}`}>
            <article className="overflow-hidden rounded-[20px] border-2 border-primary bg-background shadow-[5px_5px_0_0_#131311]">
              <div className="grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
                <div className="flex flex-col justify-center border-b-2 border-primary bg-[#F3FBF8] px-7 py-9 sm:px-10 sm:py-12 md:border-b-0 md:border-r-2">
                  <p className="services-hub-metric text-success">{item.metric}</p>
                  {item.metricUnit ? (
                    <p className="mt-3 text-body font-semibold text-primary">
                      {item.metricUnit}
                    </p>
                  ) : null}
                </div>
                <div className="flex flex-col justify-center px-7 py-8 sm:px-10 sm:py-10">
                  <h3 className="text-h3 text-primary">{item.brand}</h3>
                  <p className="mt-4 max-w-xl text-body text-text-secondary">
                    {item.description}
                  </p>
                  <Link
                    href={item.href}
                    className="mt-6 inline-flex min-h-11 w-fit items-center text-body font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                  >
                    Read case study
                  </Link>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
