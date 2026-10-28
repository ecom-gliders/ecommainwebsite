import Link from "next/link";
import { PrimaryButton } from "@/components/ui/primary-button";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface StatsSectionProps {
  id: string;
  data: Record<string, unknown>;
}

/**
 * Mid-page CTA band — dark field, centered type, lime CTA.
 * Verified metrics live in trust-bar only (no duplicate proof strip).
 */
export function StatsSection({ id, data }: StatsSectionProps) {
  const eyebrow = readString(data.eyebrow, "Next step");
  const heading = readString(
    data.heading,
    "Ready for clearer Amazon priorities?",
  );
  const subheading = readString(data.subheading);
  const primaryCta = readNavLink(data.primaryCta) ?? {
    label: "Get your free audit",
    href: "#hero-lead-form",
  };
  const items = readRecordArray(data.items);
  const headingId = `${id}-heading`;

  if (!heading) return null;

  return (
    <SectionShell
      id={id}
      ariaLabelledBy={headingId}
      tone="primary"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-3xl text-center">
        {eyebrow ? (
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-on-dark/55">
            {eyebrow}
          </p>
        ) : null}
        <h2
          id={headingId}
          className="mt-3 text-[1.85rem] font-black leading-[1.1] tracking-[-0.02em] text-[#FAFAFA] text-balance sm:text-[2.35rem] lg:text-[40px] lg:leading-[1.15]"
        >
          {heading}
        </h2>
        {subheading ? (
          <p className="mx-auto mt-4 max-w-xl text-base font-normal leading-relaxed text-text-on-dark/70 sm:text-lg">
            {subheading}
          </p>
        ) : null}
      </div>

      {items.length > 0 ? (
        <ul className="mx-auto mt-10 grid max-w-5xl grid-cols-2 gap-px overflow-hidden rounded-[10px] border-2 border-white/15 bg-white/15 sm:mt-12 lg:grid-cols-4">
          {items.map((item) => {
            const value = readString(item.value);
            const label = readString(item.label);
            return (
              <li
                key={`${value}-${label}`}
                className="flex flex-col items-center justify-center bg-primary px-4 py-6 text-center sm:py-8"
              >
                <p className="text-3xl font-black tracking-tight text-accent sm:text-4xl lg:text-[2.75rem]">
                  {value}
                </p>
                <p className="mt-2 text-sm font-medium leading-snug text-text-on-dark/70">
                  {label}
                </p>
              </li>
            );
          })}
        </ul>
      ) : null}

      {primaryCta ? (
        <div className="mt-8 flex justify-center sm:mt-10">
          <PrimaryButton asChild variant="accent" size="lg">
            <Link href={primaryCta.href}>{primaryCta.label}</Link>
          </PrimaryButton>
        </div>
      ) : null}
    </SectionShell>
  );
}
