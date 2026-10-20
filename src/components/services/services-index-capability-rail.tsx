import Link from "next/link";
import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexCapabilityRailProps {
  capabilityRail: ServicesIndexConfig["capabilityRail"];
  focusedPaths: ServicesIndexConfig["focusedPaths"];
}

export function ServicesIndexCapabilityRail({
  capabilityRail,
  focusedPaths,
}: ServicesIndexCapabilityRailProps) {
  return (
    <SectionShell
      id="services-capability-rail"
      ariaLabelledBy="services-capability-heading"
      className="py-14 sm:py-16 lg:py-20"
    >
      <SectionHeading
        heading={capabilityRail.heading}
        subheading={capabilityRail.subheading}
        headingId="services-capability-heading"
      />
      <ol className="divide-y-2 divide-primary/15 border-y-2 border-primary/15">
        {capabilityRail.items.map((item) => (
          <li key={item.number}>
            <Link
              href={item.href}
              className="group grid gap-4 py-7 transition-colors sm:grid-cols-[5.5rem_minmax(0,1fr)_auto] sm:items-start sm:gap-8 sm:py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
            >
              <span
                aria-hidden="true"
                className="font-mono text-[1.35rem] font-bold tracking-tight text-success sm:text-[1.5rem]"
              >
                {item.number}
              </span>
              <div className="min-w-0">
                <h3 className="text-h3 text-primary group-hover:underline group-hover:underline-offset-4">
                  {item.title}
                </h3>
                <p className="mt-2 max-w-3xl text-body text-text-secondary">
                  {item.description}
                </p>
              </div>
              <span className="text-body font-semibold text-primary underline-offset-4 group-hover:underline sm:pt-1">
                View service
              </span>
            </Link>
          </li>
        ))}
      </ol>

      <div className="mt-10 border-t border-border pt-8">
        <p className="text-body font-semibold text-primary">
          Prefer a focused start?
        </p>
        <ul className="mt-4 flex flex-wrap gap-3">
          {focusedPaths.map((path) => (
            <li key={path.href}>
              <Link
                href={path.href}
                className="inline-flex min-h-11 items-center rounded-[10px] border-2 border-primary bg-background px-4 text-body font-semibold text-primary shadow-[3px_3px_0_0_#131311] transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {path.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </SectionShell>
  );
}
