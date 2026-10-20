import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexStackProps {
  engagement: ServicesIndexConfig["engagement"];
}

export function ServicesIndexStack({ engagement }: ServicesIndexStackProps) {
  return (
    <SectionShell
      id="services-engagement"
      ariaLabelledBy="services-engagement-heading"
      tone="muted"
      className="py-14 sm:py-16 lg:py-20"
    >
      <SectionHeading
        heading={engagement.heading}
        headingId="services-engagement-heading"
      />
      <ol className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {engagement.steps.map((step, index) => (
          <li
            key={step.title}
            className="rounded-[16px] border-2 border-primary bg-background p-6 text-primary shadow-[4px_4px_0_0_#131311] sm:p-7"
          >
            <span
              aria-hidden="true"
              className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] border-2 border-primary bg-accent text-body font-bold shadow-[3px_3px_0_0_#131311]"
            >
              {index + 1}
            </span>
            <h3 className="mt-4 text-h3 text-primary">{step.title}</h3>
            <p className="mt-3 text-body text-text-secondary">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
