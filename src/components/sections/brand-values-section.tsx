import Link from "next/link";
import { Check } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { cn } from "@/lib/utils";
import { readNavLink, readRecordArray, readString } from "./section-data";
import { SectionShell } from "./section-shell";

interface BrandValuesSectionProps {
  id: string;
  data: Record<string, unknown>;
}

interface PrincipleItem {
  title: string;
  description: string;
}

/**
 * Project One props language: left copy stack + hard alternating
 * lime/canvas cards (check circles). eCom pillar copy from config only.
 * Four verified pillars → 2×2 grid (PO reference is 3×2 / six cards).
 */
export function BrandValuesSection({ id, data }: BrandValuesSectionProps) {
  const eyebrow = readString(data.eyebrow, "Partnership principles");
  const heading = readString(data.heading);
  const subheading = readString(data.subheading);
  const cta = readNavLink(data.cta) ?? {
    label: "Get your free audit",
    href: "#hero-lead-form",
  };
  const headingId = `${id}-heading`;

  const items: PrincipleItem[] = readRecordArray(data.items)
    .map((item) => {
      const title = readString(item.title);
      if (!title) return null;
      return {
        title,
        description: readString(item.description),
      };
    })
    .filter((item): item is PrincipleItem => item !== null);

  if (items.length === 0) return null;

  return (
    <SectionShell id={id} ariaLabelledBy={headingId} className="py-12 sm:py-16 lg:py-20">
      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
        <div className="max-w-xl lg:sticky lg:top-28 lg:self-start">
          {eyebrow ? (
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-text-primary">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={headingId}
            className="mt-3 text-[1.85rem] font-black leading-[1.1] tracking-[-0.02em] text-text-primary text-balance sm:text-[2.35rem] lg:text-[40px] lg:leading-[1.15]"
          >
            {heading}
          </h2>
          {subheading ? (
            <p className="mt-4 max-w-md text-base font-medium leading-relaxed text-text-secondary sm:text-lg">
              {subheading}
            </p>
          ) : null}
          {cta ? (
            <div className="mt-7 sm:mt-8">
              <PrimaryButton asChild variant="accent" size="lg">
                <Link href={cta.href}>{cta.label}</Link>
              </PrimaryButton>
            </div>
          ) : null}
        </div>

        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {items.map((item, index) => {
            const punch = index % 2 === 0;
            return (
              <li key={item.title} className="flex min-h-0">
                <article
                  className={cn(
                    "flex h-full w-full flex-col rounded-[10px] border-2 border-primary p-5 shadow-[4px_4px_0_0_#131311] sm:min-h-[200px] sm:p-6",
                    punch
                      ? "bg-accent text-primary"
                      : "bg-background text-primary",
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-full",
                      punch
                        ? "bg-primary text-text-on-dark"
                        : "bg-accent text-primary",
                    )}
                    aria-hidden="true"
                  >
                    <Check className="h-4 w-4 stroke-[2.5]" />
                  </span>

                  <h3 className="mt-5 text-base font-bold leading-snug tracking-tight sm:text-lg">
                    {item.title}
                  </h3>
                  {item.description ? (
                    <p
                      className={cn(
                        "mt-2.5 text-sm font-medium leading-relaxed",
                        punch ? "text-primary/80" : "text-text-secondary",
                      )}
                    >
                      {item.description}
                    </p>
                  ) : null}
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </SectionShell>
  );
}
