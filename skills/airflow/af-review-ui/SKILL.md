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
- Consistency with existing patterns
- Reuse components from `src/components/ui/`
- Use types from `openapi-gen/` (never hand-write API types)
- Props with `readonly`: `type Props = { readonly x: T }`
- Return `undefined` not `null`

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

4. Skip generated files: `openapi-gen/`, `openapi.merged.json`, `api_fastapi/*/openapi/*.yaml`. Review only this PR's changes, not unchanged code.

## Output

Write findings in **imperative voice**: state the fix, not the observation ("Reuse `ErrorAlert`", not "this could reuse ErrorAlert"). Stay **polite but brief** — a one-line thanks is fine, but never pad with praise, never list what is already fine, never restate the diff. Suggest, don't command ("Consider", "Could", "Suggest" over "You must"). Emit exactly these three parts and nothing else:

1. **Checks** — one line: `ts-compile-lint-ui ✅ · <hook> ✅`. If backend API changed, add: `Run codegen (prek airflow-core:generate-openapi-spec && pnpm codegen).`
2. **Findings** — real issues only, one line each, most important first. Skip the section entirely if none. Do NOT post.
   ```
   1. `src/Foo.tsx:42` - Consider reusing `ErrorAlert`.
   2. `src/Bar.tsx:15` - Move type to `openapi-gen/`.
   ```
   Tag non-blocking ones `(nit)`. Cap at the ~7 that matter; drop the rest.
   **Confirm every cited line number** by grepping the file (`grep -n` the symbol) before writing it — point at the exact line of the code being changed, never an approximate one.
3. **Verdict** — one line, courteous, one word + half-sentence why:
   - **Approve** — good to merge.
   - **Approve with comments** — nits only, OK as-is.
   - **Request changes** — name the blocking issue(s).

Keep the whole output under ~15 lines. If you wrote a paragraph, cut it.

After the verdict, add one **zh-TW 摘要** block: 口語白話總結，依序講三件事 — 這個 PR 在做什麼、findings 的重點（用白話帶過每條，非阻擋的講「小建議」即可，沒 findings 就說沒問題）、結論要不要改。簡短，別逐字翻譯英文 findings。

```
**摘要（zh-TW）：** <這個 PR 做了什麼>。<findings 白話重點>。<結論／要不要改>。
```
