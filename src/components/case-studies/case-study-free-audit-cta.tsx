import Link from "next/link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SectionShell } from "@/components/sections/section-shell";
import { caseStudyHardPanel } from "./case-study-hard-panel";

interface CaseStudyFreeAuditCtaProps {
  heading?: string;
  body?: string;
  serviceHint?: string;
}

export function CaseStudyFreeAuditCta({
  heading = "Want results like these for your catalog?",
  body = "Request a free Amazon audit. A strategist reviews PPC, listings, and catalog priorities and follows up within one business day.",
  serviceHint,
}: CaseStudyFreeAuditCtaProps) {
  return (
    <SectionShell id="case-study-cta" ariaLabelledBy="case-study-cta-heading">
      <div className={`${caseStudyHardPanel} mx-auto max-w-3xl bg-[#F4F4F4] p-8 text-center sm:p-10`}>
        <h2 id="case-study-cta-heading" className="text-h3 text-primary">
          {heading}
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-body font-medium text-text-secondary">{body}</p>
        {serviceHint ? (
          <p className="mt-2 text-small font-medium text-text-secondary">Related focus: {serviceHint}</p>
        ) : null}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <PrimaryButton asChild variant="accent">
            <Link href="/free-audit-2/">Get your free audit</Link>
          </PrimaryButton>
          <PrimaryButton asChild variant="primary">
            <Link href="/case-studies/">View all case studies</Link>
          </PrimaryButton>
        </div>
      </div>
    </SectionShell>
  );
}
