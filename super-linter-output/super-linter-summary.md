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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/22354028217)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
The number of diagnostics exceeds the limit allowed. Use --max-diagnostics to increase it.
Diagnostics not shown: 22.
Checked 120 files in 1052ms. No fixes applied.
Found 24 errors.
Found 17 warnings.
Found 1 info.src/game/core/Gameplay.js:176:51 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━━━━

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


src/game/engine/GameEngine.js:8:10 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━

  ! Several of these imports are unused.

     6 │ import { createItem } from "../factory/itemFactory";
     7 │ import SpawnService from "../services/SpawnService";
   > 8 │ import { EventBusService, globalEventBus } from "../services/EventBusService";
       │          ^^^^^^^^^^^^^^^
     9 │ import { CombatService } from "../services/CombatService";
    10 │ import {

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    8 │ import·{·EventBusService,·globalEventBus·}·from·"../services/EventBusService";
      │          -----------------

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


src/ui/components/sections/CraftingSection.js:42:33 lint/correctness/noUnusedFunctionParameters ━━━━━━━━━━

  ! This parameter is unused.

    41 │ 	useEffect(() => {
  > 42 │ 		const handleCraftSuccess = ({ outputItemName }) => {
       │ 		                              ^^^^^^^^^^^^^^
    43 │ 			// Handled by CraftingService notification
    44 │ 		};

  i Unused parameters might be the result of an incomplete refactoring.


src/ui/components/sections/CraftingSection.js:46:32 lint/correctness/noUnusedFunctionParameters ━━━━━━━━━━

  ! This parameter is unused.

    44 │ 		};
    45 │
  > 46 │ 		const handleCraftFailed = ({ error }) => {
       │ 		                             ^^^^^
    47 │ 			// Handled by CraftingService notification
    48 │ 		};

  i Unused parameters might be the result of an incomplete refactoring.


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


src/ui/components/sections/CraftingSection.js:162:9 lint/a11y/noStaticElementInteractions ━━━━━━━━━━

  × Static Elements should not be interactive.

    160 │ 							const isKnown = knownRecipes.includes(recipe.id);
    161 │ 							return (
  > 162 │ 								<div
        │ 								^^^^
  > 163 │ 									key={recipe.id}
  > 164 │ 									className={`recipe-item ${selectedRecipe?.id === recipe.id ? "selected" : ""} ${!isKnown ? "unknown" : ""}`}
  > 165 │ 									onClick={() => setSelectedRecipe(recipe)}
  > 166 │ 								>
        │ 								^
    167 │ 									<span className="recipe-name">
    168 │ 										{isKnown ? recipe.name : "???"}

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/sections/CraftingSection.js:162:9 lint/a11y/useKeyWithClickEvents ━━━━━━━━━━━━━━━━

  × Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.

    160 │ 							const isKnown = knownRecipes.includes(recipe.id);
    161 │ 							return (
  > 162 │ 								<div
        │ 								^^^^
  > 163 │ 									key={recipe.id}
  > 164 │ 									className={`recipe-item ${selectedRecipe?.id === recipe.id ? "selected" : ""} ${!isKnown ? "unknown" : ""}`}
  > 165 │ 									onClick={() => setSelectedRecipe(recipe)}
  > 166 │ 								>
        │ 								^
    167 │ 									<span className="recipe-name">
    168 │ 										{isKnown ? recipe.name : "???"}

  i Actions triggered using mouse events should have corresponding keyboard events to account for keyboard-only navigation.


src/ui/components/sections/CraftingSection.js:194:15 lint/a11y/noStaticElementInteractions ━━━━━━━━━━

  × Static Elements should not be interactive.

    192 │ 													const item = itemCatalog[v];
    193 │ 													return item ? (
  > 194 │ 														<div
        │ 														^^^^
  > 195 │ 															key={v}
  > 196 │ 															className={`craftable-item ${selectedOutputItem === v ? "selected" : ""}`}
  > 197 │ 															onClick={() => setSelectedOutputItem(v)}
  > 198 │ 														>
        │ 														^
    199 │ 															<Item item={item} />
    200 │ 														</div>

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/sections/CraftingSection.js:194:15 lint/a11y/useKeyWithClickEvents ━━━━━━━━━━━━━━━

  × Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.

    192 │ 													const item = itemCatalog[v];
    193 │ 													return item ? (
  > 194 │ 														<div
        │ 														^^^^
  > 195 │ 															key={v}
  > 196 │ 															className={`craftable-item ${selectedOutputItem === v ? "selected" : ""}`}
  > 197 │ 															onClick={() => setSelectedOutputItem(v)}
  > 198 │ 														>
        │ 														^
    199 │ 															<Item item={item} />
    200 │ 														</div>

  i Actions triggered using mouse events should have corresponding keyboard events to account for keyboard-only navigation.


src/ui/components/sections/CraftingSection.js:207:15 lint/a11y/useKeyWithClickEvents ━━━━━━━━━━━━━━━

  × Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.

    205 │ 													const item = itemCatalog[v];
    206 │ 													return item ? (
  > 207 │ 														<div
        │ 														^^^^
  > 208 │ 															key={v}
  > 209 │ 															className={`craftable-item ${selectedOutputItem === v ? "selected" : ""}`}
  > 210 │ 															onClick={() => setSelectedOutputItem(v)}
  > 211 │ 														>
        │ 														^
    212 │ 															<Item item={item} />
    213 │ 														</div>

  i Actions triggered using mouse events should have corresponding keyboard events to account for keyboard-only navigation.


src/ui/components/sections/CraftingSection.js:207:15 lint/a11y/noStaticElementInteractions ━━━━━━━━━━

  × Static Elements should not be interactive.

    205 │ 													const item = itemCatalog[v];
    206 │ 													return item ? (
  > 207 │ 														<div
        │ 														^^^^
  > 208 │ 															key={v}
  > 209 │ 															className={`craftable-item ${selectedOutputItem === v ? "selected" : ""}`}
  > 210 │ 															onClick={() => setSelectedOutputItem(v)}
  > 211 │ 														>
        │ 														^
    212 │ 															<Item item={item} />
    213 │ 														</div>

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/sections/CraftingSection.js:219:14 lint/a11y/useKeyWithClickEvents ━━━━━━━━━━━━━━━

  × Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.

    217 │ 												!selectedRecipe.output.items &&
    218 │ 												selectedRecipe.output.icon && (
  > 219 │ 													<div
        │ 													^^^^
  > 220 │ 														className={`craftable-item ${selectedOutputItem === selectedRecipe.output.icon ? "selected" : ""}`}
  > 221 │ 														onClick={() =>
  > 222 │ 															setSelectedOutputItem(selectedRecipe.output.icon)
  > 223 │ 														}
  > 224 │ 													>
        │ 													^
    225 │ 														<Item
    226 │ 															item={itemCatalog[selectedRecipe.output.icon]}

  i Actions triggered using mouse events should have corresponding keyboard events to account for keyboard-only navigation.


src/ui/components/sections/CraftingSection.js:219:14 lint/a11y/noStaticElementInteractions ━━━━━━━━━━

  × Static Elements should not be interactive.

    217 │ 												!selectedRecipe.output.items &&
    218 │ 												selectedRecipe.output.icon && (
  > 219 │ 													<div
        │ 													^^^^
  > 220 │ 														className={`craftable-item ${selectedOutputItem === selectedRecipe.output.icon ? "selected" : ""}`}
  > 221 │ 														onClick={() =>
  > 222 │ 															setSelectedOutputItem(selectedRecipe.output.icon)
  > 223 │ 														}
  > 224 │ 													>
        │ 													^
    225 │ 														<Item
    226 │ 															item={itemCatalog[selectedRecipe.output.icon]}

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/sections/CraftingSection.js:37:2 lint/correctness/useExhaustiveDependencies  FIXABLE  ━━━━━━━━━━

  × This hook specifies more dependencies than necessary: selectedRecipe.

    35 │ 	const [selectedOutputItem, setSelectedOutputItem] = useState(null);
    36 │
  > 37 │ 	useEffect(() => {
       │ 	^^^^^^^^^
    38 │ 		setSelectedOutputItem(null);
    39 │ 	}, [selectedRecipe]);

  i This dependency can be removed from the list.

    37 │ 	useEffect(() => {
    38 │ 		setSelectedOutputItem(null);
  > 39 │ 	}, [selectedRecipe]);
       │ 	    ^^^^^^^^^^^^^^
    40 │
    41 │ 	useEffect(() => {

  i React relies on hook dependencies to determine when to re-compute Effects.
    Specifying more dependencies than required can lead to unnecessary re-rendering
    and degraded performance.

  i Unsafe fix: Remove the extra dependencies from the list.

    39 │ → },·[selectedRecipe]);
       │       --------------

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
 - src/ui/components/sections/WorkersSection.js [42:9 - 50:10] (8 lines, 75 tokens)
   src/ui/components/sections/WorkersSection.js [28:11 - 36:3]

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
   src/ui/components/common/NPCDialog/index.js [71:5 - 78:21]

Clone found (javascript):
 - src/store/slices/inventorySlice.js [177:13 - 188:16] (11 lines, 93 tokens)
   src/store/slices/inventorySlice.js [166:16 - 177:13]

Clone found (javascript):
 - src/game/services/InventoryService.js [141:2 - 154:15] (13 lines, 93 tokens)
   src/game/services/InventoryService.js [61:2 - 74:14]

Clone found (javascript):
 - src/game/services/InventoryService.js [330:19 - 336:6] (6 lines, 94 tokens)
   src/game/services/InventoryService.js [255:16 - 261:5]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 133            │ 14398       │ 114995       │ 9            │ 84 (0.58%)       │ 814 (0.71%)       │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 20             │ 4778        │ 28904        │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 139         │ 847          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 162            │ 19326       │ 144853       │ 9            │ 84 (0.43%)       │ 814 (0.56%)       │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 9 clones.
Error: ERROR: jscpd found too many duplicates (0.43%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (0.43%) over threshold (0%)
```

</details>
