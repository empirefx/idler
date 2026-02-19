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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/22163029559)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
Checked 120 files in 1217ms. No fixes applied.
Found 8 errors.
Found 9 warnings.src/game/core/Gameplay.js:176:51 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━━━━

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

src/ui/components/common/NPCDialog/NPCDialogOptions.js:15:2 lint/correctness/noUnusedFunctionParameters ━━━━━━━━━━

  ! This parameter is unused.

    13 │ 	onOptionClick,
    14 │ 	onAdvance,
  > 15 │ 	onClose,
       │ 	^^^^^^^
    16 │ 	npcDialogOptions,
    17 │ }) => {

  i Unused parameters might be the result of an incomplete refactoring.


src/ui/components/common/NPCDialog/useNPCDialog.js:16:2 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! Several of these imports are unused.

    14 │ import {
    15 │ 	selectNpcInventoryById,
  > 16 │ 	addItem as addNpcItem,
       │ 	^^^^^^^^^^^^^^^^^^^^^^
  > 17 │ 	removeItem as removeNpcItem,
       │ 	^^^^^^^^^^^^^^^^^^^^^^^^^^^
    18 │ } from "../../../../store/slices/npcInventorySlice";
    19 │ import { questCatalog } from "../../../../data/questCatalog";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

     14  14 │   import {
     15  15 │   	selectNpcInventoryById,
     16     │ - → addItem·as·addNpcItem,
     17     │ - → removeItem·as·removeNpcItem,
     18  16 │   } from "../../../../store/slices/npcInventorySlice";
     19  17 │   import { questCatalog } from "../../../../data/questCatalog";


src/ui/components/common/NPCDialog/useNPCDialog.js:276:8 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━

  ! Change to an optional chain.

    274 │ 			// Try direct item.buy first
    275 │ 			let buyPrice = null;
  > 276 │ 			if (item && item.buy && typeof item.buy.gold === "number") {
        │ 			    ^^^^^^^^^^^^^^^^
    277 │ 				buyPrice = item.buy.gold;
    278 │ 			}

  i Unsafe fix: Change to an optional chain.

    274 274 │   			// Try direct item.buy first
    275 275 │   			let buyPrice = null;
    276     │ - → → → if·(item·&&·item.buy·&&·typeof·item.buy.gold·===·"number")·{
        276 │ + → → → if·(item?.buy·&&·typeof·item.buy.gold·===·"number")·{
    277 277 │   				buyPrice = item.buy.gold;
    278 278 │   			}


src/ui/components/common/NPCDialog/useNPCDialog.js:281:5 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━

  ! Change to an optional chain.

    279 │ 			// Fallback to itemCatalog
    280 │ 			else if (
  > 281 │ 				item &&
        │ 				^^^^^^^
  > 282 │ 				item.itemKey &&
        │ 				^^^^^^^^^^^^
    283 │ 				itemCatalog[item.itemKey] &&
    284 │ 				itemCatalog[item.itemKey].buy &&

  i Unsafe fix: Change to an optional chain.

    279 279 │   			// Fallback to itemCatalog
    280 280 │   			else if (
    281     │ - → → → → item·&&
    282     │ - → → → → item.itemKey·&&
        281 │ + → → → → item?.itemKey·&&
    283 282 │   				itemCatalog[item.itemKey] &&
    284 283 │   				itemCatalog[item.itemKey].buy &&


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


src/ui/components/common/NPCDialog/useNPCDialog.js:50:2 lint/correctness/useExhaustiveDependencies  FIXABLE  ━━━━━━━━━━

  × This hook specifies more dependencies than necessary: npcId.

    49 │ 	// Reset conversation state when switching NPCs
  > 50 │ 	useEffect(() => {
       │ 	^^^^^^^^^
    51 │ 		setQuestConversationState(null);
    52 │ 		setTradeMessage(null);

  i Outer scope values aren't valid dependencies because mutating them doesn't re-render the component.

    51 │ 		setQuestConversationState(null);
    52 │ 		setTradeMessage(null);
  > 53 │ 	}, [npcId]);
       │ 	    ^^^^^
    54 │
    55 │ 	// Get player gold amount

  i React relies on hook dependencies to determine when to re-compute Effects.
    Specifying more dependencies than required can lead to unnecessary re-rendering
    and degraded performance.

  i Unsafe fix: Remove the extra dependencies from the list.

    53 │ → },·[npcId]);
       │       -----

src/ui/components/common/NPCDialog/useNPCDialog.js:272:27 lint/correctness/useExhaustiveDependencies  FIXABLE  ━━━━━━━━━━

  × This hook specifies more dependencies than necessary: itemCatalog.

    270 │ 	);
    271 │
  > 272 │ 	const handleNpcItemBuy = useCallback(
        │ 	                         ^^^^^^^^^^^
    273 │ 		(_event, item) => {
    274 │ 			// Try direct item.buy first

  i Outer scope values aren't valid dependencies because mutating them doesn't re-render the component.

    324 │ 			});
    325 │ 		},
  > 326 │ 		[dispatch, playerGold, playerInventory, itemCatalog],
        │ 		                                        ^^^^^^^^^^^
    327 │ 	);
    328 │

  i React relies on hook dependencies to determine when to re-compute Effects.
    Specifying more dependencies than required can lead to unnecessary re-rendering
    and degraded performance.

  i Unsafe fix: Remove the extra dependencies from the list.

    326 │ → → [dispatch,·playerGold,·playerInventory,·itemCatalog],
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
 - src/ui/components/common/NPCDialog/useNPCDialog.js [351:2 - 359:11] (8 lines, 85 tokens)
   src/ui/components/common/NPCDialog/useNPCDialog.js [330:2 - 338:8]

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
 - src/ui/components/common/InventoryGrid.js [110:2 - 120:3] (10 lines, 111 tokens)
   src/ui/components/common/InventoryGrid.js [62:2 - 72:2]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [39:15 - 56:36] (17 lines, 138 tokens)
   src/store/slices/playerInventorySlice.js [56:17 - 73:37]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [57:3 - 65:31] (8 lines, 96 tokens)
   src/store/slices/playerInventorySlice.js [74:3 - 82:32]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [65:31 - 81:55] (16 lines, 127 tokens)
   src/store/slices/playerInventorySlice.js [82:32 - 98:56]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [82:3 - 106:39] (24 lines, 209 tokens)
   src/store/slices/playerInventorySlice.js [99:3 - 123:40]

