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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/22230877918)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
Checked 119 files in 951ms. No fixes applied.
Found 8 errors.
Found 12 warnings.src/game/core/Gameplay.js:176:51 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━━━━

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
    9 │ import { workerCreatedItem } from "../events";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    7 │ import·{·EventBusService,·globalEventBus·}·from·"../services/EventBusService";
      │          -----------------

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


src/store/slices/inventoryThunks.js:1:20 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━━

  ! Several of these imports are unused.

  > 1 │ import { moveItem, addItem, removeItem } from "./inventorySlice.js";
      │                    ^^^^^^^
    2 │ import {
    3 │ 	validateItemExists,

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·{·moveItem,·addItem,·removeItem·}·from·"./inventorySlice.js";
      │                    ---------

src/store/slices/inventoryThunks.js:8:25 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━━

  ! Several of these imports are unused.

     6 │ 	validateWeightLimit,
     7 │ } from "./inventory/inventoryValidators.js";
   > 8 │ import { canItemsStack, cloneItem } from "./inventory/inventoryUtils.js";
       │                         ^^^^^^^^^
     9 │ import { addNotification } from "./notificationSlice.js";
    10 │ import { NOTIFICATION_TYPES } from "./notificationSlice.js";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    8 │ import·{·canItemsStack,·cloneItem·}·from·"./inventory/inventoryUtils.js";
      │                         ----------

