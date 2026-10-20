import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "../service-hard-panel";

interface ServiceAudienceSectionProps {
  audience: NonNullable<ServicePageConfig["audience"]>;
}

/** Who-for chip index + divide strip detail rows. */
export function ServiceAudienceSection({ audience }: ServiceAudienceSectionProps) {
  return (
    <SectionShell
      id="service-audience"
      tone="muted"
      ariaLabelledBy="service-audience-heading"
    >
      <SectionHeading
        kicker="Who it is for"
        heading={audience.heading}
        headingId="service-audience-heading"
      />
      <nav
        aria-label="Audience segments"
        className="mt-6 flex gap-2 overflow-x-auto pb-1"
      >
        {audience.points.map((point, index) => (
          <a
            key={point.title}
            href={`#audience-${index}`}
            title={point.title}
            className="inline-flex min-w-[8.5rem] max-w-[14rem] shrink-0 items-center rounded-[8px] border-2 border-primary bg-background px-3 py-2 text-left text-[12px] font-semibold leading-snug text-primary shadow-[2px_2px_0_0_#131311] transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:min-w-[10rem]"
          >
            <span className="line-clamp-2">{point.title}</span>
          </a>
        ))}
      </nav>
      <ul
        className={cn(
          serviceHardPanel,
          "mt-4 divide-y-2 divide-primary/10 overflow-hidden bg-background",
        )}
      >
        {audience.points.map((point, index) => (
          <li
            key={point.title}
            id={`audience-${index}`}
            className="flex scroll-mt-28 gap-3 px-4 py-3.5 sm:gap-4 sm:px-5 sm:py-4"
          >
            <span
              aria-hidden="true"
              className="mt-1.5 h-3 w-3 shrink-0 rounded-[2px] border-2 border-primary bg-accent"
            />
            <div className="min-w-0 flex-1 sm:grid sm:grid-cols-[minmax(0,14rem)_1fr] sm:gap-4 lg:grid-cols-[minmax(0,18rem)_1fr]">
              <h3 className="text-body font-semibold text-primary">
                {point.title}
              </h3>
              <p className="mt-1 text-small text-text-secondary sm:mt-0">
                {point.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
