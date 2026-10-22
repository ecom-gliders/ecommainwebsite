import * as cheerio from "cheerio";

const CONTENT_WIDGET_TYPES = new Set([
  "text-editor.default",
  "heading.default",
  "image.default",
  "html.default",
  // ThePlus / Elementskit / EAE article blocks (were dropped → truncated MDX)
  "tp-adv-text-block.default",
  "tp-table.default",
  "eae-timeline.skin3",
  "eae-comparisontable.default",
  "elementskit-faq.default",
  "shortcode.default",
]);

const SKIP_WIDGET_TYPES = new Set([
  "share-buttons.default",
  "divider.default",
  "button.default",
  "post-info.default",
  "wpr-promo-box.default",
  // Sidebar / related chrome — skip, do not abort the scan (abort caused early cuts)
  "wpr-grid.default",
  "elementskit-blog-posts.default",
  "wpr-taxonomy-list.default",
  "wpr-post-info.default",
  "wpforms.default",
]);

export function extractPostBodyHtml(elementorHtml: string): string {
  const $ = cheerio.load(elementorHtml);
  const fragments: string[] = [];

  $(".elementor-widget").each((_, element) => {
    const widgetType = $(element).attr("data-widget_type") ?? "";

    if (SKIP_WIDGET_TYPES.has(widgetType) || !CONTENT_WIDGET_TYPES.has(widgetType)) {
      return;
    }

    const container = $(element).find(".elementor-widget-container").first();
    if (!container.length) {
      return;
    }

    // Drop embedded authoring CSS from HTML widgets before markdown conversion
    container.find("style, script, iframe").remove();

    const html = container.html()?.trim();
    if (!html) {
      return;
    }

    if (isSocialShareBlock(html)) {
      return;
    }

    if (isSidebarChrome(html)) {
      return;
    }

    fragments.push(html);
  });

  return fragments.join("\n\n");
}

function isSidebarChrome(html: string): boolean {
  const normalized = html.toLowerCase();
  return (
    normalized.includes("recent posts") ||
    normalized.includes("subscribe for growth tips") ||
    normalized.includes("get a quick solution") ||
    (normalized.includes("all post") && normalized.includes("amazon ppc"))
  );
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
