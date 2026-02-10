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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/21851445416)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
The number of diagnostics exceeds the limit allowed. Use --max-diagnostics to increase it.
Diagnostics not shown: 81.
Checked 103 files in 712ms. No fixes applied.
Found 48 errors.
Found 53 warnings.src/store/slices/npcInventorySlice.js:8:2 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━

  ! Several of these imports are unused.

     6 │ import {
     7 │ 	canItemsStack,
   > 8 │ 	findItemById,
       │ 	^^^^^^^^^^^^^
   > 9 │ 	getItemIndex,
       │ 	^^^^^^^^^^^^
    10 │ 	cloneItem,
    11 │ } from "./inventory/inventoryUtils.js";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

      6   6 │   import {
      7   7 │   	canItemsStack,
      8     │ - → findItemById,
      9     │ - → getItemIndex,
     10   8 │   	cloneItem,
     11   9 │   } from "./inventory/inventoryUtils.js";


src/store/slices/npcInventorySlice.js:151:29 lint/correctness/noUnusedVariables ━━━━━━━━━━━━━━━━━━━━

  ! This variable toInventoryId is unused.

    149 │ 		// Move item from NPC inventory to another inventory
    150 │ 		moveItem(state, action) {
  > 151 │ 			const { fromInventoryId, toInventoryId, itemId, quantity } =
        │ 			                         ^^^^^^^^^^^^^
    152 │ 				action.payload;
    153 │

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.


src/store/slices/npcInventorySlice.js:222:35 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━

  ! This parameter is unused.

    220 │ // Memoized selectors
    221 │ export const selectNpcInventoryById = createSelector(
  > 222 │ 	[(state) => state.npcInventory, (state, npcId) => npcId],
        │ 	                                 ^^^^^
    223 │ 	(npcInventory, npcId) => (npcInventory ? npcInventory[npcId] : undefined),
    224 │ );

  i Unused parameters might be the result of an incomplete refactoring.

  i Unsafe fix: If this is intentional, prepend state with an underscore.

    220 220 │   // Memoized selectors
    221 221 │   export const selectNpcInventoryById = createSelector(
    222     │ - → [(state)·=>·state.npcInventory,·(state,·npcId)·=>·npcId],
        222 │ + → [(state)·=>·state.npcInventory,·(_state,·npcId)·=>·npcId],
    223 223 │   	(npcInventory, npcId) => (npcInventory ? npcInventory[npcId] : undefined),
    224 224 │   );


src/store/slices/placesSlice.js:65:5 lint/complexity/noCommaOperator ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! The comma operator is disallowed.

    63 │ 		builder.addCase("@@INIT", (state) => {
    64 │ 			updateAvailableConnections(state);
  > 65 │ 		}),
       │ 		  ^
    66 │ 			builder.addMatcher(
    67 │ 				(action) => action.type === "places/navigateToPlace",

  i Its use is often confusing and obscures side effects.


src/store/slices/placesSlice.js:13:5 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━━━━━━━━━━━

  ! Change to an optional chain.

    11 │ // Initialize available connections for the initial state
    12 │ const currentPlace = placesData[initialState.currentPlaceId];
  > 13 │ if (currentPlace && currentPlace.connections) {
       │     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    14 │ 	initialState.availableConnections = currentPlace.connections.map(
    15 │ 		(placeId) => ({

  i Unsafe fix: Change to an optional chain.

    11 11 │   // Initialize available connections for the initial state
    12 12 │   const currentPlace = placesData[initialState.currentPlaceId];
    13    │ - if·(currentPlace·&&·currentPlace.connections)·{
       13 │ + if·(currentPlace?.connections)·{
    14 14 │   	initialState.availableConnections = currentPlace.connections.map(
    15 15 │   		(placeId) => ({


src/store/slices/placesSlice.js:25:6 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━━━━━━━━━━━

  ! Change to an optional chain.

    23 │ const updateAvailableConnections = (state) => {
    24 │ 	const currentPlace = state[state.currentPlaceId];
  > 25 │ 	if (currentPlace && currentPlace.connections) {
       │ 	    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    26 │ 		state.availableConnections = currentPlace.connections.map((placeId) => ({
    27 │ 			id: placeId,

  i Unsafe fix: Change to an optional chain.

    23 23 │   const updateAvailableConnections = (state) => {
    24 24 │   	const currentPlace = state[state.currentPlaceId];
    25    │ - → if·(currentPlace·&&·currentPlace.connections)·{
       25 │ + → if·(currentPlace?.connections)·{
    26 26 │   		state.availableConnections = currentPlace.connections.map((placeId) => ({
    27 27 │   			id: placeId,


src/store/slices/placesSlice.js:58:15 lint/correctness/noUnusedFunctionParameters  FIXABLE  ━━━━━━━━━━

  ! This parameter is unused.

    56 │ 		},
    57 │ 		// Set entire places state (used for loading saved state)
  > 58 │ 		setPlaces: (state, action) => action.payload,
       │ 		            ^^^^^
    59 │ 	},
    60 │

  i Unused parameters might be the result of an incomplete refactoring.

  i Unsafe fix: If this is intentional, prepend state with an underscore.

    56 56 │   		},
    57 57 │   		// Set entire places state (used for loading saved state)
    58    │ - → → setPlaces:·(state,·action)·=>·action.payload,
       58 │ + → → setPlaces:·(_state,·action)·=>·action.payload,
    59 59 │   	},
    60 60 │


src/ui/components/display/LogDisplay.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━

  ! These imports are unused.

  > 1 │ import React, { useEffect, useRef } from "react";
      │        ^^^^^
    2 │ const _LOG_CATEGORIES = {
    3 │ 	worker: { label: "Workers", color: "worker" },

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React,·{·useEffect,·useRef·}·from·"react";
      │        -------

src/ui/components/display/ResourceDisplay.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │ import { useSelector } from "react-redux";
    3 │ import { createSelector } from "@reduxjs/toolkit";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/list/EnemyList.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │
    3 │ import EntityCard from "../card/EntityCard";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/list/NPCList.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │
    3 │ import NPCCard from "../card/NPCCard";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/list/StatList.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │ import { useSelector } from "react-redux";
    3 │

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/sections/BuildingsSection.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │ import { useSelector } from "react-redux";
    3 │

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/sections/ControlSection.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │ import { useSelector, useDispatch } from "react-redux";
    3 │ import { createSelector } from "@reduxjs/toolkit";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/display/InventoryDisplay.js:196:8 lint/a11y/useSemanticElements ━━━━━━━━━━━━━━━━━━

  × The elements with this role can be changed to the following elements:
    <button>

    194 │ 					return (
    195 │ 						<div
  > 196 │ 							role="button"
        │ 							^^^^^^^^^^^^^
    197 │ 							tabIndex={0}
    198 │ 							className={`inventory-slot ${item ? "filled" : "empty"}`}

  i For examples and more information, see WAI-ARIA Roles


src/ui/components/display/InventoryDisplay.js:51:28 lint/correctness/useHookAtTopLevel ━━━━━━━━━━━━━

  × This hook is being called conditionally, but all hooks must be called in the exact same order in every component render.

    50 │ 	// Handle right-click context menu for moving items between inventories
  > 51 │ 	const handleContextMenu = useCallback(
       │ 	                          ^^^^^^^^^^^
    52 │ 		(e, item) => {
    53 │ 			if (!otherInventory) return; // Do nothing if no target inventory

  i Hooks should not be called after an early return.

    46 │ 	});
    47 │
  > 48 │ 	if (!inventory) return null; // If inventory is not found, render nothing
       │ 	                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    49 │
    50 │ 	// Handle right-click context menu for moving items between inventories

  i For React to preserve state between calls, hooks needs to be called unconditionally and always in the same order.

  i See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level


src/ui/components/display/InventoryDisplay.js:112:28 lint/correctness/useHookAtTopLevel ━━━━━━━━━━━━

  × This hook is being called conditionally, but all hooks must be called in the exact same order in every component render.

    111 │ 	// Handle confirm button for moving items between inventories
  > 112 │ 	const handleConfirmMove = useCallback(
        │ 	                          ^^^^^^^^^^^
    113 │ 		(quantity = null) => {
    114 │ 			if (!otherInventoryId || !selectedItem) return; // Do nothing if no target inventory or no item selected

  i Hooks should not be called after an early return.

    46 │ 	});
    47 │
  > 48 │ 	if (!inventory) return null; // If inventory is not found, render nothing
       │ 	                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    49 │
    50 │ 	// Handle right-click context menu for moving items between inventories

  i For React to preserve state between calls, hooks needs to be called unconditionally and always in the same order.

  i See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level


src/ui/components/display/InventoryDisplay.js:135:23 lint/correctness/useHookAtTopLevel ━━━━━━━━━━━━

  × This hook is being called conditionally, but all hooks must be called in the exact same order in every component render.

    134 │ 	// Handle cancel button for moving items between inventories
  > 135 │ 	const handleCancel = useCallback(() => {
        │ 	                     ^^^^^^^^^^^
    136 │ 		setDialogOpen(false);
    137 │ 		setSelectedItem(null);

  i Hooks should not be called after an early return.

    46 │ 	});
    47 │
  > 48 │ 	if (!inventory) return null; // If inventory is not found, render nothing
       │ 	                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    49 │
    50 │ 	// Handle right-click context menu for moving items between inventories

  i For React to preserve state between calls, hooks needs to be called unconditionally and always in the same order.

  i See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level


src/ui/components/display/InventoryDisplay.js:141:24 lint/correctness/useHookAtTopLevel ━━━━━━━━━━━━

  × This hook is being called conditionally, but all hooks must be called in the exact same order in every component render.

    140 │ 	// Consume consumable items: lookup heal from the item directly
  > 141 │ 	const handleConsume = useCallback(
        │ 	                      ^^^^^^^^^^^
    142 │ 		(item) => {
    143 │ 			const healAmount = item.consumable?.heal;

  i Hooks should not be called after an early return.

    46 │ 	});
    47 │
  > 48 │ 	if (!inventory) return null; // If inventory is not found, render nothing
       │ 	                ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    49 │
    50 │ 	// Handle right-click context menu for moving items between inventories

  i For React to preserve state between calls, hooks needs to be called unconditionally and always in the same order.

  i See https://reactjs.org/docs/hooks-rules.html#only-call-hooks-at-the-top-level


src/ui/components/display/InventoryDisplay.js:199:13 lint/suspicious/noArrayIndexKey ━━━━━━━━━━━━━━━

  × Avoid using the index of an array as key property in an element.

    197 │ 							tabIndex={0}
    198 │ 							className={`inventory-slot ${item ? "filled" : "empty"}`}
  > 199 │ 							key={i}
        │ 							     ^
    200 │ 							onContextMenu={
    201 │ 								item && otherInventory

  i This is the source of the key value.

    189 │ 			</div>
    190 │ 			<div className="inventory-flex">
  > 191 │ 				{Array.from({ length: inventory.maxSlots }, (_, i) => {
        │ 				                                                ^
    192 │ 					const item = inventory.items[i];
    193 │

  i The order of the items may change, and this also affects performances and component state.

  i Check the React documentation.


lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some warnings were emitted while running checks.

```

</details>

<details>

<summary>JSCPD</summary>

```text
Clone found (javascript):
 - /github/workspace/src/ui/components/sections/WorkersSection.js [42:9 - 50:10] (8 lines, 75 tokens)
   /github/workspace/src/ui/components/sections/WorkersSection.js [28:11 - 36:3]

Clone found (javascript):
 - /github/workspace/src/ui/components/display/LogDisplay.js [2:2 - 9:7] (7 lines, 88 tokens)
   /github/workspace/src/ui/components/sections/LogSection.js [7:2 - 14:6]

Clone found (css):
 - /github/workspace/src/styles/sections/places-section.css [131:7 - 160:19] (29 lines, 150 tokens)
   /github/workspace/src/styles/sections/places-section.css [107:11 - 134:12]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [60:15 - 77:36] (17 lines, 138 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [93:17 - 110:37]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [78:3 - 86:31] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [111:3 - 119:32]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [86:31 - 102:55] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [119:32 - 135:56]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [103:3 - 128:39] (25 lines, 213 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [136:3 - 161:40]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [252:2 - 258:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [244:2 - 248:7]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [105:4 - 124:34] (19 lines, 171 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [58:4 - 110:37]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [125:3 - 133:29] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [111:3 - 119:32]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [133:29 - 149:53] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [119:32 - 135:56]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [154:4 - 172:37] (18 lines, 166 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [143:4 - 161:40]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [198:6 - 215:16] (17 lines, 115 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [245:9 - 262:10]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [259:24 - 267:24] (8 lines, 91 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [245:26 - 253:26]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [266:2 - 272:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/npcInventorySlice.js [258:2 - 262:7]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [267:24 - 276:18] (9 lines, 113 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [253:26 - 262:20]

Clone found (json):
 - /github/workspace/_test_/fixtures/gameStates/testStates.json [53:5 - 77:2] (24 lines, 148 tokens)
   /github/workspace/_test_/fixtures/gameStates/testStates.json [6:2 - 29:2]

Clone found (json):
 - /github/workspace/_test_/fixtures/gameStates/testStates.json [108:9 - 128:2] (20 lines, 109 tokens)
   /github/workspace/_test_/fixtures/gameStates/testStates.json [13:2 - 32:2]

Clone found (javascript):
 - /github/workspace/src/data/inventory.js [2:2 - 47:15] (45 lines, 301 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [21:2 - 66:2]

Clone found (javascript):
 - /github/workspace/src/data/inventory.js [47:2 - 76:7] (29 lines, 184 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [15:2 - 44:6]

Clone found (javascript):
 - /github/workspace/_test_/services/SpawnService.test.js [64:17 - 74:14] (10 lines, 94 tokens)
   /github/workspace/_test_/services/SpawnService.test.js [50:14 - 60:15]

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [162:5 - 180:2] (18 lines, 120 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [139:5 - 158:3]

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [336:12 - 351:66] (15 lines, 86 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [308:17 - 323:54]

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [356:12 - 375:75] (19 lines, 112 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [304:17 - 323:54]

Clone found (javascript):
 - /github/workspace/_test_/mocks/itemFactory.mock.js [2:2 - 10:7] (8 lines, 93 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [18:2 - 26:2]

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [302:7 - 316:11] (14 lines, 109 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [132:7 - 146:18]

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [308:2 - 323:2] (15 lines, 97 tokens)
   /github/workspace/_test_/gameEngine/gameEngine.test.js [287:2 - 302:2]

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [514:56 - 529:28] (15 lines, 121 tokens)
   /github/workspace/_test_/gameEngine/gameEngine.test.js [479:68 - 495:2]

Clone found (markup):
 - /github/workspace/static/avatar_test.html [25:9 - 78:13] (53 lines, 277 tokens)
   /github/workspace/static/portrait_test.html [25:9 - 78:15]

Clone found (markup):
 - /github/workspace/static/avatar_test.html [93:9 - 156:3] (63 lines, 318 tokens)
   /github/workspace/static/portrait_test.html [101:9 - 164:3]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [95:5 - 114:5] (19 lines, 120 tokens)
   /github/workspace/_test_/fixtures/stateBuilders.js [7:2 - 26:8]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [101:2 - 117:2] (16 lines, 96 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [47:7 - 62:2]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [168:4 - 190:13] (22 lines, 126 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [45:4 - 67:12]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [262:2 - 278:2] (16 lines, 93 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [45:4 - 61:3]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [310:7 - 327:8] (17 lines, 106 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [101:7 - 118:9]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [351:4 - 376:2] (25 lines, 158 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [32:4 - 58:15]

Clone found (javascript):
 - /github/workspace/_test_/enemiesSlice.test.js [89:57 - 98:6] (9 lines, 110 tokens)
   /github/workspace/_test_/enemiesSlice.test.js [52:37 - 61:2]

Clone found (javascript):
 - /github/workspace/_test_/enemiesSlice.test.js [165:47 - 185:9] (20 lines, 135 tokens)
   /github/workspace/_test_/enemiesSlice.test.js [104:67 - 124:12]

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [126:5 - 140:59] (14 lines, 79 tokens)
   /github/workspace/_test_/combatService.test.js [111:2 - 125:35]

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [140:59 - 160:9] (20 lines, 113 tokens)
   /github/workspace/_test_/combatService.test.js [66:49 - 86:3]

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [162:2 - 182:7] (20 lines, 128 tokens)
   /github/workspace/_test_/combatService.test.js [14:2 - 34:2]

Clone found (javascript):
 - /github/workspace/src/ui/components/sections/WorkersSection.js [42:9 - 50:10] (8 lines, 75 tokens)
   /github/workspace/src/ui/components/sections/WorkersSection.js [28:11 - 36:3]

 42 │ 28 │ .map((w) => (
 43 │ 29 │ 							<WorkerCard
 44 │ 30 │ 								key={w.id}
 45 │ 31 │ 								worker={w}
 46 │ 32 │ 								buildings={currentBuildings.map((id) => buildings[id])}
 47 │ 33 │ 							/>
 48 │ 34 │ 						))
 49 │ 35 │ 					) : (
 50 │ 36 │ 						<div className="no-workers-message">Currently

Clone found (javascript):
 - /github/workspace/src/ui/components/display/LogDisplay.js [2:2 - 9:7] (7 lines, 88 tokens)
   /github/workspace/src/ui/components/sections/LogSection.js [7:2 - 14:6]

 2 │ 7  │ = {
 3 │ 8  │ 	worker: { label: "Workers", color: "worker" },
 4 │ 9  │ 	combat: { label: "Combat", color: "combat" },
 5 │ 10 │ 	movement: { label: "Movement", color: "movement" },
 6 │ 11 │ 	default: { label: "Default", color: "default" },
 7 │ 12 │ };
 8 │ 13 │
 9 │ 14 │ export

Clone found (css):
 - /github/workspace/src/styles/sections/places-section.css [131:7 - 160:19] (29 lines, 150 tokens)
   /github/workspace/src/styles/sections/places-section.css [107:11 - 134:12]

 131 │ 107 │ ;
 132 │ 108 │ }
 133 │ 109 │
 134 │ 110 │ .place-info {
 135 │ 111 │ 	padding: 0.5rem;
 136 │ 112 │ }
 137 │ 113 │
 138 │ 114 │ .place-info h3 {
 139 │ 115 │ 	font-size: 2.8rem;
 140 │ 116 │ 	text-align: center;
 141 │ 117 │ 	background: linear-gradient(0deg, #a18624 10%, #bf9e2a 90%);
 142 │ 118 │ 	background-clip: text;
 143 │ 119 │ 	-webkit-text-fill-color: transparent;
 144 │ 120 │ 	filter: drop-shadow(0 4px 2px rgb(0 0 0 / 25%));
 145 │ 121 │ }
 146 │ 122 │
 147 │ 123 │ .place-description {
 148 │ 124 │ 	margin: 0.5rem 0;
 149 │ 125 │ 	color: #bdc3c7;
 150 │ 126 │ }
 151 │ 127 │
 152 │ 128 │ .place-id {
 153 │ 129 │ 	font-size: 0.8rem;
 154 │ 130 │ 	color: #95a5a6;
 155 │ 131 │ 	margin-top: 0.5rem;
 156 │ 132 │ }
 157 │ 133 │
 158 │ 134 │ .place-features,
 159 │ 135 │ .place-resources,
 160 │ 136 │ .place-connections

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [60:15 - 77:36] (17 lines, 138 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [93:17 - 110:37]

 60 │ 93  │ .message);
 61 │ 94  │ 				return;
 62 │ 95  │ 			}
 63 │ 96  │
 64 │ 97  │ 			// Try to stack with existing items
 65 │ 98  │ 			const existingItem = inventory.items.find((i) => canItemsStack(i, item));
 66 │ 99  │ 			if (existingItem && item.quantity) {
 67 │ 100 │ 				existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
 68 │ 101 │ 			} else {
 69 │ 102 │ 				// Add new item
 70 │ 103 │ 				inventory.items.push({
 71 │ 104 │ 					...cloneItem(item),
 72 │ 105 │ 					quantity: item.quantity || 1,
 73 │ 106 │ 				});
 74 │ 107 │ 			}
 75 │ 108 │ 		},
 76 │ 109 │
 77 │ 110 │ 		// Remove item from place inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [78:3 - 86:31] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [111:3 - 119:32]

 78 │ 111 │ removeItem(state, action) {
 79 │ 112 │ 			const { inventoryId, itemId, quantity } = action.payload;
 80 │ 113 │ 			const inventory = state[inventoryId];
 81 │ 114 │ 			if (!inventory) return;
 82 │ 115 │
 83 │ 116 │ 			const itemValidation = validateItemExists(inventory, itemId);
 84 │ 117 │ 			if (!itemValidation.isValid) {
 85 │ 118 │ 				console.warn(
 86 │ 119 │ 					`Item ${itemId} not found in place inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [86:31 - 102:55] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [119:32 - 135:56]

 86  │ 119 │ ${inventoryId}`,
 87  │ 120 │ 				);
 88  │ 121 │ 				return;
 89  │ 122 │ 			}
 90  │ 123 │
 91  │ 124 │ 			const itemIndex = itemValidation.itemIndex;
 92  │ 125 │ 			const item = inventory.items[itemIndex];
 93  │ 126 │ 			const removeQuantity = quantity || item.quantity || 1;
 94  │ 127 │
 95  │ 128 │ 			if (removeQuantity >= (item.quantity || 1)) {
 96  │ 129 │ 				inventory.items.splice(itemIndex, 1);
 97  │ 130 │ 			} else {
 98  │ 131 │ 				item.quantity -= removeQuantity;
 99  │ 132 │ 			}
 100 │ 133 │ 		},
 101 │ 134 │
 102 │ 135 │ 		// Move item from place inventory to another inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [103:3 - 128:39] (25 lines, 213 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [136:3 - 161:40]

 103 │ 136 │ moveItem(state, action) {
 104 │ 137 │ 			const { fromInventoryId, toInventoryId, itemId, quantity } =
 105 │ 138 │ 				action.payload;
 106 │ 139 │
 107 │ 140 │ 			// This is a complex operation that involves both slices
 108 │ 141 │ 			// The actual move logic will be handled by a thunk
 109 │ 142 │ 			// This reducer just updates the local state
 110 │ 143 │ 			const inventory = state[fromInventoryId];
 111 │ 144 │ 			if (!inventory) return;
 112 │ 145 │
 113 │ 146 │ 			const itemValidation = validateItemExists(inventory, itemId);
 114 │ 147 │ 			if (!itemValidation.isValid) return;
 115 │ 148 │
 116 │ 149 │ 			const itemIndex = itemValidation.itemIndex;
 117 │ 150 │ 			const item = inventory.items[itemIndex];
 118 │ 151 │ 			const moveQuantity = quantity || item.quantity || 1;
 119 │ 152 │
 120 │ 153 │ 			// Update source inventory
 121 │ 154 │ 			if (moveQuantity < (item.quantity || 1)) {
 122 │ 155 │ 				item.quantity -= moveQuantity;
 123 │ 156 │ 			} else {
 124 │ 157 │ 				inventory.items.splice(itemIndex, 1);
 125 │ 158 │ 			}
 126 │ 159 │ 		},
 127 │ 160 │
 128 │ 161 │ 		// Update entire place inventory state

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [252:2 - 258:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [244:2 - 248:7]

 252 │ 244 │ = createSelector(
 253 │ 245 │ 	[selectPlaceInventoryItems, (state, itemType) => itemType],
 254 │ 246 │ 	(items, itemType) => {
 255 │ 247 │ 		if (!Array.isArray(items)) return 0;
 256 │ 248 │ 		return items
 257 │ 249 │ 			.filter((item) => item.type === itemType)
 258 │ 250 │ 			.reduce

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [105:4 - 124:34] (19 lines, 171 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [58:4 - 110:37]

 105 │ 58 │ const slotValidation = validateSlotLimit(inventory, 1);
 106 │ 59 │ 			if (!slotValidation.isValid) {
 107 │ 60 │ 				console.warn(slotValidation.message);
 108 │ 61 │ 				return;
 109 │ 62 │ 			}
 110 │ 63 │
 111 │ 64 │ 			// Try to stack with existing items
 112 │ 65 │ 			const existingItem = inventory.items.find((i) => canItemsStack(i, item));
 113 │ 66 │ 			if (existingItem && item.quantity) {
 114 │ 67 │ 				existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
 115 │ 68 │ 			} else {
 116 │ 69 │ 				// Add new item
 117 │ 70 │ 				inventory.items.push({
 118 │ 71 │ 					...cloneItem(item),
 119 │ 72 │ 					quantity: item.quantity || 1,
 120 │ 73 │ 				});
 121 │ 74 │ 			}
 122 │ 75 │ 		},
 123 │ 76 │
 124 │ 77 │ 		// Remove item from NPC inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [125:3 - 133:29] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [111:3 - 119:32]

 125 │ 111 │ removeItem(state, action) {
 126 │ 112 │ 			const { inventoryId, itemId, quantity } = action.payload;
 127 │ 113 │ 			const inventory = state[inventoryId];
 128 │ 114 │ 			if (!inventory) return;
 129 │ 115 │
 130 │ 116 │ 			const itemValidation = validateItemExists(inventory, itemId);
 131 │ 117 │ 			if (!itemValidation.isValid) {
 132 │ 118 │ 				console.warn(
 133 │ 119 │ 					`Item ${itemId} not found in NPC inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [133:29 - 149:53] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [119:32 - 135:56]

 133 │ 119 │ ${inventoryId}`,
 134 │ 120 │ 				);
 135 │ 121 │ 				return;
 136 │ 122 │ 			}
 137 │ 123 │
 138 │ 124 │ 			const itemIndex = itemValidation.itemIndex;
 139 │ 125 │ 			const item = inventory.items[itemIndex];
 140 │ 126 │ 			const removeQuantity = quantity || item.quantity || 1;
 141 │ 127 │
 142 │ 128 │ 			if (removeQuantity >= (item.quantity || 1)) {
 143 │ 129 │ 				inventory.items.splice(itemIndex, 1);
 144 │ 130 │ 			} else {
 145 │ 131 │ 				item.quantity -= removeQuantity;
 146 │ 132 │ 			}
 147 │ 133 │ 		},
 148 │ 134 │
 149 │ 135 │ 		// Move item from NPC inventory to another inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [154:4 - 172:37] (18 lines, 166 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [143:4 - 161:40]

 154 │ 143 │ const inventory = state[fromInventoryId];
 155 │ 144 │ 			if (!inventory) return;
 156 │ 145 │
 157 │ 146 │ 			const itemValidation = validateItemExists(inventory, itemId);
 158 │ 147 │ 			if (!itemValidation.isValid) return;
 159 │ 148 │
 160 │ 149 │ 			const itemIndex = itemValidation.itemIndex;
 161 │ 150 │ 			const item = inventory.items[itemIndex];
 162 │ 151 │ 			const moveQuantity = quantity || item.quantity || 1;
 163 │ 152 │
 164 │ 153 │ 			// Update source inventory
 165 │ 154 │ 			if (moveQuantity < (item.quantity || 1)) {
 166 │ 155 │ 				item.quantity -= moveQuantity;
 167 │ 156 │ 			} else {
 168 │ 157 │ 				inventory.items.splice(itemIndex, 1);
 169 │ 158 │ 			}
 170 │ 159 │ 		},
 171 │ 160 │
 172 │ 161 │ 		// Update entire NPC inventory state

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [198:6 - 215:16] (17 lines, 115 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [245:9 - 262:10]

 198 │ 245 │ ) {
 199 │ 246 │ 				if (typeof maxSlots === "number" && maxSlots > 0) {
 200 │ 247 │ 					inventory.maxSlots = maxSlots;
 201 │ 248 │ 				}
 202 │ 249 │ 				if (typeof maxWeight === "number" && maxWeight > 0) {
 203 │ 250 │ 					inventory.maxWeight = maxWeight;
 204 │ 251 │ 				}
 205 │ 252 │ 			}
 206 │ 253 │ 		},
 207 │ 254 │ 	},
 208 │ 255 │ });
 209 │ 256 │
 210 │ 257 │ export const {
 211 │ 258 │ 	addItem,
 212 │ 259 │ 	removeItem,
 213 │ 260 │ 	moveItem,
 214 │ 261 │ 	updateInventory,
 215 │ 262 │ 	addNpcInventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [259:24 - 267:24] (8 lines, 91 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [245:26 - 253:26]

 259 │ 245 │ , (state, itemType) => itemType],
 260 │ 246 │ 	(items, itemType) => {
 261 │ 247 │ 		if (!Array.isArray(items)) return 0;
 262 │ 248 │ 		return items.filter((item) => item.type === itemType).length;
 263 │ 249 │ 	},
 264 │ 250 │ );
 265 │ 251 │
 266 │ 252 │ export const selectTotalQuantityByItemType = createSelector(
 267 │ 253 │ 	[selectNpcInventoryItems

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [266:2 - 272:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/npcInventorySlice.js [258:2 - 262:7]

 266 │ 258 │ = createSelector(
 267 │ 259 │ 	[selectNpcInventoryItems, (state, itemType) => itemType],
 268 │ 260 │ 	(items, itemType) => {
 269 │ 261 │ 		if (!Array.isArray(items)) return 0;
 270 │ 262 │ 		return items
 271 │ 263 │ 			.filter((item) => item.type === itemType)
 272 │ 264 │ 			.reduce

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [267:24 - 276:18] (9 lines, 113 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [253:26 - 262:20]

 267 │ 253 │ , (state, itemType) => itemType],
 268 │ 254 │ 	(items, itemType) => {
 269 │ 255 │ 		if (!Array.isArray(items)) return 0;
 270 │ 256 │ 		return items
 271 │ 257 │ 			.filter((item) => item.type === itemType)
 272 │ 258 │ 			.reduce((total, item) => total + (item.quantity || 1), 0);
 273 │ 259 │ 	},
 274 │ 260 │ );
 275 │ 261 │
 276 │ 262 │ export default npcInventorySlice

Clone found (json):
 - /github/workspace/_test_/fixtures/gameStates/testStates.json [53:5 - 77:2] (24 lines, 148 tokens)
   /github/workspace/_test_/fixtures/gameStates/testStates.json [6:2 - 29:2]

 53 │ 6  │ },
 54 │ 7  │     "playerInventory": {
 55 │ 8  │       "player": {
 56 │ 9  │         "id": "player",
 57 │ 10 │         "type": "player",
 58 │ 11 │         "maxSlots": 20,
 59 │ 12 │         "maxWeight": 100,
 60 │ 13 │         "items": [],
 61 │ 14 │         "equipment": {
 62 │ 15 │           "head": null,
 63 │ 16 │           "body": null,
 64 │ 17 │           "pants": null,
 65 │ 18 │           "main-weapon": null,
 66 │ 19 │           "second-weapon": null
 67 │ 20 │         }
 68 │ 21 │       }
 69 │ 22 │     },
 70 │ 23 │     "placeInventory": {
 71 │ 24 │       "village_center": {
 72 │ 25 │         "id": "village_center",
 73 │ 26 │         "placeId": "village_center",
 74 │ 27 │         "type": "place",
 75 │ 28 │         "maxSlots": 30,
 76 │ 29 │         "items": [
 77 │ 30 │           {

Clone found (json):
 - /github/workspace/_test_/fixtures/gameStates/testStates.json [108:9 - 128:2] (20 lines, 109 tokens)
   /github/workspace/_test_/fixtures/gameStates/testStates.json [13:2 - 32:2]

 108 │ 13 │ ],
 109 │ 14 │         "equipment": {
 110 │ 15 │           "head": null,
 111 │ 16 │           "body": null,
 112 │ 17 │           "pants": null,
 113 │ 18 │           "main-weapon": null,
 114 │ 19 │           "second-weapon": null
 115 │ 20 │         }
 116 │ 21 │       }
 117 │ 22 │     },
 118 │ 23 │     "placeInventory": {
 119 │ 24 │       "village_center": {
 120 │ 25 │         "id": "village_center",
 121 │ 26 │         "placeId": "village_center",
 122 │ 27 │         "type": "place",
 123 │ 28 │         "maxSlots": 30,
 124 │ 29 │         "items": []
 125 │ 30 │       }
 126 │ 31 │     }
 127 │ 32 │   }
 128 │ 33 │ }

Clone found (javascript):
 - /github/workspace/src/data/inventory.js [2:2 - 47:15] (45 lines, 301 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [21:2 - 66:2]

 2  │ 21 │ = {
 3  │ 22 │ 	player: {
 4  │ 23 │ 		id: "player",
 5  │ 24 │ 		type: "player",
 6  │ 25 │ 		playerId: "1",
 7  │ 26 │ 		maxSlots: 20,
 8  │ 27 │ 		maxWeight: 100,
 9  │ 28 │ 		items: [
 10 │ 29 │ 			{
 11 │ 30 │ 				id: 1,
 12 │ 31 │ 				name: "apple",
 13 │ 32 │ 				description: "A fresh apple",
 14 │ 33 │ 				type: "consumable",
 15 │ 34 │ 				quantity: 5,
 16 │ 35 │ 				weight: 0.5,
 17 │ 36 │ 				consumable: { heal: 10 },
 18 │ 37 │ 			},
 19 │ 38 │ 			{
 20 │ 39 │ 				id: "leather-hood",
 21 │ 40 │ 				name: "rusty armor",
 22 │ 41 │ 				description: "A sturdy piece of armor",
 23 │ 42 │ 				type: "equipment",
 24 │ 43 │ 				piece: "body",
 25 │ 44 │ 				quantity: 1,
 26 │ 45 │ 				stats: { defense: 10 },
 27 │ 46 │ 				weight: 15,
 28 │ 47 │ 			},
 29 │ 48 │ 			{
 30 │ 49 │ 				id: 2,
 31 │ 50 │ 				name: "banana",
 32 │ 51 │ 				description: "A ripe banana",
 33 │ 52 │ 				type: "consumable",
 34 │ 53 │ 				quantity: 3,
 35 │ 54 │ 				weight: 0.5,
 36 │ 55 │ 				consumable: { heal: 12 },
 37 │ 56 │ 			},
 38 │ 57 │ 		],
 39 │ 58 │ 		equipment: {
 40 │ 59 │ 			head: null,
 41 │ 60 │ 			body: null,
 42 │ 61 │ 			pants: null,
 43 │ 62 │ 			"main-weapon": null,
 44 │ 63 │ 			"second-weapon": null,
 45 │ 64 │ 		},
 46 │ 65 │ 	},
 47 │ 66 │ 	village_center

Clone found (javascript):
 - /github/workspace/src/data/inventory.js [47:2 - 76:7] (29 lines, 184 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [15:2 - 44:6]

 47 │ 15 │ village_center: {
 48 │ 16 │ 		id: "village_center",
 49 │ 17 │ 		placeId: "village_center",
 50 │ 18 │ 		type: "place",
 51 │ 19 │ 		maxSlots: 30,
 52 │ 20 │ 		items: [
 53 │ 21 │ 			{
 54 │ 22 │ 				id: 1,
 55 │ 23 │ 				name: "apple",
 56 │ 24 │ 				description: "A fresh apple",
 57 │ 25 │ 				type: "consumable",
 58 │ 26 │ 				quantity: 10,
 59 │ 27 │ 				weight: 0.5,
 60 │ 28 │ 				consumable: { heal: 10 },
 61 │ 29 │ 			},
 62 │ 30 │ 			{
 63 │ 31 │ 				id: "leather-hood",
 64 │ 32 │ 				name: "rusty armor",
 65 │ 33 │ 				description: "A sturdy piece of armor",
 66 │ 34 │ 				type: "equipment",
 67 │ 35 │ 				piece: "body",
 68 │ 36 │ 				quantity: 1,
 69 │ 37 │ 				stats: { defense: 12 },
 70 │ 38 │ 				weight: 18,
 71 │ 39 │ 			},
 72 │ 40 │ 		],
 73 │ 41 │ 	},
 74 │ 42 │ };
 75 │ 43 │
 76 │ 44 │ export

Clone found (javascript):
 - /github/workspace/_test_/services/SpawnService.test.js [64:17 - 74:14] (10 lines, 94 tokens)
   /github/workspace/_test_/services/SpawnService.test.js [50:14 - 60:15]

 64 │ 50 │ ;
 65 │ 51 │ 			// Get the enterPlace handler and call it directly
 66 │ 52 │ 			const enterPlaceHandler = eventBusService.on.mock.calls.find(
 67 │ 53 │ 				(call) => call[0] === "enterPlace",
 68 │ 54 │ 			)?.[1];
 69 │ 55 │ 			if (enterPlaceHandler) {
 70 │ 56 │ 				enterPlaceHandler(placeId);
 71 │ 57 │ 			}
 72 │ 58 │
 73 │ 59 │ 			expect(spawnService.currentPlaceId).toBe(placeId);
 74 │ 60 │ 			expect(spawnService.getSpawner(placeId)).toBeUndefined

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [162:5 - 180:2] (18 lines, 120 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [139:5 - 158:3]

 162 │ 139 │ productionType: "wood",
 163 │ 140 │ 			};
 164 │ 141 │ 			const state = createStateWithWorkers([
 165 │ 142 │ 				{ id: "worker1", assignedBuildingId: "sawmill" },
 166 │ 143 │ 			]);
 167 │ 144 │ 			const deltaTime = 1000;
 168 │ 145 │
 169 │ 146 │ 			productionService.processBuildingProduction(
 170 │ 147 │ 				"sawmill",
 171 │ 148 │ 				building,
 172 │ 149 │ 				state,
 173 │ 150 │ 				deltaTime,
 174 │ 151 │ 			);
 175 │ 152 │
 176 │ 153 │ 			// Should not create items
 177 │ 154 │ 			expect(mockItemFactory.create).not.toHaveBeenCalled();
 178 │ 155 │ 			expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
 179 │ 156 │ 		});
 180 │ 157 │ 	}

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [336:12 - 351:66] (15 lines, 86 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [308:17 - 323:54]

 336 │ 308 │ ],
 337 │ 309 │ 					},
 338 │ 310 │ 				},
 339 │ 311 │ 				placeInventory: {
 340 │ 312 │ 					village_center: { items: [] },
 341 │ 313 │ 				},
 342 │ 314 │ 			};
 343 │ 315 │
 344 │ 316 │ 			const result = productionService.findClosestPlaceWithInventory(
 345 │ 317 │ 				"river_crossing",
 346 │ 318 │ 				state,
 347 │ 319 │ 			);
 348 │ 320 │ 			expect(result).toBe("village_center");
 349 │ 321 │ 		});
 350 │ 322 │
 351 │ 323 │ 		it("should fallback to village_center when no other inventory found"

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [356:12 - 375:75] (19 lines, 112 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [304:17 - 323:54]

 356 │ 304 │ ],
 357 │ 305 │ 					},
 358 │ 306 │ 					farmlands: {
 359 │ 307 │ 						hasInventory: false,
 360 │ 308 │ 						connections: ["river_crossing"],
 361 │ 309 │ 					},
 362 │ 310 │ 				},
 363 │ 311 │ 				placeInventory: {
 364 │ 312 │ 					village_center: { items: [] },
 365 │ 313 │ 				},
 366 │ 314 │ 			};
 367 │ 315 │
 368 │ 316 │ 			const result = productionService.findClosestPlaceWithInventory(
 369 │ 317 │ 				"river_crossing",
 370 │ 318 │ 				state,
 371 │ 319 │ 			);
 372 │ 320 │ 			expect(result).toBe("village_center");
 373 │ 321 │ 		});
 374 │ 322 │
 375 │ 323 │ 		it("should return current place as fallback when no inventory found anywhere"

Clone found (javascript):
 - /github/workspace/_test_/mocks/itemFactory.mock.js [2:2 - 10:7] (8 lines, 93 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [18:2 - 26:2]

 2  │ 18 │ {
 3  │ 19 │ 	create: vi.fn((type, quantity) => ({
 4  │ 20 │ 		id: `${type}-${Date.now()}`,
 5  │ 21 │ 		name: type,
 6  │ 22 │ 		type: "material",
 7  │ 23 │ 		quantity: Math.max(1, Math.floor(quantity || 1)),
 8  │ 24 │ 		weight: 1,
 9  │ 25 │ 	})),
 10 │ 26 │ 	_reset

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [302:7 - 316:11] (14 lines, 109 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [132:7 - 146:18]

 302 │ 132 │ , 8);
 303 │ 133 │ 			});
 304 │ 134 │
 305 │ 135 │ 			it("should handle zero production gracefully", () => {
 306 │ 136 │ 				const building = {
 307 │ 137 │ 					id: "sawmill",
 308 │ 138 │ 					calculateProduction: () => 0,
 309 │ 139 │ 					productionType: "wood",
 310 │ 140 │ 				};
 311 │ 141 │ 				const state = createStateWithWorkers([
 312 │ 142 │ 					{ id: "worker1", assignedBuildingId: "sawmill" },
 313 │ 143 │ 				]);
 314 │ 144 │ 				const deltaTime = 1000;
 315 │ 145 │
 316 │ 146 │ 				gameEngine

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [308:2 - 323:2] (15 lines, 97 tokens)
   /github/workspace/_test_/gameEngine/gameEngine.test.js [287:2 - 302:2]

 308 │ 287 │ ,
 309 │ 288 │ 					productionType: "wood",
 310 │ 289 │ 				};
 311 │ 290 │ 				const state = createStateWithWorkers([
 312 │ 291 │ 					{ id: "worker1", assignedBuildingId: "sawmill" },
 313 │ 292 │ 				]);
 314 │ 293 │ 				const deltaTime = 1000;
 315 │ 294 │
 316 │ 295 │ 				gameEngine.processBuildingProduction(
 317 │ 296 │ 					"sawmill",
 318 │ 297 │ 					building,
 319 │ 298 │ 					state,
 320 │ 299 │ 					deltaTime,
 321 │ 300 │ 				);
 322 │ 301 │
 323 │ 302 │ 				expect(mockItemFactory.create).toHaveBeenCalledWith("wood", 0

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [514:56 - 529:28] (15 lines, 121 tokens)
   /github/workspace/_test_/gameEngine/gameEngine.test.js [479:68 - 495:2]

 514 │ 479 │ , () => {
 515 │ 480 │ 			const buildings = {
 516 │ 481 │ 				sawmill: {
 517 │ 482 │ 					id: "sawmill",
 518 │ 483 │ 					calculateProduction: () => 10,
 519 │ 484 │ 					productionType: "wood",
 520 │ 485 │ 				},
 521 │ 486 │ 				mine: {
 522 │ 487 │ 					id: "mine",
 523 │ 488 │ 					baseProductionRate: 5,
 524 │ 489 │ 					productionType: "stone",
 525 │ 490 │ 				},
 526 │ 491 │ 			};
 527 │ 492 │ 			const state = {
 528 │ 493 │ 				...createStateWithWorkers([
 529 │ 494 │ 					{ id: "worker1", assignedBuildingId: "sawmill" }, // Only assigned to sawmill

Clone found (markup):
 - /github/workspace/static/avatar_test.html [25:9 - 78:13] (53 lines, 277 tokens)
   /github/workspace/static/portrait_test.html [25:9 - 78:15]

 25 │ 25 │ margin: 0 auto;
 26 │ 26 │         background: rgba(0, 0, 0, 0.5);
 27 │ 27 │         padding: 30px;
 28 │ 28 │         border-radius: 15px;
 29 │ 29 │         box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
 30 │ 30 │       }
 31 │ 31 │
 32 │ 32 │       h1 {
 33 │ 33 │         text-align: center;
 34 │ 34 │         color: #ffd700;
 35 │ 35 │         margin-bottom: 10px;
 36 │ 36 │         font-size: 2.5em;
 37 │ 37 │         text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
 38 │ 38 │       }
 39 │ 39 │
 40 │ 40 │       .subtitle {
 41 │ 41 │         text-align: center;
 42 │ 42 │         color: #c0a080;
 43 │ 43 │         margin-bottom: 20px;
 44 │ 44 │         font-style: italic;
 45 │ 45 │       }
 46 │ 46 │
 47 │ 47 │       .controls {
 48 │ 48 │         text-align: center;
 49 │ 49 │         margin-bottom: 30px;
 50 │ 50 │         padding: 15px;
 51 │ 51 │         background: rgba(139, 69, 19, 0.2);
 52 │ 52 │         border-radius: 8px;
 53 │ 53 │       }
 54 │ 54 │
 55 │ 55 │       .controls button {
 56 │ 56 │         background: #8b4513;
 57 │ 57 │         color: #ffd700;
 58 │ 58 │         border: 2px solid #654321;
 59 │ 59 │         padding: 10px 20px;
 60 │ 60 │         margin: 5px;
 61 │ 61 │         border-radius: 5px;
 62 │ 62 │         cursor: pointer;
 63 │ 63 │         font-weight: bold;
 64 │ 64 │         transition: all 0.3s ease;
 65 │ 65 │       }
 66 │ 66 │
 67 │ 67 │       .controls button:hover {
 68 │ 68 │         background: #a0522d;
 69 │ 69 │         border-color: #ffd700;
 70 │ 70 │         transform: translateY(-2px);
 71 │ 71 │       }
 72 │ 72 │
 73 │ 73 │       .controls button.active {
 74 │ 74 │         background: #ffd700;
 75 │ 75 │         color: #000;
 76 │ 76 │       }
 77 │ 77 │
 78 │ 78 │       .avatar-grid

Clone found (markup):
 - /github/workspace/static/avatar_test.html [93:9 - 156:3] (63 lines, 318 tokens)
   /github/workspace/static/portrait_test.html [101:9 - 164:3]

 93  │ 101 │ color: #c0a080;
 94  │ 102 │         font-weight: bold;
 95  │ 103 │       }
 96  │ 104 │
 97  │ 105 │       .info-box {
 98  │ 106 │         background: rgba(139, 69, 19, 0.3);
 99  │ 107 │         border: 2px solid #8b4513;
 100 │ 108 │         border-radius: 10px;
 101 │ 109 │         padding: 20px;
 102 │ 110 │         margin-top: 30px;
 103 │ 111 │       }
 104 │ 112 │
 105 │ 113 │       .info-box h2 {
 106 │ 114 │         color: #ffd700;
 107 │ 115 │         margin-bottom: 15px;
 108 │ 116 │         font-size: 1.5em;
 109 │ 117 │       }
 110 │ 118 │
 111 │ 119 │       .info-box h3 {
 112 │ 120 │         color: #ffcc00;
 113 │ 121 │         margin-top: 15px;
 114 │ 122 │         margin-bottom: 10px;
 115 │ 123 │       }
 116 │ 124 │
 117 │ 125 │       .info-box p {
 118 │ 126 │         line-height: 1.8;
 119 │ 127 │         color: #e0d0b0;
 120 │ 128 │         margin-bottom: 10px;
 121 │ 129 │       }
 122 │ 130 │
 123 │ 131 │       .info-box ul {
 124 │ 132 │         color: #e0d0b0;
 125 │ 133 │         margin-left: 20px;
 126 │ 134 │         line-height: 1.8;
 127 │ 135 │       }
 128 │ 136 │
 129 │ 137 │       code {
 130 │ 138 │         background: rgba(0, 0, 0, 0.5);
 131 │ 139 │         padding: 3px 8px;
 132 │ 140 │         border-radius: 3px;
 133 │ 141 │         color: #ffcc00;
 134 │ 142 │         font-family: "Courier New", monospace;
 135 │ 143 │         font-size: 0.95em;
 136 │ 144 │       }
 137 │ 145 │
 138 │ 146 │       .code-block {
 139 │ 147 │         background: rgba(0, 0, 0, 0.7);
 140 │ 148 │         padding: 15px;
 141 │ 149 │         border-radius: 5px;
 142 │ 150 │         border-left: 3px solid #ffd700;
 143 │ 151 │         margin: 10px 0;
 144 │ 152 │         overflow-x: auto;
 145 │ 153 │       }
 146 │ 154 │
 147 │ 155 │       .code-block code {
 148 │ 156 │         background: none;
 149 │ 157 │         display: block;
 150 │ 158 │         white-space: pre;
 151 │ 159 │       }
 152 │ 160 │     </style>
 153 │ 161 │   </head>
 154 │ 162 │   <body>
 155 │ 163 │     <div class="container">
 156 │ 164 │       <h1>⚔️

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [95:5 - 114:5] (19 lines, 120 tokens)
   /github/workspace/_test_/fixtures/stateBuilders.js [7:2 - 26:8]

 95  │ 7  │ playerInventory: {
 96  │ 8  │ 					player: {
 97  │ 9  │ 						id: "player",
 98  │ 10 │ 						type: "player",
 99  │ 11 │ 						maxSlots: 20,
 100 │ 12 │ 						maxWeight: 100,
 101 │ 13 │ 						items: [],
 102 │ 14 │ 						equipment: {
 103 │ 15 │ 							head: null,
 104 │ 16 │ 							body: null,
 105 │ 17 │ 							pants: null,
 106 │ 18 │ 							"main-weapon": null,
 107 │ 19 │ 							"second-weapon": null,
 108 │ 20 │ 						},
 109 │ 21 │ 					},
 110 │ 22 │ 				},
 111 │ 23 │ 				placeInventory: {
 112 │ 24 │ 					village_center: {
 113 │ 25 │ 						id: "village_center",
 114 │ 26 │ 						type

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [101:2 - 117:2] (16 lines, 96 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [47:7 - 62:2]

 101 │ 47 │ ],
 102 │ 48 │ 						equipment: {
 103 │ 49 │ 							head: null,
 104 │ 50 │ 							body: null,
 105 │ 51 │ 							pants: null,
 106 │ 52 │ 							"main-weapon": null,
 107 │ 53 │ 							"second-weapon": null,
 108 │ 54 │ 						},
 109 │ 55 │ 					},
 110 │ 56 │ 				},
 111 │ 57 │ 				placeInventory: {
 112 │ 58 │ 					village_center: {
 113 │ 59 │ 						id: "village_center",
 114 │ 60 │ 						type: "place",
 115 │ 61 │ 						maxSlots: 30,
 116 │ 62 │ 						items: [
 117 │ 63 │ 							{

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [168:4 - 190:13] (22 lines, 126 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [45:4 - 67:12]

 168 │ 45 │ ,
 169 │ 46 │ 							},
 170 │ 47 │ 						],
 171 │ 48 │ 						equipment: {
 172 │ 49 │ 							head: null,
 173 │ 50 │ 							body: null,
 174 │ 51 │ 							pants: null,
 175 │ 52 │ 							"main-weapon": null,
 176 │ 53 │ 							"second-weapon": null,
 177 │ 54 │ 						},
 178 │ 55 │ 					},
 179 │ 56 │ 				},
 180 │ 57 │ 				placeInventory: {
 181 │ 58 │ 					village_center: {
 182 │ 59 │ 						id: "village_center",
 183 │ 60 │ 						type: "place",
 184 │ 61 │ 						maxSlots: 30,
 185 │ 62 │ 						items: [],
 186 │ 63 │ 					},
 187 │ 64 │ 				},
 188 │ 65 │ 			};
 189 │ 66 │
 190 │ 67 │ 			const testStore = createTestStore(partialState

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [262:2 - 278:2] (16 lines, 93 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [45:4 - 61:3]

 262 │ 45 │ ,
 263 │ 46 │ 							},
 264 │ 47 │ 						],
 265 │ 48 │ 						equipment: {
 266 │ 49 │ 							head: null,
 267 │ 50 │ 							body: null,
 268 │ 51 │ 							pants: null,
 269 │ 52 │ 							"main-weapon": null,
 270 │ 53 │ 							"second-weapon": null,
 271 │ 54 │ 						},
 272 │ 55 │ 					},
 273 │ 56 │ 				},
 274 │ 57 │ 				placeInventory: {
 275 │ 58 │ 					village_center: {
 276 │ 59 │ 						id: "village_center",
 277 │ 60 │ 						type: "place",
 278 │ 61 │ 						maxSlots: 1

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [310:7 - 327:8] (17 lines, 106 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [101:7 - 118:9]

 310 │ 101 │ items: [],
 311 │ 102 │ 						equipment: {
 312 │ 103 │ 							head: null,
 313 │ 104 │ 							body: null,
 314 │ 105 │ 							pants: null,
 315 │ 106 │ 							"main-weapon": null,
 316 │ 107 │ 							"second-weapon": null,
 317 │ 108 │ 						},
 318 │ 109 │ 					},
 319 │ 110 │ 				},
 320 │ 111 │ 				placeInventory: {
 321 │ 112 │ 					village_center: {
 322 │ 113 │ 						id: "village_center",
 323 │ 114 │ 						type: "place",
 324 │ 115 │ 						maxSlots: 30,
 325 │ 116 │ 						items: [
 326 │ 117 │ 							{
 327 │ 118 │ 								id: "heavy"

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [351:4 - 376:2] (25 lines, 158 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [32:4 - 58:15]

 351 │ 32 │ const playerState = {
 352 │ 33 │ 				playerInventory: {
 353 │ 34 │ 					player: {
 354 │ 35 │ 						id: "player",
 355 │ 36 │ 						type: "player",
 356 │ 37 │ 						maxSlots: 20,
 357 │ 38 │ 						maxWeight: 100,
 358 │ 39 │ 						items: [
 359 │ 40 │ 							{
 360 │ 41 │ 								id: "apple1",
 361 │ 42 │ 								name: "apple",
 362 │ 43 │ 								type: "consumable",
 363 │ 44 │ 								quantity: 5,
 364 │ 45 │ 								weight: 0.5,
 365 │ 46 │ 							},
 366 │ 47 │ 						],
 367 │ 48 │ 						equipment: {
 368 │ 49 │ 							head: null,
 369 │ 50 │ 							body: null,
 370 │ 51 │ 							pants: null,
 371 │ 52 │ 							"main-weapon": null,
 372 │ 53 │ 							"second-weapon": null,
 373 │ 54 │ 						},
 374 │ 55 │ 					},
 375 │ 56 │ 				},
 376 │ 57 │ 				placeInventory: {}

Clone found (javascript):
 - /github/workspace/_test_/enemiesSlice.test.js [89:57 - 98:6] (9 lines, 110 tokens)
   /github/workspace/_test_/enemiesSlice.test.js [52:37 - 61:2]

 89 │ 52 │ , () => {
 90 │ 53 │ 		let s = enemiesReducer(
 91 │ 54 │ 			state,
 92 │ 55 │ 			addEnemy({ placeId: "p1", enemy: { id: "e1", health: 1 } }),
 93 │ 56 │ 		);
 94 │ 57 │ 		s = enemiesReducer(
 95 │ 58 │ 			s,
 96 │ 59 │ 			addEnemy({ placeId: "p2", enemy: { id: "e2", health: 1 } }),
 97 │ 60 │ 		);
 98 │ 61 │ 		const

Clone found (javascript):
 - /github/workspace/_test_/enemiesSlice.test.js [165:47 - 185:9] (20 lines, 135 tokens)
   /github/workspace/_test_/enemiesSlice.test.js [104:67 - 124:12]

 165 │ 104 │ , () => {
 166 │ 105 │ 			let s = enemiesReducer(
 167 │ 106 │ 				state,
 168 │ 107 │ 				addEnemy({
 169 │ 108 │ 					placeId: "test_place",
 170 │ 109 │ 					enemy: {
 171 │ 110 │ 						id: "enemy1",
 172 │ 111 │ 						health: 50,
 173 │ 112 │ 						attackPattern: "staggered",
 174 │ 113 │ 						attackDelayRange: [2000, 5000],
 175 │ 114 │ 					},
 176 │ 115 │ 				}),
 177 │ 116 │ 			);
 178 │ 117 │ 			s = enemiesReducer(
 179 │ 118 │ 				s,
 180 │ 119 │ 				addEnemy({
 181 │ 120 │ 					placeId: "test_place",
 182 │ 121 │ 					enemy: {
 183 │ 122 │ 						id: "enemy2",
 184 │ 123 │ 						health: 30,
 185 │ 124 │ 						attackPattern: "normal"

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [126:5 - 140:59] (14 lines, 79 tokens)
   /github/workspace/_test_/combatService.test.js [111:2 - 125:35]

 126 │ 111 │ ;
 127 │ 112 │
 128 │ 113 │ 		const enemy = {
 129 │ 114 │ 			id: "enemy1",
 130 │ 115 │ 			maxHealth: 10,
 131 │ 116 │ 		};
 132 │ 117 │
 133 │ 118 │ 		CombatService.handleEnemyDrops(enemy);
 134 │ 119 │
 135 │ 120 │ 		expect(mockStore.dispatch).not.toHaveBeenCalledWith(
 136 │ 121 │ 			addItem(expect.any(Object)),
 137 │ 122 │ 		);
 138 │ 123 │ 	});
 139 │ 124 │
 140 │ 125 │ 	it("should register combat system with correct configuration"

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [140:59 - 160:9] (20 lines, 113 tokens)
   /github/workspace/_test_/combatService.test.js [66:49 - 86:3]

 140 │ 66 │ , () => {
 141 │ 67 │ 		const wasInCombat = false;
 142 │ 68 │ 		const isInCombat = true;
 143 │ 69 │
 144 │ 70 │ 		CombatService.handleCombatStateChange(
 145 │ 71 │ 			wasInCombat,
 146 │ 72 │ 			isInCombat,
 147 │ 73 │ 			mockGameLoop,
 148 │ 74 │ 		);
 149 │ 75 │
 150 │ 76 │ 		expect(mockGameLoop.register).toHaveBeenCalledWith(
 151 │ 77 │ 			"combat",
 152 │ 78 │ 			expect.any(Function),
 153 │ 79 │ 			{
 154 │ 80 │ 				priority: 0, // Highest priority
 155 │ 81 │ 				interval: 100, // Every 100ms
 156 │ 82 │ 			},
 157 │ 83 │ 		);
 158 │ 84 │ 	});
 159 │ 85 │
 160 │ 86 │ 	describe

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [162:2 - 182:7] (20 lines, 128 tokens)
   /github/workspace/_test_/combatService.test.js [14:2 - 34:2]

 162 │ 14 │ {
 163 │ 15 │ 				places: {
 164 │ 16 │ 					currentPlaceId: "village_center",
 165 │ 17 │ 					village_center: {
 166 │ 18 │ 						spawn: {
 167 │ 19 │ 							drops: [
 168 │ 20 │ 								{ itemId: "apple", dropRate: 0.5 },
 169 │ 21 │ 								{ itemId: "wood", dropRate: 0.3 },
 170 │ 22 │ 							],
 171 │ 23 │ 						},
 172 │ 24 │ 					},
 173 │ 25 │ 				},
 174 │ 26 │ 				enemies: {
 175 │ 27 │ 					byId: {
 176 │ 28 │ 						enemy1: {
 177 │ 29 │ 							id: "enemy1",
 178 │ 30 │ 							placeId: "village_center",
 179 │ 31 │ 						},
 180 │ 32 │ 					},
 181 │ 33 │ 				},
 182 │ 34 │ 				player

Found 41 clones.
Error: ERROR: jscpd found too many duplicates (4.57%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (4.57%) over threshold (0%)
```

</details>
