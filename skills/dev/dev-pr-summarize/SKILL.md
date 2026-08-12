---
name: dev-pr-summarize
description: Generate a concise PR changelog summary from the current branch diff.
---

# pr-summarize - PR Changelog Generator

Generate a clear, minimal changelog for the current branch.

## Instructions

0. Detect the default branch: `BASE=$(git remote show upstream 2>/dev/null | sed -n 's/.*HEAD branch: //p') || BASE=main`
1. Run `git log --oneline -10 $BASE` to study the repo's commit message convention (e.g., `feat:`, `MSSQL:`, `[COMPONENT]`, plain imperative, etc.)
2. Run `git log --oneline $BASE..HEAD` to get commits on the branch
3. Run `git diff $BASE...HEAD --stat` to see changed files
4. Run `git diff $BASE...HEAD` to read the actual changes
5. Produce a changelog using the template below, with the title matching the repo's convention

## Template

```
## <Short imperative title describing the change>

## Why

- <1-2 short, high-level bullets a non-expert can read: what was broken or missing, in plain words. No file paths, no import chains, no internals>

## How

- <At most 3 bullet points, each starting with a verb>
- <Focus on what changed, not implementation details>
```

## Rules

- No fluff. Output only the changelog, nothing else.
- Keep every bullet high level and at most 15 words.