src/store/slices/inventoryThunks.js:98:11 lint/correctness/noUnusedVariables ━━━━━━━━━━━━━━━━━━━━━━━

  ! This variable item is unused.

     96 │ 		}
     97 │
   > 98 │ 		const { item, moveQuantity } = validation;
        │ 		        ^^^^
     99 │
    100 │ 		try {

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.


src/ui/components/common/NPCDialog/NPCDialogOptions.js:15:2 lint/correctness/noUnusedFunctionParameters ━━━━━━━━━━

  ! This parameter is unused.

    13 │ 	onOptionClick,
    14 │ 	onAdvance,
  > 15 │ 	onClose,
       │ 	^^^^^^^
    16 │ 	npcDialogOptions,
    17 │ }) => {

  i Unused parameters might be the result of an incomplete refactoring.


src/ui/components/common/NPCDialog/useNPCDialog.js:272:8 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━

  ! Change to an optional chain.

    270 │ 			// Try direct item.buy first
    271 │ 			let buyPrice = null;
  > 272 │ 			if (item && item.buy && typeof item.buy.gold === "number") {
        │ 			    ^^^^^^^^^^^^^^^^
    273 │ 				buyPrice = item.buy.gold;
    274 │ 			}

  i Unsafe fix: Change to an optional chain.

    270 270 │   			// Try direct item.buy first
    271 271 │   			let buyPrice = null;
    272     │ - → → → if·(item·&&·item.buy·&&·typeof·item.buy.gold·===·"number")·{
        272 │ + → → → if·(item?.buy·&&·typeof·item.buy.gold·===·"number")·{
    273 273 │   				buyPrice = item.buy.gold;
    274 274 │   			}


src/ui/components/common/NPCDialog/useNPCDialog.js:277:5 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━

  ! Change to an optional chain.

    275 │ 			// Fallback to itemCatalog
    276 │ 			else if (
  > 277 │ 				item &&
        │ 				^^^^^^^
  > 278 │ 				item.itemKey &&
        │ 				^^^^^^^^^^^^
    279 │ 				itemCatalog[item.itemKey] &&
    280 │ 				itemCatalog[item.itemKey].buy &&

  i Unsafe fix: Change to an optional chain.

    275 275 │   			// Fallback to itemCatalog
    276 276 │   			else if (
    277     │ - → → → → item·&&
    278     │ - → → → → item.itemKey·&&
        277 │ + → → → → item?.itemKey·&&
    279 278 │   				itemCatalog[item.itemKey] &&
    280 279 │   				itemCatalog[item.itemKey].buy &&


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


src/ui/components/common/NPCDialog/NPCDialogQuestPanel.js:10:12 lint/suspicious/noArrayIndexKey ━━━━━━━━━━

  × Avoid using the index of an array as key property in an element.

     8 │ 				{objectives.map((obj, i) => (
     9 │ 					<li
  > 10 │ 						key={i}
       │ 						     ^
    11 │ 						className={obj.current >= obj.required ? "completed" : ""}
    12 │ 					>

  i This is the source of the key value.

     6 │ 			<h4>Objectives:</h4>
     7 │ 			<ul>
   > 8 │ 				{objectives.map((obj, i) => (
       │ 				                      ^
     9 │ 					<li
    10 │ 						key={i}

  i The order of the items may change, and this also affects performances and component state.

  i Check the React documentation.


src/ui/components/common/NPCDialog/NPCDialogQuestPanel.js:29:16 lint/suspicious/noArrayIndexKey ━━━━━━━━━━

  × Avoid using the index of an array as key property in an element.

    27 │ 					{rewards.exp && <li>✨ {rewards.exp} exp</li>}
    28 │ 					{rewards.items?.map((item, i) => (
  > 29 │ 						<li key={i}>
       │ 						         ^
    30 │ 							📦 {itemCatalog[item.itemKey]?.name || item.itemKey} x
    31 │ 							{item.quantity}

  i This is the source of the key value.

    26 │ 					{rewards.gold && <li>🪙 {rewards.gold} gold</li>}
    27 │ 					{rewards.exp && <li>✨ {rewards.exp} exp</li>}
  > 28 │ 					{rewards.items?.map((item, i) => (
       │ 					                           ^
    29 │ 						<li key={i}>
    30 │ 							📦 {itemCatalog[item.itemKey]?.name || item.itemKey} x

  i The order of the items may change, and this also affects performances and component state.

  i Check the React documentation.


src/ui/components/common/NPCDialog/index.js:69:4 lint/a11y/noStaticElementInteractions ━━━━━━━━━━━━━

  × Static Elements should not be interactive.

    67 │ 				/>
    68 │ 			)}
  > 69 │ 			<div
       │ 			^^^^
  > 70 │ 				className="npc-dialog-content"
        ...
  > 76 │ 				}}
  > 77 │ 			>
       │ 			^
    78 │ 				<div className="key-bind-container">
    79 │ 					<span className="key-bind">ESC</span>

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/common/NPCDialog/useNPCDialog.js:46:2 lint/correctness/useExhaustiveDependencies  FIXABLE  ━━━━━━━━━━

  × This hook specifies more dependencies than necessary: npcId.

    45 │ 	// Reset conversation state when switching NPCs
  > 46 │ 	useEffect(() => {
       │ 	^^^^^^^^^
    47 │ 		setQuestConversationState(null);
    48 │ 		setTradeMessage(null);

  i Outer scope values aren't valid dependencies because mutating them doesn't re-render the component.

    47 │ 		setQuestConversationState(null);
    48 │ 		setTradeMessage(null);
  > 49 │ 	}, [npcId]);
       │ 	    ^^^^^
    50 │
    51 │ 	// Get player gold amount

  i React relies on hook dependencies to determine when to re-compute Effects.
    Specifying more dependencies than required can lead to unnecessary re-rendering
    and degraded performance.

  i Unsafe fix: Remove the extra dependencies from the list.

    49 │ → },·[npcId]);
       │       -----

src/ui/components/common/NPCDialog/useNPCDialog.js:268:27 lint/correctness/useExhaustiveDependencies  FIXABLE  ━━━━━━━━━━

  × This hook specifies more dependencies than necessary: itemCatalog.

    266 │ 	);
    267 │
  > 268 │ 	const handleNpcItemBuy = useCallback(
        │ 	                         ^^^^^^^^^^^
    269 │ 		(_event, item) => {
    270 │ 			// Try direct item.buy first

  i Outer scope values aren't valid dependencies because mutating them doesn't re-render the component.

    320 │ 			});
    321 │ 		},
  > 322 │ 		[dispatch, playerGold, playerInventory, itemCatalog],
        │ 		                                        ^^^^^^^^^^^
    323 │ 	);
    324 │

  i React relies on hook dependencies to determine when to re-compute Effects.
    Specifying more dependencies than required can lead to unnecessary re-rendering
    and degraded performance.

  i Unsafe fix: Remove the extra dependencies from the list.

    322 │ → → [dispatch,·playerGold,·playerInventory,·itemCatalog],
        │                                           -------------

src/ui/components/common/TradeMessageDialog.js:36:4 lint/a11y/noStaticElementInteractions ━━━━━━━━━━

  × Static Elements should not be interactive.

    34 │ 			}}
    35 │ 		>
  > 36 │ 			<div
       │ 			^^^^
  > 37 │ 				className="trade-message-content"
        ...
  > 43 │ 				}}
  > 44 │ 			>
       │ 			^
    45 │ 				<div className={`trade-message-icon ${type}`}>
    46 │ 					{type === "success" ? "✓" : "✗"}

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


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

Clone found (css):
 - src/styles/icons-set.css [15:1 - 51:14] (36 lines, 180 tokens)
   src/styles/item-set.css [11:1 - 48:14]

Clone found (css):
 - src/styles/icons-set.css [87:2 - 108:16] (21 lines, 103 tokens)
   src/styles/item-set.css [85:2 - 107:16]

Clone found (css):
 - src/styles/icons-set.css [111:2 - 132:14] (21 lines, 103 tokens)
   src/styles/item-set.css [110:2 - 132:14]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 129            │ 13229       │ 105738       │ 7            │ 60 (0.45%)       │ 605 (0.57%)       │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 23             │ 5177        │ 30225        │ 3            │ 78 (1.51%)       │ 386 (1.28%)       │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 139         │ 847          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 161            │ 18556       │ 136917       │ 10           │ 138 (0.74%)      │ 991 (0.72%)       │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 10 clones.
Error: ERROR: jscpd found too many duplicates (0.74%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (0.74%) over threshold (0%)
```

</details>
