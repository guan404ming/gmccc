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
     - **AST convention (issue #1204):** wrap new statements in a named struct, not inline enum fields.
       ```rust
       // Good: named struct
       pub struct Throw { pub error_number: Option<Expr>, ... }
       Statement::Throw(Throw)

       // Bad: inline fields
       Statement::Throw { error_number: Option<Expr>, ... }
       ```
     - **Parser convention:** parse functions should be standalone (parse the full statement including its keyword) and return the struct, not `Statement`. In the keyword dispatch, rewind the token first:
       ```rust
       Keyword::THROW => {
           self.prev_token();
           self.parse_throw().map(Into::into)
       },
       ```
     - **No early-return for empty input:** do not add short-circuit checks for semicolons or EOF at the start of parse functions. Let the function error naturally on incomplete input.

   - **Verify:**
     ```bash
     cargo test
     cargo clippy --all-targets --all-features -- -D warnings
     cargo fmt --all -- --check
     ```

   - **Update `target/NOTE.md`:** Mark completed items with `[x]`.

   - **PR title** must include the dialect name prefix (e.g., `MSSQL: Add support for ...`).
