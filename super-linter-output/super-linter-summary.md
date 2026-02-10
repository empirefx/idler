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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/21876944593)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
Checked 103 files in 671ms. No fixes applied.
Found 2 warnings.src/ui/components/display/EquipmentDisplay.js:32:5 suppressions/unused ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! Suppression comment has no effect. Remove the suppression or make sure you are suppressing the correct rule.

    30 │ 		<div className="equipment-flex">
    31 │ 			{EQUIPMENT_SLOTS.map(({ key, label }) => (
  > 32 │ 				// biome-ignore lint/a11y/useSemanticElements: CSS targets div elements specifically
       │ 				^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    33 │ 				<div
    34 │ 					role="button"


src/ui/components/display/InventoryDisplay.js:196:7 suppressions/unused ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! Suppression comment has no effect. Remove the suppression or make sure you are suppressing the correct rule.

    195 │ 					return (
  > 196 │ 						// biome-ignore lint/a11y/useSemanticElements: CSS targets div elements specifically
        │ 						^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    197 │ 						<div
    198 │ 							role="button"


lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some warnings were emitted while running checks.

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

Clone found (css):
 - src/styles/sections/places-section.css [131:7 - 160:19] (29 lines, 150 tokens)
   src/styles/sections/places-section.css [107:11 - 134:12]

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

Clone found (json):
 - _test_/fixtures/gameStates/testStates.json [53:5 - 77:2] (24 lines, 148 tokens)
   _test_/fixtures/gameStates/testStates.json [6:2 - 29:2]

Clone found (json):
 - _test_/fixtures/gameStates/testStates.json [108:9 - 128:2] (20 lines, 109 tokens)
   _test_/fixtures/gameStates/testStates.json [13:2 - 32:2]

Clone found (javascript):
 - src/data/inventory.js [2:2 - 47:15] (45 lines, 301 tokens)
   src/store/slices/playerInventorySlice.js [17:2 - 62:2]

Clone found (javascript):
 - src/data/inventory.js [47:2 - 76:7] (29 lines, 184 tokens)
   src/store/slices/placeInventorySlice.js [10:2 - 39:6]

Clone found (javascript):
 - _test_/services/SpawnService.test.js [64:17 - 74:14] (10 lines, 94 tokens)
   _test_/services/SpawnService.test.js [50:14 - 60:15]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [162:5 - 180:2] (18 lines, 120 tokens)
   _test_/services/ProductionService.test.js [139:5 - 158:3]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [336:12 - 351:66] (15 lines, 86 tokens)
   _test_/services/ProductionService.test.js [308:17 - 323:54]

Clone found (javascript):
 - _test_/services/ProductionService.test.js [356:12 - 375:75] (19 lines, 112 tokens)
   _test_/services/ProductionService.test.js [304:17 - 323:54]

Clone found (javascript):
 - _test_/mocks/itemFactory.mock.js [2:2 - 10:7] (8 lines, 93 tokens)
   _test_/services/ProductionService.test.js [18:2 - 26:2]

Clone found (javascript):
 - _test_/gameEngine/gameEngine.test.js [302:7 - 316:11] (14 lines, 109 tokens)
   _test_/services/ProductionService.test.js [132:7 - 146:18]

Clone found (javascript):
 - _test_/gameEngine/gameEngine.test.js [308:2 - 323:2] (15 lines, 97 tokens)
   _test_/gameEngine/gameEngine.test.js [287:2 - 302:2]

Clone found (javascript):
 - _test_/gameEngine/gameEngine.test.js [514:56 - 529:28] (15 lines, 121 tokens)
   _test_/gameEngine/gameEngine.test.js [479:68 - 495:2]

Clone found (javascript):
 - _test_/inventoryThunks.test.js [95:5 - 114:5] (19 lines, 120 tokens)
   _test_/fixtures/stateBuilders.js [7:2 - 26:8]

Clone found (javascript):
 - _test_/inventoryThunks.test.js [101:2 - 117:2] (16 lines, 96 tokens)
   _test_/inventoryThunks.test.js [47:7 - 62:2]

Clone found (javascript):
 - _test_/inventoryThunks.test.js [168:4 - 190:13] (22 lines, 126 tokens)
   _test_/inventoryThunks.test.js [45:4 - 67:12]

Clone found (javascript):
 - _test_/inventoryThunks.test.js [262:2 - 278:2] (16 lines, 93 tokens)
   _test_/inventoryThunks.test.js [45:4 - 61:3]

Clone found (javascript):
 - _test_/inventoryThunks.test.js [310:7 - 327:8] (17 lines, 106 tokens)
   _test_/inventoryThunks.test.js [101:7 - 118:9]

Clone found (javascript):
 - _test_/inventoryThunks.test.js [351:4 - 376:2] (25 lines, 158 tokens)
   _test_/inventoryThunks.test.js [32:4 - 58:15]

Clone found (javascript):
 - _test_/enemiesSlice.test.js [89:57 - 98:6] (9 lines, 110 tokens)
   _test_/enemiesSlice.test.js [52:37 - 61:2]

Clone found (javascript):
 - _test_/enemiesSlice.test.js [165:47 - 185:9] (20 lines, 135 tokens)
   _test_/enemiesSlice.test.js [104:67 - 124:12]

Clone found (javascript):
 - _test_/combatService.test.js [126:5 - 140:59] (14 lines, 79 tokens)
   _test_/combatService.test.js [111:2 - 125:35]

Clone found (javascript):
 - _test_/combatService.test.js [140:59 - 160:9] (20 lines, 113 tokens)
   _test_/combatService.test.js [66:49 - 86:3]

Clone found (javascript):
 - _test_/combatService.test.js [162:2 - 182:7] (20 lines, 128 tokens)
   _test_/combatService.test.js [14:2 - 34:2]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 117            │ 11870       │ 93841        │ 36           │ 573 (4.83%)      │ 4351 (4.64%)      │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 17             │ 2745        │ 15759        │ 1            │ 29 (1.06%)       │ 150 (0.95%)       │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 9              │ 266         │ 1672         │ 2            │ 44 (16.54%)      │ 257 (15.37%)      │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ jsx        │ 1              │ 103         │ 623          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 145            │ 14995       │ 112002       │ 39           │ 646 (4.31%)      │ 4758 (4.25%)      │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 39 clones.
Error: ERROR: jscpd found too many duplicates (4.31%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (4.31%) over threshold (0%)
```

</details>
