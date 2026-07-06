---
name: af-review-ui
description: Review Airflow UI code for consistency, best practices, and conventions.
---

# Review Airflow UI

## Usage
```
/review-airflow-ui                    # local branch vs main
/review-airflow-ui <PR_URL>           # checkout and review PR
```

## Stack
React 19, Chakra UI v3, React Query, TypeScript, Vite, pnpm

## Review Checklist

Lead with conventions. Most findings should be "mirror the existing pattern",
not personal taste. Before flagging, grep for the canonical example so the
finding points the author at code already in the tree.

**Reuse over rebuild**
- Reuse shared components before adding markup: `StateBadge` (states),
  `ErrorAlert` (errors), `Time` (timestamps), `Dialog` / `Pagination` /
  `Tooltip` from `src/components/ui/`. Grep `src/components/` first.
- Never hardcode a state→color map or literal `"red"`/`"green"`; use
  `StateBadge` or a Chakra `colorPalette` token.
- Data fetching goes through generated hooks in `openapi/queries`, not ad-hoc fetch.

**Types**
- API types come from `openapi-gen/` (`openapi/requests/types.gen`). Never
  hand-write a `string` where a generated enum exists (e.g.
  `TaskInstanceState`, `DagRunState`).
- After a backend API change, regenerate; never hand-edit generated files.

**Component conventions**
- Props: `type Props = { readonly x: T }`. Return `undefined`, not `null`.
- User-facing text via `translate("ns:key")` — no string literals in JSX.
- Modals follow the existing `Dialog.Root` pattern (`lazyMount`,
  `unmountOnExit`, `onOpenChange={onClose}`); gate the query with `enabled`.
- Complete `useMemo` / `useEffect` dependency arrays.
- Mirror the closest existing page/component for file layout and naming.

## Instructions

1. Get changed files:
   - PR: `gh pr checkout <URL>` then `gh pr diff --name-only`
   - Local: `git diff main --name-only`

2. If backend API changed, remind to run:
   ```bash
   prek airflow-core:generate-openapi-spec
   cd airflow-core/src/airflow/ui && pnpm codegen
   ```

3. Run `prek airflow-core:ts-compile-lint-ui`

4. Skip generated files: `openapi-gen/`, `openapi.merged.json`, `api_fastapi/*/openapi/*.yaml`. Review only this PR's changes, not unchanged code. If `git diff main` shows files the PR's own commits never touched, the branch is behind — note it needs a rebase, don't review the rebase noise.

## Output

Finding style:

- **Imperative voice**: state the fix, not the observation ("Reuse `ErrorAlert`", not "this could reuse ErrorAlert").
- **Constructive**: name the convention and cite the file/symbol to mirror (e.g. "use `StateBadge` like `Run/Details.tsx:60`").
- **Polite but brief**: a one-line thanks is fine; never pad with praise, list what is already fine, or restate the diff.
- **Suggest, don't command**: "Consider" / "Could" / "Suggest" over "You must".

Emit exactly these three parts and nothing else:

1. **Checks** — one line: `ts-compile-lint-ui ✅ · <hook> ✅`. If backend API changed, add: `Run codegen (prek airflow-core:generate-openapi-spec && pnpm codegen).`
2. **Findings** — real issues only, one line each, most important first. Skip the section entirely if none. Do NOT post.
   ```
   1. `src/Foo.tsx:42` - Reuse `ErrorAlert` (see `src/components/ErrorAlert.tsx`) instead of the inline alert.
   2. `src/Bar.tsx:15` - Type as `TaskInstanceState` from `openapi/requests/types.gen`, not `string`.
   ```
   Tag non-blocking ones `(nit)`. Order by impact: correctness/convention breaks first, then reuse, then nits. Cap at the ~7 that matter; drop the rest.
   **Confirm every cited line number** by grepping the file (`grep -n` the symbol) before writing it — point at the exact line of the code being changed, never an approximate one. Cite the example-to-mirror's location too.
3. **Verdict** — one line, courteous, one word + half-sentence why:
   - **Approve** — good to merge.
   - **Approve with comments** — nits only, OK as-is.
   - **Request changes** — name the blocking issue(s).

Keep the whole output under ~15 lines. If you wrote a paragraph, cut it.

After the verdict, add one **zh-TW 摘要** block: 口語白話總結，依序講三件事 — 這個 PR 在做什麼、findings 的重點（用白話帶過每條，非阻擋的講「小建議」即可，沒 findings 就說沒問題）、結論要不要改。簡短，別逐字翻譯英文 findings。

```
**摘要（zh-TW）：** <這個 PR 做了什麼>。<findings 白話重點>。<結論／要不要改>。
```
