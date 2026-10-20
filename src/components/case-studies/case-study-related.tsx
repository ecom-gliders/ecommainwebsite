import type { CaseStudyCard } from "@/domain/content/schemas";
import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";
import { CaseStudyCardItem } from "./case-study-card";

interface CaseStudyRelatedProps {
  studies: CaseStudyCard[];
}

export function CaseStudyRelated({ studies }: CaseStudyRelatedProps) {
  if (studies.length === 0) return null;

  return (
    <SectionShell id="case-study-related" tone="muted" ariaLabelledBy="case-study-related-heading">
      <SectionHeading heading="Related case studies" headingId="case-study-related-heading" />
      <ul className="mt-8 grid gap-6 lg:grid-cols-3">
        {studies.map((study) => (
          <CaseStudyCardItem key={study.slug} study={study} />
        ))}
      </ul>
    </SectionShell>
  );
}
