import { loadBlogBlocksConfig } from "@/lib/blog/blocks/load-blog-blocks-config";

let cached: Set<string> | null = null;

export function getAllowlistedFenceLanguages(): string[] {
  return [...getAllowlistedFenceLanguageSet()];
}

export function getAllowlistedFenceLanguageSet(): Set<string> {
  if (cached) return cached;
  const config = loadBlogBlocksConfig();
  cached = new Set(
    config.blocks
      .map((block) => block.fenceLanguage)
      .filter((lang): lang is string => Boolean(lang)),
  );
  return cached;
}

export function isAllowlistedFenceLanguage(language: string): boolean {
  return getAllowlistedFenceLanguageSet().has(language);
}

/** Regex source for fence openers, e.g. feature-grid|callout|tip|… */
export function getFenceLanguageAlternation(): string {
  return getAllowlistedFenceLanguages()
    .map((lang) => lang.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
    .join("|");
}
