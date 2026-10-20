---
name: research
description: Evidence-based web and technical research for eCom Gliders. Uses MCP Playwright for live site inspection, records sources and confidence levels, checks project docs first. Use when researching competitors, current site behavior, technical facts, or verifying claims.
---

# Research Skill

## Before external research

1. Search `docs/research/` and `obsidian/09-Research/`
2. Search `cursor_project_prompt_cookbook.md` for existing guidance
3. Stop if sufficient verified evidence already exists

## Research workflow

1. Define the exact question
2. List what evidence would answer it
3. Use official documentation first
4. Use MCP Playwright for live website behavior
5. Record each source with date, URL, finding, confidence (high, medium, low)
6. Separate verified facts from inference
7. Save findings to `docs/research/FINDINGS.md`
8. Update `docs/research/SOURCES.md`

## Playwright tasks

- Navigate to target URL
- Wait for page load (handle Cloudflare if present)
- Capture snapshot and screenshot
- Extract navigation structure, forms, meta tags, headings
- Test interactive elements where relevant
- Record console errors and network failures

## If site blocks automation

Record blocker in findings. Use sitemap.xml, robots.txt, Wayback Machine, or manual export as fallback.
Mark confidence as low until verified.

## Output format

```
QUESTION:
...

EVIDENCE:
- Source | Date | Finding | Confidence

CONCLUSION:
...

UNCERTAINTY:
...

NEXT ACTION:
...
```

## Anti-loop rule

One research pass per question. If blocked, report blocker. Do not retry indefinitely.
