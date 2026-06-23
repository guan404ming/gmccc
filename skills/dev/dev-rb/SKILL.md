---
name: dev-rb
description: Rebase open PRs onto the default branch, resolve conflicts, and force push.
---

# Dev Rebase

## Usage
```
/dev-rb            # all open PRs authored by me
/dev-rb <PR_URL>   # only that PR
```

## Instructions

1. **Sync:** detect the default branch (`git remote show upstream 2>/dev/null | sed -n 's/.*HEAD branch: //p'`, fallback to `main`), checkout it and run `git sync`.

2. **Pick PRs:**
   - With a `<PR_URL>` arg, operate on that PR only.
   - Otherwise list mine: `gh pr list --author "@me" --state open --json number,headRefName`.

3. **For each PR branch:**
   - `git checkout <branch>` and `git rebase <default>`.
   - On conflict, resolve it in the source files, `git add` them, `git rebase --continue`. Never `git rebase --skip`. If a conflict is not safely resolvable, abort that branch with `git rebase --abort` and report it.
   - `git push origin <branch> --force-with-lease`.

4. **Checkout the default branch** when done.

5. **Report** one line per PR: clean / resolved conflicts / skipped.

## Rules

- Always `--force-with-lease`, never plain `--force`.
- Do not change PR content, only rebase.
