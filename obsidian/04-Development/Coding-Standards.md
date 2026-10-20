# Coding Standards

## Source of truth

`.cursor/rules/02-clean-code.mdc` and `.cursor/rules/01-architecture.mdc`

## Summary

- Small focused files (components under 300 lines, services under 250)
- Domain-oriented folder structure
- Consistent naming (kebab-case dirs, camelCase vars, PascalCase classes)
- SOLID applied intentionally, not ceremonially
- Composition over inheritance
- No god classes, no global mutable state
- Early returns over deep nesting
- No dead code or unused imports

## Patterns

Use only when solving a real problem. Document WHY in `obsidian/12-Decisions/`.

## Related notes

- [[Folder-Structure]]
- [[System-Architecture]]
