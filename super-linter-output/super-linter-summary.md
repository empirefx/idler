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
| JSCPD                      | Fail ❌           |
| MARKDOWN                   | Pass ✅           |
| MARKDOWN_PRETTIER          | Pass ✅           |
| NATURAL_LANGUAGE           | Pass ✅           |
| PRE_COMMIT                 | Pass ✅           |
| SPELL_CODESPELL            | Pass ✅           |
| TRIVY                      | Pass ✅           |
| YAML                       | Pass ✅           |
| YAML_PRETTIER              | Pass ✅           |

Super-linter detected linting errors

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/21882632803)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
Checked 103 files in 687ms. No fixes applied.
Found 1 error.src/ui/components/display/LogDisplay.js:13:2 lint/correctness/useExhaustiveDependencies  FIXABLE  ━━━━━━━━━━

  × This hook specifies more dependencies than necessary: filteredLogs.

    12 │ 	// Scroll to bottom on update
  > 13 │ 	useEffect(() => {
       │ 	^^^^^^^^^
    14 │ 		if (containerRef.current) {
    15 │ 			containerRef.current.scrollTop = containerRef.current.scrollHeight;

  i Outer scope values aren't valid dependencies because mutating them doesn't re-render the component.

    15 │ 			containerRef.current.scrollTop = containerRef.current.scrollHeight;
    16 │ 		}
  > 17 │ 	}, [filteredLogs]);
       │ 	    ^^^^^^^^^^^^
    18 │
    19 │ 	return (

  i React relies on hook dependencies to determine when to re-compute Effects.
    Specifying more dependencies than required can lead to unnecessary re-rendering
    and degraded performance.

  i Unsafe fix: Remove the extra dependencies from the list.

    17 │ → },·[filteredLogs]);
       │       ------------

lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.

```

</details>

<details>

<summary>JSCPD</summary>

```text
Clone found (javascript):
 - src/ui/components/sections/WorkersSection.js [42:9 - 50:10] (8 lines, 75 tokens)
   src/ui/components/sections/WorkersSection.js [28:11 - 36:3]

Clone found (javascript):
 - src/ui/components/display/LogDisplay.js [2:2 - 9:7] (7 lines, 88 tokens)
   src/ui/components/sections/LogSection.js [7:2 - 14:6]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [55:15 - 72:36] (17 lines, 138 tokens)
   src/store/slices/playerInventorySlice.js [89:17 - 106:37]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [73:3 - 81:31] (8 lines, 96 tokens)
   src/store/slices/playerInventorySlice.js [107:3 - 115:32]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [81:31 - 97:55] (16 lines, 127 tokens)
   src/store/slices/playerInventorySlice.js [115:32 - 131:56]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [98:3 - 122:39] (24 lines, 209 tokens)
   src/store/slices/playerInventorySlice.js [132:3 - 156:40]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [246:2 - 252:7] (6 lines, 79 tokens)
   src/store/slices/placeInventorySlice.js [238:2 - 242:7]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [100:4 - 119:34] (19 lines, 171 tokens)
   src/store/slices/placeInventorySlice.js [53:4 - 106:37]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [120:3 - 128:29] (8 lines, 96 tokens)
   src/store/slices/playerInventorySlice.js [107:3 - 115:32]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [128:29 - 144:53] (16 lines, 127 tokens)
   src/store/slices/playerInventorySlice.js [115:32 - 131:56]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [148:4 - 166:37] (18 lines, 166 tokens)
   src/store/slices/playerInventorySlice.js [138:4 - 156:40]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [192:6 - 209:16] (17 lines, 115 tokens)
   src/store/slices/playerInventorySlice.js [240:9 - 257:10]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [253:24 - 261:24] (8 lines, 91 tokens)
   src/store/slices/placeInventorySlice.js [239:26 - 247:26]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [260:2 - 266:7] (6 lines, 79 tokens)
   src/store/slices/npcInventorySlice.js [252:2 - 256:7]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [261:24 - 270:18] (9 lines, 113 tokens)
   src/store/slices/placeInventorySlice.js [247:26 - 256:20]

Clone found (javascript):
 - src/data/inventory.js [2:2 - 47:15] (45 lines, 301 tokens)
   src/store/slices/playerInventorySlice.js [17:2 - 62:2]

Clone found (javascript):
 - src/data/inventory.js [47:2 - 76:7] (29 lines, 184 tokens)
   src/store/slices/placeInventorySlice.js [10:2 - 39:6]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 119            │ 11858       │ 94487        │ 17           │ 261 (2.2%)       │ 2255 (2.39%)      │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 17             │ 2733        │ 15681        │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 139         │ 847          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 145            │ 14741       │ 111122       │ 17           │ 261 (1.77%)      │ 2255 (2.03%)      │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 17 clones.
Error: ERROR: jscpd found too many duplicates (1.77%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (1.77%) over threshold (0%)
```

</details>
