/**
 * Sanitize migrated blog MDX bodies: strip WordPress/Elementor chrome,
 * convert visual blocks to themed markdown fences, normalize headings.
 * Shared by batch scripts and optional render-time safety.
 *
 * Convert-first plugins live in src/lib/blog/blocks/sanitize/.
 */
import * as cheerio from "cheerio";
import TurndownService from "turndown";
import { getFenceLanguageAlternation } from "@/lib/blog/blocks/allowlist";
import { CONVERT_THEN_CLEAN_PLUGINS } from "@/lib/blog/blocks/sanitize";
import type { SanitizeTransform } from "@/lib/blog/blocks/sanitize/types";
import { normalizeHeadingLevels } from "@/lib/blog/normalize-heading-levels";

export type { SanitizeTransform } from "@/lib/blog/blocks/sanitize/types";

export interface SanitizeResult {
  content: string;
  transforms: SanitizeTransform[];
  changed: boolean;
}

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});

turndown.addRule("preserveImages", {
  filter: "img",
  replacement: (_content, node) => {
    const element = node as unknown as {
      getAttribute: (name: string) => string | null;
    };
    const alt = element.getAttribute("alt") ?? "";
    const src = element.getAttribute("src") ?? "";
    if (!src) return "";
    return `![${alt}](${src})`;
  },
});

turndown.addRule("stripScriptsStyles", {
  filter: (node) => {
    const name = node.nodeName.toLowerCase();
    return (
      name === "script" ||
      name === "style" ||
      name === "iframe" ||
      name === "svg"
    );
  },
  replacement: () => "",
});

