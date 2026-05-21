# Memory System

This directory documents the workspace memory conventions for AI-assisted development.

## Purpose

Memory files capture persistent and session-scoped information that helps agents make better decisions over time.

## Memory Scopes

- `/memories/` — user-scoped persistent notes that survive across sessions
- `/memories/session/` — temporary notes specific to the current conversation
- `/memories/repo/` — repository-scoped facts and conventions

## When to Use Memory

- Record stable patterns or preferences
- Store workspace-specific conventions
- Save session-specific context that should persist only for the current task flow

## Best Practices

- Keep entries short and factual
- Use separate files for distinct knowledge areas
- Avoid storing sensitive data
- Use memory only for reusable or persistent knowledge

## Example

Use `repository memory` for project-specific rules or conventions. Use `session memory` for current task planning.
