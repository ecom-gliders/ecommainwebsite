import Link from "next/link";
import { submitAuditForm } from "@/app/(marketing)/free-audit/actions";
import { PartnerBadgesRow } from "@/components/brand/partner-badges-row";
import { ConfigurableForm } from "@/components/forms/configurable-form";
import { PrimaryButton } from "@/components/ui/primary-button";
import { initialFormActionState } from "@/domain/forms/form-action-state";
import {
  HeroOrbitMedia,
  type HeroOrbitItem,
} from "./hero-orbit-media";
import { readNavLink, readString } from "./section-data";

interface HeroSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface HeroFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "url" | "textarea" | "select";
  required: boolean;
  placeholder?: string;
  options?: { value: string; label: string }[];
}

function readHeroFormFields(value: unknown): HeroFormField[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const name = readString(record.name);
    const label = readString(record.label);
    const type = readString(record.type, "text");
    if (!name || !label) return [];
    if (
      type !== "text" &&
      type !== "email" &&
      type !== "tel" &&
      type !== "url" &&
      type !== "textarea" &&
      type !== "select"
    ) {
      return [];
    }

    const options = Array.isArray(record.options)
      ? record.options.flatMap((option) => {
          if (!option || typeof option !== "object") return [];
          const opt = option as Record<string, unknown>;
          if (typeof opt.value !== "string" || typeof opt.label !== "string") {
            return [];
          }
          return [{ value: opt.value, label: opt.label }];
        })
      : undefined;

    return [
      {
        name,
        label,
        type,
        required: Boolean(record.required),
        placeholder: readString(record.placeholder) || undefined,
        options,
      },
    ];
  });
}

function readOrbitItems(value: unknown): HeroOrbitItem[] | undefined {
  if (!Array.isArray(value) || value.length === 0) return undefined;

  const items = value.flatMap((item, index) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const src = readString(record.src) || readString(record.image);
    const label = readString(record.label);
    if (!src || !label) return [];
    return [
      {
        src,
        alt: readString(record.alt, label),
        label,
        place: readString(record.place) || DEFAULT_PLACES[index] || DEFAULT_PLACES[0],
        rotate: readString(record.rotate) || DEFAULT_ROTATES[index] || "rotate-0",
      },
    ];
  });

  return items.length > 0 ? items : undefined;
}

const DEFAULT_PLACES = [
  "left-[10%] top-[-2%] w-[168px] xl:w-[190px]",
  "left-[-1%] top-[34%] w-[176px] xl:w-[200px]",
  "left-[12%] bottom-[-4%] w-[220px] xl:w-[250px]",
  "right-[4%] top-[8%] w-[200px] xl:w-[230px]",
  "right-[2%] top-[48%] w-[190px] xl:w-[215px]",
];

const DEFAULT_ROTATES = [
  "rotate-[-7deg]",
  "rotate-[11deg]",
  "rotate-[-32deg]",
  "rotate-[38deg]",
  "rotate-[-14deg]",
];

