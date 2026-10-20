import type {
  BrowserTab,
  BrowserVariant,
  ChartPoint,
  TableRow,
} from "@/lib/content-config";

export type { BrowserTab, BrowserVariant, ChartPoint, TableRow };

export interface BrowserMockupProps {
  /** Additional Tailwind classes on the figure wrapper */
  className?: string;
  /** Browser chrome variant. Default from design-system.json */
  variant?: BrowserVariant;
  /** Optional figcaption above the frame */
  label?: string;
  /** Override the default tab for this variant (homepage.json, service pages) */
  tabId?: string;
}

export interface BrowserChromeProps {
  url: string;
  tabs: BrowserTab[];
  activeTabId: string;
  variant: BrowserVariant;
}
