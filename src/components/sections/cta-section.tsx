import Link from "next/link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { readNavLink, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface CtaSectionProps {
  id: string;
  data: Record<string, unknown>;
}

/**
 * Project One final-CTA chrome — oversized centered headline + lime hard card.
 * eCom Free Audit CTAs only (no PO form, pricing, or money-back claims).
 */
export function CtaSection({ id, data }: CtaSectionProps) {
  const eyebrow = readString(data.eyebrow, "Next step");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const cardTitle = readString(data.cardTitle, "Free Amazon audit");
  const assurance = readString(
    data.assurance,
    "No obligation. Clear priorities from PPC, listings, and catalog review.",
  );
  const primaryCta = readNavLink(data.primaryCta);
  const secondaryCta = readNavLink(data.secondaryCta);
  const phone = data.phone as Record<string, unknown> | undefined;
  const phoneDisplay = readString(phone?.display);
  const phoneTel = readString(phone?.tel);
  const email = readString(data.email);
  const headingId = `${id}-heading`;

  if (!heading) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="py-14 sm:py-16 lg:py-24"
    >
      <div className="mx-auto max-w-4xl text-center">
        {eyebrow ? (
          <p className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary sm:text-xs">
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-accent"
              aria-hidden="true"
            />
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="mt-3 text-[1.85rem] font-black leading-[1.05] tracking-[-0.04em] text-primary text-balance sm:text-[2.75rem] lg:text-[3.8rem] lg:leading-[1.05]"
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="mx-auto mt-4 max-w-2xl text-base font-bold leading-relaxed text-text-secondary sm:text-lg lg:text-xl">
            {subheading}
          </p>
        ) : null}

        <article className="relative mx-auto mt-10 max-w-xl overflow-hidden rounded-[16px] bg-accent p-6 text-left text-primary shadow-[4px_4px_0_0_#131311] sm:mt-12 sm:p-8">
          <h3 className="text-2xl font-black tracking-[-0.02em] text-primary sm:text-[1.95rem]">
            {cardTitle}
          </h3>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {primaryCta ? (
              <PrimaryButton
                asChild
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href={primaryCta.href}>{primaryCta.label}</Link>
              </PrimaryButton>
            ) : null}
            {phoneDisplay && phoneTel ? (
              <a
                href={`tel:${phoneTel}`}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              >
                {phoneDisplay}
              </a>
            ) : null}
            {email ? (
              <a
                href={`mailto:${email}`}
                className="inline-flex min-h-11 items-center text-sm font-semibold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              >
                {email}
              </a>
            ) : null}
          </div>

          {assurance ? (
            <p className="mt-6 text-sm font-bold leading-snug text-primary/85">
              {assurance}
            </p>
          ) : null}

          {secondaryCta ? (
            <p className="mt-4">
              <Link
                href={secondaryCta.href}
                className="text-sm font-medium text-primary/75 underline-offset-4 hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-accent"
              >
                {secondaryCta.label}
              </Link>
            </p>
          ) : null}
        </article>
      </div>
    </SectionShell>
  );
}