export function HeroSection({ id, data }: HeroSectionProps) {
  const eyebrow = readString(data.eyebrow);
  const headline = readString(data.headline);
  const subheadline = readString(data.subheadline);
  const supportLine = readString(data.supportLine);
  const trustLine = readString(data.trustLine);
  const primaryCta = readNavLink(data.primaryCta);
  const secondaryCta = readNavLink(data.secondaryCta);
  const partnerBadgesRaw = Array.isArray(data.partnerBadges)
    ? data.partnerBadges
    : data.partnerBadge && typeof data.partnerBadge === "object"
      ? [data.partnerBadge]
      : [];
  const partnerBadges = partnerBadgesRaw.flatMap((item) => {
    if (!item || typeof item !== "object") return [];
    const record = item as Record<string, unknown>;
    const label = readString(record.label);
    const image = readString(record.image);
    const href = readString(record.href) || undefined;
    if (!image) return [];
    return [{ label: label || "Partner", image, href }];
  });

  const visual = data.visual as Record<string, unknown> | undefined;
  const visualType = readString(visual?.type, "leadForm");
  const formHeading = readString(visual?.formHeading, "Get in Touch");
  const formSubheading = readString(visual?.formSubheading);
  const submitLabel = readString(visual?.submitLabel, "Get in Touch");
  const consentLabel = readString(
    visual?.consentLabel,
    "I agree to the privacy policy and consent to being contacted about my audit request.",
  );
  const formFields = readHeroFormFields(visual?.fields);
  const showLeadForm = visualType === "leadForm" && formFields.length > 0;
  const orbitItems = readOrbitItems(data.orbitItems);

  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="relative scroll-mt-24 overflow-hidden py-8 sm:py-10 lg:py-12 xl:py-14"
    >
      {/* Full-bleed orbit stage + centered copy (PO layout) */}
      <div className="relative mx-auto flex min-h-[min(52vh,480px)] w-full flex-col items-center justify-center px-4 py-8 text-center sm:min-h-[min(72vh,680px)] sm:px-6 sm:py-12 lg:min-h-[min(76vh,740px)] lg:py-14">
        <HeroOrbitMedia items={orbitItems} />

        <div className="relative z-10 mx-auto flex w-full max-w-2xl flex-col items-center">
          {eyebrow ? (
            <p className="inline-flex max-w-full items-center rounded-full border-2 border-primary bg-primary px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-text-on-dark">
              {eyebrow}
            </p>
          ) : null}

          <h1
            id={`${id}-heading`}
            className="mt-5 text-hero text-text-primary text-balance sm:mt-6"
          >
            {headline}
          </h1>

          {subheadline ? (
            <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-text-secondary text-pretty sm:mt-6 sm:text-lg">
              {subheadline}
            </p>
          ) : null}

          {primaryCta || secondaryCta ? (
            <div className="mt-8 flex w-full flex-col items-stretch justify-center gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:items-center sm:gap-3">
              {primaryCta ? (
                <PrimaryButton
                  asChild
                  variant="accent"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={primaryCta.href}>{primaryCta.label}</Link>
                </PrimaryButton>
              ) : null}
              {secondaryCta ? (
                <PrimaryButton
                  asChild
                  variant="primary"
                  size="lg"
                  className="w-full sm:w-auto"
                >
                  <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
                </PrimaryButton>
              ) : null}
            </div>
          ) : null}

          {trustLine ? (
            <p className="mt-5 text-sm font-medium text-text-secondary sm:mt-6">
              {trustLine}
            </p>
          ) : null}

          {partnerBadges.length > 0 ? (
            <div className="mt-5 sm:mt-6">
              <PartnerBadgesRow
                badges={partnerBadges}
                surface="light"
                align="center"
                size="lg"
              />
            </div>
          ) : null}
        </div>
      </div>

      {/* Lead form under fold — Get in Touch / #hero-lead-form */}
      {showLeadForm ? (
        <div className="container-page pb-4 sm:pb-6">
          {supportLine ? (
            <p className="relative z-10 mx-auto mb-4 max-w-2xl text-center text-sm font-medium leading-relaxed text-text-primary sm:mb-5">
              {supportLine}
            </p>
          ) : null}
          <div
            id="hero-lead-form"
            className="relative z-10 mx-auto w-full max-w-3xl scroll-mt-28 rounded-[16px] border-2 border-primary bg-accent p-5 shadow-[4px_4px_0_0_#131311] sm:p-7 lg:p-8 [&_button[role=combobox]]:h-11 [&_button[role=combobox]]:rounded-[10px] [&_button[role=combobox]]:border-2 [&_button[role=combobox]]:border-primary [&_button[role=combobox]]:bg-background [&_input]:rounded-[10px] [&_input]:border-2 [&_input]:border-primary [&_input]:bg-background [&_textarea]:rounded-[10px] [&_textarea]:border-2 [&_textarea]:border-primary [&_textarea]:bg-background"
          >
            <div className="mx-auto max-w-xl text-center">
              <h2 className="text-xl font-black tracking-tight text-primary sm:text-2xl">
                {formHeading}
              </h2>
              {formSubheading ? (
                <p className="mt-2 text-sm font-medium leading-relaxed text-primary/80 sm:text-[0.95rem]">
                  {formSubheading}
                </p>
              ) : null}
            </div>
            <div className="mt-6 sm:mt-7">
              <ConfigurableForm
                formId="hero-audit-form"
                fields={formFields}
                submitLabel={submitLabel}
                consentLabel={consentLabel}
                action={submitAuditForm}
                initialState={initialFormActionState}
                density="compact"
                columns={2}
                submitVariant="primary"
                submitFullWidth
              />
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
