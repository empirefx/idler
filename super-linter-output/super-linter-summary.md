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
| MARKDOWN_PRETTIER          | Fail ❌           |
| PRE_COMMIT                 | Pass ✅           |
| SPELL_CODESPELL            | Fail ❌           |
| TRIVY                      | Pass ✅           |
| YAML                       | Pass ✅           |
| YAML_PRETTIER              | Pass ✅           |

Super-linter detected linting errors

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/23689746266)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
The number of diagnostics exceeds the limit allowed. Use --max-diagnostics to increase it.
Diagnostics not shown: 101.
Checked 145 files in 1497ms. No fixes applied.
Found 66 errors.
Found 49 warnings.
Found 6 infos.src/game/core/combatCalculator.js:167:3 lint/complexity/noUselessSwitchCase  FIXABLE  ━━━━━━━━━━━━━━

  i Useless case clause.

    165 │ 		case "ranged":
    166 │ 			return calculateRangedDamage(attackerStats, defenderStats, flatDamage);
  > 167 │ 		case "physical":
        │ 		^^^^^^^^^^^^^^^^
    168 │ 		default:
    169 │ 			return calculatePhysicalDamage(attackerStats, defenderStats, flatDamage);

  i because the default clause is present:

    166 │ 			return calculateRangedDamage(attackerStats, defenderStats, flatDamage);
    167 │ 		case "physical":
  > 168 │ 		default:
        │ 		^^^^^^^^
  > 169 │ 			return calculatePhysicalDamage(attackerStats, defenderStats, flatDamage);
        │ 			^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    170 │ 	}
    171 │ }

  i Unsafe fix: Remove the useless case.

    165 165 │   		case "ranged":
    166 166 │   			return calculateRangedDamage(attackerStats, defenderStats, flatDamage);
    167     │ - → → case·"physical":
    168 167 │   		default:
    169 168 │   			return calculatePhysicalDamage(attackerStats, defenderStats, flatDamage);


src/game/core/Gameplay.js:176:51 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━━━━

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


