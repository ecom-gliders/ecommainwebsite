import { loadBlogBlocksConfig } from "@/lib/blog/blocks/load-blog-blocks-config";
import type { BlogCanonicalMediaRule } from "@/lib/blog/blocks/types";

/**
 * Canonical blog chart / figure / video patterns.
 * Source: content/config/blog-blocks.json → canonical
 */
export function getCanonicalBlogMedia(): {
  multiColumnChart?: BlogCanonicalMediaRule;
  singleSeriesBars?: BlogCanonicalMediaRule;
  figure?: BlogCanonicalMediaRule;
  video?: BlogCanonicalMediaRule;
} {
  return loadBlogBlocksConfig().canonical ?? {};
}