const ELEMENTOR_START =
  /<(?:div|section)[^>]*(?:class=["'][^"']*elementor|data-widget_type|data-element_type)/i;

export function sanitizeBlogMarkdown(raw: string): SanitizeResult {
  const transforms: SanitizeTransform[] = [];
  let content = raw.replace(/\r\n/g, "\n");

  const before = content;

  // 1) If Elementor HTML remains, extract body widgets → markdown first
  const elemIdx = content.search(ELEMENTOR_START);
  if (elemIdx >= 0) {
    const prefix = content.slice(0, elemIdx).trimEnd();
    const htmlBlob = unescapeMarkdownHtml(content.slice(elemIdx));
    const {
      html: cleanedHtml,
      transforms: htmlTransforms,
      markdownAppend,
    } = extractCleanHtmlFragments(htmlBlob);
    transforms.push(...htmlTransforms);
    const fromHtml = htmlToMarkdownSafe(cleanedHtml);
    content = [prefix, fromHtml, ...markdownAppend]
      .filter(Boolean)
      .join("\n\n");
    transforms.push({
      id: "elementorToMarkdown",
      detail: `prefix=${prefix.length} html=${htmlBlob.length} out=${fromHtml.length}`,
    });
  }

  // 2) Convert remaining CSS/HTML feature grids (non-Elementor posts)
  const gridResult = convertFeatureGrids(content);
  if (gridResult.transforms.length) {
    content = gridResult.content;
    transforms.push(...gridResult.transforms);
  }

  // 3) Convert HTML tables to GFM
  const tableResult = convertHtmlTables(content);
  if (tableResult.transforms.length) {
    content = tableResult.content;
    transforms.push(...tableResult.transforms);
  }

  // 4) Strip residual HTML tags (keep text / convert simple anchors)
  const htmlStrip = stripResidualHtml(content);
  if (htmlStrip.changed) {
    content = htmlStrip.content;
    transforms.push({ id: "stripResidualHtml" });
  }

  // 5) Convert-first plugins, then CSS/emoji cleanup
  for (const plugin of CONVERT_THEN_CLEAN_PLUGINS) {
    const result = plugin(content);
    content = result.content;
    transforms.push(...result.transforms);
  }

  // 6) Strip JSON-LD / FAQ script leftovers
  if (/<script[\s\S]*?<\/script>/i.test(content)) {
    content = content.replace(/<script[\s\S]*?<\/script>/gi, "");
    transforms.push({ id: "stripScripts" });
  }

  // 7) Chrome tails
  const chromeCut = cutChromeTail(content);
  if (chromeCut.changed) {
    content = chromeCut.content;
    transforms.push({ id: "cutChromeTail", detail: chromeCut.detail });
  }

  const shareStrip = stripShareNetworkTail(content);
  if (shareStrip.changed) {
    content = shareStrip.content;
    transforms.push({ id: "stripShareTail" });
  }

  content = content.replace(/\s*style="[^"]*"/gi, "");

  const withHeadings = normalizeHeadingLevels(content);
  if (withHeadings !== content) {
    content = withHeadings;
    transforms.push({ id: "normalizeHeadings" });
  }

  content = content.replace(/\n{3,}/g, "\n\n").trim() + "\n";

  return {
    content,
    transforms,
    changed: content !== before.replace(/\r\n/g, "\n"),
  };
}

function convertFeatureGrids(content: string): SanitizeResult {
  const transforms: SanitizeTransform[] = [];
  if (!/display\s*:\s*grid/i.test(content) && !/insight-card/i.test(content)) {
    return { content, transforms, changed: false };
  }

  // Wrap fragment so cheerio can walk style grids
  const $ = cheerio.load(`<div id="sanitize-root">${content}</div>`, {
    xml: false,
  });
  let changed = false;

  $("#sanitize-root")
    .find("div")
    .each((_, el) => {
      const style = ($(el).attr("style") ?? "").toLowerCase();
      const className = $(el).attr("class") ?? "";
      const isGrid =
        style.includes("display:grid") ||
        style.includes("display: grid") ||
        className.includes("insight-card");
      if (!isGrid && !style.includes("grid-template")) return;

      // Prefer outermost grid containers (have multiple bordered children)
      const cards = extractCardsFromElement($, el);
      if (cards.length < 2) return;

      const fence = `\n\n\`\`\`feature-grid\n${cards
        .map((c) => `${escapeFence(c.title)} | ${escapeFence(c.description)}`)
        .join("\n")}\n\`\`\`\n\n`;
      $(el).replaceWith(fence);
      transforms.push({
        id: "featureGrid",
        detail: `${cards.length} cards`,
      });
      changed = true;
    });

  if (!changed) {
    const loose = extractLooseGridCards(content);
    if (loose.cards.length >= 2) {
      const next =
        content.slice(0, loose.start) +
        `\n\n\`\`\`feature-grid\n${loose.cards
          .map((c) => `${escapeFence(c.title)} | ${escapeFence(c.description)}`)
          .join("\n")}\n\`\`\`\n\n` +
        content.slice(loose.end);
      transforms.push({
        id: "featureGridLoose",
        detail: `${loose.cards.length} cards`,
      });
      return { content: next, transforms, changed: true };
    }
    return { content, transforms, changed: false };
  }

  // cheerio may escape backticks — restore fence markers from text
  let result = $("#sanitize-root").html() ?? content;
  result = result
    .replace(/&#x60;/g, "`")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"');

  return { content: result, transforms, changed: true };
}

function extractCardsFromElement(
  $: cheerio.CheerioAPI,
  // cheerio node from .each — avoid coupling to cheerio.Element export
  root: unknown,
): Array<{ title: string; description: string }> {
  const cards: Array<{ title: string; description: string }> = [];
  const $root = $(root as never);

  const candidates = $root.children("div").toArray();
  const nodes = candidates.length >= 2 ? candidates : $root.find("div").toArray();

  for (const node of nodes) {
    const $el = $(node);
    const style = ($el.attr("style") ?? "").toLowerCase();
    const className = $el.attr("class") ?? "";
    const looksLikeCard =
      style.includes("border") ||
      className.includes("card") ||
      className.includes("insight") ||
      $el.find("h3,h4").length > 0;
    if (!looksLikeCard) continue;
    if ($el.find("div[style*='border']").length > 0) continue;

    const title = $el
      .find("h2,h3,h4,strong,b")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();
    const clone = $el.clone();
    clone.find("svg,script,style,h2,h3,h4").remove();
    let description = clone.text().replace(/\s+/g, " ").trim();
    if (title && description.startsWith(title)) {
      description = description.slice(title.length).trim();
    }
    if (title && description.length > 10) {
      cards.push({ title, description });
    }
  }

  return cards;
}

function extractCardsFromHtml(html: string): Array<{
  title: string;
  description: string;
}> {
  const $ = cheerio.load(`<body>${html}</body>`);
  const cards: Array<{ title: string; description: string }> = [];

  $("div[style*='border'], .insight-card, [class*='card']").each((_, el) => {
    const $el = $(el);
    if ($el.find("div[style*='border']").length) return; // skip parents
    const title = $el
      .find("h2,h3,h4,strong,b")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();
    const clone = $el.clone();
    clone.find("svg,script,style,h2,h3,h4").remove();
    let description = clone.text().replace(/\s+/g, " ").trim();
    if (title && description.startsWith(title)) {
      description = description.slice(title.length).trim();
    }
    if (title && description.length > 10) {
      cards.push({ title, description });
    }
  });

  return cards;
}

function extractLooseGridCards(content: string): {
  start: number;
  end: number;
  cards: Array<{ title: string; description: string }>;
} {
  const start = content.search(/display\s*:\s*grid/i);
  if (start < 0) return { start: -1, end: -1, cards: [] };

  const windowEnd = Math.min(content.length, start + 12000);
  const window = content.slice(Math.max(0, start - 200), windowEnd);
  const cards = extractCardsFromHtml(window);
  // End after last card-ish closing or next elementor widget
  const relEnd = window.search(
    /The Evolution|data-widget_type="heading|<h4><b>|<h2 class="elementor/i,
  );
  const end =
    relEnd > 0
      ? Math.max(0, start - 200) + relEnd
      : Math.max(0, start - 200) + window.length;

  return { start: Math.max(0, start - 200), end, cards };
}

function convertHtmlTables(content: string): SanitizeResult {
  const transforms: SanitizeTransform[] = [];
  let result = content;

  result = result.replace(/<table[\s\S]*?<\/table>/gi, (tableHtml) => {
    const $ = cheerio.load(tableHtml);
    const rows: string[][] = [];
    $("tr").each((_, tr) => {
      const cells: string[] = [];
      $(tr)
        .find("th,td")
        .each((__, cell) => {
          cells.push($(cell).text().replace(/\s+/g, " ").trim());
        });
      if (cells.length) rows.push(cells);
    });
    if (rows.length < 2) return tableHtml;
    const width = Math.max(...rows.map((r) => r.length));
    const pad = (row: string[]) =>
      Array.from({ length: width }, (_, i) => row[i] ?? "");
    const header = pad(rows[0]);
    const body = rows.slice(1).map(pad);
    const line = (cells: string[]) =>
      `| ${cells.map((c) => c.replace(/\|/g, "\\|")).join(" | ")} |`;
    const sep = `| ${header.map(() => "---").join(" | ")} |`;
    transforms.push({ id: "htmlTable", detail: `${rows.length} rows` });
    return `\n\n${line(header)}\n${sep}\n${body.map(line).join("\n")}\n\n`;
  });

  return { content: result, transforms, changed: transforms.length > 0 };
}

function extractCleanHtmlFragments(htmlBlob: string): {
  html: string;
  transforms: SanitizeTransform[];
  markdownAppend: string[];
} {
  const transforms: SanitizeTransform[] = [];
  const markdownAppend: string[] = [];
  const $ = cheerio.load(htmlBlob);

  $("script, style, iframe, noscript").remove();
  $(
    '[data-widget_type="share-buttons.default"], [data-widget_type="wpr-grid.default"], [data-widget_type="elementskit-blog-posts.default"], [data-widget_type="wpr-taxonomy-list.default"], [data-widget_type="button.default"], [data-widget_type="post-info.default"]',
  ).remove();

  const fragments: string[] = [];
  const CONTENT_TYPES = new Set([
    "text-editor.default",
    "heading.default",
    "image.default",
    "html.default",
    "tp-adv-text-block.default",
    "tp-table.default",
    "eae-timeline.skin3",
    "eae-comparisontable.default",
    "shortcode.default",
    "elementskit-faq.default",
  ]);

  $(".elementor-widget").each((_, el) => {
    const type = $(el).attr("data-widget_type") ?? "";
    if (!CONTENT_TYPES.has(type)) return;

    // FAQ accordion → markdown appended after turndown (avoid ## escaping)
    if (
      type === "elementskit-faq.default" ||
      $(el).find(".elementskit-single-faq, .elementskit-faq").length
    ) {
      const faqMd = convertFaqWidgetToMarkdown($, el);
      if (faqMd) {
        markdownAppend.push(faqMd);
        transforms.push({ id: "faqWidgetToMarkdown" });
      }
      return;
    }
    const container = $(el).find(".elementor-widget-container").first();
    let inner = container.html()?.trim() ?? "";
    if (!inner) return;

    const lower = inner.toLowerCase();
    const textOnly = cheerio.load(inner).root().text().replace(/\s+/g, " ").trim().toLowerCase();
    if (
      lower.includes("recent posts") ||
      lower.includes("subscribe for growth tips") ||
      lower.includes("subscribe for updates") ||
      lower.includes("beehiiv") ||
      lower.includes("picture of ") ||
      lower.includes("reading time") ||
      textOnly === "categories" ||
      textOnly === "recent posts" ||
      textOnly === "share" ||
      (lower.includes("contact us") && lower.includes("facebook")) ||
      isSocialShareOnly(lower)
    ) {
      return;
    }

    // Promo box images that only link to quote CTA after article
    if (
      type === "image.default" &&
      /request-a-quote|ecom-banner/i.test(inner) &&
      !/alt=/i.test(inner)
    ) {
      // keep content images; skip obvious footer promo banners by filename
    }
    if (/ecom-banner/i.test(inner) && type === "image.default") {
      return;
    }

    // Convert grids inside fragment before turndown
    const gridSan = convertFeatureGrids(inner);
    if (gridSan.transforms.length) {
      transforms.push(...gridSan.transforms);
    }
    inner = gridSan.content;

    const tableSan = convertHtmlTables(inner);
    if (tableSan.transforms.length) {
      transforms.push(...tableSan.transforms);
    }
    inner = tableSan.content;

    // Strip WP colors on spans — keep text
    const $frag = cheerio.load(`<div id="r">${inner}</div>`);
    $frag("span[style]").each((__, span) => {
      const $span = $frag(span);
      $span.replaceWith($span.html() ?? $span.text());
    });
    $frag("a span").each((__, span) => {
      const $span = $frag(span);
      $span.replaceWith($span.html() ?? $span.text());
    });
    inner = $frag("#r").html() ?? inner;

    fragments.push(inner);
  });

  if (fragments.length === 0) {
    $("nav, aside, form").remove();
    return {
      html: $.root().html() ?? "",
      transforms,
      markdownAppend,
    };
  }

  return { html: fragments.join("\n\n"), transforms, markdownAppend };
}

function isSocialShareOnly(lower: string): boolean {
  const networks = [
    "facebook",
    "twitter",
    "linkedin",
    "whatsapp",
    "pinterest",
    "reddit",
  ];
  const hits = networks.filter((n) => lower.includes(n)).length;
  return hits >= 3 && lower.length < 800;
}

function convertFaqWidgetToMarkdown(
  $: cheerio.CheerioAPI,
  root: unknown,
): string {
  const items: Array<{ q: string; a: string }> = [];
  const $root = $(root as never);

  $root.find(".elementskit-single-faq, .elementskit-card, .faq-item").each((_, card) => {
    const $card = $(card);
    const q = $card
      .find(".elementskit-faq-title, .elementskit-card-header, button, h2, h3, h4")
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();
    const a = $card
      .find(
        ".elementskit-faq-body, .elementskit-card-body, .ekit-accordion--content, .elementskit-card-body-text",
      )
      .first()
      .text()
      .replace(/\s+/g, " ")
      .trim();
    if (q && a && a.length >= 20) {
      items.push({ q, a });
    }
  });

  if (items.length === 0) return "";

  const lines = ["## FAQ", ""];
  for (const item of items) {
    lines.push(`#### ${item.q}`);
    lines.push("");
    lines.push(item.a);
    lines.push("");
  }
  return lines.join("\n");
}

function htmlToMarkdownSafe(html: string): string {
  if (!html.trim()) return "";
  const alt = getFenceLanguageAlternation() || "feature-grid|callout";
  const fenceRe = new RegExp("```(" + alt + ")\\r?\\n([\\s\\S]*?)```", "g");
  const fenceHolders: string[] = [];
  const withHolders = html.replace(
    fenceRe,
    (_m, lang: string, body: string) => {
      const idx = fenceHolders.length;
      fenceHolders.push(`\`\`\`${lang}\n${body.trimEnd()}\n\`\`\``);
      return `<p>BLOGFENCEPLACEHOLDER${idx}</p>`;
    },
  );

  let md = turndown.turndown(withHolders);
  fenceHolders.forEach((fence, i) => {
    const patterns = [
      new RegExp(`BLOGFENCEPLACEHOLDER${i}`, "g"),
      new RegExp(`BLOGFENCEPLACEHOLDER${i}`, "g"),
    ];
    for (const re of patterns) {
      md = md.replace(re, `\n\n${fence}\n\n`);
    }
  });

  return md.replace(/\n{3,}/g, "\n\n").trim();
}

function stripResidualHtml(content: string): {
  content: string;
  changed: boolean;
} {
  if (!/<\/?[a-zA-Z][^>]*>/.test(content)) {
    return { content, changed: false };
  }

  // Protect fenced code
  const fences: string[] = [];
  let protectedContent = content.replace(/```[\s\S]*?```/g, (m) => {
    fences.push(m);
    return `%%FENCE_${fences.length - 1}%%`;
  });

  // Simple anchors
  protectedContent = protectedContent.replace(
    /<a\s+[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi,
    (_m, href: string, text: string) => {
      const label = text.replace(/<[^>]+>/g, "").trim();
      return `[${label}](${href})`;
    },
  );

  // Images
  protectedContent = protectedContent.replace(
    /<img\s+[^>]*src=["']([^"']+)["'][^>]*(?:alt=["']([^"']*)["'])?[^>]*\/?>/gi,
    (_m, src: string, alt?: string) => `![${alt ?? ""}](${src})`,
  );

  // Block-ish tags → newlines
  protectedContent = protectedContent.replace(
    /<\/?(?:p|div|br|h[1-6]|li|ul|ol|section|article)[^>]*>/gi,
    "\n",
  );

  // Drop remaining tags
  protectedContent = protectedContent.replace(/<\/?[a-zA-Z][^>]*>/g, "");

  // Unescape common entities
  protectedContent = protectedContent
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ");

  fences.forEach((f, i) => {
    protectedContent = protectedContent.replace(`%%FENCE_${i}%%`, f);
  });

  return { content: protectedContent, changed: true };
}

function cutChromeTail(content: string): {
  content: string;
  changed: boolean;
  detail?: string;
} {
  const markers = [
    /\n##?\s*Recent Posts\s*\n/i,
    /\nRecent Posts\s*\n/i,
    /\n##?\s*Categories\s*\n/i,
    /\nSubscribe for Growth Tips/i,
    /\nSubscribe for updates\.?\s*\n/i,
  ];

  let cutAt = -1;
  let which = "";
  for (const re of markers) {
    const m = content.search(re);
    if (m >= 0 && (cutAt < 0 || m < cutAt)) {
      // Only cut if in the last 35% (sidebar chrome), never before FAQ
      const faqAt = content.search(/\n## FAQ\b/i);
      if (m > content.length * 0.65 && (faqAt < 0 || m > faqAt)) {
        cutAt = m;
        which = re.source;
      }
    }
  }

  if (cutAt < 0) return { content, changed: false };
  return {
    content: content.slice(0, cutAt).trimEnd() + "\n",
    changed: true,
    detail: which,
  };
}

function escapeFence(value: string): string {
  return value.replace(/\s*\|\s*/g, " / ").replace(/\n/g, " ").trim();
}

/** Undo common Turndown escapes inside residual HTML attribute names/values. */
function unescapeMarkdownHtml(html: string): string {
  return html
    .replace(/\\_/g, "_")
    .replace(/\\-/g, "-")
    .replace(/\\:/g, ":")
    .replace(/\\\./g, ".")
    .replace(/\\&/g, "&");
}

function stripShareNetworkTail(content: string): {
  content: string;
  changed: boolean;
} {
  const shareBlock =
    /\n(?:Facebook|Twitter|LinkedIn|Reddit|Email|WhatsApp|Pinterest)\s*(?:\n(?:Facebook|Twitter|LinkedIn|Reddit|Email|WhatsApp|Pinterest)\s*){2,}[\s\S]*$/i;
  if (!shareBlock.test(content)) {
    return { content, changed: false };
  }
  return {
    content: content.replace(shareBlock, "\n").trimEnd() + "\n",
    changed: true,
  };
}
