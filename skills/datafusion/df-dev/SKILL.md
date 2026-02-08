---
name: df-dev
description: Develop dialect features for datafusion-sqlparser-rs from the upstream contribution list or a description.
---

# DataFusion SQLParser Dev

## Usage
```
/df-dev                  # auto-pick next unchecked item from target/NOTE.md
/df-dev <text description>
```

## Instructions

1. **Understand the task:** Check `target/NOTE.md` for the upstream contribution list. If no argument given, pick the next unchecked item. Otherwise, match the request to an item if applicable.

2. Follow `/dev-autodev` loop with these project-specific details:

   - **Implement:**
     - Add or modify relevant files under `src/`
     - Reuse existing parser infrastructure (e.g., `parse_begin_exception_end()`)
     - Add tests in `tests/sqlparser_<dialect>.rs`
     - For dialect-specific syntax, include a comment with the official doc link

   - **Verify:**
     ```bash
     cargo test
     cargo clippy --all-targets --all-features -- -D warnings
     cargo fmt --all -- --check
     ```

   - **Update `target/NOTE.md`:** Mark completed items with `[x]`.

   - **PR title** must include the dialect name prefix (e.g., `MSSQL: Add support for ...`).
