import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexAudienceProps {
  audience: ServicesIndexConfig["audience"];
}

export function ServicesIndexAudience({ audience }: ServicesIndexAudienceProps) {
  return (
    <SectionShell
      id="services-audience"
      ariaLabelledBy="services-audience-heading"
      className="py-14 sm:py-16 lg:py-20"
    >
      <SectionHeading
        heading={audience.heading}
        headingId="services-audience-heading"
      />
      <ul className="grid gap-5 md:grid-cols-3">
        {audience.items.map((item) => (
          <li
            key={item.title}
            className="rounded-[16px] border-2 border-primary bg-background p-6 shadow-[4px_4px_0_0_#131311] sm:p-7"
          >
            <h3 className="text-h3 text-primary">{item.title}</h3>
            <ul className="mt-4 space-y-3">
              {item.points.map((point) => (
                <li
                  key={point}
                  className="flex gap-3 text-body text-text-secondary"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-success"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
