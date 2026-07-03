---
name: dev-pr-check
description: Check the current branch diff for minimality, correctness with sufficient tests, and repo conventions.
---

# pr-check - Three-Point Diff Check

Check the current branch diff (committed and working tree) against three criteria. Report findings, then fix violations if the user asks.

## Instructions

0. Detect the default branch: `BASE=$(git remote show upstream 2>/dev/null | sed -n 's/.*HEAD branch: //p') || BASE=main`
1. Run `git diff $BASE...HEAD --stat` and `git status --short` to scope the diff
2. Read the full diff. For every finding, cite `file:line`

## Criteria

### 1. Minimal

- The smallest change that completes the requirement. Flag speculative features, unused exports, dead flexibility, duplication of existing code.
- Comments and docstrings must be extremely simple: at most one line, imperative mood, only for non-obvious *why*. Flag anything longer, anything restating code, and narrating comments.

### 2. Correct with sufficient tests

- Every changed behaviour has a test that fails without the change. No more: do not test pre-existing logic, stdlib, or third-party code. Flag both missing coverage and over-testing.
- Verify tests actually ran and passed. If unverified, say so, never claim.

### 3. Convention

- Code style, comment and docstring style, file naming, and file placement must follow the repo's existing patterns.
- For every convention judgment, name the existing code being mirrored (e.g. "matches `tests/foo/test_bar.py`", "same pattern as `_setup_go_sdk_integration`"). A convention claim without a cited precedent does not count.
- Check repo instruction files (CLAUDE.md, AGENTS.md, contributing docs) for hard rules the diff touches.

## Report

```
**1. Minimal** — <pass/fail>: <findings with file:line, or what was verified>
**2. Correct + tests** — <pass/fail>: <coverage map; note anything unverified>
**3. Convention** — <pass/fail>: <each judgment with its cited precedent>
```

## Rules

- Terse findings, one line each. No essays.
- Honest verdicts: surface known weaknesses and deliberate omissions instead of hiding them.
- Do not invent findings to look thorough; "no issues" is a valid result.
