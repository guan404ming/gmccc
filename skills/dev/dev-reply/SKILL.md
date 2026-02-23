---
name: dev-reply
description: Address PR review comments, fix valid ones and draft replies for invalid ones.
---

# Dev Reply

## Usage
```
/dev-reply <PR_URL>
```

## Instructions

1. **Fetch reviews:** Run `gh pr view <URL> --json reviews,url,number` and `gh api repos/{owner}/{repo}/pulls/{number}/comments` to get all review comments.

2. **Read the relevant source files** mentioned in the review comments.

3. **Evaluate each comment:**
   - Understand what the reviewer is asking for.
   - Check if the suggestion is correct, improves the code, and is consistent with the project's patterns.

4. **For each valid comment:**
   - Apply the fix in the source file. Do NOT commit.
   - Note what was fixed.

5. **For each invalid comment:**
   - Draft a one-sentence reply stating why it does not apply. No fluff.

6. **Output a summary:**
   ```
   ## Fixed
   - `src/Foo.ts:42` - <what was changed>

   ## Reply drafts
   - `src/Bar.ts:15` - "<reply text>"
   ```

## Rules

- Do NOT commit any changes.
- Do NOT post replies to GitHub.
- Replies must be one sentence max. Direct and factual.
- Only fix what the reviewer actually asked for, nothing extra.
