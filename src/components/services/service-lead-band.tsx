import { submitAuditForm } from "@/app/(marketing)/free-audit-2/actions";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { SectionShell } from "@/components/sections/section-shell";
import type { ServicePageConfig } from "@/domain/content/schemas";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import { cn } from "@/lib/utils";
import { serviceHardPanel } from "./service-hard-panel";

interface ServiceLeadBandProps {
  service: ServicePageConfig;
  /** Visual chrome so deferred forms do not all look like the same lime card. */
  chrome?: "ink" | "sheet" | "plain";
}

/**
 * Lead form placed after mid-page proof — used when the hero is console/proof-led (no side form).
 */
export function ServiceLeadBand({
  service,
  chrome = "sheet",
}: ServiceLeadBandProps) {
  const form = service.hero.form;
  if (!form) return null;

  return (
    <SectionShell
      id="service-lead-form"
      density="tight"
      ariaLabelledBy="service-lead-form-heading"
    >
      <div
        className={cn(
          chrome === "ink" &&
            "rounded-[16px] border-2 border-primary bg-primary p-5 text-text-on-dark sm:p-7",
          chrome === "sheet" && cn(serviceHardPanel, "p-5 sm:p-7"),
          chrome === "plain" &&
            "max-w-3xl border-t border-primary/15 pt-6 sm:pt-8",
        )}
      >
        <h2
          id="service-lead-form-heading"
          className={cn(
            "font-black tracking-tight",
            chrome === "ink" ? "text-accent" : "text-primary",
            chrome === "plain" ? "text-xl sm:text-2xl" : "text-xl sm:text-2xl",
          )}
        >
          {form.heading}
        </h2>
        {form.subheading ? (
          <p
            className={cn(
              "mt-2 max-w-2xl text-small",
              chrome === "ink" ? "text-text-on-dark/80" : "text-text-secondary",
            )}
          >
            {form.subheading}
          </p>
        ) : null}
        <div className="mt-5">
          <ConfigurableForm
            formId={`service-audit-band-${service.slug}`}
            fields={form.fields}
            submitLabel={form.submitLabel ?? service.hero.cta.label}
            consentLabel="I agree to the privacy policy and to being contacted about this request."
            action={submitAuditForm}
            initialState={initialFormActionState}
            density="compact"
            columns={2}
            submitVariant={chrome === "ink" ? "accent" : "accent"}
            submitFullWidth
            hiddenFields={{
              serviceInterest: service.breadcrumbLabel,
              serviceSlug: service.slug,
            }}
          />
        </div>
      </div>
    </SectionShell>
  );
}
