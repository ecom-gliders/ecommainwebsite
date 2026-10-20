import Link from "next/link";
import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { PrimaryButton } from "@/components/ui/primary-button";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexFlagshipProps {
  flagship: ServicesIndexConfig["flagship"];
}

export function ServicesIndexFlagship({ flagship }: ServicesIndexFlagshipProps) {
  return (
    <SectionShell
      id="services-flagship"
      ariaLabelledBy="services-flagship-heading"
      tone="muted"
      className="py-14 sm:py-16 lg:py-20"
    >
      <div className="rounded-[20px] border-2 border-primary bg-primary p-7 text-text-on-dark shadow-[6px_6px_0_0_#C6FD50] sm:p-10 lg:p-12">
        <p className="text-small font-bold uppercase tracking-[0.14em] text-accent">
          {flagship.eyebrow}
        </p>
        <h2
          id="services-flagship-heading"
          className="mt-4 max-w-3xl text-h2 text-text-on-dark"
        >
          {flagship.heading}
        </h2>
        <p className="mt-5 max-w-3xl text-body text-text-on-dark/90">
          {flagship.body}
        </p>
        <ul className="mt-8 max-w-3xl space-y-4">
          {flagship.bullets.map((bullet) => (
            <li key={bullet} className="flex gap-3 text-body text-text-on-dark/90">
              <span
                className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent"
                aria-hidden="true"
              />
              <span>{bullet}</span>
            </li>
          ))}
        </ul>
        <div className="mt-10">
          <PrimaryButton variant="accent" asChild>
            <Link href={flagship.cta.href}>{flagship.cta.label}</Link>
          </PrimaryButton>
        </div>
      </div>
    </SectionShell>
  );
}
