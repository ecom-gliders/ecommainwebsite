/**
 * Normalize Windows CRLF / lone CR so heading regexes that use `$` match.
 * Without this, `### Title\r` fails `/^(#{2,5})\s+(.+)$/` and TOC/normalize
 * silently drop every heading.
 */
export function normalizeMarkdownNewlines(markdown: string): string {
  return markdown.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}