src/ui/components/sections/SkillBar.js:7:2 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━

  ! Several of these imports are unused.

    5 │ import { useSkillCooldownState } from "../../hooks/useSkillCooldownState";
    6 │ import {
  > 7 │ 	skillsCatalog,
      │ 	^^^^^^^^^^^^^
    8 │ 	SKILL_COLUMNS,
    9 │ 	getSkillById,

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

      5   5 │   import { useSkillCooldownState } from "../../hooks/useSkillCooldownState";
      6   6 │   import {
      7     │ - → skillsCatalog,
      8   7 │   	SKILL_COLUMNS,
      9   8 │   	getSkillById,


src/ui/components/sections/SkillBar.js:18:8 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━━

  ! This variable enemies is unused.

    16 │ const SkillBar = () => {
    17 │ 	const currentPlace = useSelector(selectCurrentPlace);
  > 18 │ 	const enemies = useSelector(selectEnemiesForCurrentPlace);
       │ 	      ^^^^^^^
    19 │ 	const playerSkills = useSelector(selectPlayerSkills);
    20 │ 	const { activeCooldowns, pausedCooldowns, isCooldownPaused } =

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.

  i Unsafe fix: If this is intentional, prepend enemies with an underscore.

     16  16 │   const SkillBar = () => {
     17  17 │   	const currentPlace = useSelector(selectCurrentPlace);
     18     │ - → const·enemies·=·useSelector(selectEnemiesForCurrentPlace);
         18 │ + → const·_enemies·=·useSelector(selectEnemiesForCurrentPlace);
     19  19 │   	const playerSkills = useSelector(selectPlayerSkills);
     20  20 │   	const { activeCooldowns, pausedCooldowns, isCooldownPaused } =


src/ui/components/sections/SkillsSection.js:8:2 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! Several of these imports are unused.

     6 │ } from "../../../store/slices/playerSlice";
     7 │ import {
   > 8 │ 	skillsCatalog,
       │ 	^^^^^^^^^^^^^
     9 │ 	SKILL_COLUMNS,
    10 │ 	getSkillById,

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

      6   6 │   } from "../../../store/slices/playerSlice";
      7   7 │   import {
      8     │ - → skillsCatalog,
      9   8 │   	SKILL_COLUMNS,
     10   9 │   	getSkillById,


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


src/ui/components/sections/SkillBar.js:158:25 lint/suspicious/noArrayIndexKey ━━━━━━━━━━━━━━━━━━━━━━

  × Avoid using the index of an array as key property in an element.

    156 │ 				})}
    157 │ 				{Array.from({ length: emptySlots }).map((_, index) => (
  > 158 │ 					<div key={`empty-${index}`} className="skill-slot skill-slot--empty">
        │ 					                   ^^^^^
    159 │ 						<div className="skill-icon-container">
    160 │ 							<div className="skill-icon skill-icon--empty">?</div>

  i This is the source of the key value.

    155 │ 					);
    156 │ 				})}
  > 157 │ 				{Array.from({ length: emptySlots }).map((_, index) => (
        │ 				                                            ^^^^^
    158 │ 					<div key={`empty-${index}`} className="skill-slot skill-slot--empty">
    159 │ 						<div className="skill-icon-container">

  i The order of the items may change, and this also affects performances and component state.

  i Check the React documentation.


src/ui/components/sections/WorkerManagerSection.js:142:10 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━

  × Provide an explicit type prop for the button element.

    140 │ 										</span>
    141 │ 									</div>
  > 142 │ 									<button
        │ 									^^^^^^^
  > 143 │ 										className={`hire-btn ${!canHireMore || gold < workerCost ? "disabled" : ""}`}
  > 144 │ 										disabled={!canHireMore || gold < workerCost}
  > 145 │ 										onClick={() => handleHire(worker.id)}
  > 146 │ 									>
        │ 									^
    147 │ 										Hire ({workerCost}g)
    148 │ 									</button>

  i The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

  i Allowed button types are: submit, button or reset


src/ui/components/sections/WorkerManagerSection.js:156:5 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━

  × Provide an explicit type prop for the button element.

    154 │ 			</div>
    155 │ 			<div className="worker-manager-actions">
  > 156 │ 				<button
        │ 				^^^^^^^
  > 157 │ 					className={`reroll-btn ${gold < REROLL_COST ? "disabled" : ""}`}
  > 158 │ 					disabled={gold < REROLL_COST}
  > 159 │ 					onClick={handleReroll}
  > 160 │ 				>
        │ 				^
    161 │ 					Reroll Workers ({REROLL_COST}g)
    162 │ 				</button>

  i The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

  i Allowed button types are: submit, button or reset


src/ui/components/sections/WorkerManagerSection.js:164:5 lint/a11y/useButtonType ━━━━━━━━━━━━━━━━━━━

  × Provide an explicit type prop for the button element.

    162 │ 				</button>
    163 │
  > 164 │ 				<button
        │ 				^^^^^^^
  > 165 │ 					className={`buy-slot-btn ${gold < SLOT_COST ? "disabled" : ""}`}
  > 166 │ 					disabled={gold < SLOT_COST}
  > 167 │ 					onClick={handleBuySlot}
  > 168 │ 				>
        │ 				^
    169 │ 					Buy Worker Slot ({SLOT_COST}g)
    170 │ 				</button>

  i The default type of a button is submit, which causes the submission of a form when placed inside a `form` element. This is likely not the behaviour that you want inside a React application.

  i Allowed button types are: submit, button or reset


src/ui/layouts/GameLayout.js:60:4 lint/a11y/noStaticElementInteractions ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Static Elements should not be interactive.

    58 │ 				<LogSection />
    59 │ 			</main>
  > 60 │ 			<div
       │ 			^^^^
  > 61 │ 				className="building-panel-container"
  > 62 │ 				onMouseEnter={showBuildingPanel}
  > 63 │ 				onMouseLeave={hideBuildingPanel}
  > 64 │ 			>
       │ 			^
    65 │ 				<BuildingPanel onClose={toggleBuildingPanel} />
    66 │ 			</div>

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some warnings were emitted while running checks.

```

</details>

<details>

<summary>JSCPD</summary>

```text
Clone found (javascript):
 - src/ui/components/common/NPCDialog/useNPCDialog.js [342:2 - 350:11] (8 lines, 85 tokens)
   src/ui/components/common/NPCDialog/useNPCDialog.js [321:2 - 329:8]

Clone found (javascript):
 - src/ui/components/sections/CraftingSection.js [199:6 - 211:2] (12 lines, 116 tokens)
   src/ui/components/sections/CraftingSection.js [186:9 - 198:15]

Clone found (javascript):
 - src/ui/components/sections/CraftingSection.js [252:6 - 264:2] (12 lines, 93 tokens)
   src/ui/components/sections/CraftingSection.js [236:9 - 248:15]

Clone found (javascript):
 - src/ui/components/display/LogDisplay.js [3:2 - 10:7] (7 lines, 88 tokens)
   src/ui/components/sections/LogSection.js [7:2 - 14:6]

Clone found (javascript):
 - src/ui/components/common/TradeMessageDialog.js [38:5 - 45:2] (7 lines, 77 tokens)
   src/ui/components/common/NPCDialog/index.js [98:6 - 105:21]

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
 - src/game/services/CombatService.js [143:4 - 152:5] (9 lines, 95 tokens)
   src/game/services/CombatService.js [79:4 - 89:16]

Clone found (javascript):
 - src/game/services/CombatService.js [152:4 - 161:6] (9 lines, 105 tokens)
   src/game/services/CombatService.js [90:4 - 100:36]

Clone found (javascript):
 - src/game/services/CombatService.js [165:4 - 177:5] (12 lines, 159 tokens)
   src/game/services/CombatService.js [106:4 - 118:25]

Clone found (javascript):
 - src/game/services/BuildingService.js [116:11 - 123:8] (7 lines, 94 tokens)
   src/game/services/BuildingService.js [66:12 - 73:9]

Clone found (javascript):
 - src/game/services/BuildingService.js [175:11 - 182:11] (7 lines, 99 tokens)
   src/game/services/BuildingService.js [66:13 - 73:9]

Clone found (javascript):
 - src/game/services/BuildingService.js [242:12 - 253:7] (11 lines, 128 tokens)
   src/game/services/BuildingService.js [66:13 - 186:6]

Clone found (javascript):
 - src/game/core/combatCalculator.js [148:4 - 156:16] (8 lines, 82 tokens)
   src/game/core/combatCalculator.js [116:2 - 124:21]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 152            │ 18203       │ 148185       │ 15           │ 139 (0.76%)      │ 1501 (1.01%)      │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 26             │ 6383        │ 38356        │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 139         │ 847          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 187            │ 24736       │ 187495       │ 15           │ 139 (0.56%)      │ 1501 (0.8%)       │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 15 clones.
Error: ERROR: jscpd found too many duplicates (0.56%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (0.56%) over threshold (0%)
```

</details>

<details>

<summary>MARKDOWN_PRETTIER</summary>

```text
Checking formatting...[[33mwarn[39m] CHANGELOG.md
[[33mwarn[39m] Code style issues found in the above file. Run Prettier with --write to fix.
```

</details>

<details>

<summary>SPELL_CODESPELL</summary>

```text
/github/workspace/src/data/itemCatalog.js:17: ore ==> or
/github/workspace/src/data/itemCatalog.js:1432: ore ==> or
/github/workspace/src/data/itemCatalog.js:1438: Ore ==> Or
/github/workspace/src/data/itemCatalog.js:1440: ore ==> or
/github/workspace/src/data/npcCatalog.js:48: ore ==> or
/github/workspace/src/data/npcCatalog.js:48: ore ==> or
/github/workspace/src/data/npcCatalog.js:56: ore ==> or
/github/workspace/src/data/npcCatalog.js:58: ore ==> or
/github/workspace/src/data/questCatalog.js:50: Ore ==> Or
/github/workspace/src/data/questCatalog.js:52: ore ==> or
/github/workspace/src/data/questCatalog.js:52: ore ==> or
/github/workspace/src/data/questCatalog.js:73: ore ==> or
/github/workspace/src/data/questCatalog.js:77: ore ==> or
/github/workspace/src/data/questCatalog.js:82: ore ==> or
/github/workspace/src/data/questCatalog.js:82: ore ==> or
/github/workspace/src/data/questCatalog.js:83: ore ==> or
```

</details>
