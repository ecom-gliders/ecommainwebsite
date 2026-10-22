import { CircleAlert, Lightbulb } from "lucide-react";
import type { CalloutVariant } from "@/lib/blog/blocks/types";

interface BlogCalloutProps {
  children: React.ReactNode;
  title?: string;
  variant?: CalloutVariant;
}

const VARIANT_CLASS: Record<CalloutVariant, string> = {
  default: "border-primary bg-surface shadow-[3px_3px_0_0_#131311]",
  tip: "border-primary bg-accent/25 shadow-[3px_3px_0_0_#131311]",
  warning: "border-primary bg-surface shadow-[3px_3px_0_0_#131311]",
};

export function BlogCallout({
  children,
  title,
  variant = "default",
}: BlogCalloutProps) {
  const Icon =
    variant === "warning" ? CircleAlert : variant === "tip" ? Lightbulb : null;

  return (
    <aside
      className={`my-6 border-2 px-5 py-4 text-text-secondary ${VARIANT_CLASS[variant]}`}
      role="note"
    >
      {title ? (
        <p className="mb-2 flex items-center gap-2 font-semibold text-text-primary">
          {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
          <span>{title}</span>
        </p>
      ) : null}
      <div className="text-body [&_p]:mb-0">{children}</div>
    </aside>
  );
}

export function parseCalloutBody(body: string): {
  title?: string;
  markdown: string;
} {
  const titleMatch = body.match(/^TITLE:\s*(.+)\n([\s\S]*)$/);
  if (titleMatch) {
    return { title: titleMatch[1].trim(), markdown: titleMatch[2].trim() };
  }
  return { markdown: body.trim() };
}
