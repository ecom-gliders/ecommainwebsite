import { convertEmojiFeatureGrid } from "@/lib/blog/blocks/sanitize/plugins/convert-emoji-feature-grid";
import { convertFlatTables } from "@/lib/blog/blocks/sanitize/plugins/convert-flat-tables";
import { convertImpactCallouts } from "@/lib/blog/blocks/sanitize/plugins/convert-impact-callouts";
import { convertMetricBars } from "@/lib/blog/blocks/sanitize/plugins/convert-metric-bars";
import { convertNumberedSteps } from "@/lib/blog/blocks/sanitize/plugins/convert-numbered-steps";
import { convertPromoCta } from "@/lib/blog/blocks/sanitize/plugins/convert-promo-cta";
import { convertTipPointers } from "@/lib/blog/blocks/sanitize/plugins/convert-tip-pointers";
import { collapseLetterSpacedHeadings } from "@/lib/blog/blocks/sanitize/plugins/collapse-letter-spaced";
import { stripHeadingEmoji } from "@/lib/blog/blocks/sanitize/plugins/strip-heading-emoji";
import { stripInlineEmoji } from "@/lib/blog/blocks/sanitize/plugins/strip-inline-emoji";
import { stripKeyframesCss } from "@/lib/blog/blocks/sanitize/plugins/strip-keyframes-css";
import { stripLoneEmojiLines } from "@/lib/blog/blocks/sanitize/plugins/strip-lone-emoji";
import { stripOrphanCss } from "@/lib/blog/blocks/sanitize/plugins/strip-orphan-css";
import { stripVisualElementsNotes } from "@/lib/blog/blocks/sanitize/plugins/strip-visual-elements-notes";
import type { SanitizePlugin } from "@/lib/blog/blocks/sanitize/types";

/**
 * Convert-first plugin order (after Elementor/HTML extraction in orchestrator).
 * CSS strip runs only after structures become fences.
 */
export const CONVERT_THEN_CLEAN_PLUGINS: SanitizePlugin[] = [
  collapseLetterSpacedHeadings,
  convertEmojiFeatureGrid,
  convertNumberedSteps,
  convertTipPointers,
  convertPromoCta,
  convertImpactCallouts,
  convertFlatTables,
  convertMetricBars,
  stripKeyframesCss,
  stripOrphanCss,
  stripVisualElementsNotes,
  stripHeadingEmoji,
  stripLoneEmojiLines,
  stripInlineEmoji,
];
