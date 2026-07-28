# Super-linter summary

| Language                   | Validation result |
| -------------------------- | ----------------- |
| BIOME_FORMAT               | Pass ✅           |
| BIOME_LINT                 | Pass ✅           |
| CHECKOV                    | Pass ✅           |
| GITHUB_ACTIONS             | Pass ✅           |
| GITHUB_ACTIONS_ZIZMOR      | Pass ✅           |
| GITLEAKS                   | Pass ✅           |
| GIT_MERGE_CONFLICT_MARKERS | Pass ✅           |
| HTML                       | Pass ✅           |
| JSCPD                      | Fail ❌           |
| MARKDOWN                   | Pass ✅           |
| MARKDOWN_PRETTIER          | Pass ✅           |
| PRE_COMMIT                 | Pass ✅           |
| SPELL_CODESPELL            | Pass ✅           |
| TRIVY                      | Pass ✅           |
| YAML                       | Pass ✅           |
| YAML_PRETTIER              | Pass ✅           |

Super-linter detected linting errors

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/30374410340)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>JSCPD</summary>

```text
Clone found (jsx):
 - _test_/ui/components/common/DraggableWindow.test.jsx [144:38 - 151:4] (7 lines, 93 tokens)
   _test_/ui/components/common/DraggableWindow.test.jsx [133:38 - 140:8]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [322:12 - 337:75] (15 lines, 84 tokens)
   _test_/services/ProductionService.test.js [280:17 - 295:54]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [459:3 - 472:6] (13 lines, 124 tokens)
   _test_/services/ProductionService.test.js [107:2 - 121:16]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 155            │ 18206       │ 149566       │ 2            │ 28 (0.15%)       │ 208 (0.14%)       │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ jsx        │ 6              │ 673         │ 6347         │ 1            │ 7 (1.04%)        │ 93 (1.47%)        │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 27             │ 6489        │ 39049        │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 146         │ 891          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 197            │ 25525       │ 195960       │ 3            │ 35 (0.14%)       │ 301 (0.15%)       │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 3 clones.
Error: ERROR: jscpd found too many duplicates (0.14%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (0.14%) over threshold (0%)
```

</details>
