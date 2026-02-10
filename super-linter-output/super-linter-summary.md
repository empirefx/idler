# Super-linter summary

| Language                   | Validation result |
| -------------------------- | ----------------- |
| BIOME_FORMAT               | Pass ✅           |
| BIOME_LINT                 | Fail ❌           |
| CHECKOV                    | Pass ✅           |
| GITHUB_ACTIONS             | Pass ✅           |
| GITHUB_ACTIONS_ZIZMOR      | Pass ✅           |
| GITLEAKS                   | Pass ✅           |
| GIT_MERGE_CONFLICT_MARKERS | Pass ✅           |
| HTML                       | Pass ✅           |
| JSCPD                      | Pass ✅           |
| MARKDOWN                   | Pass ✅           |
| MARKDOWN_PRETTIER          | Pass ✅           |
| NATURAL_LANGUAGE           | Pass ✅           |
| PRE_COMMIT                 | Pass ✅           |
| SPELL_CODESPELL            | Pass ✅           |
| TRIVY                      | Pass ✅           |
| YAML                       | Pass ✅           |
| YAML_PRETTIER              | Pass ✅           |

Super-linter detected linting errors

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/21876254884)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
Checked 103 files in 1012ms. No fixes applied.
Found 2 errors.src/ui/components/card/EntityCard.js:59:4 lint/a11y/useSemanticElements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × The elements with this role can be changed to the following elements:
    <button>

    57 │ 	return (
    58 │ 		<div
  > 59 │ 			role="button"
       │ 			^^^^^^^^^^^^^
    60 │ 			tabIndex={0}
    61 │ 			onClick={handleClick}

  i For examples and more information, see WAI-ARIA Roles


src/ui/components/card/NPCCard.js:18:4 lint/a11y/useSemanticElements ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × The elements with this role can be changed to the following elements:
    <button>

    16 │ 	return (
    17 │ 		<div
  > 18 │ 			role="button"
       │ 			^^^^^^^^^^^^^
    19 │ 			tabIndex={0}
    20 │ 			className="npc-card"

  i For examples and more information, see WAI-ARIA Roles


lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.

```

</details>
