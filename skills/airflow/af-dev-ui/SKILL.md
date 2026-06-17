---
name: af-dev-ui
description: Develop Airflow UI features from an issue link or text description.
---

# Airflow UI Dev

## Usage
```
/af-dev-ui <GitHub issue URL>
/af-dev-ui <text description>
```

## Stack
React 19, Chakra UI v3, React Query, TypeScript, Vite, pnpm

## Conventions
- Reuse from `src/` before creating files: `components/ui/`, `constants/`, `utils/`, `hooks/`, `queries/`, `context/`, `layouts/`
- Use types from `openapi-gen/` (never hand-write API types)
- Props `readonly`: `type Props = { readonly x: T }`
- Return `undefined` not `null`

## Instructions

1. Get requirements: `gh issue view <URL>`, or use the given text.
2. Read existing code in the area you're changing; reuse it.
3. If backend endpoint changed:
   ```bash
   prek airflow-core:generate-openapi-spec
   cd airflow-core/src/airflow/ui && pnpm codegen
   ```
4. Implement the minimal change, following existing patterns.
5. Verify in the browser with `browser_snapshot` (not `browser_take_screenshot`).
6. Run `prek airflow-core:ts-compile-lint-ui`.
7. Summarize with `/dev-pr-summarize`.
