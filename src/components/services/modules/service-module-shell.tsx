import { SectionHeading } from "@/components/sections/section-heading";
import { SectionShell } from "@/components/sections/section-shell";

interface ServiceModuleShellProps {
  id: string;
  heading?: string;
  subheading?: string;
  tone?: "default" | "muted";
  density?: "default" | "tight";
  children: React.ReactNode;
}

export function ServiceModuleShell({
  id,
  heading,
  subheading,
  tone = "default",
  density = "tight",
  children,
}: ServiceModuleShellProps) {
  const headingId = heading ? `${id}-heading` : undefined;

  return (
    <SectionShell
      id={id}
      tone={tone}
      density={density}
      ariaLabelledBy={headingId}
    >
      {heading ? (
        <SectionHeading
          heading={heading}
          subheading={subheading}
          headingId={headingId}
          className="mb-0 max-w-3xl md:mb-0"
        />
      ) : null}
      <div className={heading ? "mt-6 sm:mt-7" : undefined}>{children}</div>
    </SectionShell>
  );
}
