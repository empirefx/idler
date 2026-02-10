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

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/21873372084)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_LINT</summary>

```text
The number of diagnostics exceeds the limit allowed. Use --max-diagnostics to increase it.
Diagnostics not shown: 42.
Checked 103 files in 818ms. No fixes applied.
Found 36 errors.
Found 26 warnings.src/ui/components/common/NewLevelDialog.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │
    3 │ // Modal-style dialog for level-up choices

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/common/Notification.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━

  ! These imports are unused.

  > 1 │ import React, { useEffect } from "react";
      │        ^^^^^
    2 │ import { useDispatch } from "react-redux";
    3 │ import { removeNotification } from "../../../store/slices/notificationSlice";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React,·{·useEffect·}·from·"react";
      │        -------

src/ui/components/common/NotificationContainer.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │ import { useSelector } from "react-redux";
    3 │ import Notification from "./Notification";

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/common/ProgressBar.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │
    3 │ const ProgressBar = ({ value, max }) => {

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/common/QuantitySlider.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │
    3 │ function QuantitySlider({

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/common/ToolTip.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │
    3 │ const ToolTip = ({ text }) => {

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/display/ControlDisplay.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │
    3 │ const ControlDisplay = ({ isInCombat, onToggleCombat }) => (

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

src/ui/components/display/EquipmentDisplay.js:1:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━

  ! This import is unused.

  > 1 │ import React from "react";
      │        ^^^^^
    2 │ import { useDispatch, useSelector } from "react-redux";
    3 │ import {

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

    1 │ import·React·from·"react";
      │ --------------------------

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

src/ui/components/common/NewLevelDialog.js:5:2 lint/a11y/noStaticElementInteractions ━━━━━━━━━━━━━━━

  × Static Elements should not be interactive.

    3 │ // Modal-style dialog for level-up choices
    4 │ const NewLevelDialog = ({ onChoose, onCancel }) => (
  > 5 │ 	<div className="dialog" onClick={onCancel}>
      │ 	^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    6 │ 		<p>Choose bonus:</p>
    7 │ 		<div className="player-options" onClick={(e) => e.stopPropagation()}>

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/common/NewLevelDialog.js:5:2 lint/a11y/useKeyWithClickEvents ━━━━━━━━━━━━━━━━━━━━━

  × Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.

    3 │ // Modal-style dialog for level-up choices
    4 │ const NewLevelDialog = ({ onChoose, onCancel }) => (
  > 5 │ 	<div className="dialog" onClick={onCancel}>
      │ 	^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    6 │ 		<p>Choose bonus:</p>
    7 │ 		<div className="player-options" onClick={(e) => e.stopPropagation()}>

  i Actions triggered using mouse events should have corresponding keyboard events to account for keyboard-only navigation.


src/ui/components/common/NewLevelDialog.js:7:3 lint/a11y/useKeyWithClickEvents ━━━━━━━━━━━━━━━━━━━━━

  × Enforce to have the onClick mouse event with the onKeyUp, the onKeyDown, or the onKeyPress keyboard event.

    5 │ 	<div className="dialog" onClick={onCancel}>
    6 │ 		<p>Choose bonus:</p>
  > 7 │ 		<div className="player-options" onClick={(e) => e.stopPropagation()}>
      │ 		^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    8 │ 			<button className="select-btn" onClick={() => onChoose({ strength: 1 })}>
    9 │ 				+1 STR

  i Actions triggered using mouse events should have corresponding keyboard events to account for keyboard-only navigation.


src/ui/components/common/NewLevelDialog.js:7:3 lint/a11y/noStaticElementInteractions ━━━━━━━━━━━━━━━

  × Static Elements should not be interactive.

    5 │ 	<div className="dialog" onClick={onCancel}>
    6 │ 		<p>Choose bonus:</p>
  > 7 │ 		<div className="player-options" onClick={(e) => e.stopPropagation()}>
      │ 		^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    8 │ 			<button className="select-btn" onClick={() => onChoose({ strength: 1 })}>
    9 │ 				+1 STR

  i To add interactivity such as a mouse or key event listener to a static element, give the element an appropriate role value.


src/ui/components/common/Notification.js:39:4 lint/a11y/noNoninteractiveTabindex  FIXABLE  ━━━━━━━━━━

  × The HTML element div is non-interactive. Do not use tabIndex.

    37 │ 			}}
    38 │ 			role="alert"
  > 39 │ 			tabIndex={0}
       │ 			^^^^^^^^^^^^
    40 │ 		>
    41 │ 			<span className="notification-message">{message}</span>

  i Adding non-interactive elements to the keyboard navigation flow can confuse users.

  i Unsafe fix: Remove the tabIndex attribute.

    37 37 │   			}}
    38 38 │   			role="alert"
    39    │ - → → → tabIndex={0}
    40 39 │   		>
    41 40 │   			<span className="notification-message">{message}</span>


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
 - /github/workspace/src/store/slices/placeInventorySlice.js [55:15 - 72:36] (17 lines, 138 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [89:17 - 106:37]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [73:3 - 81:31] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [107:3 - 115:32]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [81:31 - 97:55] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [115:32 - 131:56]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [98:3 - 122:39] (24 lines, 209 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [132:3 - 156:40]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [246:2 - 252:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [238:2 - 242:7]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [100:4 - 119:34] (19 lines, 171 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [53:4 - 106:37]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [120:3 - 128:29] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [107:3 - 115:32]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [128:29 - 144:53] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [115:32 - 131:56]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [148:4 - 166:37] (18 lines, 166 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [138:4 - 156:40]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [192:6 - 209:16] (17 lines, 115 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [240:9 - 257:10]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [253:24 - 261:24] (8 lines, 91 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [239:26 - 247:26]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [260:2 - 266:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/npcInventorySlice.js [252:2 - 256:7]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [261:24 - 270:18] (9 lines, 113 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [247:26 - 256:20]

Clone found (json):
 - /github/workspace/_test_/fixtures/gameStates/testStates.json [53:5 - 77:2] (24 lines, 148 tokens)
   /github/workspace/_test_/fixtures/gameStates/testStates.json [6:2 - 29:2]

Clone found (json):
 - /github/workspace/_test_/fixtures/gameStates/testStates.json [108:9 - 128:2] (20 lines, 109 tokens)
   /github/workspace/_test_/fixtures/gameStates/testStates.json [13:2 - 32:2]

Clone found (javascript):
 - /github/workspace/src/data/inventory.js [2:2 - 47:15] (45 lines, 301 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [17:2 - 62:2]

Clone found (javascript):
 - /github/workspace/src/data/inventory.js [47:2 - 76:7] (29 lines, 184 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [10:2 - 39:6]

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
 - /github/workspace/src/store/slices/placeInventorySlice.js [55:15 - 72:36] (17 lines, 138 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [89:17 - 106:37]

 55 │ 89  │ .message);
 56 │ 90  │ 				return;
 57 │ 91  │ 			}
 58 │ 92  │
 59 │ 93  │ 			// Try to stack with existing items
 60 │ 94  │ 			const existingItem = inventory.items.find((i) => canItemsStack(i, item));
 61 │ 95  │ 			if (existingItem && item.quantity) {
 62 │ 96  │ 				existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
 63 │ 97  │ 			} else {
 64 │ 98  │ 				// Add new item
 65 │ 99  │ 				inventory.items.push({
 66 │ 100 │ 					...cloneItem(item),
 67 │ 101 │ 					quantity: item.quantity || 1,
 68 │ 102 │ 				});
 69 │ 103 │ 			}
 70 │ 104 │ 		},
 71 │ 105 │
 72 │ 106 │ 		// Remove item from place inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [73:3 - 81:31] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [107:3 - 115:32]

 73 │ 107 │ removeItem(state, action) {
 74 │ 108 │ 			const { inventoryId, itemId, quantity } = action.payload;
 75 │ 109 │ 			const inventory = state[inventoryId];
 76 │ 110 │ 			if (!inventory) return;
 77 │ 111 │
 78 │ 112 │ 			const itemValidation = validateItemExists(inventory, itemId);
 79 │ 113 │ 			if (!itemValidation.isValid) {
 80 │ 114 │ 				console.warn(
 81 │ 115 │ 					`Item ${itemId} not found in place inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [81:31 - 97:55] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [115:32 - 131:56]

 81 │ 115 │ ${inventoryId}`,
 82 │ 116 │ 				);
 83 │ 117 │ 				return;
 84 │ 118 │ 			}
 85 │ 119 │
 86 │ 120 │ 			const itemIndex = itemValidation.itemIndex;
 87 │ 121 │ 			const item = inventory.items[itemIndex];
 88 │ 122 │ 			const removeQuantity = quantity || item.quantity || 1;
 89 │ 123 │
 90 │ 124 │ 			if (removeQuantity >= (item.quantity || 1)) {
 91 │ 125 │ 				inventory.items.splice(itemIndex, 1);
 92 │ 126 │ 			} else {
 93 │ 127 │ 				item.quantity -= removeQuantity;
 94 │ 128 │ 			}
 95 │ 129 │ 		},
 96 │ 130 │
 97 │ 131 │ 		// Move item from place inventory to another inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [98:3 - 122:39] (24 lines, 209 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [132:3 - 156:40]

 98  │ 132 │ moveItem(state, action) {
 99  │ 133 │ 			const { fromInventoryId, itemId, quantity } = action.payload;
 100 │ 134 │
 101 │ 135 │ 			// This is a complex operation that involves both slices
 102 │ 136 │ 			// The actual move logic will be handled by a thunk
 103 │ 137 │ 			// This reducer just updates the local state
 104 │ 138 │ 			const inventory = state[fromInventoryId];
 105 │ 139 │ 			if (!inventory) return;
 106 │ 140 │
 107 │ 141 │ 			const itemValidation = validateItemExists(inventory, itemId);
 108 │ 142 │ 			if (!itemValidation.isValid) return;
 109 │ 143 │
 110 │ 144 │ 			const itemIndex = itemValidation.itemIndex;
 111 │ 145 │ 			const item = inventory.items[itemIndex];
 112 │ 146 │ 			const moveQuantity = quantity || item.quantity || 1;
 113 │ 147 │
 114 │ 148 │ 			// Update source inventory
 115 │ 149 │ 			if (moveQuantity < (item.quantity || 1)) {
 116 │ 150 │ 				item.quantity -= moveQuantity;
 117 │ 151 │ 			} else {
 118 │ 152 │ 				inventory.items.splice(itemIndex, 1);
 119 │ 153 │ 			}
 120 │ 154 │ 		},
 121 │ 155 │
 122 │ 156 │ 		// Update entire place inventory state

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [246:2 - 252:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [238:2 - 242:7]

 246 │ 238 │ = createSelector(
 247 │ 239 │ 	[selectPlaceInventoryItems, (_state, itemType) => itemType],
 248 │ 240 │ 	(items, itemType) => {
 249 │ 241 │ 		if (!Array.isArray(items)) return 0;
 250 │ 242 │ 		return items
 251 │ 243 │ 			.filter((item) => item.type === itemType)
 252 │ 244 │ 			.reduce

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [100:4 - 119:34] (19 lines, 171 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [53:4 - 106:37]

 100 │ 53 │ const slotValidation = validateSlotLimit(inventory, 1);
 101 │ 54 │ 			if (!slotValidation.isValid) {
 102 │ 55 │ 				console.warn(slotValidation.message);
 103 │ 56 │ 				return;
 104 │ 57 │ 			}
 105 │ 58 │
 106 │ 59 │ 			// Try to stack with existing items
 107 │ 60 │ 			const existingItem = inventory.items.find((i) => canItemsStack(i, item));
 108 │ 61 │ 			if (existingItem && item.quantity) {
 109 │ 62 │ 				existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
 110 │ 63 │ 			} else {
 111 │ 64 │ 				// Add new item
 112 │ 65 │ 				inventory.items.push({
 113 │ 66 │ 					...cloneItem(item),
 114 │ 67 │ 					quantity: item.quantity || 1,
 115 │ 68 │ 				});
 116 │ 69 │ 			}
 117 │ 70 │ 		},
 118 │ 71 │
 119 │ 72 │ 		// Remove item from NPC inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [120:3 - 128:29] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [107:3 - 115:32]

 120 │ 107 │ removeItem(state, action) {
 121 │ 108 │ 			const { inventoryId, itemId, quantity } = action.payload;
 122 │ 109 │ 			const inventory = state[inventoryId];
 123 │ 110 │ 			if (!inventory) return;
 124 │ 111 │
 125 │ 112 │ 			const itemValidation = validateItemExists(inventory, itemId);
 126 │ 113 │ 			if (!itemValidation.isValid) {
 127 │ 114 │ 				console.warn(
 128 │ 115 │ 					`Item ${itemId} not found in NPC inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [128:29 - 144:53] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [115:32 - 131:56]

 128 │ 115 │ ${inventoryId}`,
 129 │ 116 │ 				);
 130 │ 117 │ 				return;
 131 │ 118 │ 			}
 132 │ 119 │
 133 │ 120 │ 			const itemIndex = itemValidation.itemIndex;
 134 │ 121 │ 			const item = inventory.items[itemIndex];
 135 │ 122 │ 			const removeQuantity = quantity || item.quantity || 1;
 136 │ 123 │
 137 │ 124 │ 			if (removeQuantity >= (item.quantity || 1)) {
 138 │ 125 │ 				inventory.items.splice(itemIndex, 1);
 139 │ 126 │ 			} else {
 140 │ 127 │ 				item.quantity -= removeQuantity;
 141 │ 128 │ 			}
 142 │ 129 │ 		},
 143 │ 130 │
 144 │ 131 │ 		// Move item from NPC inventory to another inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [148:4 - 166:37] (18 lines, 166 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [138:4 - 156:40]

 148 │ 138 │ const inventory = state[fromInventoryId];
 149 │ 139 │ 			if (!inventory) return;
 150 │ 140 │
 151 │ 141 │ 			const itemValidation = validateItemExists(inventory, itemId);
 152 │ 142 │ 			if (!itemValidation.isValid) return;
 153 │ 143 │
 154 │ 144 │ 			const itemIndex = itemValidation.itemIndex;
 155 │ 145 │ 			const item = inventory.items[itemIndex];
 156 │ 146 │ 			const moveQuantity = quantity || item.quantity || 1;
 157 │ 147 │
 158 │ 148 │ 			// Update source inventory
 159 │ 149 │ 			if (moveQuantity < (item.quantity || 1)) {
 160 │ 150 │ 				item.quantity -= moveQuantity;
 161 │ 151 │ 			} else {
 162 │ 152 │ 				inventory.items.splice(itemIndex, 1);
 163 │ 153 │ 			}
 164 │ 154 │ 		},
 165 │ 155 │
 166 │ 156 │ 		// Update entire NPC inventory state

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [192:6 - 209:16] (17 lines, 115 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [240:9 - 257:10]

 192 │ 240 │ ) {
 193 │ 241 │ 				if (typeof maxSlots === "number" && maxSlots > 0) {
 194 │ 242 │ 					inventory.maxSlots = maxSlots;
 195 │ 243 │ 				}
 196 │ 244 │ 				if (typeof maxWeight === "number" && maxWeight > 0) {
 197 │ 245 │ 					inventory.maxWeight = maxWeight;
 198 │ 246 │ 				}
 199 │ 247 │ 			}
 200 │ 248 │ 		},
 201 │ 249 │ 	},
 202 │ 250 │ });
 203 │ 251 │
 204 │ 252 │ export const {
 205 │ 253 │ 	addItem,
 206 │ 254 │ 	removeItem,
 207 │ 255 │ 	moveItem,
 208 │ 256 │ 	updateInventory,
 209 │ 257 │ 	addNpcInventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [253:24 - 261:24] (8 lines, 91 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [239:26 - 247:26]

 253 │ 239 │ , (_state, itemType) => itemType],
 254 │ 240 │ 	(items, itemType) => {
 255 │ 241 │ 		if (!Array.isArray(items)) return 0;
 256 │ 242 │ 		return items.filter((item) => item.type === itemType).length;
 257 │ 243 │ 	},
 258 │ 244 │ );
 259 │ 245 │
 260 │ 246 │ export const selectTotalQuantityByItemType = createSelector(
 261 │ 247 │ 	[selectNpcInventoryItems

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [260:2 - 266:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/npcInventorySlice.js [252:2 - 256:7]

 260 │ 252 │ = createSelector(
 261 │ 253 │ 	[selectNpcInventoryItems, (_state, itemType) => itemType],
 262 │ 254 │ 	(items, itemType) => {
 263 │ 255 │ 		if (!Array.isArray(items)) return 0;
 264 │ 256 │ 		return items
 265 │ 257 │ 			.filter((item) => item.type === itemType)
 266 │ 258 │ 			.reduce

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [261:24 - 270:18] (9 lines, 113 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [247:26 - 256:20]

 261 │ 247 │ , (_state, itemType) => itemType],
 262 │ 248 │ 	(items, itemType) => {
 263 │ 249 │ 		if (!Array.isArray(items)) return 0;
 264 │ 250 │ 		return items
 265 │ 251 │ 			.filter((item) => item.type === itemType)
 266 │ 252 │ 			.reduce((total, item) => total + (item.quantity || 1), 0);
 267 │ 253 │ 	},
 268 │ 254 │ );
 269 │ 255 │
 270 │ 256 │ export default npcInventorySlice

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
   /github/workspace/src/store/slices/playerInventorySlice.js [17:2 - 62:2]

 2  │ 17 │ = {
 3  │ 18 │ 	player: {
 4  │ 19 │ 		id: "player",
 5  │ 20 │ 		type: "player",
 6  │ 21 │ 		playerId: "1",
 7  │ 22 │ 		maxSlots: 20,
 8  │ 23 │ 		maxWeight: 100,
 9  │ 24 │ 		items: [
 10 │ 25 │ 			{
 11 │ 26 │ 				id: 1,
 12 │ 27 │ 				name: "apple",
 13 │ 28 │ 				description: "A fresh apple",
 14 │ 29 │ 				type: "consumable",
 15 │ 30 │ 				quantity: 5,
 16 │ 31 │ 				weight: 0.5,
 17 │ 32 │ 				consumable: { heal: 10 },
 18 │ 33 │ 			},
 19 │ 34 │ 			{
 20 │ 35 │ 				id: "leather-hood",
 21 │ 36 │ 				name: "rusty armor",
 22 │ 37 │ 				description: "A sturdy piece of armor",
 23 │ 38 │ 				type: "equipment",
 24 │ 39 │ 				piece: "body",
 25 │ 40 │ 				quantity: 1,
 26 │ 41 │ 				stats: { defense: 10 },
 27 │ 42 │ 				weight: 15,
 28 │ 43 │ 			},
 29 │ 44 │ 			{
 30 │ 45 │ 				id: 2,
 31 │ 46 │ 				name: "banana",
 32 │ 47 │ 				description: "A ripe banana",
 33 │ 48 │ 				type: "consumable",
 34 │ 49 │ 				quantity: 3,
 35 │ 50 │ 				weight: 0.5,
 36 │ 51 │ 				consumable: { heal: 12 },
 37 │ 52 │ 			},
 38 │ 53 │ 		],
 39 │ 54 │ 		equipment: {
 40 │ 55 │ 			head: null,
 41 │ 56 │ 			body: null,
 42 │ 57 │ 			pants: null,
 43 │ 58 │ 			"main-weapon": null,
 44 │ 59 │ 			"second-weapon": null,
 45 │ 60 │ 		},
 46 │ 61 │ 	},
 47 │ 62 │ 	village_center

Clone found (javascript):
 - /github/workspace/src/data/inventory.js [47:2 - 76:7] (29 lines, 184 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [10:2 - 39:6]

 47 │ 10 │ village_center: {
 48 │ 11 │ 		id: "village_center",
 49 │ 12 │ 		placeId: "village_center",
 50 │ 13 │ 		type: "place",
 51 │ 14 │ 		maxSlots: 30,
 52 │ 15 │ 		items: [
 53 │ 16 │ 			{
 54 │ 17 │ 				id: 1,
 55 │ 18 │ 				name: "apple",
 56 │ 19 │ 				description: "A fresh apple",
 57 │ 20 │ 				type: "consumable",
 58 │ 21 │ 				quantity: 10,
 59 │ 22 │ 				weight: 0.5,
 60 │ 23 │ 				consumable: { heal: 10 },
 61 │ 24 │ 			},
 62 │ 25 │ 			{
 63 │ 26 │ 				id: "leather-hood",
 64 │ 27 │ 				name: "rusty armor",
 65 │ 28 │ 				description: "A sturdy piece of armor",
 66 │ 29 │ 				type: "equipment",
 67 │ 30 │ 				piece: "body",
 68 │ 31 │ 				quantity: 1,
 69 │ 32 │ 				stats: { defense: 12 },
 70 │ 33 │ 				weight: 18,
 71 │ 34 │ 			},
 72 │ 35 │ 		],
 73 │ 36 │ 	},
 74 │ 37 │ };
 75 │ 38 │
 76 │ 39 │ export

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
Error: ERROR: jscpd found too many duplicates (4.56%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (4.56%) over threshold (0%)
```

</details>
