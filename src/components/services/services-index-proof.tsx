import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexProofProps {
  proof: ServicesIndexConfig["proof"];
}

export function ServicesIndexProof({ proof }: ServicesIndexProofProps) {
  return (
    <SectionShell
      id="services-proof"
      ariaLabelledBy="services-proof-heading"
      className="py-12 sm:py-16"
    >
      <SectionHeading
        heading={proof.heading}
        headingId="services-proof-heading"
      />
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {proof.items.map((item) => (
          <li
            key={item.label}
            className="rounded-[16px] border-2 border-primary bg-background p-5 shadow-[4px_4px_0_0_#131311] sm:p-6"
          >
            <p className="text-stat text-primary">{item.value}</p>
            <p className="mt-2 text-small text-text-secondary">{item.label}</p>
          </li>
        ))}
      </ul>
    </SectionShell>
  );
}
