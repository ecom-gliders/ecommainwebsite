import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexStackProps {
  stack: ServicesIndexConfig["stack"];
}

const hardPanel =
  "rounded-[16px] border-2 border-primary bg-background p-5 text-primary shadow-[4px_4px_0_0_#131311] sm:p-6";

export function ServicesIndexStack({ stack }: ServicesIndexStackProps) {
  return (
    <SectionShell
      id="services-stack"
      ariaLabelledBy="services-stack-heading"
      tone="muted"
      className="py-12 sm:py-16"
    >
      <SectionHeading
        heading={stack.heading}
        subheading={stack.subheading}
        headingId="services-stack-heading"
      />
      <ol className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stack.steps.map((step, index) => (
          <li key={step.title} className={hardPanel}>
            <span
              aria-hidden="true"
              className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border-2 border-primary bg-accent text-small font-bold shadow-[3px_3px_0_0_#131311]"
            >
              {index + 1}
            </span>
            <h3 className="mt-3 text-h4 text-primary">{step.title}</h3>
            <p className="mt-2 text-body text-text-secondary">{step.description}</p>
          </li>
        ))}
      </ol>
    </SectionShell>
  );
}
