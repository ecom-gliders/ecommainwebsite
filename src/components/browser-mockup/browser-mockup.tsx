import { designSystem } from "@/lib/design-tokens";
import {
  getBrowserTabById,
  getBrowserTabs,
  getDefaultTabId,
} from "@/lib/content-config";
import { cn } from "@/lib/utils";
import { IosChrome, MacChrome } from "./browser-chrome";
import { BrowserMockupContent } from "./browser-mockup-content";
import type { BrowserMockupProps } from "./browser-mockup.types";

const browserMockupSpec = designSystem.components.browserMockup as {
  staticPreview?: boolean;
  defaultVariant?: string;
};

export function BrowserMockup({
  className,
  variant = (browserMockupSpec.defaultVariant as BrowserMockupProps["variant"]) ??
    "macos",
  label,
  tabId,
}: BrowserMockupProps) {
  const tabs = getBrowserTabs();
  const activeTabId = tabId ?? getDefaultTabId(variant);
  const current = getBrowserTabById(activeTabId) ?? tabs[0];

  const frameClass =
    variant === "ios"
      ? "overflow-hidden rounded-2xl border border-border bg-surface shadow-md"
      : "overflow-hidden rounded-lg border border-border bg-surface-muted shadow-md";

  const previewLabel = label ?? variant;

  return (
    <figure className={cn(variant === "ios" ? "mx-auto max-w-sm" : "w-full", className)}>
      {label ? (
        <figcaption className="text-small mb-3 font-medium text-text-secondary">
          {label}
        </figcaption>
      ) : null}
      <div
        className={frameClass}
        role="img"
        aria-label={`${previewLabel} dashboard preview showing ${current.label}`}
      >
        {variant === "ios" ? (
          <IosChrome
            url={current.url}
            tabs={tabs}
            activeTabId={activeTabId}
            variant={variant}
          />
        ) : (
          <MacChrome
            url={current.url}
            tabs={tabs}
            activeTabId={activeTabId}
            variant={variant}
          />
        )}

        <div
          className={cn(
            "bg-background",
            variant === "ios" ? "px-3 pb-4 pt-2" : "p-3 sm:p-4",
          )}
        >
          <BrowserMockupContent current={current} compact={variant === "ios"} />
        </div>

        {variant === "ios" ? (
          <div className="flex justify-center pb-1.5 pt-0.5" aria-hidden="true">
            <div className="h-1 w-24 rounded-full bg-primary/20" />
          </div>
        ) : null}
      </div>
    </figure>
  );
}
