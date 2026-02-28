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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/22526077167)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
The number of diagnostics exceeds the limit allowed. Use --max-diagnostics to increase it.
Diagnostics not shown: 82.
Checked 130 files in 1654ms. No fixes applied.
Found 60 errors.
Found 37 warnings.
Found 5 infos.src/game/core/Gameplay.js:176:51 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━━━━

  ! This parameter is unused.

    174 │ 		const activeQuests = this.getActiveQuests();
    175 │
  > 176 │ 		Object.entries(activeQuests).forEach(([questId, questState]) => {
        │ 		                                                ^^^^^^^^^^
    177 │ 			const quest = questCatalog[questId];
    178 │ 			if (!quest?.objectives) return;

  i Unused parameters might be the result of an incomplete refactoring.

  i Unsafe fix: If this is intentional, prepend questState with an underscore.

    174 174 │   		const activeQuests = this.getActiveQuests();
    175 175 │
    176     │ - → → Object.entries(activeQuests).forEach(([questId,·questState])·=>·{
        176 │ + → → Object.entries(activeQuests).forEach(([questId,·_questState])·=>·{
    177 177 │   			const quest = questCatalog[questId];
    178 178 │   			if (!quest?.objectives) return;


src/game/core/Gameplay.js:180:47 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━━━━

  ! This parameter is unused.

    178 │ 			if (!quest?.objectives) return;
    179 │
  > 180 │ 			Object.entries(quest.objectives).forEach(([objectiveKey, objective]) => {
        │ 			                                           ^^^^^^^^^^^^
    181 │ 				if (objective.type === type) {
    182 │ 					this.questHandlers[type]?.({

  i Unused parameters might be the result of an incomplete refactoring.

  i Unsafe fix: If this is intentional, prepend objectiveKey with an underscore.

    178 178 │   			if (!quest?.objectives) return;
    179 179 │
    180     │ - → → → Object.entries(quest.objectives).forEach(([objectiveKey,·objective])·=>·{
        180 │ + → → → Object.entries(quest.objectives).forEach(([_objectiveKey,·objective])·=>·{
    181 181 │   				if (objective.type === type) {
    182 182 │   					this.questHandlers[type]?.({


src/game/core/Gameplay.js:315:34 lint/correctness/noUnusedFunctionParameters ━━━━━━━━━━━━━━━━━━━━━━━

  ! This parameter is unused.

    313 │ 	}
    314 │
  > 315 │ 	requestQuestComplete({ questId, npcId }) {
        │ 	                                ^^^^^
    316 │ 		return this.completeQuestAtNpc(questId);
    317 │ 	}

  i Unused parameters might be the result of an incomplete refactoring.


src/game/core/Gameplay.js:335:43 lint/correctness/noUnusedFunctionParameters ━━━━━━━━━━━━━━━━━━━━━━━

  ! This parameter is unused.

    333 │ 	}
    334 │
  > 335 │ 	handleQuestObjectiveCompleted({ questId, progressKey }) {
        │ 	                                         ^^^^^^^^^^^
    336 │ 		this.checkQuestCompletion(questId);
    337 │ 	}

  i Unused parameters might be the result of an incomplete refactoring.


src/game/engine/GameEngine.js:7:10 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━

  ! Several of these imports are unused.

    5 │ import { createItem } from "../factory/itemFactory";
    6 │ import SpawnService from "../services/SpawnService";
  > 7 │ import { EventBusService, globalEventBus } from "../services/EventBusService";
      │          ^^^^^^^^^^^^^^^
    8 │ import { CombatService } from "../services/CombatService";
    9 │ import {

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    7 │ import·{·EventBusService,·globalEventBus·}·from·"../services/EventBusService";
      │          -----------------

src/game/engine/GameEngine.js:137:40 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━

  ! This parameter is unused.

    136 │ 	// Calculate production rate for a building
  > 137 │ 	calculateProductionRate(buildingData, state) {
        │ 	                                      ^^^^^
    138 │ 		return buildingData.baseProductionRate || 0;
    139 │ 	}

  i Unused parameters might be the result of an incomplete refactoring.

  i Unsafe fix: If this is intentional, prepend state with an underscore.

    135 135 │
    136 136 │   	// Calculate production rate for a building
    137     │ - → calculateProductionRate(buildingData,·state)·{
        137 │ + → calculateProductionRate(buildingData,·_state)·{
    138 138 │   		return buildingData.baseProductionRate || 0;
    139 139 │   	}


src/game/services/CraftingService.js:121:9 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━━━

  ! This variable knownRecipes is unused.

    119 │ 	craft(recipeId, outputItemId = null) {
    120 │ 		const state = this.store.getState();
  > 121 │ 		const knownRecipes = state.player?.knownRecipes || [];
        │ 		      ^^^^^^^^^^^^
    122 │
    123 │ 		const validation = this.canCraft(state, recipeId, outputItemId);

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.

  i Unsafe fix: If this is intentional, prepend knownRecipes with an underscore.

    119 119 │   	craft(recipeId, outputItemId = null) {
    120 120 │   		const state = this.store.getState();
    121     │ - → → const·knownRecipes·=·state.player?.knownRecipes·||·[];
        121 │ + → → const·_knownRecipes·=·state.player?.knownRecipes·||·[];
    122 122 │
    123 123 │   		const validation = this.canCraft(state, recipeId, outputItemId);


src/game/services/InventoryService.js:10:2 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━

  ! Several of these imports are unused.

     8 │ import {
     9 │ 	canItemsStack,
  > 10 │ 	cloneItem,
       │ 	^^^^^^^^^^
  > 11 │ 	calculateWeight,
  > 12 │ 	calculateTotalPlayerWeight,
       │ 	^^^^^^^^^^^^^^^^^^^^^^^^^^
    13 │ 	getInventorySummary,
    14 │ } from "../../store/slices/inventory/inventoryUtils.js";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

      8   8 │   import {
      9   9 │   	canItemsStack,
     10     │ - → cloneItem,
     11     │ - → calculateWeight,
     12     │ - → calculateTotalPlayerWeight,
     13  10 │   	getInventorySummary,
     14  11 │   } from "../../store/slices/inventory/inventoryUtils.js";


src/game/services/ProductionService.js:80:5 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━━━━

  ! Change to an optional chain.

    78 │ 		return workers.find(
    79 │ 			(worker) =>
  > 80 │ 				worker.assignments &&
       │ 				^^^^^^^^^^^^^^^^^^^^^
  > 81 │ 				worker.assignments[placeId] &&
       │ 				^^^^^^^^^^^^^^^^^^^^^^^^^^^
    82 │ 				worker.assignments[placeId].socketIndex === socketIndex,
    83 │ 		);

  i Unsafe fix: Change to an optional chain.

     78  78 │   		return workers.find(
     79  79 │   			(worker) =>
     80     │ - → → → → worker.assignments·&&
     81     │ - → → → → worker.assignments[placeId]·&&
         80 │ + → → → → worker.assignments?.[placeId]·&&
     82  81 │   				worker.assignments[placeId].socketIndex === socketIndex,
     83  82 │   		);


src/game/services/ProductionService.js:90:5 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━━━━

  ! Change to an optional chain.

    88 │ 		return workers.filter(
    89 │ 			(worker) =>
  > 90 │ 				worker.assignments &&
       │ 				^^^^^^^^^^^^^^^^^^^^^
  > 91 │ 				worker.assignments[placeId] &&
       │ 				^^^^^^^^^^^^^^^^^^^^^^^^^^^
    92 │ 				worker.assignments[placeId].socketIndex === socketIndex,
    93 │ 		);

  i Unsafe fix: Change to an optional chain.

     88  88 │   		return workers.filter(
     89  89 │   			(worker) =>
     90     │ - → → → → worker.assignments·&&
     91     │ - → → → → worker.assignments[placeId]·&&
         90 │ + → → → → worker.assignments?.[placeId]·&&
     92  91 │   				worker.assignments[placeId].socketIndex === socketIndex,
     93  92 │   		);


src/game/services/ProductionService.js:134:4 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━━━

  ! Change to an optional chain.

    132 │ 		const assignment = worker?.assignments?.[placeId];
    133 │ 		return (
  > 134 │ 			assignment &&
        │ 			^^^^^^^^^^^^^
  > 135 │ 			assignment.material &&
        │ 			^^^^^^^^^^^^^^^^^^^
    136 │ 			(buildingData.baseProductionRate || 0) > 0
    137 │ 		);

  i Unsafe fix: Change to an optional chain.

    132 132 │   		const assignment = worker?.assignments?.[placeId];
    133 133 │   		return (
    134     │ - → → → assignment·&&
    135     │ - → → → assignment.material·&&
        134 │ + → → → assignment?.material·&&
    136 135 │   			(buildingData.baseProductionRate || 0) > 0
    137 136 │   		);


src/ui/components/sections/WorkerManagerSection.js:1:10 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! Several of these imports are unused.

  > 1 │ import { useMemo, useEffect, useCallback } from "react";
      │          ^^^^^^^
    2 │ import { useSelector, useDispatch } from "react-redux";
    3 │

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·{·useMemo,·useEffect,·useCallback·}·from·"react";
      │          ---------

src/ui/components/sections/WorkersSection.js:30:18 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━

  ! Change to an optional chain.

    29 │ 	const assignedSocketIndexesForPlace = workers
  > 30 │ 		.filter((w) => w.assignments && w.assignments[currentPlaceId])
       │ 		               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    31 │ 		.map((w) => w.assignments[currentPlaceId].socketIndex)
    32 │ 		.filter((idx) => idx !== null && idx !== undefined);

  i Unsafe fix: Change to an optional chain.

     28  28 │
     29  29 │   	const assignedSocketIndexesForPlace = workers
     30     │ - → → .filter((w)·=>·w.assignments·&&·w.assignments[currentPlaceId])
         30 │ + → → .filter((w)·=>·w.assignments?.[currentPlaceId])
     31  31 │   		.map((w) => w.assignments[currentPlaceId].socketIndex)
     32  32 │   		.filter((idx) => idx !== null && idx !== undefined);


src/game/services/EventBusService.js:27:24 lint/suspicious/useIterableCallbackReturn ━━━━━━━━━━━━━━━

  × This callback passed to forEach() iterable method should not return a value.

    25 │ 	emit(event, data) {
    26 │ 		if (!this.handlers[event]) return;
  > 27 │ 		this.handlers[event].forEach((handler) => handler(data));
       │ 		                     ^^^^^^^
    28 │ 	}
    29 │ }

  i Either remove this return or remove the returned value.

    25 │ 	emit(event, data) {
    26 │ 		if (!this.handlers[event]) return;
  > 27 │ 		this.handlers[event].forEach((handler) => handler(data));
       │ 		                                          ^^^^^^^^^^^^^
    28 │ 	}
    29 │ }


src/ui/components/sections/QuestSection.js:22:21 lint/correctness/useHookAtTopLevel ━━━━━━━━━━━━━━━━

  × This hook is being called from a nested function, but all hooks must be called unconditionally from the top-level component.

    20 │ 		quest.objectives &&
    21 │ 		Object.entries(quest.objectives).map(([key, objective]) => {
  > 22 │ 			const progress = useSelector(
       │ 			                 ^^^^^^^^^^^
    23 │ 				selectQuestProgress(quest.id, objective.progressKey),
    24 │ 			);

  i For React to preserve state between calls, hooks needs to be called unconditionally and always in the same order.

  i See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level


src/ui/components/sections/WorkerManagerSection.js:108:5 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━

  × Provide an explicit type prop for the button element.

    106 │ 			<div className="worker-manager-header">
    107 │ 				<h3>Worker Manager</h3>
  > 108 │ 				<button className="close-btn" onClick={closeWorkerManagerWindow}>
        │ 				^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    109 │ 					×
    110 │ 				</button>

  i The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

  i Allowed button types are: submit, button or reset


src/ui/components/sections/WorkerManagerSection.js:143:10 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━

  × Provide an explicit type prop for the button element.

    141 │ 										</span>
    142 │ 									</div>
  > 143 │ 									<button
        │ 									^^^^^^^
  > 144 │ 										className={`hire-btn ${!canHireMore || gold < workerCost ? "disabled" : ""}`}
  > 145 │ 										disabled={!canHireMore || gold < workerCost}
  > 146 │ 										onClick={() => handleHire(worker.id)}
  > 147 │ 									>
        │ 									^
    148 │ 										Hire ({workerCost}g)
    149 │ 									</button>

  i The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

  i Allowed button types are: submit, button or reset


src/ui/components/sections/WorkerManagerSection.js:157:5 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━

  × Provide an explicit type prop for the button element.

    155 │ 			</div>
    156 │ 			<div className="worker-manager-actions">
  > 157 │ 				<button
        │ 				^^^^^^^
  > 158 │ 					className={`reroll-btn ${gold < REROLL_COST ? "disabled" : ""}`}
  > 159 │ 					disabled={gold < REROLL_COST}
  > 160 │ 					onClick={handleReroll}
  > 161 │ 				>
        │ 				^
    162 │ 					Reroll Workers ({REROLL_COST}g)
    163 │ 				</button>

  i The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

  i Allowed button types are: submit, button or reset


src/ui/components/sections/WorkerManagerSection.js:165:5 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━

  × Provide an explicit type prop for the button element.

    163 │ 				</button>
    164 │
  > 165 │ 				<button
        │ 				^^^^^^^
  > 166 │ 					className={`buy-slot-btn ${gold < SLOT_COST ? "disabled" : ""}`}
  > 167 │ 					disabled={gold < SLOT_COST}
  > 168 │ 					onClick={handleBuySlot}
  > 169 │ 				>
        │ 				^
    170 │ 					Buy Worker Slot ({SLOT_COST}g)
    171 │ 				</button>

  i The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

  i Allowed button types are: submit, button or reset


src/ui/layouts/GameLayout.js:62:4 lint/a11y/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Static Elements should not be interactive.

    60 │ 				<LogSection />
    61 │ 			</main>
  > 62 │ 			<div
       │ 			^^^^
  > 63 │ 				className="building-panel-container"
  > 64 │ 				onMouseEnter={showBuildingPanel}
  > 65 │ 				onMouseLeave={hideBuildingPanel}
  > 66 │ 			>
       │ 			^
    67 │ 				<BuildingPanel onClose={toggleBuildingPanel} />
    68 │ 			</div>

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some warnings were emitted while running checks.

```

</details>

<details>

<summary>JSCPD</summary>

```text
Clone found (javascript):
 - src/ui/components/common/NPCDialog/useNPCDialog.js [347:2 - 355:11] (8 lines, 85 tokens)
   src/ui/components/common/NPCDialog/useNPCDialog.js [326:2 - 334:8]

Clone found (javascript):
 - src/ui/components/sections/CraftingSection.js [204:6 - 216:2] (12 lines, 116 tokens)
   src/ui/components/sections/CraftingSection.js [191:9 - 203:15]

Clone found (javascript):
 - src/ui/components/sections/CraftingSection.js [257:6 - 269:2] (12 lines, 93 tokens)
   src/ui/components/sections/CraftingSection.js [241:9 - 253:15]

Clone found (javascript):
 - src/ui/components/display/LogDisplay.js [3:2 - 10:7] (7 lines, 88 tokens)
   src/ui/components/sections/LogSection.js [7:2 - 14:6]

Clone found (javascript):
 - src/ui/components/common/TradeMessageDialog.js [38:5 - 45:2] (7 lines, 77 tokens)
   src/ui/components/common/NPCDialog/index.js [98:6 - 105:21]

Clone found (css):
 - src/styles/sections/crafting-section.css [1:2 - 16:17] (15 lines, 110 tokens)
   src/styles/sections/worker-manager-section.css [1:2 - 16:23]

Clone found (css):
 - src/styles/sections/crafting-section.css [16:2 - 26:20] (10 lines, 85 tokens)
   src/styles/sections/worker-manager-section.css [16:2 - 26:26]

Clone found (javascript):
 - src/store/slices/inventorySlice.js [177:13 - 188:16] (11 lines, 93 tokens)
   src/store/slices/inventorySlice.js [166:16 - 177:13]

Clone found (javascript):
 - src/game/services/InventoryService.js [141:2 - 154:15] (13 lines, 93 tokens)
   src/game/services/InventoryService.js [61:2 - 74:14]

Clone found (javascript):
 - src/game/services/InventoryService.js [330:19 - 336:6] (6 lines, 94 tokens)
   src/game/services/InventoryService.js [255:16 - 261:5]

Clone found (javascript):
 - src/game/services/BuildingService.js [116:11 - 123:8] (7 lines, 94 tokens)
   src/game/services/BuildingService.js [66:12 - 73:9]

Clone found (javascript):
 - src/game/services/BuildingService.js [175:11 - 182:11] (7 lines, 99 tokens)
   src/game/services/BuildingService.js [66:13 - 73:9]

Clone found (javascript):
 - src/game/services/BuildingService.js [242:12 - 253:7] (11 lines, 128 tokens)
   src/game/services/BuildingService.js [66:13 - 186:6]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 140            │ 16269       │ 130822       │ 11           │ 101 (0.62%)      │ 1060 (0.81%)      │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 23             │ 5935        │ 35791        │ 2            │ 25 (0.42%)       │ 195 (0.54%)       │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 139         │ 847          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 172            │ 22354       │ 167567       │ 13           │ 126 (0.56%)      │ 1255 (0.75%)      │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 13 clones.
Error: ERROR: jscpd found too many duplicates (0.56%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (0.56%) over threshold (0%)
```

</details>
