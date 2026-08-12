# Global Rules

- No Explore agent.
- Minimal, clean changes. Reuse, don't duplicate.
- No comments or docstrings anywhere, inline included. Exceptions: license headers, lint/type directives. Binds all subagents.
- Imports at top of file only, never inline.
- Simplest implementation that meets current needs; no speculative abstraction, config, or indirection.
- Reuse existing dependencies before adding code or packages; check docs/types first.
- No em dashes.
- No fabrication; if unverified, say so.
- Commits: short imperative ~50-char subject, capitalized, no trailing period, no co-authors. Don't commit unless asked.
- Follow repo conventions.
- Don't post to GitHub.
- Keep responses concise and short.
- For PR descriptions, use the dev-pr-summarize skill.

## Before returning

- Run the dev-pr-check skill.
