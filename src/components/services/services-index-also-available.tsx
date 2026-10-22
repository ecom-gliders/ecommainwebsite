import Link from "next/link";
import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexAlsoAvailableProps {
  alsoAvailable: ServicesIndexConfig["alsoAvailable"];
}

export function ServicesIndexAlsoAvailable({
  alsoAvailable,
}: ServicesIndexAlsoAvailableProps) {
  return (
    <SectionShell
      id="services-also-available"
      ariaLabelledBy="services-also-available-heading"
      tone="muted"
      className="py-14 sm:py-16 lg:py-20"
    >
      <SectionHeading
        heading={alsoAvailable.heading}
        subheading={alsoAvailable.subheading}
        headingId="services-also-available-heading"
      />
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {alsoAvailable.items.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="flex h-full flex-col rounded-[14px] border border-border bg-background px-5 py-5 transition-colors hover:border-primary hover:bg-surface focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span className="text-body font-semibold text-primary">
                {item.title}
              </span>
              <span className="mt-2 text-small font-medium text-text-secondary">
                {item.description}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
