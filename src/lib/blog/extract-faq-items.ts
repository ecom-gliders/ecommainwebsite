import type { FaqItem } from "@/domain/content/schemas";
import { normalizeMarkdownNewlines } from "@/lib/blog/normalize-markdown-newlines";

const FAQ_SECTION_HEADING = /^#{2,6}\s+.*\bFAQ/i;
// After normalizeHeadingLevels, FAQ questions are often ### (was #### in WP)
const QUESTION_HEADING = /^#{3,6}\s+(.+\?)\s*$/;
const BOLD_QUESTION_LINE = /^\s*\*\*([^*]+\?)\*\*\s*$/;
const INVALID_ANSWER_PATTERN = /[{]|class=|\.sd-|@media|<div|<style/i;

function cleanMarkdownText(value: string): string {
  return value
    .replace(/\*\*/g, "")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .replace(/\s+/g, " ")
    .trim();
}

function isValidAnswer(answer: string): boolean {
  if (answer.length < 20 || answer.length > 900) {
    return false;
  }

  return !INVALID_ANSWER_PATTERN.test(answer);
}

function collectAnswerLines(lines: string[], startIndex: number): string {
  const parts: string[] = [];

  for (let index = startIndex; index < lines.length; index += 1) {
    const line = lines[index];

    if (/^#{1,6}\s/.test(line) || BOLD_QUESTION_LINE.test(line)) {
      break;
    }

    if (/^recent posts$/i.test(line.trim())) {
      break;
    }

    if (INVALID_ANSWER_PATTERN.test(line)) {
      break;
    }

    const trimmed = line.trim();
    if (trimmed) {
      parts.push(trimmed);
    }
  }

  return cleanMarkdownText(parts.join(" "));
}

function findFaqSectionStart(lines: string[]): number {
  return lines.findIndex((line) => FAQ_SECTION_HEADING.test(line));
}

export function splitBlogContent(markdown: string): {
  mainContent: string;
  faqItems: FaqItem[];
} {
  const source = normalizeMarkdownNewlines(markdown);
  const lines = source.split("\n");
  const faqItems = extractFaqItems(source);

  if (faqItems.length === 0) {
    return { mainContent: source, faqItems: [] };
  }

  const faqSectionStart = findFaqSectionStart(lines);
  if (faqSectionStart === -1) {
    return { mainContent: source, faqItems };
  }

  let faqSectionEnd = lines.length;
  for (let index = faqSectionStart + 1; index < lines.length; index += 1) {
    if (/^##\s/.test(lines[index]) && !FAQ_SECTION_HEADING.test(lines[index])) {
      faqSectionEnd = index;
      break;
    }
    if (/^recent posts$/i.test(lines[index].replace(/^#+\s*/, "").trim())) {
      faqSectionEnd = index;
      break;
    }
  }

  const mainContent = [
    ...lines.slice(0, faqSectionStart),
    ...lines.slice(faqSectionEnd),
  ]
    .join("\n")
    .trim();

  return { mainContent, faqItems };
}

export function extractFaqItems(markdown: string): FaqItem[] {
  const items: FaqItem[] = [];
  const lines = markdown.split("\n");
  const seen = new Set<string>();
  const faqSectionStart = findFaqSectionStart(lines);

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const inFaqSection = faqSectionStart !== -1 && index >= faqSectionStart;

    const headingMatch = inFaqSection ? line.match(QUESTION_HEADING) : null;
    if (headingMatch) {
      const question = cleanMarkdownText(headingMatch[1]);
      const answer = collectAnswerLines(lines, index + 1);
      if (question && isValidAnswer(answer)) {
        addFaqItem(items, seen, question, answer);
      }
      continue;
    }

    const boldMatch = line.match(BOLD_QUESTION_LINE);
    if (boldMatch) {
      const question = cleanMarkdownText(boldMatch[1]);
      const answer = collectAnswerLines(lines, index + 1);
      if (question && isValidAnswer(answer)) {
        addFaqItem(items, seen, question, answer);
      }
    }
  }

  return items.slice(0, 10);
}

function addFaqItem(
  items: FaqItem[],
  seen: Set<string>,
  question: string,
  answer: string,
): void {
  const key = question.toLowerCase();
  if (seen.has(key)) {
    return;
  }

  seen.add(key);
  items.push({ question, answer });
}
