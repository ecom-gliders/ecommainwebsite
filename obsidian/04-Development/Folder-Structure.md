# Folder Structure

Status: Active (Next.js app in repo).

## Repository layout

```
ecomgliders-site/
├── .cursor/
│   ├── rules/          # 00–15 project rules
│   ├── skills/         # Project skills (incl. lead-forms, SEO pack)
│   ├── plans/          # Implementation plans
│   └── mcp.json
├── src/                # Next.js App Router application
├── content/            # JSON config + blog MDX
├── public/             # Served static assets
├── assets/             # source / approved / icons / licenses
├── docs/               # Project documentation (with ai/, seo/, qa/, project/)
├── obsidian/           # Knowledge vault
├── scripts/            # Maintainable utilities
├── tests/
├── backup/             # Local WP/migration backup (payloads gitignored)
├── AGENTS.md
├── README.md
├── MASTER_PROMPT.md    # Pointer → docs/ai/MASTER-PROMPT.md
└── cursor_project_prompt_cookbook.md  # Pointer → docs/ai/...
```

Canonical detail: `docs/project/REPO-STRUCTURE.md`.

## Application (`src/`)

Feature-oriented modules. Maximum practical nesting depth: 4 levels.

## Naming

- Directories: kebab-case
- TypeScript: camelCase / PascalCase per language norms
- Env: UPPER_SNAKE_CASE

## Related notes

- [[System-Architecture]]
- [[Coding-Standards]]
- `docs/project/LEAD-FORMS.md`
