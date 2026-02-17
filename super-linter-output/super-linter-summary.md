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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/22082632706)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
Checked 112 files in 1414ms. No fixes applied.
Found 3 errors.
Found 11 warnings.src/game/core/Gameplay.js:176:51 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━━━━

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

src/styles/components/npc-dialog.css:140:20 lint/suspicious/noEmptyBlock ━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! An empty block isn't allowed.

    138 │ }
    139 │
  > 140 │ .npc-trade-section {
        │                    ^
  > 141 │ }
        │ ^
    142 │
    143 │ .npc-trade-section .trade-gold-display {

  i Consider removing the empty block or adding styles inside it.


src/ui/components/common/NPCDialog.js:16:2 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━

  ! Several of these imports are unused.

    14 │ import {
    15 │ 	selectNpcInventoryById,
  > 16 │ 	addItem as addNpcItem,
       │ 	^^^^^^^^^^^^^^^^^^^^^^
  > 17 │ 	removeItem as removeNpcItem,
       │ 	^^^^^^^^^^^^^^^^^^^^^^^^^^^
    18 │ } from "../../../store/slices/npcInventorySlice";
    19 │ import { questCatalog } from "../../../data/questCatalog";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

     14  14 │   import {
     15  15 │   	selectNpcInventoryById,
     16     │ - → addItem·as·addNpcItem,
     17     │ - → removeItem·as·removeNpcItem,
     18  16 │   } from "../../../store/slices/npcInventorySlice";
     19  17 │   import { questCatalog } from "../../../data/questCatalog";


src/ui/components/common/NPCDialog.js:20:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━

  ! This import is unused.

    18 │ } from "../../../store/slices/npcInventorySlice";
    19 │ import { questCatalog } from "../../../data/questCatalog";
  > 20 │ import {
       │        ^
  > 21 │ 	selectIsQuestActive,
  > 22 │ 	selectIsQuestCompleted,
  > 23 │ } from "../../../store/slices/questSlice";
       │ ^
    24 │ import {
    25 │ 	playerIntentAcceptQuest,

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

     18  18 │   } from "../../../store/slices/npcInventorySlice";
     19  19 │   import { questCatalog } from "../../../data/questCatalog";
     20     │ - import·{
     21     │ - → selectIsQuestActive,
     22     │ - → selectIsQuestCompleted,
     23     │ - }·from·"../../../store/slices/questSlice";
     24  20 │   import {
     25  21 │   	playerIntentAcceptQuest,


src/ui/components/common/NPCDialog.js:52:8 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━━━

  ! This variable npcQuests is unused.

    51 │ 	// Get all quests offered by this NPC
  > 52 │ 	const npcQuests = npc
       │ 	      ^^^^^^^^^
    53 │ 		? Object.values(questCatalog).filter((quest) => quest.giverNpcId === npc.id)
    54 │ 		: [];

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.

  i Unsafe fix: If this is intentional, prepend npcQuests with an underscore.

     50  50 │
     51  51 │   	// Get all quests offered by this NPC
     52     │ - → const·npcQuests·=·npc
         52 │ + → const·_npcQuests·=·npc
     53  53 │   		? Object.values(questCatalog).filter((quest) => quest.giverNpcId === npc.id)
     54  54 │   		: [];


src/ui/components/common/NPCDialog.js:339:25 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━

  ! This parameter is unused.

    337 │ 								inventory={playerInventory}
    338 │ 								otherInventory={npcInventory}
  > 339 │ 								onContextMenu={(e, item) => handlePlayerItemSell(item)}
        │ 								                ^
    340 │ 								columns={5}
    341 │ 							/>

  i Unused parameters might be the result of an incomplete refactoring.

  i Unsafe fix: If this is intentional, prepend e with an underscore.

    337 337 │   								inventory={playerInventory}
    338 338 │   								otherInventory={npcInventory}
    339     │ - → → → → → → → → onContextMenu={(e,·item)·=>·handlePlayerItemSell(item)}
        339 │ + → → → → → → → → onContextMenu={(_e,·item)·=>·handlePlayerItemSell(item)}
    340 340 │   								columns={5}
    341 341 │   							/>


src/ui/components/common/NPCDialog.js:348:25 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━

  ! This parameter is unused.

    346 │ 								inventory={npcInventory}
    347 │ 								otherInventory={playerInventory}
  > 348 │ 								onContextMenu={(e, item) => handleNpcItemBuy(item)}
        │ 								                ^
    349 │ 								columns={5}
    350 │ 								showBuyPrice={true}

  i Unused parameters might be the result of an incomplete refactoring.

  i Unsafe fix: If this is intentional, prepend e with an underscore.

    346 346 │   								inventory={npcInventory}
    347 347 │   								otherInventory={playerInventory}
    348     │ - → → → → → → → → onContextMenu={(e,·item)·=>·handleNpcItemBuy(item)}
        348 │ + → → → → → → → → onContextMenu={(_e,·item)·=>·handleNpcItemBuy(item)}
    349 349 │   								columns={5}
    350 350 │   								showBuyPrice={true}


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


src/ui/components/sections/QuestSection.js:17:21 lint/correctness/useHookAtTopLevel ━━━━━━━━━━━━━━━━

  × This hook is being called from a nested function, but all hooks must be called unconditionally from the top-level component.

    15 │ 		quest.objectives &&
    16 │ 		Object.entries(quest.objectives).map(([key, objective]) => {
  > 17 │ 			const progress = useSelector(
       │ 			                 ^^^^^^^^^^^
    18 │ 				selectQuestProgress(quest.id, objective.progressKey),
    19 │ 			);

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
 - src/ui/components/sections/WorkersSection.js [42:9 - 50:10] (8 lines, 75 tokens)
   src/ui/components/sections/WorkersSection.js [28:11 - 36:3]

Clone found (javascript):
 - src/ui/components/display/LogDisplay.js [3:2 - 10:7] (7 lines, 88 tokens)
   src/ui/components/sections/LogSection.js [7:2 - 14:6]

Clone found (javascript):
 - src/ui/components/common/NPCDialog.js [297:2 - 306:11] (9 lines, 86 tokens)
   src/ui/components/common/NPCDialog.js [275:2 - 284:8]

Clone found (javascript):
 - src/ui/components/common/InventoryGrid.js [106:2 - 115:3] (9 lines, 99 tokens)
   src/ui/components/common/InventoryGrid.js [62:2 - 71:2]

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
│ javascript │ 127            │ 13808       │ 110726       │ 17           │ 205 (1.48%)      │ 1955 (1.77%)      │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ css        │ 18             │ 2974        │ 17126        │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ markup     │ 1              │ 11          │ 107          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ json       │ 8              │ 139         │ 847          │ 0            │ 0 (0%)           │ 0 (0%)            │
├────────────┼────────────────┼─────────────┼──────────────┼──────────────┼──────────────────┼───────────────────┤
│ Total:     │ 154            │ 16932       │ 128806       │ 17           │ 205 (1.21%)      │ 1955 (1.52%)      │
└────────────┴────────────────┴─────────────┴──────────────┴──────────────┴──────────────────┴───────────────────┘
Found 17 clones.
Error: ERROR: jscpd found too many duplicates (1.21%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (1.21%) over threshold (0%)
```

</details>
