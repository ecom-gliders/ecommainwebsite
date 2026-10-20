import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import type { BrowserChromeProps, BrowserTab, BrowserVariant } from "./browser-mockup.types";

function StaticTabBar({
  tabs,
  activeTabId,
  variant,
}: {
  tabs: BrowserTab[];
  activeTabId: string;
  variant: BrowserVariant;
}) {
  if (variant === "ios") {
    return (
      <div className="px-3 pb-3 pt-1" aria-hidden="true">
        <div className="flex rounded-md bg-surface-muted p-0.5">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={cn(
                "flex-1 rounded-sm px-2 py-1 text-center text-[11px] font-medium",
                activeTabId === tab.id
                  ? "bg-background text-text-primary shadow-sm"
                  : "text-text-secondary",
              )}
            >
              <span className="hidden sm:inline">{tab.label}</span>
              <span className="sm:hidden">{tab.shortLabel}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="flex h-full min-w-0 flex-1 items-center gap-1 overflow-x-auto pr-2"
      aria-hidden="true"
    >
      {tabs.map((tab) => (
        <div
          key={tab.id}
          className={cn(
            "flex h-6 max-w-[120px] shrink-0 items-center truncate rounded-sm px-2 text-[11px] font-medium leading-none",
            activeTabId === tab.id
              ? "bg-background text-text-primary shadow-sm"
              : "text-text-secondary",
          )}
        >
          {tab.label}
        </div>
      ))}
    </div>
  );
}

export function MacChrome({ url, tabs, activeTabId, variant }: BrowserChromeProps) {
  return (
    <>
      <div className="flex h-8 items-center gap-2 bg-surface-muted">
        <div className="flex shrink-0 items-center gap-1.5 pl-3" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#FFBD2E]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
        </div>
        <div className="h-3.5 w-px shrink-0 bg-border" aria-hidden="true" />
        <StaticTabBar tabs={tabs} activeTabId={activeTabId} variant={variant} />
      </div>
      <div className="border-b border-border bg-background px-3 py-1.5">
        <div className="flex min-w-0 items-center gap-2 rounded-sm border border-border bg-surface px-3 py-1">
          <Lock className="h-3 w-3 shrink-0 text-text-secondary" aria-hidden="true" />
          <span className="truncate text-[11px] text-text-secondary">{url}</span>
        </div>
      </div>
    </>
  );
}

export function IosChrome({ url, tabs, activeTabId, variant }: BrowserChromeProps) {
  return (
    <>
      <div className="grid grid-cols-3 items-center px-4 pt-2.5 pb-1.5" aria-hidden="true">
        <span className="text-[11px] font-semibold tracking-tight text-text-primary">
          9:41
        </span>
        <div className="flex justify-center">
          <div className="h-5 w-16 rounded-full bg-primary" />
        </div>
        <div className="flex items-center justify-end gap-1.5">
          <div className="flex items-end gap-[2px]">
            {[3, 5, 7, 9].map((barHeight) => (
              <span
                key={barHeight}
                className="w-[2.5px] rounded-sm bg-text-primary"
                style={{ height: barHeight }}
              />
            ))}
          </div>
          <div className="relative ml-0.5 flex h-[10px] w-[22px] items-center rounded-[3px] border border-text-primary/75 p-[1px]">
            <div className="h-full w-[78%] rounded-[1.5px] bg-text-primary" />
          </div>
        </div>
      </div>
      <div className="px-3 pb-2" aria-hidden="true">
        <div className="flex items-center gap-2 rounded-sm border border-border bg-background px-3 py-1.5">
          <Lock className="h-3 w-3 shrink-0 text-text-secondary" aria-hidden="true" />
          <span className="truncate text-[11px] text-text-secondary">{url}</span>
        </div>
      </div>
      <StaticTabBar tabs={tabs} activeTabId={activeTabId} variant={variant} />
    </>
  );
}
