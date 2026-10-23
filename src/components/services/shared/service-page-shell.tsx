import { cn } from "@/lib/utils";

interface ServicePageShellProps {
  children: React.ReactNode;
  className?: string;
  /** Narrow reading column inside the same page gutters (no outer width jump). */
  narrow?: boolean;
}

/**
 * Shared horizontal rhythm for unique service templates.
 * Outer gutters always match `container-page` so sections do not shift left/right.
 */
export function ServicePageShell({
  children,
  className,
  narrow = false,
}: ServicePageShellProps) {
  return (
    <div className="container-page">
      <div className={cn(narrow && "mx-auto max-w-3xl", className)}>
        {children}
      </div>
    </div>
  );
}

export const serviceSectionPad = "py-10 sm:py-12 lg:py-14";
