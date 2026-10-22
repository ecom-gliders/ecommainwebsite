import Link from "next/link";
import { Check } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface FreeAuditCardSectionProps {
  id: string;
  data: Record<string, unknown>;
}

/**
 * Project One pricing fill — main offer card + side stack.
 * No floating mockups; section fills with hard cards like PO Simple Pricing.
 */
export function FreeAuditCardSection({ id, data }: FreeAuditCardSectionProps) {
  const eyebrow = readString(data.eyebrow);
  const title = readString(data.title);
  const priceNote = readString(data.priceNote);
  const badge = readString(data.badge);
  const cardTitle = readString(
    data.cardTitle,
    "Written priorities for your Amazon account",
  );
  const cardSupport = readString(
    data.cardSupport,
    "No obligation. A strategist follows up within one business day.",
  );
  const inclusionsHeading = readString(
    data.inclusionsHeading,
    "What the audit covers",
  );
  const primaryCta = readNavLink(data.primaryCta);
  const secondaryCta = readNavLink(data.secondaryCta);
  const sideEyebrow = readString(data.sideEyebrow, "After you submit");
  const sideTitle = readString(data.sideTitle, "What happens next");
  const sideBody = readString(data.sideBody);
  const sideItems = readRecordArray(data.sideItems)
    .map((item) => readString(item.label) || readString(item.text))
    .filter(Boolean);
  const proofTitle = readString(data.proofTitle);
  const proofBody = readString(data.proofBody);
  const headingId = `${id}-heading`;

  const inclusions = readRecordArray(data.inclusions)
    .map((item) => readString(item.label) || readString(item.text))
    .filter(Boolean);

  if (!title) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      className="overflow-x-clip py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-2xl text-center">
        {eyebrow ? (
          <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-text-secondary sm:text-xs">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="mt-3 text-[1.85rem] font-black leading-[1.05] tracking-[-0.04em] text-primary text-balance sm:text-[2.75rem] lg:text-[3.4rem] lg:leading-[1.05]"
        >
          {title}
        </h2>
        {priceNote ? (
          <p className="mx-auto mt-4 max-w-md text-base font-medium leading-relaxed text-text-secondary sm:text-lg">
            {priceNote}
          </p>
        ) : null}
      </div>

      <div className="mx-auto mt-10 grid max-w-5xl items-stretch gap-5 sm:mt-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:gap-6">
        <article className="h-full overflow-hidden rounded-[16px] border-2 border-primary bg-background p-6 text-left text-primary shadow-[4px_4px_0_0_#131311] sm:p-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex rounded-full bg-accent px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary">
              Free audit
            </span>
            {badge ? (
              <span className="text-[11px] font-bold uppercase tracking-[0.12em] text-text-secondary">
                {badge}
              </span>
            ) : null}
          </div>

          <p className="mt-5 text-xl font-black tracking-[-0.02em] text-primary sm:text-2xl">
            {cardTitle}
          </p>
          {cardSupport ? (
            <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
              {cardSupport}
            </p>
          ) : null}

          {primaryCta ? (
            <PrimaryButton
              asChild
              variant="accent"
              size="lg"
              className="mt-6 w-full"
            >
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </PrimaryButton>
          ) : null}

          {secondaryCta ? (
            <p className="mt-4 text-center lg:hidden">
              <Link
                href={secondaryCta.href}
                className="text-sm font-medium text-text-secondary underline-offset-4 transition-colors hover:text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
              >
                {secondaryCta.label}
              </Link>
            </p>
          ) : null}

          {inclusions.length > 0 ? (
            <div className="mt-8 border-t-2 border-primary/10 pt-6">
              <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-text-secondary">
                {inclusionsHeading}
              </p>
              <ul className="mt-4 w-full space-y-3 text-left">
                {inclusions.map((item) => (
                  <li
                    key={item}
                    className="flex w-full items-start gap-3 text-left"
                  >
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent text-primary"
                      aria-hidden="true"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                    <span className="text-sm font-normal leading-snug text-primary/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </article>

        <div className="flex h-full flex-col gap-5">
          <article className="shrink-0 rounded-[16px] border-2 border-primary bg-accent p-6 text-primary shadow-[4px_4px_0_0_#131311] sm:p-7">
            <p className="inline-flex rounded-[6px] bg-primary px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-text-on-dark">
              {sideEyebrow}
            </p>
            <h3 className="mt-4 text-xl font-black tracking-[-0.02em] sm:text-2xl">
              {sideTitle}
            </h3>
            {sideBody ? (
              <p className="mt-2 text-sm leading-relaxed text-primary/80">
                {sideBody}
              </p>
            ) : null}
            {sideItems.length > 0 ? (
              <ul className="mt-5 space-y-3">
                {sideItems.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-accent"
                      aria-hidden="true"
                    >
                      <Check className="h-3.5 w-3.5 stroke-[2.5]" />
                    </span>
                    <span className="text-sm font-medium leading-snug">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            ) : null}
          </article>

          {(proofTitle || proofBody) && (
            <article className="flex min-h-0 flex-1 flex-col rounded-[16px] border-2 border-primary bg-surface-muted p-6 text-primary shadow-[4px_4px_0_0_#131311] sm:p-7">
              {proofTitle ? (
                <h3 className="text-lg font-black tracking-[-0.02em] sm:text-xl">
                  {proofTitle}
                </h3>
              ) : null}
              {proofBody ? (
                <p className="mt-2 text-sm font-medium leading-relaxed text-text-secondary">
                  {proofBody}
                </p>
              ) : null}
              {secondaryCta ? (
                <Link
                  href={secondaryCta.href}
                  className="mt-auto inline-flex pt-6 text-sm font-bold text-primary underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
                >
                  Review case studies
                </Link>
              ) : null}
            </article>
          )}
        </div>
      </div>
    </SectionShell>
  );
}
