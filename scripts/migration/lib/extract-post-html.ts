import * as cheerio from "cheerio";

const CONTENT_WIDGET_TYPES = new Set([
  "text-editor.default",
  "heading.default",
  "image.default",
  "html.default",
]);

const SKIP_WIDGET_TYPES = new Set([
  "share-buttons.default",
  "divider.default",
  "button.default",
  "post-info.default",
  "wpr-promo-box.default",
]);

const STOP_WIDGET_TYPES = new Set([
  "wpr-grid.default",
  "elementskit-blog-posts.default",
  "wpr-taxonomy-list.default",
  "wpr-post-info.default",
]);

export function extractPostBodyHtml(elementorHtml: string): string {
  const $ = cheerio.load(elementorHtml);
  const fragments: string[] = [];

  $(".elementor-widget").each((_, element) => {
    const widgetType = $(element).attr("data-widget_type") ?? "";

    if (STOP_WIDGET_TYPES.has(widgetType)) {
      return false;
    }

    if (SKIP_WIDGET_TYPES.has(widgetType) || !CONTENT_WIDGET_TYPES.has(widgetType)) {
      return;
    }

    const container = $(element).find(".elementor-widget-container").first();
    if (!container.length) {
      return;
    }

    const html = container.html()?.trim();
    if (!html) {
      return;
    }

    if (isSocialShareBlock(html)) {
      return;
    }

    fragments.push(html);
  });

  return fragments.join("\n\n");
}

function isSocialShareBlock(html: string): boolean {
  const normalized = html.toLowerCase();
  return (
    normalized.includes("contact us") &&
    (normalized.includes("facebook") ||
      normalized.includes("linkedin") ||
      normalized.includes("whatsapp"))
  );
}

export function stripHtml(html: string): string {
  return cheerio.load(html).root().text().replace(/\s+/g, " ").trim();
}
