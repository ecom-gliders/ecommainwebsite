export type CalloutVariant = "default" | "tip" | "warning";

export interface BlogBlockWpMatchers {
  classContains?: string[];
  styleContains?: string[];
  elementorWidgetTypes?: string[];
  textPatterns?: string[];
}

export interface BlogBlockDefinition {
  patternId: string;
  fenceLanguage: string | null;
  componentId: string | null;
  sanitizeRuleId: string | null;
  bodyFormat?: string;
  renderMode?: "gfm-table" | "markdown-link";
  componentProps?: Record<string, string>;
  wpMatchers?: BlogBlockWpMatchers;
}

export interface BlogCanonicalMediaRule {
  fence: string;
  component: string;
  rule?: string;
  also?: string;
  frame?: string;
  examplePost?: string;
  allowlistedHosts?: string[];
}

export interface BlogBlocksConfig {
  version: number;
  allowlistOnly: boolean;
  rehypeRaw: boolean;
  /** Single source of truth for chart / figure / video patterns */
  canonical?: {
    multiColumnChart?: BlogCanonicalMediaRule;
    singleSeriesBars?: BlogCanonicalMediaRule;
    figure?: BlogCanonicalMediaRule;
    video?: BlogCanonicalMediaRule;
  };
  blocks: BlogBlockDefinition[];
}

export type BlogContentSegment =
  | { type: "markdown"; content: string }
  | {
      type: "block";
      language: string;
      body: string;
      meta?: { title?: string; variant?: CalloutVariant };
    };