Clone found (javascript):
 - src/store/slices/placeInventorySlice.js [230:2 - 236:7] (6 lines, 79 tokens)
   src/store/slices/placeInventorySlice.js [222:2 - 226:7]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [37:4 - 56:34] (19 lines, 171 tokens)
   src/store/slices/placeInventorySlice.js [37:4 - 73:37]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [57:3 - 65:29] (8 lines, 96 tokens)
   src/store/slices/playerInventorySlice.js [74:3 - 82:32]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [65:29 - 81:53] (16 lines, 127 tokens)
   src/store/slices/playerInventorySlice.js [82:32 - 98:56]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [85:4 - 103:37] (18 lines, 166 tokens)
   src/store/slices/playerInventorySlice.js [105:4 - 123:40]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [129:6 - 146:16] (17 lines, 115 tokens)
   src/store/slices/playerInventorySlice.js [226:9 - 243:10]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [190:24 - 198:24] (8 lines, 91 tokens)
   src/store/slices/placeInventorySlice.js [223:26 - 231:26]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [197:2 - 203:7] (6 lines, 79 tokens)
   src/store/slices/npcInventorySlice.js [189:2 - 193:7]

Clone found (javascript):
 - src/store/slices/npcInventorySlice.js [198:24 - 207:18] (9 lines, 113 tokens)
   src/store/slices/placeInventorySlice.js [231:26 - 240:20]

┌────────────┬────────────────┬─────────────┬──────────────┬──────────────┬──────────────────┬───────────────────┐
│ Format     │ Files analyzed │ Total lines │ Total tokens │ Clones found │ Duplicated lines │ Duplicated tokens │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ javascript │ 131            │ 13673       │ 108931       │ 18           │ 212 (1.55%)      │ 2043 (1.88%)      │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 22             │ 4568        │ 25883        │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 139         │ 847          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 162            │ 18391       │ 135768       │ 18           │ 212 (1.15%)      │ 2043 (1.5%)       │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 18 clones.
Error: ERROR: jscpd found too many duplicates (1.15%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (1.15%) over threshold (0%)
```

</details>
