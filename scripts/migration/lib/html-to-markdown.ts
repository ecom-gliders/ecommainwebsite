import TurndownService from "turndown";

const turndown = new TurndownService({
  headingStyle: "atx",
  codeBlockStyle: "fenced",
  emDelimiter: "*",
});

turndown.addRule("preserveImages", {
  filter: "img",
  replacement: (_content, node) => {
    const element = node as Element;
    const alt = element.getAttribute("alt") ?? "";
    const src = element.getAttribute("src") ?? "";
    if (!src) {
      return "";
    }
    return `![${alt}](${src})`;
  },
});

export function htmlToMarkdown(html: string): string {
  if (!html.trim()) {
    return "";
  }

  return turndown
    .turndown(html)
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
