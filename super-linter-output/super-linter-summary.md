# Super-linter summary

| Language                   | Validation result |
| -------------------------- | ----------------- |
| BIOME_FORMAT               | Fail ❌           |
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
| SPELL_CODESPELL            | Fail ❌           |
| TRIVY                      | Pass ✅           |
| YAML                       | Pass ✅           |
| YAML_PRETTIER              | Pass ✅           |

Super-linter detected linting errors

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/30312004353)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_FORMAT</summary>

```text
Checked 148 files in 519ms. No fixes applied.
Found 1 error.src/ui/components/common/NotificationContainer.jsx format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Formatter would have printed the following content:

     5  5 │
     6  6 │   const NotificationContainer = () => {
     7    │ - ··const·notifications·=·useSelector(selectVisibleNotifications);
        7 │ + → const·notifications·=·useSelector(selectVisibleNotifications);
     8  8 │
     9    │ - ··if·(notifications.length·===·0)·{
    10    │ - ····return·null;
    11    │ - ··}
        9 │ + → if·(notifications.length·===·0)·{
       10 │ + → → return·null;
       11 │ + → }
    12 12 │
    13    │ - ··return·(
    14    │ - ····<div·className="notification-container">
    15    │ - ······{notifications.map((notification)·=>·(
    16    │ - ········<Notification·key={notification.id}·notification={notification}·/>
    17    │ - ······))}
    18    │ - ····</div>
    19    │ - ··);
       13 │ + → return·(
       14 │ + → → <div·className="notification-container">
       15 │ + → → → {notifications.map((notification)·=>·(
       16 │ + → → → → <Notification·key={notification.id}·notification={notification}·/>
       17 │ + → → → ))}
       18 │ + → → </div>
       19 │ + → );
    20 20 │   };
    21 21 │


format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.

```

</details>

<details>

<summary>JSCPD</summary>

```text
Clone found (javascript):
 - _test_/services/ProductionService.test.js [25:2 - 31:2] (6 lines, 84 tokens)
   _test_/utils/testHelpers.js [28:2 - 34:2]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [221:80 - 235:9] (14 lines, 96 tokens)
   _test_/services/ProductionService.test.js [195:51 - 210:7]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [351:12 - 366:66] (15 lines, 86 tokens)
   _test_/services/ProductionService.test.js [323:17 - 338:54]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [371:12 - 390:75] (19 lines, 112 tokens)
   _test_/services/ProductionService.test.js [319:17 - 338:54]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [531:2 - 549:6] (18 lines, 128 tokens)
   _test_/services/ProductionService.test.js [110:2 - 129:16]

Clone found (javascript):
 - _test_/playerSlice.test.js [91:46 - 101:22] (10 lines, 118 tokens)
   _test_/playerSlice.test.js [46:36 - 57:6]

Clone found (javascript):
 - _test_/playerInventorySlice.test.js [199:40 - 221:6] (22 lines, 131 tokens)
   _test_/playerInventorySlice.test.js [143:42 - 165:10]

Clone found (javascript):
 - _test_/placeInventorySlice.test.js [14:44 - 23:17] (9 lines, 87 tokens)
   _test_/playerInventorySlice.test.js [15:45 - 24:9]

Clone found (javascript):
 - _test_/inventoryThunks.test.js [238:43 - 249:24] (11 lines, 87 tokens)
   _test_/inventoryThunks.test.js [37:60 - 48:27]

Clone found (javascript):
 - _test_/inventoryThunks.test.js [249:9 - 259:2] (10 lines, 94 tokens)
   _test_/inventoryThunks.test.js [48:17 - 60:6]

Clone found (javascript):
 - _test_/combatService.staggered.test.js [114:57 - 128:2] (14 lines, 101 tokens)
   _test_/combatService.staggered.test.js [79:40 - 93:5]

Clone found (javascript):
 - _test_/combatService.staggered.test.js [247:32 - 262:75] (15 lines, 112 tokens)
   _test_/combatService.staggered.test.js [64:28 - 79:40]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 154            │ 18144       │ 147776       │ 12           │ 163 (0.9%)       │ 1236 (0.84%)      │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ jsx        │ 3              │ 119         │ 912          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 27             │ 6489        │ 39049        │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 146         │ 891          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 193            │ 24909       │ 188735       │ 12           │ 163 (0.65%)      │ 1236 (0.65%)      │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 12 clones.
Error: ERROR: jscpd found too many duplicates (0.65%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (0.65%) over threshold (0%)
```

</details>

<details>

<summary>SPELL_CODESPELL</summary>

```text
/github/workspace/package-lock.json:6152: vEw ==> view, vow, vex
```

</details>
