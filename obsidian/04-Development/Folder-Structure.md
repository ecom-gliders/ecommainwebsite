# Folder Structure

Status: Proposed for when development starts.

## Repository layout

```
ecomGliders/
├── .cursor/
│   ├── rules/          # Cursor AI rules (project-local)
│   ├── skills/         # Cursor AI skills (project-local)
│   ├── mcp.json        # MCP config (project-local)
│   └── plans/          # Implementation plans
├── obsidian/           # Obsidian knowledge vault
├── docs/               # Project documentation
├── assets/             # Images, icons, fonts, licenses
├── scripts/            # Utility and migration scripts
├── cursor_project_prompt_cookbook.md
└── [app code TBD]      # Application source (not created yet)
```

## Application structure (to be decided)

Will follow feature-based modular architecture.
Maximum nesting depth of 4 levels for feature folders.

## Naming

- Directories: kebab-case
- Files: match language convention (camelCase for TS/JS, snake_case for Python)

## File size limits

- Components: under 300 lines
- Services: under 250 lines
- Split when responsibilities diverge

## Related notes

- [[System-Architecture]]
- [[Coding-Standards]]
