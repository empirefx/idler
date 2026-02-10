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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/21875969979)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
Checked 103 files in 852ms. No fixes applied.
Found 3 errors.src/ui/components/card/EntityCard.js:58:3 lint/a11y/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━

  × Static Elements should not be interactive.

    57 │ 	return (
  > 58 │ 		<div
       │ 		^^^^
  > 59 │ 			onClick={handleClick}
        ...
  > 66 │ 			data-enemy-id={entity.id}
  > 67 │ 		>
       │ 		^
    68 │ 			<div className="block-gradient"></div>
    69 │ 			<img

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/card/NPCCard.js:17:3 lint/a11y/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━

  × Static Elements should not be interactive.

    16 │ 	return (
  > 17 │ 		<div
       │ 		^^^^
  > 18 │ 			className="npc-card"
        ...
  > 24 │ 			}}
  > 25 │ 		>
       │ 		^
    26 │ 			<div className={`npc-avatar avatar avatar_${avatar} small`}></div>
    27 │ 			<div className="npc-info">

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/common/ItemInfo.js:7:3 lint/a11y/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━

  × Static Elements should not be interactive.

     6 │ 	return (
   > 7 │ 		<div
       │ 		^^^^
   > 8 │ 			className="item-info-wrapper"
   > 9 │ 			onMouseEnter={() => setShow(true)}
  > 10 │ 			onMouseLeave={() => setShow(false)}
  > 11 │ 		>
       │ 		^
    12 │ 			{children}
    13 │ 			{show && (

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.

```

</details>
