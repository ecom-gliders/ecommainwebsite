import Link from "next/link";
import type { ServicesIndexConfig } from "@/domain/content/schemas";
import { Button } from "@/components/ui/button";
import { SectionShell } from "@/components/sections/section-shell";

interface ServicesIndexFlagshipProps {
  flagship: ServicesIndexConfig["flagship"];
}

export function ServicesIndexFlagship({ flagship }: ServicesIndexFlagshipProps) {
  return (
    <SectionShell
      id="services-flagship"
      ariaLabelledBy="services-flagship-heading"
      className="py-12 sm:py-16"
    >
      <div className="rounded-[16px] border-2 border-primary bg-primary p-6 text-text-on-dark shadow-[6px_6px_0_0_#9FE870] sm:p-8 lg:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent sm:text-xs">
          {flagship.eyebrow}
        </p>
        <h2
          id="services-flagship-heading"
          className="mt-3 max-w-2xl text-h2 text-text-on-dark"
        >
          {flagship.heading}
        </h2>
        <p className="mt-4 max-w-2xl text-body text-text-on-dark/90">
          {flagship.body}
        </p>
        <div className="mt-8">
          <Button variant="outlineOnDark" asChild>
            <Link href={flagship.cta.href}>{flagship.cta.label}</Link>
          </Button>
        </div>
      </div>
    </SectionShell>
  );
}
