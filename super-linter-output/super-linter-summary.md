# Super-linter summary

| Language                   | Validation result |
| -------------------------- | ----------------- |
| BIOME_FORMAT               | Fail ❌           |
| BIOME_LINT                 | Fail ❌           |
| CHECKOV                    | Pass ✅           |
| CSS                        | Fail ❌           |
| CSS_PRETTIER               | Pass ✅           |
| GITHUB_ACTIONS             | Pass ✅           |
| GITHUB_ACTIONS_ZIZMOR      | Fail ❌           |
| GITLEAKS                   | Pass ✅           |
| GIT_MERGE_CONFLICT_MARKERS | Pass ✅           |
| HTML                       | Fail ❌           |
| HTML_PRETTIER              | Pass ✅           |
| JAVASCRIPT_ES              | Fail ❌           |
| JAVASCRIPT_PRETTIER        | Pass ✅           |
| JSCPD                      | Fail ❌           |
| JSON                       | Fail ❌           |
| JSON_PRETTIER              | Fail ❌           |
| JSX                        | Fail ❌           |
| JSX_PRETTIER               | Fail ❌           |
| MARKDOWN                   | Fail ❌           |
| MARKDOWN_PRETTIER          | Pass ✅           |
| NATURAL_LANGUAGE           | Fail ❌           |
| PRE_COMMIT                 | Pass ✅           |
| SPELL_CODESPELL            | Pass ✅           |
| TRIVY                      | Pass ✅           |
| YAML                       | Pass ✅           |
| YAML_PRETTIER              | Fail ❌           |

Super-linter detected linting errors

For more information, see the [GitHub Actions workflow run](https://github.com/empirefx/idler/actions/runs/21784972591)

Powered by [Super-linter](https://github.com/super-linter/super-linter)

<details>

<summary>BIOME_FORMAT</summary>

```text
Formatted 141 files in 365ms. Fixed 139 files.
Found 5 errors._test_/fixtures/gameStates/testStates.json:49:32 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × unexpected character `(`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                ^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5


_test_/fixtures/gameStates/testStates.json:49:33 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × unexpected character `)`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                 ^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5


_test_/fixtures/gameStates/testStates.json:49:35 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × unexpected character `=`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                   ^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5


_test_/fixtures/gameStates/testStates.json:49:36 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × unexpected character `>`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                    ^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5


_test_/fixtures/gameStates/testStates.json:49:38 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × expected `,` but instead found `10`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                      ^^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5

  i Remove 10


_test_/fixtures/gameStates/testStates.json format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Code formatting aborted due to parsing errors. To format code with errors, enable the 'formatter.formatWithErrors' option.


format ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some errors were emitted while running checks.

```

</details>

<details>

<summary>BIOME_LINT</summary>

```text
The number of diagnostics exceeds the limit allowed. Use --max-diagnostics to increase it.
Diagnostics not shown: 184.
Checked 145 files in 1331ms. No fixes applied.
Found 71 errors.
Found 121 warnings.
Found 12 infos._test_/enemiesSlice.test.js:29:24 lint/complexity/useLiteralKeys  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━━

  i The computed expression can be simplified without the use of a string literal.

    27 │ 		const newState = enemiesReducer(state, addEnemy({ placeId, enemy }));
    28 │
  > 29 │ 		expect(newState.byId["e1"]).toEqual({
       │ 		                     ^^^^
    30 │ 			...enemy,
    31 │ 			placeId,

  i Unsafe fix: Use a literal key instead.

     27  27 │   		const newState = enemiesReducer(state, addEnemy({ placeId, enemy }));
     28  28 │
     29     │ - → → expect(newState.byId["e1"]).toEqual({
         29 │ + → → expect(newState.byId.e1).toEqual({
     30  30 │   			...enemy,
     31  31 │   			placeId,


_test_/enemiesSlice.test.js:74:17 lint/complexity/useLiteralKeys  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━━

  i The computed expression can be simplified without the use of a string literal.

    72 │ 		);
    73 │ 		s = enemiesReducer(s, damageEnemy({ id: "e1", amount: 3 }));
  > 74 │ 		expect(s.byId["e1"].health).toBe(2);
       │ 		              ^^^^
    75 │ 		s = enemiesReducer(s, damageEnemy({ id: "e1", amount: 5 }));
    76 │ 		expect(s.byId).not.toHaveProperty("e1");

  i Unsafe fix: Use a literal key instead.

     72  72 │   		);
     73  73 │   		s = enemiesReducer(s, damageEnemy({ id: "e1", amount: 3 }));
     74     │ - → → expect(s.byId["e1"].health).toBe(2);
         74 │ + → → expect(s.byId.e1.health).toBe(2);
     75  75 │   		s = enemiesReducer(s, damageEnemy({ id: "e1", amount: 5 }));
     76  76 │   		expect(s.byId).not.toHaveProperty("e1");


_test_/enemiesSlice.test.js:86:32 lint/complexity/useLiteralKeys  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━━

  i The computed expression can be simplified without the use of a string literal.

    84 │ 		);
    85 │ 		const list = selectAllEnemies({ enemies: s });
  > 86 │ 		expect(list).toEqual([s.byId["e1"]]);
       │ 		                             ^^^^
    87 │ 	});
    88 │

  i Unsafe fix: Use a literal key instead.

     84  84 │   		);
     85  85 │   		const list = selectAllEnemies({ enemies: s });
     86     │ - → → expect(list).toEqual([s.byId["e1"]]);
         86 │ + → → expect(list).toEqual([s.byId.e1]);
     87  87 │   	});
     88  88 │


_test_/enemiesSlice.test.js:100:32 lint/complexity/useLiteralKeys  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━

  i The computed expression can be simplified without the use of a string literal.

     98 │ 		const globalState = { enemies: s, places: { currentPlaceId: "p1" } };
     99 │ 		const list = selectEnemiesForCurrentPlace(globalState);
  > 100 │ 		expect(list).toEqual([s.byId["e1"]]);
        │ 		                             ^^^^
    101 │ 	});
    102 │

  i Unsafe fix: Use a literal key instead.

     98  98 │   		const globalState = { enemies: s, places: { currentPlaceId: "p1" } };
     99  99 │   		const list = selectEnemiesForCurrentPlace(globalState);
    100     │ - → → expect(list).toEqual([s.byId["e1"]]);
        100 │ + → → expect(list).toEqual([s.byId.e1]);
    101 101 │   	});
    102 102 │


_test_/integration/gameEngine.integration.test.js:95:43 lint/complexity/useLiteralKeys  FIXABLE  ━━━━━━━━━━

  i The computed expression can be simplified without the use of a string literal.

    93 │ 			// Verify the production cycle ran without errors
    94 │ 			const state = store.getState();
  > 95 │ 			const inventory = state.placeInventory["village_center"];
       │ 			                                       ^^^^^^^^^^^^^^^^
    96 │
    97 │ 			expect(inventory).toBeDefined();

  i Unsafe fix: Use a literal key instead.

     93  93 │   			// Verify the production cycle ran without errors
     94  94 │   			const state = store.getState();
     95     │ - → → → const·inventory·=·state.placeInventory["village_center"];
         95 │ + → → → const·inventory·=·state.placeInventory.village_center;
     96  96 │
     97  97 │   			expect(inventory).toBeDefined();


_test_/integration/gameEngine.integration.test.js:139:22 lint/complexity/useLiteralKeys  FIXABLE  ━━━━━━━━━━

  i The computed expression can be simplified without the use of a string literal.

    137 │ 			// Verify enemy still exists (enemies persist across navigation)
    138 │ 			const enemyState = store.getState().enemies.byId;
  > 139 │ 			expect(enemyState["test_enemy"]).toBeDefined();
        │ 			                  ^^^^^^^^^^^^
    140 │ 			expect(enemyState["test_enemy"].placeId).toBe("village_center");
    141 │

  i Unsafe fix: Use a literal key instead.

    137 137 │   			// Verify enemy still exists (enemies persist across navigation)
    138 138 │   			const enemyState = store.getState().enemies.byId;
    139     │ - → → → expect(enemyState["test_enemy"]).toBeDefined();
        139 │ + → → → expect(enemyState.test_enemy).toBeDefined();
    140 140 │   			expect(enemyState["test_enemy"].placeId).toBe("village_center");
    141 141 │


_test_/combatService.staggered.test.js:3:8 lint/correctness/noUnusedImports  FIXABLE  ━━━━━━━━━━━━━━

  ! This import is unused.

    1 │ import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
    2 │ import { CombatService } from "../src/game/services/CombatService";
  > 3 │ import { placesData } from "../src/data/places";
      │        ^^^^^^^^^^^^^^
    4 │
    5 │ describe("CombatService Staggered Attack Tests", () => {

  i Unused imports might be the result of an incomplete refactoring.

  i Unsafe fix: Remove the unused imports.

      1   1 │   import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
      2   2 │   import { CombatService } from "../src/game/services/CombatService";
      3     │ - import·{·placesData·}·from·"../src/data/places";
      4   3 │
      5   4 │   describe("CombatService Staggered Attack Tests", () => {


_test_/combatService.staggered.test.js:9:6 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━━━

  ! This variable mockGameLoop is unused.

     7 │ 	let mockStore;
     8 │ 	let mockEventBusService;
   > 9 │ 	let mockGameLoop;
       │ 	    ^^^^^^^^^^^^
    10 │
    11 │ 	beforeEach(() => {

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.

  i Unsafe fix: If this is intentional, prepend mockGameLoop with an underscore.

      7   7 │   	let mockStore;
      8   8 │   	let mockEventBusService;
      9     │ - → let·mockGameLoop;
          9 │ + → let·_mockGameLoop;
     10  10 │
     11  11 │   	beforeEach(() => {
    ······· │
     22  22 │
     23  23 │   		// Mock game loop
     24     │ - → → mockGameLoop·=·{
         24 │ + → → _mockGameLoop·=·{
     25  25 │   			register: vi.fn(),
     26  26 │   		};


_test_/combatService.staggered.test.js:62:10 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━

  ! This variable currentTime is unused.

    61 │ 		it("should handle enemies ready to attack", () => {
  > 62 │ 			const currentTime = Date.now();
       │ 			      ^^^^^^^^^^^
    63 │ 			const enemies = [
    64 │ 				{

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.

  i Unsafe fix: If this is intentional, prepend currentTime with an underscore.

     60  60 │
     61  61 │   		it("should handle enemies ready to attack", () => {
     62     │ - → → → const·currentTime·=·Date.now();
         62 │ + → → → const·_currentTime·=·Date.now();
     63  63 │   			const enemies = [
     64  64 │   				{


_test_/eventSystem.test.js:49:6 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━

  ! This variable consoleSpy is unused.

    47 │ describe("Event System Logging", () => {
    48 │ 	let store;
  > 49 │ 	let consoleSpy;
       │ 	    ^^^^^^^^^^
    50 │
    51 │ 	beforeEach(() => {

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.

  i Unsafe fix: If this is intentional, prepend consoleSpy with an underscore.

     47  47 │   describe("Event System Logging", () => {
     48  48 │   	let store;
     49     │ - → let·consoleSpy;
         49 │ + → let·_consoleSpy;
     50  50 │
     51  51 │   	beforeEach(() => {
     52  52 │   		// Create fresh store with log middleware
     53  53 │   		store = configureTestStore();
     54     │ - → → consoleSpy·=·vi.spyOn(console,·"log").mockImplementation(()·=>·{});
         54 │ + → → _consoleSpy·=·vi.spyOn(console,·"log").mockImplementation(()·=>·{});
     55  55 │
     56  56 │   		// Clear existing logs


_test_/gameLoop.test.js:12:7 lint/complexity/useOptionalChain  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  ! Change to an optional chain.

    11 │ 	afterEach(() => {
  > 12 │ 		if (gameLoop && gameLoop.isActive()) {
       │ 		    ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    13 │ 			gameLoop.stop();
    14 │ 		}

  i Unsafe fix: Change to an optional chain.

     10  10 │
     11  11 │   	afterEach(() => {
     12     │ - → → if·(gameLoop·&&·gameLoop.isActive())·{
         12 │ + → → if·(gameLoop?.isActive())·{
     13  13 │   			gameLoop.stop();
     14  14 │   		}


static/avatar_test.html:419:16 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━━━

  ! This function changeSize is unused.

    418 │     <script>
  > 419 │       function changeSize(size) {
        │                ^^^^^^^^^^
    420 │         const avatars = document.querySelectorAll(".avatar");
    421 │         const buttons = document.querySelectorAll(".controls button");

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.

  i Unsafe fix: If this is intentional, prepend changeSize with an underscore.

     1  1 │
     2    │ - ······function·changeSize(size)·{
        2 │ + ······function·_changeSize(size)·{
     3  3 │           const avatars = document.querySelectorAll(".avatar");
     4  4 │           const buttons = document.querySelectorAll(".controls button");


static/portrait_test.html:523:16 lint/correctness/noUnusedVariables  FIXABLE  ━━━━━━━━━━━━━━━━━━━━━━

  ! This function changeSize is unused.

    522 │     <script>
  > 523 │       function changeSize(size) {
        │                ^^^^^^^^^^
    524 │         const portraits = document.querySelectorAll(".portrait");
    525 │         const buttons = document.querySelectorAll(".controls button");

  i Unused variables are often the result of typos, incomplete refactors, or other sources of bugs.

  i Unsafe fix: If this is intentional, prepend changeSize with an underscore.

     1  1 │
     2    │ - ······function·changeSize(size)·{
        2 │ + ······function·_changeSize(size)·{
     3  3 │           const portraits = document.querySelectorAll(".portrait");
     4  4 │           const buttons = document.querySelectorAll(".controls button");


_test_/fixtures/gameStates/testStates.json:49:32 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × unexpected character `(`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                ^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5


_test_/fixtures/gameStates/testStates.json:49:33 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × unexpected character `)`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                 ^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5


_test_/fixtures/gameStates/testStates.json:49:35 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × unexpected character `=`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                   ^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5


_test_/fixtures/gameStates/testStates.json:49:36 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × unexpected character `>`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                    ^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5


_test_/fixtures/gameStates/testStates.json:49:38 parse ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × expected `,` but instead found `10`

    47 │         "id": "sawmill",
    48 │         "name": "Sawmill",
  > 49 │         "calculateProduction": () => 10,
       │                                      ^^
    50 │         "productionType": "wood",
    51 │         "baseProductionRate": 5

  i Remove 10


static/avatar_test.html:430:17 lint/suspicious/useIterableCallbackReturn ━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × This callback passed to forEach() iterable method should not return a value.

    429 │         // Update active button
  > 430 │         buttons.forEach((btn) => btn.classList.remove("active"));
        │                 ^^^^^^^
    431 │         event.target.classList.add("active");
    432 │       }

  i Either remove this return or remove the returned value.

    429 │         // Update active button
  > 430 │         buttons.forEach((btn) => btn.classList.remove("active"));
        │                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    431 │         event.target.classList.add("active");
    432 │       }


static/portrait_test.html:541:17 lint/suspicious/useIterableCallbackReturn ━━━━━━━━━━━━━━━━━━━━━━━━━

  × This callback passed to forEach() iterable method should not return a value.

    540 │         // Update active button
  > 541 │         buttons.forEach((btn) => btn.classList.remove("active"));
        │                 ^^^^^^^
    542 │         event.target.classList.add("active");
    543 │       }

  i Either remove this return or remove the returned value.

    540 │         // Update active button
  > 541 │         buttons.forEach((btn) => btn.classList.remove("active"));
        │                                  ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    542 │         event.target.classList.add("active");
    543 │       }


lint ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  × Some warnings were emitted while running checks.

```

</details>

<details>

<summary>CSS</summary>

```text

src/styles/components/npc-dialog.css
  [2m34:12[22m  [31m[31m✖[39m  Expected keyframe name "slideUp" to be kebab-case  [2mkeyframes-name-pattern[22m

src/styles/global.css
   [2m32:1[22m   [31m[31m✖[39m  Expected class selector ".App" to be kebab-case                                                                         [2mselector-class-pattern[22m
  [2m107:1[22m   [31m[31m✖[39m  Expected class selector ".progress-bar__fill" to be kebab-case                                                          [2mselector-class-pattern[22m
  [2m118:1[22m   [31m[31m✖[39m  Expected class selector ".progress-bar__remain" to be kebab-case                                                        [2mselector-class-pattern[22m
  [2m126:15[22m  [31m[31m✖[39m  Expected class selector ".progress-bar__fill" to be kebab-case                                                          [2mselector-class-pattern[22m
  [2m127:15[22m  [31m[31m✖[39m  Expected class selector ".progress-bar__remain" to be kebab-case                                                        [2mselector-class-pattern[22m
  [2m131:15[22m  [31m[31m✖[39m  Expected class selector ".progress-bar__remain" to be kebab-case                                                        [2mselector-class-pattern[22m
  [2m135:1[22m   [31m[31m✖[39m  Expected selector ".progress-bar span" to come before selector ".progress-bar .progress-bar__remain span", at line 131  [2mno-descending-specificity[22m

src/styles/npc-avatars.css
   [2m31:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_1" to be kebab-case   [2mselector-class-pattern[22m
   [2m36:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_2" to be kebab-case   [2mselector-class-pattern[22m
   [2m41:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_3" to be kebab-case   [2mselector-class-pattern[22m
   [2m46:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_4" to be kebab-case   [2mselector-class-pattern[22m
   [2m51:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_5" to be kebab-case   [2mselector-class-pattern[22m
   [2m56:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_6" to be kebab-case   [2mselector-class-pattern[22m
   [2m62:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_7" to be kebab-case   [2mselector-class-pattern[22m
   [2m67:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_8" to be kebab-case   [2mselector-class-pattern[22m
   [2m72:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_9" to be kebab-case   [2mselector-class-pattern[22m
   [2m77:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_10" to be kebab-case  [2mselector-class-pattern[22m
   [2m82:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_11" to be kebab-case  [2mselector-class-pattern[22m
   [2m87:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_12" to be kebab-case  [2mselector-class-pattern[22m
   [2m93:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_13" to be kebab-case  [2mselector-class-pattern[22m
   [2m98:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_14" to be kebab-case  [2mselector-class-pattern[22m
  [2m103:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_15" to be kebab-case  [2mselector-class-pattern[22m
  [2m108:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_16" to be kebab-case  [2mselector-class-pattern[22m
  [2m113:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_17" to be kebab-case  [2mselector-class-pattern[22m
  [2m118:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_18" to be kebab-case  [2mselector-class-pattern[22m
  [2m124:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_19" to be kebab-case  [2mselector-class-pattern[22m
  [2m129:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_20" to be kebab-case  [2mselector-class-pattern[22m
  [2m134:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_21" to be kebab-case  [2mselector-class-pattern[22m
  [2m139:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_22" to be kebab-case  [2mselector-class-pattern[22m
  [2m144:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_23" to be kebab-case  [2mselector-class-pattern[22m
  [2m149:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_24" to be kebab-case  [2mselector-class-pattern[22m
  [2m155:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_25" to be kebab-case  [2mselector-class-pattern[22m
  [2m160:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_26" to be kebab-case  [2mselector-class-pattern[22m
  [2m165:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_27" to be kebab-case  [2mselector-class-pattern[22m
  [2m170:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_28" to be kebab-case  [2mselector-class-pattern[22m
  [2m175:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_29" to be kebab-case  [2mselector-class-pattern[22m
  [2m180:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_30" to be kebab-case  [2mselector-class-pattern[22m
  [2m186:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_31" to be kebab-case  [2mselector-class-pattern[22m
  [2m191:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_32" to be kebab-case  [2mselector-class-pattern[22m
  [2m196:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_33" to be kebab-case  [2mselector-class-pattern[22m
  [2m201:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_34" to be kebab-case  [2mselector-class-pattern[22m
  [2m206:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_35" to be kebab-case  [2mselector-class-pattern[22m
  [2m211:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_36" to be kebab-case  [2mselector-class-pattern[22m
  [2m217:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_37" to be kebab-case  [2mselector-class-pattern[22m
  [2m222:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_38" to be kebab-case  [2mselector-class-pattern[22m
  [2m227:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_39" to be kebab-case  [2mselector-class-pattern[22m
  [2m232:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_40" to be kebab-case  [2mselector-class-pattern[22m
  [2m237:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_41" to be kebab-case  [2mselector-class-pattern[22m
  [2m242:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_42" to be kebab-case  [2mselector-class-pattern[22m
  [2m248:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_43" to be kebab-case  [2mselector-class-pattern[22m
  [2m253:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_44" to be kebab-case  [2mselector-class-pattern[22m
  [2m258:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_45" to be kebab-case  [2mselector-class-pattern[22m
  [2m263:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_46" to be kebab-case  [2mselector-class-pattern[22m
  [2m268:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_47" to be kebab-case  [2mselector-class-pattern[22m
  [2m273:1[22m   [31m[31m✖[39m  Expected class selector ".avatar_48" to be kebab-case  [2mselector-class-pattern[22m
  [2m285:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_1" to be kebab-case   [2mselector-class-pattern[22m
  [2m289:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_2" to be kebab-case   [2mselector-class-pattern[22m
  [2m293:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_3" to be kebab-case   [2mselector-class-pattern[22m
  [2m297:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_4" to be kebab-case   [2mselector-class-pattern[22m
  [2m301:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_5" to be kebab-case   [2mselector-class-pattern[22m
  [2m305:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_6" to be kebab-case   [2mselector-class-pattern[22m
  [2m309:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_7" to be kebab-case   [2mselector-class-pattern[22m
  [2m313:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_8" to be kebab-case   [2mselector-class-pattern[22m
  [2m317:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_9" to be kebab-case   [2mselector-class-pattern[22m
  [2m321:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_10" to be kebab-case  [2mselector-class-pattern[22m
  [2m325:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_11" to be kebab-case  [2mselector-class-pattern[22m
  [2m329:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_12" to be kebab-case  [2mselector-class-pattern[22m
  [2m333:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_13" to be kebab-case  [2mselector-class-pattern[22m
  [2m337:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_14" to be kebab-case  [2mselector-class-pattern[22m
  [2m341:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_15" to be kebab-case  [2mselector-class-pattern[22m
  [2m345:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_16" to be kebab-case  [2mselector-class-pattern[22m
  [2m349:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_17" to be kebab-case  [2mselector-class-pattern[22m
  [2m353:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_18" to be kebab-case  [2mselector-class-pattern[22m
  [2m357:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_19" to be kebab-case  [2mselector-class-pattern[22m
  [2m361:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_20" to be kebab-case  [2mselector-class-pattern[22m
  [2m365:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_21" to be kebab-case  [2mselector-class-pattern[22m
  [2m369:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_22" to be kebab-case  [2mselector-class-pattern[22m
  [2m373:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_23" to be kebab-case  [2mselector-class-pattern[22m
  [2m377:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_24" to be kebab-case  [2mselector-class-pattern[22m
  [2m381:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_25" to be kebab-case  [2mselector-class-pattern[22m
  [2m385:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_26" to be kebab-case  [2mselector-class-pattern[22m
  [2m389:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_27" to be kebab-case  [2mselector-class-pattern[22m
  [2m393:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_28" to be kebab-case  [2mselector-class-pattern[22m
  [2m397:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_29" to be kebab-case  [2mselector-class-pattern[22m
  [2m401:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_30" to be kebab-case  [2mselector-class-pattern[22m
  [2m405:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_31" to be kebab-case  [2mselector-class-pattern[22m
  [2m409:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_32" to be kebab-case  [2mselector-class-pattern[22m
  [2m413:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_33" to be kebab-case  [2mselector-class-pattern[22m
  [2m417:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_34" to be kebab-case  [2mselector-class-pattern[22m
  [2m421:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_35" to be kebab-case  [2mselector-class-pattern[22m
  [2m425:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_36" to be kebab-case  [2mselector-class-pattern[22m
  [2m429:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_37" to be kebab-case  [2mselector-class-pattern[22m
  [2m433:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_38" to be kebab-case  [2mselector-class-pattern[22m
  [2m437:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_39" to be kebab-case  [2mselector-class-pattern[22m
  [2m441:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_40" to be kebab-case  [2mselector-class-pattern[22m
  [2m445:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_41" to be kebab-case  [2mselector-class-pattern[22m
  [2m449:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_42" to be kebab-case  [2mselector-class-pattern[22m
  [2m453:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_43" to be kebab-case  [2mselector-class-pattern[22m
  [2m457:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_44" to be kebab-case  [2mselector-class-pattern[22m
  [2m461:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_45" to be kebab-case  [2mselector-class-pattern[22m
  [2m465:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_46" to be kebab-case  [2mselector-class-pattern[22m
  [2m469:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_47" to be kebab-case  [2mselector-class-pattern[22m
  [2m473:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_48" to be kebab-case  [2mselector-class-pattern[22m
  [2m483:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_1" to be kebab-case   [2mselector-class-pattern[22m
  [2m487:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_2" to be kebab-case   [2mselector-class-pattern[22m
  [2m491:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_3" to be kebab-case   [2mselector-class-pattern[22m
  [2m495:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_4" to be kebab-case   [2mselector-class-pattern[22m
  [2m499:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_5" to be kebab-case   [2mselector-class-pattern[22m
  [2m503:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_6" to be kebab-case   [2mselector-class-pattern[22m
  [2m507:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_7" to be kebab-case   [2mselector-class-pattern[22m
  [2m511:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_8" to be kebab-case   [2mselector-class-pattern[22m
  [2m515:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_9" to be kebab-case   [2mselector-class-pattern[22m
  [2m519:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_10" to be kebab-case  [2mselector-class-pattern[22m
  [2m523:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_11" to be kebab-case  [2mselector-class-pattern[22m
  [2m527:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_12" to be kebab-case  [2mselector-class-pattern[22m
  [2m531:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_13" to be kebab-case  [2mselector-class-pattern[22m
  [2m535:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_14" to be kebab-case  [2mselector-class-pattern[22m
  [2m539:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_15" to be kebab-case  [2mselector-class-pattern[22m
  [2m543:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_16" to be kebab-case  [2mselector-class-pattern[22m
  [2m547:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_17" to be kebab-case  [2mselector-class-pattern[22m
  [2m551:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_18" to be kebab-case  [2mselector-class-pattern[22m
  [2m555:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_19" to be kebab-case  [2mselector-class-pattern[22m
  [2m559:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_20" to be kebab-case  [2mselector-class-pattern[22m
  [2m563:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_21" to be kebab-case  [2mselector-class-pattern[22m
  [2m567:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_22" to be kebab-case  [2mselector-class-pattern[22m
  [2m571:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_23" to be kebab-case  [2mselector-class-pattern[22m
  [2m575:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_24" to be kebab-case  [2mselector-class-pattern[22m
  [2m579:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_25" to be kebab-case  [2mselector-class-pattern[22m
  [2m583:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_26" to be kebab-case  [2mselector-class-pattern[22m
  [2m587:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_27" to be kebab-case  [2mselector-class-pattern[22m
  [2m591:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_28" to be kebab-case  [2mselector-class-pattern[22m
  [2m595:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_29" to be kebab-case  [2mselector-class-pattern[22m
  [2m599:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_30" to be kebab-case  [2mselector-class-pattern[22m
  [2m603:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_31" to be kebab-case  [2mselector-class-pattern[22m
  [2m607:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_32" to be kebab-case  [2mselector-class-pattern[22m
  [2m611:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_33" to be kebab-case  [2mselector-class-pattern[22m
  [2m615:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_34" to be kebab-case  [2mselector-class-pattern[22m
  [2m619:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_35" to be kebab-case  [2mselector-class-pattern[22m
  [2m623:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_36" to be kebab-case  [2mselector-class-pattern[22m
  [2m627:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_37" to be kebab-case  [2mselector-class-pattern[22m
  [2m631:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_38" to be kebab-case  [2mselector-class-pattern[22m
  [2m635:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_39" to be kebab-case  [2mselector-class-pattern[22m
  [2m639:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_40" to be kebab-case  [2mselector-class-pattern[22m
  [2m643:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_41" to be kebab-case  [2mselector-class-pattern[22m
  [2m647:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_42" to be kebab-case  [2mselector-class-pattern[22m
  [2m651:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_43" to be kebab-case  [2mselector-class-pattern[22m
  [2m655:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_44" to be kebab-case  [2mselector-class-pattern[22m
  [2m659:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_45" to be kebab-case  [2mselector-class-pattern[22m
  [2m663:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_46" to be kebab-case  [2mselector-class-pattern[22m
  [2m667:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_47" to be kebab-case  [2mselector-class-pattern[22m
  [2m671:14[22m  [31m[31m✖[39m  Expected class selector ".avatar_48" to be kebab-case  [2mselector-class-pattern[22m

src/styles/npc-portraits.css
    [2m37:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_1" to be kebab-case   [2mselector-class-pattern[22m
    [2m42:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_2" to be kebab-case   [2mselector-class-pattern[22m
    [2m47:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_3" to be kebab-case   [2mselector-class-pattern[22m
    [2m52:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_4" to be kebab-case   [2mselector-class-pattern[22m
    [2m57:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_5" to be kebab-case   [2mselector-class-pattern[22m
    [2m62:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_6" to be kebab-case   [2mselector-class-pattern[22m
    [2m68:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_7" to be kebab-case   [2mselector-class-pattern[22m
    [2m73:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_8" to be kebab-case   [2mselector-class-pattern[22m
    [2m78:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_9" to be kebab-case   [2mselector-class-pattern[22m
    [2m83:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_10" to be kebab-case  [2mselector-class-pattern[22m
    [2m88:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_11" to be kebab-case  [2mselector-class-pattern[22m
    [2m93:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_12" to be kebab-case  [2mselector-class-pattern[22m
    [2m99:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_13" to be kebab-case  [2mselector-class-pattern[22m
   [2m104:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_14" to be kebab-case  [2mselector-class-pattern[22m
   [2m109:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_15" to be kebab-case  [2mselector-class-pattern[22m
   [2m114:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_16" to be kebab-case  [2mselector-class-pattern[22m
   [2m119:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_17" to be kebab-case  [2mselector-class-pattern[22m
   [2m124:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_18" to be kebab-case  [2mselector-class-pattern[22m
   [2m130:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_19" to be kebab-case  [2mselector-class-pattern[22m
   [2m135:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_20" to be kebab-case  [2mselector-class-pattern[22m
   [2m140:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_21" to be kebab-case  [2mselector-class-pattern[22m
   [2m145:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_22" to be kebab-case  [2mselector-class-pattern[22m
   [2m150:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_23" to be kebab-case  [2mselector-class-pattern[22m
   [2m155:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_24" to be kebab-case  [2mselector-class-pattern[22m
   [2m161:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_25" to be kebab-case  [2mselector-class-pattern[22m
   [2m166:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_26" to be kebab-case  [2mselector-class-pattern[22m
   [2m171:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_27" to be kebab-case  [2mselector-class-pattern[22m
   [2m176:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_28" to be kebab-case  [2mselector-class-pattern[22m
   [2m181:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_29" to be kebab-case  [2mselector-class-pattern[22m
   [2m186:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_30" to be kebab-case  [2mselector-class-pattern[22m
   [2m192:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_31" to be kebab-case  [2mselector-class-pattern[22m
   [2m197:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_32" to be kebab-case  [2mselector-class-pattern[22m
   [2m202:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_33" to be kebab-case  [2mselector-class-pattern[22m
   [2m207:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_34" to be kebab-case  [2mselector-class-pattern[22m
   [2m212:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_35" to be kebab-case  [2mselector-class-pattern[22m
   [2m217:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_36" to be kebab-case  [2mselector-class-pattern[22m
   [2m223:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_37" to be kebab-case  [2mselector-class-pattern[22m
   [2m228:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_38" to be kebab-case  [2mselector-class-pattern[22m
   [2m233:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_39" to be kebab-case  [2mselector-class-pattern[22m
   [2m238:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_40" to be kebab-case  [2mselector-class-pattern[22m
   [2m243:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_41" to be kebab-case  [2mselector-class-pattern[22m
   [2m248:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_42" to be kebab-case  [2mselector-class-pattern[22m
   [2m254:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_43" to be kebab-case  [2mselector-class-pattern[22m
   [2m259:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_44" to be kebab-case  [2mselector-class-pattern[22m
   [2m264:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_45" to be kebab-case  [2mselector-class-pattern[22m
   [2m269:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_46" to be kebab-case  [2mselector-class-pattern[22m
   [2m274:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_47" to be kebab-case  [2mselector-class-pattern[22m
   [2m279:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_48" to be kebab-case  [2mselector-class-pattern[22m
   [2m285:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_49" to be kebab-case  [2mselector-class-pattern[22m
   [2m290:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_50" to be kebab-case  [2mselector-class-pattern[22m
   [2m295:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_51" to be kebab-case  [2mselector-class-pattern[22m
   [2m300:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_52" to be kebab-case  [2mselector-class-pattern[22m
   [2m305:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_53" to be kebab-case  [2mselector-class-pattern[22m
   [2m310:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_54" to be kebab-case  [2mselector-class-pattern[22m
   [2m316:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_55" to be kebab-case  [2mselector-class-pattern[22m
   [2m321:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_56" to be kebab-case  [2mselector-class-pattern[22m
   [2m326:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_57" to be kebab-case  [2mselector-class-pattern[22m
   [2m331:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_58" to be kebab-case  [2mselector-class-pattern[22m
   [2m336:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_59" to be kebab-case  [2mselector-class-pattern[22m
   [2m341:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_60" to be kebab-case  [2mselector-class-pattern[22m
   [2m347:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_61" to be kebab-case  [2mselector-class-pattern[22m
   [2m352:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_62" to be kebab-case  [2mselector-class-pattern[22m
   [2m357:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_63" to be kebab-case  [2mselector-class-pattern[22m
   [2m362:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_64" to be kebab-case  [2mselector-class-pattern[22m
   [2m367:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_65" to be kebab-case  [2mselector-class-pattern[22m
   [2m372:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_66" to be kebab-case  [2mselector-class-pattern[22m
   [2m378:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_67" to be kebab-case  [2mselector-class-pattern[22m
   [2m383:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_68" to be kebab-case  [2mselector-class-pattern[22m
   [2m388:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_69" to be kebab-case  [2mselector-class-pattern[22m
   [2m393:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_70" to be kebab-case  [2mselector-class-pattern[22m
   [2m398:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_71" to be kebab-case  [2mselector-class-pattern[22m
   [2m403:1[22m   [31m[31m✖[39m  Expected class selector ".portrait_72" to be kebab-case  [2mselector-class-pattern[22m
   [2m424:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_1" to be kebab-case   [2mselector-class-pattern[22m
   [2m428:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_2" to be kebab-case   [2mselector-class-pattern[22m
   [2m432:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_3" to be kebab-case   [2mselector-class-pattern[22m
   [2m436:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_4" to be kebab-case   [2mselector-class-pattern[22m
   [2m440:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_5" to be kebab-case   [2mselector-class-pattern[22m
   [2m444:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_6" to be kebab-case   [2mselector-class-pattern[22m
   [2m448:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_7" to be kebab-case   [2mselector-class-pattern[22m
   [2m452:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_8" to be kebab-case   [2mselector-class-pattern[22m
   [2m456:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_9" to be kebab-case   [2mselector-class-pattern[22m
   [2m460:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_10" to be kebab-case  [2mselector-class-pattern[22m
   [2m464:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_11" to be kebab-case  [2mselector-class-pattern[22m
   [2m468:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_12" to be kebab-case  [2mselector-class-pattern[22m
   [2m472:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_13" to be kebab-case  [2mselector-class-pattern[22m
   [2m476:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_14" to be kebab-case  [2mselector-class-pattern[22m
   [2m480:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_15" to be kebab-case  [2mselector-class-pattern[22m
   [2m484:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_16" to be kebab-case  [2mselector-class-pattern[22m
   [2m488:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_17" to be kebab-case  [2mselector-class-pattern[22m
   [2m492:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_18" to be kebab-case  [2mselector-class-pattern[22m
   [2m496:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_19" to be kebab-case  [2mselector-class-pattern[22m
   [2m500:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_20" to be kebab-case  [2mselector-class-pattern[22m
   [2m504:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_21" to be kebab-case  [2mselector-class-pattern[22m
   [2m508:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_22" to be kebab-case  [2mselector-class-pattern[22m
   [2m512:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_23" to be kebab-case  [2mselector-class-pattern[22m
   [2m516:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_24" to be kebab-case  [2mselector-class-pattern[22m
   [2m520:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_25" to be kebab-case  [2mselector-class-pattern[22m
   [2m524:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_26" to be kebab-case  [2mselector-class-pattern[22m
   [2m528:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_27" to be kebab-case  [2mselector-class-pattern[22m
   [2m532:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_28" to be kebab-case  [2mselector-class-pattern[22m
   [2m536:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_29" to be kebab-case  [2mselector-class-pattern[22m
   [2m540:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_30" to be kebab-case  [2mselector-class-pattern[22m
   [2m544:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_31" to be kebab-case  [2mselector-class-pattern[22m
   [2m548:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_32" to be kebab-case  [2mselector-class-pattern[22m
   [2m552:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_33" to be kebab-case  [2mselector-class-pattern[22m
   [2m556:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_34" to be kebab-case  [2mselector-class-pattern[22m
   [2m560:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_35" to be kebab-case  [2mselector-class-pattern[22m
   [2m564:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_36" to be kebab-case  [2mselector-class-pattern[22m
   [2m568:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_37" to be kebab-case  [2mselector-class-pattern[22m
   [2m572:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_38" to be kebab-case  [2mselector-class-pattern[22m
   [2m576:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_39" to be kebab-case  [2mselector-class-pattern[22m
   [2m580:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_40" to be kebab-case  [2mselector-class-pattern[22m
   [2m584:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_41" to be kebab-case  [2mselector-class-pattern[22m
   [2m588:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_42" to be kebab-case  [2mselector-class-pattern[22m
   [2m592:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_43" to be kebab-case  [2mselector-class-pattern[22m
   [2m596:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_44" to be kebab-case  [2mselector-class-pattern[22m
   [2m600:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_45" to be kebab-case  [2mselector-class-pattern[22m
   [2m604:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_46" to be kebab-case  [2mselector-class-pattern[22m
   [2m608:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_47" to be kebab-case  [2mselector-class-pattern[22m
   [2m612:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_48" to be kebab-case  [2mselector-class-pattern[22m
   [2m616:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_49" to be kebab-case  [2mselector-class-pattern[22m
   [2m620:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_50" to be kebab-case  [2mselector-class-pattern[22m
   [2m624:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_51" to be kebab-case  [2mselector-class-pattern[22m
   [2m628:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_52" to be kebab-case  [2mselector-class-pattern[22m
   [2m632:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_53" to be kebab-case  [2mselector-class-pattern[22m
   [2m636:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_54" to be kebab-case  [2mselector-class-pattern[22m
   [2m640:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_55" to be kebab-case  [2mselector-class-pattern[22m
   [2m644:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_56" to be kebab-case  [2mselector-class-pattern[22m
   [2m648:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_57" to be kebab-case  [2mselector-class-pattern[22m
   [2m652:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_58" to be kebab-case  [2mselector-class-pattern[22m
   [2m656:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_59" to be kebab-case  [2mselector-class-pattern[22m
   [2m660:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_60" to be kebab-case  [2mselector-class-pattern[22m
   [2m664:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_61" to be kebab-case  [2mselector-class-pattern[22m
   [2m668:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_62" to be kebab-case  [2mselector-class-pattern[22m
   [2m672:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_63" to be kebab-case  [2mselector-class-pattern[22m
   [2m676:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_64" to be kebab-case  [2mselector-class-pattern[22m
   [2m680:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_65" to be kebab-case  [2mselector-class-pattern[22m
   [2m684:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_66" to be kebab-case  [2mselector-class-pattern[22m
   [2m688:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_67" to be kebab-case  [2mselector-class-pattern[22m
   [2m692:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_68" to be kebab-case  [2mselector-class-pattern[22m
   [2m696:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_69" to be kebab-case  [2mselector-class-pattern[22m
   [2m700:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_70" to be kebab-case  [2mselector-class-pattern[22m
   [2m704:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_71" to be kebab-case  [2mselector-class-pattern[22m
   [2m708:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_72" to be kebab-case  [2mselector-class-pattern[22m
   [2m718:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_1" to be kebab-case   [2mselector-class-pattern[22m
   [2m722:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_2" to be kebab-case   [2mselector-class-pattern[22m
   [2m726:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_3" to be kebab-case   [2mselector-class-pattern[22m
   [2m730:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_4" to be kebab-case   [2mselector-class-pattern[22m
   [2m734:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_5" to be kebab-case   [2mselector-class-pattern[22m
   [2m738:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_6" to be kebab-case   [2mselector-class-pattern[22m
   [2m742:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_7" to be kebab-case   [2mselector-class-pattern[22m
   [2m746:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_8" to be kebab-case   [2mselector-class-pattern[22m
   [2m750:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_9" to be kebab-case   [2mselector-class-pattern[22m
   [2m754:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_10" to be kebab-case  [2mselector-class-pattern[22m
   [2m758:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_11" to be kebab-case  [2mselector-class-pattern[22m
   [2m762:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_12" to be kebab-case  [2mselector-class-pattern[22m
   [2m766:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_13" to be kebab-case  [2mselector-class-pattern[22m
   [2m770:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_14" to be kebab-case  [2mselector-class-pattern[22m
   [2m774:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_15" to be kebab-case  [2mselector-class-pattern[22m
   [2m778:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_16" to be kebab-case  [2mselector-class-pattern[22m
   [2m782:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_17" to be kebab-case  [2mselector-class-pattern[22m
   [2m786:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_18" to be kebab-case  [2mselector-class-pattern[22m
   [2m790:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_19" to be kebab-case  [2mselector-class-pattern[22m
   [2m794:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_20" to be kebab-case  [2mselector-class-pattern[22m
   [2m798:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_21" to be kebab-case  [2mselector-class-pattern[22m
   [2m802:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_22" to be kebab-case  [2mselector-class-pattern[22m
   [2m806:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_23" to be kebab-case  [2mselector-class-pattern[22m
   [2m810:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_24" to be kebab-case  [2mselector-class-pattern[22m
   [2m814:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_25" to be kebab-case  [2mselector-class-pattern[22m
   [2m818:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_26" to be kebab-case  [2mselector-class-pattern[22m
   [2m822:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_27" to be kebab-case  [2mselector-class-pattern[22m
   [2m826:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_28" to be kebab-case  [2mselector-class-pattern[22m
   [2m830:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_29" to be kebab-case  [2mselector-class-pattern[22m
   [2m834:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_30" to be kebab-case  [2mselector-class-pattern[22m
   [2m838:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_31" to be kebab-case  [2mselector-class-pattern[22m
   [2m842:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_32" to be kebab-case  [2mselector-class-pattern[22m
   [2m846:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_33" to be kebab-case  [2mselector-class-pattern[22m
   [2m850:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_34" to be kebab-case  [2mselector-class-pattern[22m
   [2m854:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_35" to be kebab-case  [2mselector-class-pattern[22m
   [2m858:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_36" to be kebab-case  [2mselector-class-pattern[22m
   [2m862:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_37" to be kebab-case  [2mselector-class-pattern[22m
   [2m866:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_38" to be kebab-case  [2mselector-class-pattern[22m
   [2m870:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_39" to be kebab-case  [2mselector-class-pattern[22m
   [2m874:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_40" to be kebab-case  [2mselector-class-pattern[22m
   [2m878:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_41" to be kebab-case  [2mselector-class-pattern[22m
   [2m882:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_42" to be kebab-case  [2mselector-class-pattern[22m
   [2m886:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_43" to be kebab-case  [2mselector-class-pattern[22m
   [2m890:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_44" to be kebab-case  [2mselector-class-pattern[22m
   [2m894:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_45" to be kebab-case  [2mselector-class-pattern[22m
   [2m898:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_46" to be kebab-case  [2mselector-class-pattern[22m
   [2m902:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_47" to be kebab-case  [2mselector-class-pattern[22m
   [2m906:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_48" to be kebab-case  [2mselector-class-pattern[22m
   [2m910:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_49" to be kebab-case  [2mselector-class-pattern[22m
   [2m914:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_50" to be kebab-case  [2mselector-class-pattern[22m
   [2m918:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_51" to be kebab-case  [2mselector-class-pattern[22m
   [2m922:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_52" to be kebab-case  [2mselector-class-pattern[22m
   [2m926:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_53" to be kebab-case  [2mselector-class-pattern[22m
   [2m930:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_54" to be kebab-case  [2mselector-class-pattern[22m
   [2m934:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_55" to be kebab-case  [2mselector-class-pattern[22m
   [2m938:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_56" to be kebab-case  [2mselector-class-pattern[22m
   [2m942:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_57" to be kebab-case  [2mselector-class-pattern[22m
   [2m946:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_58" to be kebab-case  [2mselector-class-pattern[22m
   [2m950:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_59" to be kebab-case  [2mselector-class-pattern[22m
   [2m954:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_60" to be kebab-case  [2mselector-class-pattern[22m
   [2m958:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_61" to be kebab-case  [2mselector-class-pattern[22m
   [2m962:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_62" to be kebab-case  [2mselector-class-pattern[22m
   [2m966:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_63" to be kebab-case  [2mselector-class-pattern[22m
   [2m970:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_64" to be kebab-case  [2mselector-class-pattern[22m
   [2m974:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_65" to be kebab-case  [2mselector-class-pattern[22m
   [2m978:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_66" to be kebab-case  [2mselector-class-pattern[22m
   [2m982:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_67" to be kebab-case  [2mselector-class-pattern[22m
   [2m986:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_68" to be kebab-case  [2mselector-class-pattern[22m
   [2m990:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_69" to be kebab-case  [2mselector-class-pattern[22m
   [2m994:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_70" to be kebab-case  [2mselector-class-pattern[22m
   [2m998:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_71" to be kebab-case  [2mselector-class-pattern[22m
  [2m1002:16[22m  [31m[31m✖[39m  Expected class selector ".portrait_72" to be kebab-case  [2mselector-class-pattern[22m

src/styles/components.css
  [2m115:1[22m  [31m[31m✖[39m  Expected selector ".inventory-info span" to come before selector ".inventory-flex > div span", at line 99  [2mno-descending-specificity[22m

src/styles/sections/places-section.css
  [2m124:1[22m  [31m[31m✖[39m  Unexpected duplicate selector ".place-description", first used at line 60  [2mno-duplicate-selectors[22m
  [2m135:1[22m  [31m[31m✖[39m  Unexpected duplicate selector ".place-info", first used at line 110        [2mno-duplicate-selectors[22m
  [2m139:1[22m  [31m[31m✖[39m  Unexpected duplicate selector ".place-info h3", first used at line 114     [2mno-duplicate-selectors[22m
  [2m149:1[22m  [31m[31m✖[39m  Unexpected duplicate selector ".place-description", first used at line 60  [2mno-duplicate-selectors[22m
  [2m154:1[22m  [31m[31m✖[39m  Unexpected duplicate selector ".place-id", first used at line 129          [2mno-duplicate-selectors[22m

src/styles/sections/player-section.css
   [2m22:2[22m  [31m[31m✖[39m  Expected shorthand property "grid-template"                                                                            [2mdeclaration-block-no-redundant-longhand-properties[22m
   [2m90:1[22m  [31m[31m✖[39m  Expected class selector ".player-Equipment" to be kebab-case                                                           [2mselector-class-pattern[22m
  [2m111:1[22m  [31m[31m✖[39m  Unexpected duplicate selector ".player-inventory, .place-vault", first used at line 98                                 [2mno-duplicate-selectors[22m
  [2m192:1[22m  [31m[31m✖[39m  Expected selector ".player-stats ul li span" to come before selector ".equipment-flex .main-weapon span", at line 153  [2mno-descending-specificity[22m

src/styles/sections/notifications.css
  [2m117:12[22m  [31m[31m✖[39m  Expected keyframe name "slideIn" to be kebab-case   [2mkeyframes-name-pattern[22m
  [2m129:12[22m  [31m[31m✖[39m  Expected keyframe name "slideOut" to be kebab-case  [2mkeyframes-name-pattern[22m

[31m✖[39m 380 problems ([31m380 errors[39m, [33m0 warnings[39m)
  1 error potentially fixable with the "--fix" option.
```

</details>

<details>

<summary>GITHUB_ACTIONS_ZIZMOR</summary>

```text
[1m[33mwarning[artipacked][0m[1m: credential persistence through GitHub Actions artifacts[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/deploy-pages.yml:19:9
   [1m[94m|[0m
[1m[94m19[0m [1m[94m|[0m         - name: Checkout
   [1m[94m|[0m [1m[33m _________^[0m
[1m[94m20[0m [1m[94m|[0m [1m[33m|[0m         uses: actions/checkout@v5
   [1m[94m|[0m [1m[33m|_________________________________^[0m [1m[33mdoes not set persist-credentials: false[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → Low
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#artipacked[39m

[1m[91merror[excessive-permissions][0m[1m: overly broad permissions[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/deploy-pages.yml:11:3
   [1m[94m|[0m
[1m[94m11[0m [1m[94m|[0m   pages: write
   [1m[94m|[0m   [1m[91m^^^^^^^^^^^^[0m [1m[91mpages: write is overly broad at the workflow level[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#excessive-permissions[39m

[1m[91merror[excessive-permissions][0m[1m: overly broad permissions[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/deploy-pages.yml:12:3
   [1m[94m|[0m
[1m[94m12[0m [1m[94m|[0m   id-token: write
   [1m[94m|[0m   [1m[91m^^^^^^^^^^^^^^^[0m [1m[91mid-token: write is overly broad at the workflow level[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#excessive-permissions[39m

[1m[91merror[unpinned-uses][0m[1m: unpinned action reference[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/deploy-pages.yml:20:15
   [1m[94m|[0m
[1m[94m20[0m [1m[94m|[0m         uses: actions/checkout@v5
   [1m[94m|[0m               [1m[91m^^^^^^^^^^^^^^^^^^^[0m [1m[91maction is not pinned to a hash (required by blanket policy)[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#unpinned-uses[39m

[1m[91merror[unpinned-uses][0m[1m: unpinned action reference[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/deploy-pages.yml:23:15
   [1m[94m|[0m
[1m[94m23[0m [1m[94m|[0m         uses: actions/setup-node@v6
   [1m[94m|[0m               [1m[91m^^^^^^^^^^^^^^^^^^^^^[0m [1m[91maction is not pinned to a hash (required by blanket policy)[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#unpinned-uses[39m

[1m[91merror[unpinned-uses][0m[1m: unpinned action reference[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/deploy-pages.yml:35:15
   [1m[94m|[0m
[1m[94m35[0m [1m[94m|[0m         uses: actions/upload-pages-artifact@v4
   [1m[94m|[0m               [1m[91m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^[0m [1m[91maction is not pinned to a hash (required by blanket policy)[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#unpinned-uses[39m

[1m[91merror[unpinned-uses][0m[1m: unpinned action reference[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/deploy-pages.yml:49:15
   [1m[94m|[0m
[1m[94m49[0m [1m[94m|[0m         uses: actions/deploy-pages@v4
   [1m[94m|[0m               [1m[91m^^^^^^^^^^^^^^^^^^^^^^^[0m [1m[91maction is not pinned to a hash (required by blanket policy)[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#unpinned-uses[39m

[1m[91merror[unpinned-uses][0m[1m: unpinned action reference[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/release-please.yml:13:15
   [1m[94m|[0m
[1m[94m13[0m [1m[94m|[0m       - uses: google-github-actions/release-please-action@v4
   [1m[94m|[0m               [1m[91m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^[0m [1m[91maction is not pinned to a hash (required by blanket policy)[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#unpinned-uses[39m

[1m[96mhelp[artipacked][0m[1m: credential persistence through GitHub Actions artifacts[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/super-linter.yml:23:9
   [1m[94m|[0m
[1m[94m23[0m [1m[94m|[0m         - name: Checkout code
   [1m[94m|[0m [1m[96m _________^[0m
[1m[94m24[0m [1m[94m|[0m [1m[96m|[0m         uses: actions/checkout@v6
[1m[94m25[0m [1m[94m|[0m [1m[96m|[0m         with:
[1m[94m26[0m [1m[94m|[0m [1m[96m|[0m           # super-linter needs the full git history to get the
[1m[94m27[0m [1m[94m|[0m [1m[96m|[0m           # list of files that changed across commits
[1m[94m28[0m [1m[94m|[0m [1m[96m|[0m           fetch-depth: 0
[1m[94m29[0m [1m[94m|[0m [1m[96m|[0m           token: ${{ secrets.SUPER_LINTER_TOKEN }}
   [1m[94m|[0m [1m[96m|__________________________________________________^[0m [1m[96mdoes not set persist-credentials: false[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → Low
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#artipacked[39m

[1m[91merror[unpinned-uses][0m[1m: unpinned action reference[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/super-linter.yml:24:15
   [1m[94m|[0m
[1m[94m24[0m [1m[94m|[0m         uses: actions/checkout@v6
   [1m[94m|[0m               [1m[91m^^^^^^^^^^^^^^^^^^^[0m [1m[91maction is not pinned to a hash (required by blanket policy)[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#unpinned-uses[39m

[1m[91merror[unpinned-uses][0m[1m: unpinned action reference[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/super-linter.yml:32:15
   [1m[94m|[0m
[1m[94m32[0m [1m[94m|[0m         uses: super-linter/super-linter@v8.5.0
   [1m[94m|[0m               [1m[91m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^[0m [1m[91maction is not pinned to a hash (required by blanket policy)[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#unpinned-uses[39m

[1m[91merror[unpinned-uses][0m[1m: unpinned action reference[0m
  [1m[94m--> [0m/github/workspace/.github/workflows/super-linter.yml:54:15
   [1m[94m|[0m
[1m[94m54[0m [1m[94m|[0m         uses: stefanzweifel/git-auto-commit-action@v7
   [1m[94m|[0m               [1m[91m^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^[0m [1m[91maction is not pinned to a hash (required by blanket policy)[0m
   [1m[94m|[0m
   [1m[94m= [0m[1mnote[0m: audit confidence → High
   [1m[94m= [0m[1mnote[0m: this finding has an auto-fix
   [1m[94m= [0m[1mhelp[0m: audit documentation → [32mhttps://docs.zizmor.sh/audits/#unpinned-uses[39m

[32m24[39m findings ([1m[93m12[39m suppressed, [92m10[39m fixable[0m): [35m0[39m informational, [36m1[39m low, [33m1[39m medium, [31m10[39m high🌈 zizmor v1.22.0
[32m INFO[0m [1maudit[0m[2m:[0m [2mzizmor[0m[2m:[0m 🌈 completed /github/workspace/.github/workflows/deploy-pages.yml
[32m INFO[0m [1maudit[0m[2m:[0m [2mzizmor[0m[2m:[0m 🌈 completed /github/workspace/.github/workflows/release-please.yml
[32m INFO[0m [1maudit[0m[2m:[0m [2mzizmor[0m[2m:[0m 🌈 completed /github/workspace/.github/workflows/super-linter.yml
```

</details>

<details>

<summary>HTML</summary>

```text

   Config loaded: /action/lib/.automation/.htmlhintrc

   Config loaded: /action/lib/.automation/.htmlhintrc

   Config loaded: /action/lib/.automation/.htmlhintrc

   /github/workspace/static/avatar_test.html
[37m      L171 |[90m      <div class="avatar-grid" id="avatarGrid">[39m
[37m                                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L173 |[90m          <div class="avatar avatar_1"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L177 |[90m          <div class="avatar avatar_2"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L181 |[90m          <div class="avatar avatar_3"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L185 |[90m          <div class="avatar avatar_4"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L189 |[90m          <div class="avatar avatar_5"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L193 |[90m          <div class="avatar avatar_6"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L197 |[90m          <div class="avatar avatar_7"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L201 |[90m          <div class="avatar avatar_8"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L205 |[90m          <div class="avatar avatar_9"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L209 |[90m          <div class="avatar avatar_10"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L213 |[90m          <div class="avatar avatar_11"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L217 |[90m          <div class="avatar avatar_12"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L221 |[90m          <div class="avatar avatar_13"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L225 |[90m          <div class="avatar avatar_14"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L229 |[90m          <div class="avatar avatar_15"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L233 |[90m          <div class="avatar avatar_16"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L237 |[90m          <div class="avatar avatar_17"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L241 |[90m          <div class="avatar avatar_18"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L245 |[90m          <div class="avatar avatar_19"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L249 |[90m          <div class="avatar avatar_20"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L253 |[90m          <div class="avatar avatar_21"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L257 |[90m          <div class="avatar avatar_22"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L261 |[90m          <div class="avatar avatar_23"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L265 |[90m          <div class="avatar avatar_24"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L269 |[90m          <div class="avatar avatar_25"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L273 |[90m          <div class="avatar avatar_26"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L277 |[90m          <div class="avatar avatar_27"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L281 |[90m          <div class="avatar avatar_28"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L285 |[90m          <div class="avatar avatar_29"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L289 |[90m          <div class="avatar avatar_30"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L293 |[90m          <div class="avatar avatar_31"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L297 |[90m          <div class="avatar avatar_32"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L301 |[90m          <div class="avatar avatar_33"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L305 |[90m          <div class="avatar avatar_34"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L309 |[90m          <div class="avatar avatar_35"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L313 |[90m          <div class="avatar avatar_36"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L317 |[90m          <div class="avatar avatar_37"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L321 |[90m          <div class="avatar avatar_38"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L325 |[90m          <div class="avatar avatar_39"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L329 |[90m          <div class="avatar avatar_40"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L333 |[90m          <div class="avatar avatar_41"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L337 |[90m          <div class="avatar avatar_42"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L341 |[90m          <div class="avatar avatar_43"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L345 |[90m          <div class="avatar avatar_44"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L349 |[90m          <div class="avatar avatar_45"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L353 |[90m          <div class="avatar avatar_46"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L357 |[90m          <div class="avatar avatar_47"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L361 |[90m          <div class="avatar avatar_48"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m

   Config loaded: /action/lib/.automation/.htmlhintrc

   /github/workspace/static/portrait_test.html
[37m      L179 |[90m      <div class="portrait-grid" id="portraitGrid">[39m
[37m                                            ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L181 |[90m          <div class="portrait portrait_1"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L185 |[90m          <div class="portrait portrait_2"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L189 |[90m          <div class="portrait portrait_3"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L193 |[90m          <div class="portrait portrait_4"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L197 |[90m          <div class="portrait portrait_5"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L201 |[90m          <div class="portrait portrait_6"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L205 |[90m          <div class="portrait portrait_7"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L209 |[90m          <div class="portrait portrait_8"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L213 |[90m          <div class="portrait portrait_9"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L217 |[90m          <div class="portrait portrait_10"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L221 |[90m          <div class="portrait portrait_11"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L225 |[90m          <div class="portrait portrait_12"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L229 |[90m          <div class="portrait portrait_13"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L233 |[90m          <div class="portrait portrait_14"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L237 |[90m          <div class="portrait portrait_15"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L241 |[90m          <div class="portrait portrait_16"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L245 |[90m          <div class="portrait portrait_17"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L249 |[90m          <div class="portrait portrait_18"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L253 |[90m          <div class="portrait portrait_19"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L257 |[90m          <div class="portrait portrait_20"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L261 |[90m          <div class="portrait portrait_21"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L265 |[90m          <div class="portrait portrait_22"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L269 |[90m          <div class="portrait portrait_23"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L273 |[90m          <div class="portrait portrait_24"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L277 |[90m          <div class="portrait portrait_25"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L281 |[90m          <div class="portrait portrait_26"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L285 |[90m          <div class="portrait portrait_27"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L289 |[90m          <div class="portrait portrait_28"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L293 |[90m          <div class="portrait portrait_29"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L297 |[90m          <div class="portrait portrait_30"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L301 |[90m          <div class="portrait portrait_31"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L305 |[90m          <div class="portrait portrait_32"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L309 |[90m          <div class="portrait portrait_33"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L313 |[90m          <div class="portrait portrait_34"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L317 |[90m          <div class="portrait portrait_35"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L321 |[90m          <div class="portrait portrait_36"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L325 |[90m          <div class="portrait portrait_37"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L329 |[90m          <div class="portrait portrait_38"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L333 |[90m          <div class="portrait portrait_39"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L337 |[90m          <div class="portrait portrait_40"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L341 |[90m          <div class="portrait portrait_41"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L345 |[90m          <div class="portrait portrait_42"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L349 |[90m          <div class="portrait portrait_43"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L353 |[90m          <div class="portrait portrait_44"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L357 |[90m          <div class="portrait portrait_45"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L361 |[90m          <div class="portrait portrait_46"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L365 |[90m          <div class="portrait portrait_47"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L369 |[90m          <div class="portrait portrait_48"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L373 |[90m          <div class="portrait portrait_49"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L377 |[90m          <div class="portrait portrait_50"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L381 |[90m          <div class="portrait portrait_51"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L385 |[90m          <div class="portrait portrait_52"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L389 |[90m          <div class="portrait portrait_53"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L393 |[90m          <div class="portrait portrait_54"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L397 |[90m          <div class="portrait portrait_55"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L401 |[90m          <div class="portrait portrait_56"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L405 |[90m          <div class="portrait portrait_57"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L409 |[90m          <div class="portrait portrait_58"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L413 |[90m          <div class="portrait portrait_59"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L417 |[90m          <div class="portrait portrait_60"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L421 |[90m          <div class="portrait portrait_61"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L425 |[90m          <div class="portrait portrait_62"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L429 |[90m          <div class="portrait portrait_63"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L433 |[90m          <div class="portrait portrait_64"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L437 |[90m          <div class="portrait portrait_65"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L441 |[90m          <div class="portrait portrait_66"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L445 |[90m          <div class="portrait portrait_67"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L449 |[90m          <div class="portrait portrait_68"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L453 |[90m          <div class="portrait portrait_69"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L457 |[90m          <div class="portrait portrait_70"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L461 |[90m          <div class="portrait portrait_71"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m
[37m      L465 |[90m          <div class="portrait portrait_72"></div>[39m
[37m                          ^ [31mThe id and class attribute values must be in lowercase and split by a dash. (id-class-value)[39m

Scanned 4 files, found 122 errors in 2 files (49 ms)
```

</details>

<details>

<summary>JAVASCRIPT_ES</summary>

```text

/github/workspace/_test_/combatService.staggered.test.js
   3:10  error  'placesData' is defined but never used             no-unused-vars
   9:6   error  'mockGameLoop' is assigned a value but never used  no-unused-vars
  62:10  error  'currentTime' is assigned a value but never used   no-unused-vars

/github/workspace/_test_/eventSystem.test.js
  49:6  error  'consoleSpy' is assigned a value but never used  no-unused-vars

/github/workspace/_test_/gameEngine/gameEngine.test.js
  16:2  error  'createStateWithBuilding' is defined but never used  no-unused-vars

/github/workspace/_test_/gameLoop.test.js
  18:24  error  'vi' is not defined  no-undef
  58:21  error  'vi' is not defined  no-undef
  59:21  error  'vi' is not defined  no-undef
  88:20  error  'vi' is not defined  no-undef

/github/workspace/_test_/mocks/combatService.mock.js
  3:14  error  'vi' is not defined  no-undef
  4:27  error  'vi' is not defined  no-undef
  5:15  error  'vi' is not defined  no-undef
  6:14  error  'vi' is not defined  no-undef
  7:20  error  'vi' is not defined  no-undef
  8:22  error  'vi' is not defined  no-undef
  9:28  error  'vi' is not defined  no-undef

/github/workspace/_test_/mocks/eventBus.mock.js
   6:7  error  'vi' is not defined  no-undef
  12:9  error  'vi' is not defined  no-undef
  16:8  error  'vi' is not defined  no-undef
  23:9  error  'vi' is not defined  no-undef

/github/workspace/_test_/mocks/index.js
  11:10  error  Parsing error: Duplicate export 'createMockCombatService'

/github/workspace/_test_/mocks/inventoryService.mock.js
  3:22  error  'vi' is not defined  no-undef
  4:24  error  'vi' is not defined  no-undef

/github/workspace/_test_/mocks/itemFactory.mock.js
  3:10  error  'vi' is not defined  no-undef

/github/workspace/_test_/mocks/localStorage.mock.js
   6:12  error  'vi' is not defined  no-undef
   7:12  error  'vi' is not defined  no-undef
  10:15  error  'vi' is not defined  no-undef
  13:10  error  'vi' is not defined  no-undef

/github/workspace/_test_/mocks/services.mock.js
   7:13  error  'vi' is not defined  no-undef
   8:13  error  'vi' is not defined  no-undef
  33:14  error  'vi' is not defined  no-undef
  35:11  error  'vi' is not defined  no-undef

/github/workspace/_test_/mocks/spawnService.mock.js
  11:15  error  'vi' is not defined  no-undef
  12:22  error  'vi' is not defined  no-undef
  13:12  error  'vi' is not defined  no-undef
  15:17  error  'vi' is not defined  no-undef
  19:27  error  'vi' is not defined  no-undef

/github/workspace/_test_/placeInventorySlice.test.js
  5:2  error  'updateInventory' is defined but never used  no-unused-vars

/github/workspace/_test_/placesSlice.test.js
  5:2  error  'selectAvailableConnections' is defined but never used  no-unused-vars

/github/workspace/_test_/playerInventorySlice.test.js
   7:2   error  'updateInventory' is defined but never used        no-unused-vars
  61:10  error  'existingItem' is assigned a value but never used  no-unused-vars

/github/workspace/_test_/playerSlice.test.js
  7:2  error  'setPlayerState' is defined but never used  no-unused-vars

/github/workspace/_test_/services/ProductionService.test.js
   3:2   error  'createStateWithBuilding' is defined but never used  no-unused-vars
  62:10  error  'expectedItem' is assigned a value but never used    no-unused-vars

/github/workspace/_test_/services/SpawnService.test.js
  5:10  error  'placesData' is defined but never used  no-unused-vars

/github/workspace/image-transform.js
  7:18  error  'resize' is not defined  no-undef

/github/workspace/src/game/engine/GameEngine.js
   32:4  error  'inventoryService' is assigned a value but never used       no-unused-vars
   33:4  error  'itemFactory' is assigned a value but never used            no-unused-vars
   34:4  error  'productionService' is assigned a value but never used      no-unused-vars
   35:4  error  'saveService' is assigned a value but never used            no-unused-vars
   36:4  error  'navigationService' is assigned a value but never used      no-unused-vars
   37:4  error  'enemyLifecycleService' is assigned a value but never used  no-unused-vars
   38:4  error  'combatService' is assigned a value but never used          no-unused-vars
   39:4  error  'gameLoop' is assigned a value but never used               no-unused-vars
   40:4  error  'eventBusService' is assigned a value but never used        no-unused-vars
   41:4  error  'spawnService' is assigned a value but never used           no-unused-vars
  152:2  error  Duplicate name 'getAssignedWorkers'                         no-dupe-class-members
  157:2  error  Duplicate name 'calculateProductionRate'                    no-dupe-class-members
  162:2  error  Duplicate name 'canBuildingProduce'                         no-dupe-class-members
  167:2  error  Duplicate name 'getAllProductionCalculations'               no-dupe-class-members
  192:2  error  Duplicate name 'getAssignedWorkers'                         no-dupe-class-members
  197:2  error  Duplicate name 'calculateProductionRate'                    no-dupe-class-members
  202:2  error  Duplicate name 'canBuildingProduce'                         no-dupe-class-members
  207:2  error  Duplicate name 'getAllProductionCalculations'               no-dupe-class-members

/github/workspace/src/game/services/ProductionService.js
  13:57  error  'deltaTime' is defined but never used  no-unused-vars

/github/workspace/src/game/services/combatService.js
    8:10  error  'placesData' is defined but never used  no-unused-vars
  118:19  error  'enemy' is defined but never used       no-unused-vars

/github/workspace/src/store/middleware/logMiddleware.js
   12:2   error  'getEnemyTypeDisplayName' is defined but never used  no-unused-vars
   88:5   error  'attackerType' is assigned a value but never used    no-unused-vars
  107:11  error  'attackerName' is assigned a value but never used    no-unused-vars

/github/workspace/src/store/slices/inventoryThunks.js
  109:17  error  'itemIndex' is assigned a value but never used  no-unused-vars

/github/workspace/src/store/slices/npcInventorySlice.js
    8:2   error  'findItemById' is defined but never used            no-unused-vars
    9:2   error  'getItemIndex' is defined but never used            no-unused-vars
  151:29  error  'toInventoryId' is assigned a value but never used  no-unused-vars

/github/workspace/src/store/slices/placeInventorySlice.js
    8:2   error  'findItemById' is defined but never used            no-unused-vars
    9:2   error  'getItemIndex' is defined but never used            no-unused-vars
  104:29  error  'toInventoryId' is assigned a value but never used  no-unused-vars

/github/workspace/src/store/slices/playerInventorySlice.js
    8:2   error  'validateInventoryExists' is defined but never used  no-unused-vars
   12:2   error  'calculateWeight' is defined but never used          no-unused-vars
   15:2   error  'getItemIndex' is defined but never used             no-unused-vars
   16:2   error  'generateItemId' is defined but never used           no-unused-vars
  137:29  error  'toInventoryId' is assigned a value but never used   no-unused-vars

/github/workspace/src/ui/UIVisibilityContext.js
  6:40  error  'children' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/card/BuildingCard.js
   3:25  error  'building' is missing in props validation       react/prop-types
   9:45  error  'building.icon' is missing in props validation  react/prop-types
  10:19  error  'building.name' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/card/EntityCard.js
   6:23  error  'entity' is missing in props validation                    react/prop-types
   6:31  error  'avatarFolder' is missing in props validation              react/prop-types
   9:29  error  'entity.id' is missing in props validation                 react/prop-types
  12:54  error  'entity.health' is missing in props validation             react/prop-types
  23:56  error  'entity.id' is missing in props validation                 react/prop-types
  28:11  error  'entity.countdown' is missing in props validation          react/prop-types
  28:22  error  'entity.isCountdownActive' is missing in props validation  react/prop-types
  28:41  error  'entity.maxCountdown' is missing in props validation       react/prop-types
  39:13  error  'entity.countdown' is missing in props validation          react/prop-types
  39:31  error  'entity.isCountdownActive' is missing in props validation  react/prop-types
  39:57  error  'entity.maxCountdown' is missing in props validation       react/prop-types
  42:3   error  'entity.name' is missing in props validation               react/prop-types
  43:3   error  'entity.health' is missing in props validation             react/prop-types
  44:3   error  'entity.maxHealth' is missing in props validation          react/prop-types
  45:3   error  'entity.avatar' is missing in props validation             react/prop-types
  46:3   error  'entity.attackPattern' is missing in props validation      react/prop-types
  51:25  error  'entity.isCountdownActive' is missing in props validation  react/prop-types
  51:53  error  'entity.countdown' is missing in props validation          react/prop-types
  52:39  error  'entity.isDead' is missing in props validation             react/prop-types
  58:26  error  'entity.id' is missing in props validation                 react/prop-types

/github/workspace/src/ui/components/card/NPCCard.js
   3:20  error  'npc' is missing in props validation               react/prop-types
   3:25  error  'onClick' is missing in props validation           react/prop-types
   8:10  error  'npc.name' is missing in props validation          react/prop-types
   8:16  error  'npc.description' is missing in props validation   react/prop-types
   8:29  error  'npc.avatar' is missing in props validation        react/prop-types
  11:22  error  'npc.id' is missing in props validation            react/prop-types
  12:16  error  'npc.id' is missing in props validation            react/prop-types
  22:10  error  'npc.hasInventory' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/card/PlaceCard.js
   6:22  error  'place' is missing in props validation                   react/prop-types
  12:34  error  'place.id' is missing in props validation                react/prop-types
  19:54  error  'place.background-image' is missing in props validation  react/prop-types
  27:17  error  'place.name' is missing in props validation              react/prop-types

/github/workspace/src/ui/components/card/PlayerCard.js
  10:23  error  'player' is missing in props validation            react/prop-types
  10:31  error  'vaultId' is missing in props validation           react/prop-types
  25:18  error  'player.level' is missing in props validation      react/prop-types
  26:18  error  'player.name' is missing in props validation       react/prop-types
  28:15  error  'player.exp' is missing in props validation        react/prop-types
  28:29  error  'player.expToNext' is missing in props validation  react/prop-types
  51:14  error  'player.stats' is missing in props validation      react/prop-types
  51:51  error  'player.stats' is missing in props validation      react/prop-types
  54:33  error  'player.exp' is missing in props validation        react/prop-types
  54:46  error  'player.expToNext' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/card/WorkerCard.js
   5:2   error  'assignWorkerToBuilding' is defined but never used          no-unused-vars
   6:2   error  'unassignWorker' is defined but never used                  no-unused-vars
  11:23  error  'worker' is missing in props validation                     react/prop-types
  11:31  error  'buildings' is missing in props validation                  react/prop-types
  17:31  error  'buildings.find' is missing in props validation             react/prop-types
  19:44  error  'worker.id' is missing in props validation                  react/prop-types
  22:21  error  'worker.id' is missing in props validation                  react/prop-types
  27:14  error  'worker.assignedBuildingId' is missing in props validation  react/prop-types
  28:31  error  'buildings.find' is missing in props validation             react/prop-types
  29:28  error  'worker.assignedBuildingId' is missing in props validation  react/prop-types
  31:44  error  'worker.id' is missing in props validation                  react/prop-types
  33:23  error  'worker.id' is missing in props validation                  react/prop-types
  33:34  error  'worker.assignedBuildingId' is missing in props validation  react/prop-types
  39:36  error  'worker.avatar' is missing in props validation              react/prop-types
  40:18  error  'worker.name' is missing in props validation                react/prop-types
  41:24  error  'worker.assignedBuildingId' is missing in props validation  react/prop-types
  47:16  error  'worker.name' is missing in props validation                react/prop-types
  50:14  error  'worker.assignedBuildingId' is missing in props validation  react/prop-types
  50:59  error  'buildings.length' is missing in props validation           react/prop-types
  55:18  error  'buildings.map' is missing in props validation              react/prop-types
  61:16  error  'worker.assignedBuildingId' is missing in props validation  react/prop-types
  65:12  error  'worker.assignedBuildingId' is missing in props validation  react/prop-types
  67:32  error  'worker.assignedBuildingId' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/common/CircularProgressTimer.js
   5:2  error  'time' is missing in props validation            react/prop-types
   6:2  error  'isRunning' is missing in props validation       react/prop-types
   7:2  error  'enemyId' is missing in props validation         react/prop-types
   8:2  error  'onComplete' is missing in props validation      react/prop-types
   9:2  error  'size' is missing in props validation            react/prop-types
  10:2  error  'displayText' is missing in props validation     react/prop-types
  11:2  error  'primaryColor' is missing in props validation    react/prop-types
  12:2  error  'secondaryColor' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/common/ItemInfo.js
   3:21  error  'item' is missing in props validation                            react/prop-types
   3:27  error  'children' is missing in props validation                        react/prop-types
  16:21  error  'item.name' is missing in props validation                       react/prop-types
  19:11  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities
  19:18  error  'item.description' is missing in props validation                react/prop-types
  19:30  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities
  21:12  error  'item.type' is missing in props validation                       react/prop-types
  22:49  error  'item.consumable' is missing in props validation                 react/prop-types
  22:61  error  'item.consumable.heal' is missing in props validation            react/prop-types
  25:23  error  'item.weight' is missing in props validation                     react/prop-types
  26:12  error  'item.stats' is missing in props validation                      react/prop-types
  28:29  error  'item.stats' is missing in props validation                      react/prop-types

/github/workspace/src/ui/components/common/KeyBind.js
  4:20  error  'value' is missing in props validation  react/prop-types
  4:27  error  'info' is missing in props validation   react/prop-types

/github/workspace/src/ui/components/common/MoveItemDialog.js
  10:2   error  'item' is missing in props validation                            react/prop-types
  11:2   error  'onConfirm' is missing in props validation                       react/prop-types
  12:2   error  'onCancel' is missing in props validation                        react/prop-types
  13:2   error  'sourceInventory' is defined but never used                      no-unused-vars
  13:2   error  'sourceInventory' is missing in props validation                 react/prop-types
  14:2   error  'targetInventory' is missing in props validation                 react/prop-types
  17:34  error  'item.quantity' is missing in props validation                   react/prop-types
  18:42  error  'targetInventory.type' is missing in props validation            react/prop-types
  27:37  error  'targetInventory.maxWeight' is missing in props validation       react/prop-types
  28:28  error  'item.weight' is missing in props validation                     react/prop-types
  82:24  error  'targetInventory.type' is missing in props validation            react/prop-types
  83:13  error  'item.isVault' is missing in props validation                    react/prop-types
  94:22  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities
  94:30  error  'item.name' is missing in props validation                       react/prop-types
  94:35  error  `"` can be escaped with `&quot;`, `&ldquo;`, `&#34;`, `&rdquo;`  react/no-unescaped-entities

/github/workspace/src/ui/components/common/NPCDialog.js
   7:2  error  'isOpen' is missing in props validation          react/prop-types
   8:2  error  'npcId' is missing in props validation           react/prop-types
   9:2  error  'selectedOption' is missing in props validation  react/prop-types
  10:2  error  'onClose' is missing in props validation         react/prop-types
  11:2  error  'onOptionSelect' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/common/NewLevelDialog.js
  4:27  error  'onChoose' is missing in props validation  react/prop-types
  4:37  error  'onCancel' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/common/Notification.js
  4:10  error  'NOTIFICATION_TYPES' is defined but never used         no-unused-vars
  7:25  error  'notification' is missing in props validation          react/prop-types
  9:10  error  'notification.id' is missing in props validation       react/prop-types
  9:14  error  'notification.message' is missing in props validation  react/prop-types
  9:23  error  'notification.type' is missing in props validation     react/prop-types

/github/workspace/src/ui/components/common/ProgressBar.js
  3:24  error  'value' is missing in props validation  react/prop-types
  3:31  error  'max' is missing in props validation    react/prop-types

/github/workspace/src/ui/components/common/QuantitySlider.js
  4:2  error  'value' is missing in props validation      react/prop-types
  5:2  error  'onChange' is missing in props validation   react/prop-types
  6:2  error  'min' is missing in props validation        react/prop-types
  7:2  error  'max' is missing in props validation        react/prop-types
  8:2  error  'disabled' is missing in props validation   react/prop-types
  9:2  error  'className' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/common/ToolTip.js
  3:20  error  'text' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/display/ControlDisplay.js
  3:27  error  'isInCombat' is missing in props validation      react/prop-types
  3:39  error  'onToggleCombat' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/display/EnemyDisplay.js
  4:25  error  'enemies' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/display/InventoryDisplay.js
  21:29  error  'inventoryId' is missing in props validation       react/prop-types
  21:42  error  'otherInventoryId' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/display/LogDisplay.js
   1:36  error  'useState' is defined but never used                 no-unused-vars
   2:10  error  'useSelector' is defined but never used              no-unused-vars
   4:7   error  'LOG_CATEGORIES' is assigned a value but never used  no-unused-vars
  11:38  error  'filteredLogs' is missing in props validation        react/prop-types
  24:19  error  'filteredLogs.map' is missing in props validation    react/prop-types

/github/workspace/src/ui/components/list/EnemyList.js
  5:22  error  'enemies' is missing in props validation         react/prop-types
  7:12  error  'enemies.length' is missing in props validation  react/prop-types
  8:12  error  'enemies.map' is missing in props validation     react/prop-types

/github/workspace/src/ui/components/list/NPCList.js
  5:20  error  'npcs' is missing in props validation         react/prop-types
  5:26  error  'onNPCClick' is missing in props validation   react/prop-types
  7:9   error  'npcs.length' is missing in props validation  react/prop-types
  8:9   error  'npcs.map' is missing in props validation     react/prop-types

/github/workspace/src/ui/components/list/StatList.js
  7:21  error  'baseStats' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/sections/ControlSection.js
  28:27  error  'clearCache' is missing in props validation  react/prop-types

/github/workspace/src/ui/components/sections/LogSection.js
  1:28  error  'useRef' is defined but never used  no-unused-vars

/github/workspace/src/ui/components/sections/NPCSection.js
   3:10  error  'useEffect' is defined but never used         no-unused-vars
  15:8   error  'allNpcs' is assigned a value but never used  no-unused-vars

/github/workspace/src/ui/hooks/useGameState.js
  16:8  error  'gameEngine' is assigned a value but never used  no-unused-vars

/github/workspace/src/ui/layouts/GameLayout.js
  20:23  error  'clearCache' is missing in props validation  react/prop-types

✖ 233 problems (233 errors, 0 warnings)Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration .
```

</details>

<details>

<summary>JSCPD</summary>

```text
Clone found (javascript):
 - /github/workspace/src/ui/components/sections/WorkersSection.js [43:9 - 51:10] (8 lines, 75 tokens)
   /github/workspace/src/ui/components/sections/WorkersSection.js [29:11 - 37:3]

Clone found (javascript):
 - /github/workspace/src/ui/components/display/LogDisplay.js [2:14 - 11:7] (9 lines, 95 tokens)
   /github/workspace/src/ui/components/sections/LogSection.js [5:24 - 14:6]

Clone found (css):
 - /github/workspace/src/styles/sections/places-section.css [131:7 - 160:19] (29 lines, 150 tokens)
   /github/workspace/src/styles/sections/places-section.css [107:11 - 134:12]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [60:15 - 77:36] (17 lines, 138 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [93:17 - 110:37]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [78:5 - 86:31] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [111:5 - 119:32]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [86:31 - 102:55] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [119:32 - 135:56]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [103:5 - 128:39] (25 lines, 213 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [136:5 - 161:40]

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [252:2 - 258:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [244:2 - 248:7]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [105:7 - 124:34] (19 lines, 171 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [58:7 - 110:37]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [125:5 - 133:29] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [111:5 - 119:32]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [133:29 - 149:53] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [119:32 - 135:56]

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [154:7 - 172:37] (18 lines, 166 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [143:7 - 161:40]

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

Clone found (javascript):
 - /github/workspace/src/game/engine/GameEngine.js [188:2 - 211:23] (23 lines, 138 tokens)
   /github/workspace/src/game/engine/GameEngine.js [148:2 - 171:35]

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
 - /github/workspace/src/data/inventory.js [47:3 - 76:7] (29 lines, 184 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [15:3 - 44:6]

Clone found (javascript):
 - /github/workspace/_test_/services/SpawnService.test.js [64:17 - 74:14] (10 lines, 94 tokens)
   /github/workspace/_test_/services/SpawnService.test.js [50:14 - 60:15]

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [162:9 - 180:2] (18 lines, 120 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [139:9 - 158:3]

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
 - /github/workspace/_test_/inventoryThunks.test.js [95:9 - 114:5] (19 lines, 120 tokens)
   /github/workspace/_test_/fixtures/stateBuilders.js [7:3 - 26:8]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [101:2 - 117:2] (16 lines, 96 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [47:13 - 62:2]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [168:4 - 190:13] (22 lines, 126 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [45:4 - 67:12]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [262:2 - 278:2] (16 lines, 93 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [45:4 - 61:3]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [310:13 - 327:8] (17 lines, 106 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [101:13 - 118:9]

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [351:7 - 376:2] (25 lines, 158 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [32:7 - 58:15]

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
 - /github/workspace/src/ui/components/sections/WorkersSection.js [43:9 - 51:10] (8 lines, 75 tokens)
   /github/workspace/src/ui/components/sections/WorkersSection.js [29:11 - 37:3]

 43 │ 29 │ .map((w) => (
 44 │ 30 │               <WorkerCard
 45 │ 31 │                 key={w.id}
 46 │ 32 │                 worker={w}
 47 │ 33 │                 buildings={currentBuildings.map((id) => buildings[id])}
 48 │ 34 │               />
 49 │ 35 │             ))
 50 │ 36 │           ) : (
 51 │ 37 │             <div className="no-workers-message">Currently

Clone found (javascript):
 - /github/workspace/src/ui/components/display/LogDisplay.js [2:14 - 11:7] (9 lines, 95 tokens)
   /github/workspace/src/ui/components/sections/LogSection.js [5:24 - 14:6]

 2  │ 5  │ ;
 3  │ 6  │
 4  │ 7  │ const LOG_CATEGORIES = {
 5  │ 8  │   worker: { label: "Workers", color: "worker" },
 6  │ 9  │   combat: { label: "Combat", color: "combat" },
 7  │ 10 │   movement: { label: "Movement", color: "movement" },
 8  │ 11 │   default: { label: "Default", color: "default" },
 9  │ 12 │ };
 10 │ 13 │
 11 │ 14 │ export

Clone found (css):
 - /github/workspace/src/styles/sections/places-section.css [131:7 - 160:19] (29 lines, 150 tokens)
   /github/workspace/src/styles/sections/places-section.css [107:11 - 134:12]

 131 │ 107 │ ;
 132 │ 108 │ }
 133 │ 109 │
 134 │ 110 │ .place-info {
 135 │ 111 │   padding: 0.5rem;
 136 │ 112 │ }
 137 │ 113 │
 138 │ 114 │ .place-info h3 {
 139 │ 115 │   font-size: 2.8rem;
 140 │ 116 │   text-align: center;
 141 │ 117 │   background: linear-gradient(0deg, #a18624 10%, #bf9e2a 90%);
 142 │ 118 │   background-clip: text;
 143 │ 119 │   -webkit-text-fill-color: transparent;
 144 │ 120 │   filter: drop-shadow(0 4px 2px rgb(0 0 0 / 25%));
 145 │ 121 │ }
 146 │ 122 │
 147 │ 123 │ .place-description {
 148 │ 124 │   margin: 0.5rem 0;
 149 │ 125 │   color: #bdc3c7;
 150 │ 126 │ }
 151 │ 127 │
 152 │ 128 │ .place-id {
 153 │ 129 │   font-size: 0.8rem;
 154 │ 130 │   color: #95a5a6;
 155 │ 131 │   margin-top: 0.5rem;
 156 │ 132 │ }
 157 │ 133 │
 158 │ 134 │ .place-features,
 159 │ 135 │ .place-resources,
 160 │ 136 │ .place-connections

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [60:15 - 77:36] (17 lines, 138 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [93:17 - 110:37]

 60 │ 93  │ .message);
 61 │ 94  │         return;
 62 │ 95  │       }
 63 │ 96  │
 64 │ 97  │       // Try to stack with existing items
 65 │ 98  │       const existingItem = inventory.items.find((i) => canItemsStack(i, item));
 66 │ 99  │       if (existingItem && item.quantity) {
 67 │ 100 │         existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
 68 │ 101 │       } else {
 69 │ 102 │         // Add new item
 70 │ 103 │         inventory.items.push({
 71 │ 104 │           ...cloneItem(item),
 72 │ 105 │           quantity: item.quantity || 1,
 73 │ 106 │         });
 74 │ 107 │       }
 75 │ 108 │     },
 76 │ 109 │
 77 │ 110 │     // Remove item from place inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [78:5 - 86:31] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [111:5 - 119:32]

 78 │ 111 │ removeItem(state, action) {
 79 │ 112 │       const { inventoryId, itemId, quantity } = action.payload;
 80 │ 113 │       const inventory = state[inventoryId];
 81 │ 114 │       if (!inventory) return;
 82 │ 115 │
 83 │ 116 │       const itemValidation = validateItemExists(inventory, itemId);
 84 │ 117 │       if (!itemValidation.isValid) {
 85 │ 118 │         console.warn(
 86 │ 119 │           `Item ${itemId} not found in place inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [86:31 - 102:55] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [119:32 - 135:56]

 86  │ 119 │ ${inventoryId}`,
 87  │ 120 │         );
 88  │ 121 │         return;
 89  │ 122 │       }
 90  │ 123 │
 91  │ 124 │       const itemIndex = itemValidation.itemIndex;
 92  │ 125 │       const item = inventory.items[itemIndex];
 93  │ 126 │       const removeQuantity = quantity || item.quantity || 1;
 94  │ 127 │
 95  │ 128 │       if (removeQuantity >= (item.quantity || 1)) {
 96  │ 129 │         inventory.items.splice(itemIndex, 1);
 97  │ 130 │       } else {
 98  │ 131 │         item.quantity -= removeQuantity;
 99  │ 132 │       }
 100 │ 133 │     },
 101 │ 134 │
 102 │ 135 │     // Move item from place inventory to another inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [103:5 - 128:39] (25 lines, 213 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [136:5 - 161:40]

 103 │ 136 │ moveItem(state, action) {
 104 │ 137 │       const { fromInventoryId, toInventoryId, itemId, quantity } =
 105 │ 138 │         action.payload;
 106 │ 139 │
 107 │ 140 │       // This is a complex operation that involves both slices
 108 │ 141 │       // The actual move logic will be handled by a thunk
 109 │ 142 │       // This reducer just updates the local state
 110 │ 143 │       const inventory = state[fromInventoryId];
 111 │ 144 │       if (!inventory) return;
 112 │ 145 │
 113 │ 146 │       const itemValidation = validateItemExists(inventory, itemId);
 114 │ 147 │       if (!itemValidation.isValid) return;
 115 │ 148 │
 116 │ 149 │       const itemIndex = itemValidation.itemIndex;
 117 │ 150 │       const item = inventory.items[itemIndex];
 118 │ 151 │       const moveQuantity = quantity || item.quantity || 1;
 119 │ 152 │
 120 │ 153 │       // Update source inventory
 121 │ 154 │       if (moveQuantity < (item.quantity || 1)) {
 122 │ 155 │         item.quantity -= moveQuantity;
 123 │ 156 │       } else {
 124 │ 157 │         inventory.items.splice(itemIndex, 1);
 125 │ 158 │       }
 126 │ 159 │     },
 127 │ 160 │
 128 │ 161 │     // Update entire place inventory state

Clone found (javascript):
 - /github/workspace/src/store/slices/placeInventorySlice.js [252:2 - 258:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [244:2 - 248:7]

 252 │ 244 │ = createSelector(
 253 │ 245 │   [selectPlaceInventoryItems, (state, itemType) => itemType],
 254 │ 246 │   (items, itemType) => {
 255 │ 247 │     if (!Array.isArray(items)) return 0;
 256 │ 248 │     return items
 257 │ 249 │       .filter((item) => item.type === itemType)
 258 │ 250 │       .reduce

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [105:7 - 124:34] (19 lines, 171 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [58:7 - 110:37]

 105 │ 58 │ const slotValidation = validateSlotLimit(inventory, 1);
 106 │ 59 │       if (!slotValidation.isValid) {
 107 │ 60 │         console.warn(slotValidation.message);
 108 │ 61 │         return;
 109 │ 62 │       }
 110 │ 63 │
 111 │ 64 │       // Try to stack with existing items
 112 │ 65 │       const existingItem = inventory.items.find((i) => canItemsStack(i, item));
 113 │ 66 │       if (existingItem && item.quantity) {
 114 │ 67 │         existingItem.quantity = (existingItem.quantity || 1) + item.quantity;
 115 │ 68 │       } else {
 116 │ 69 │         // Add new item
 117 │ 70 │         inventory.items.push({
 118 │ 71 │           ...cloneItem(item),
 119 │ 72 │           quantity: item.quantity || 1,
 120 │ 73 │         });
 121 │ 74 │       }
 122 │ 75 │     },
 123 │ 76 │
 124 │ 77 │     // Remove item from NPC inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [125:5 - 133:29] (8 lines, 96 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [111:5 - 119:32]

 125 │ 111 │ removeItem(state, action) {
 126 │ 112 │       const { inventoryId, itemId, quantity } = action.payload;
 127 │ 113 │       const inventory = state[inventoryId];
 128 │ 114 │       if (!inventory) return;
 129 │ 115 │
 130 │ 116 │       const itemValidation = validateItemExists(inventory, itemId);
 131 │ 117 │       if (!itemValidation.isValid) {
 132 │ 118 │         console.warn(
 133 │ 119 │           `Item ${itemId} not found in NPC inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [133:29 - 149:53] (16 lines, 127 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [119:32 - 135:56]

 133 │ 119 │ ${inventoryId}`,
 134 │ 120 │         );
 135 │ 121 │         return;
 136 │ 122 │       }
 137 │ 123 │
 138 │ 124 │       const itemIndex = itemValidation.itemIndex;
 139 │ 125 │       const item = inventory.items[itemIndex];
 140 │ 126 │       const removeQuantity = quantity || item.quantity || 1;
 141 │ 127 │
 142 │ 128 │       if (removeQuantity >= (item.quantity || 1)) {
 143 │ 129 │         inventory.items.splice(itemIndex, 1);
 144 │ 130 │       } else {
 145 │ 131 │         item.quantity -= removeQuantity;
 146 │ 132 │       }
 147 │ 133 │     },
 148 │ 134 │
 149 │ 135 │     // Move item from NPC inventory to another inventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [154:7 - 172:37] (18 lines, 166 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [143:7 - 161:40]

 154 │ 143 │ const inventory = state[fromInventoryId];
 155 │ 144 │       if (!inventory) return;
 156 │ 145 │
 157 │ 146 │       const itemValidation = validateItemExists(inventory, itemId);
 158 │ 147 │       if (!itemValidation.isValid) return;
 159 │ 148 │
 160 │ 149 │       const itemIndex = itemValidation.itemIndex;
 161 │ 150 │       const item = inventory.items[itemIndex];
 162 │ 151 │       const moveQuantity = quantity || item.quantity || 1;
 163 │ 152 │
 164 │ 153 │       // Update source inventory
 165 │ 154 │       if (moveQuantity < (item.quantity || 1)) {
 166 │ 155 │         item.quantity -= moveQuantity;
 167 │ 156 │       } else {
 168 │ 157 │         inventory.items.splice(itemIndex, 1);
 169 │ 158 │       }
 170 │ 159 │     },
 171 │ 160 │
 172 │ 161 │     // Update entire NPC inventory state

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [198:6 - 215:16] (17 lines, 115 tokens)
   /github/workspace/src/store/slices/playerInventorySlice.js [245:9 - 262:10]

 198 │ 245 │ ) {
 199 │ 246 │         if (typeof maxSlots === "number" && maxSlots > 0) {
 200 │ 247 │           inventory.maxSlots = maxSlots;
 201 │ 248 │         }
 202 │ 249 │         if (typeof maxWeight === "number" && maxWeight > 0) {
 203 │ 250 │           inventory.maxWeight = maxWeight;
 204 │ 251 │         }
 205 │ 252 │       }
 206 │ 253 │     },
 207 │ 254 │   },
 208 │ 255 │ });
 209 │ 256 │
 210 │ 257 │ export const {
 211 │ 258 │   addItem,
 212 │ 259 │   removeItem,
 213 │ 260 │   moveItem,
 214 │ 261 │   updateInventory,
 215 │ 262 │   addNpcInventory

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [259:24 - 267:24] (8 lines, 91 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [245:26 - 253:26]

 259 │ 245 │ , (state, itemType) => itemType],
 260 │ 246 │   (items, itemType) => {
 261 │ 247 │     if (!Array.isArray(items)) return 0;
 262 │ 248 │     return items.filter((item) => item.type === itemType).length;
 263 │ 249 │   },
 264 │ 250 │ );
 265 │ 251 │
 266 │ 252 │ export const selectTotalQuantityByItemType = createSelector(
 267 │ 253 │   [selectNpcInventoryItems

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [266:2 - 272:7] (6 lines, 79 tokens)
   /github/workspace/src/store/slices/npcInventorySlice.js [258:2 - 262:7]

 266 │ 258 │ = createSelector(
 267 │ 259 │   [selectNpcInventoryItems, (state, itemType) => itemType],
 268 │ 260 │   (items, itemType) => {
 269 │ 261 │     if (!Array.isArray(items)) return 0;
 270 │ 262 │     return items
 271 │ 263 │       .filter((item) => item.type === itemType)
 272 │ 264 │       .reduce

Clone found (javascript):
 - /github/workspace/src/store/slices/npcInventorySlice.js [267:24 - 276:18] (9 lines, 113 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [253:26 - 262:20]

 267 │ 253 │ , (state, itemType) => itemType],
 268 │ 254 │   (items, itemType) => {
 269 │ 255 │     if (!Array.isArray(items)) return 0;
 270 │ 256 │     return items
 271 │ 257 │       .filter((item) => item.type === itemType)
 272 │ 258 │       .reduce((total, item) => total + (item.quantity || 1), 0);
 273 │ 259 │   },
 274 │ 260 │ );
 275 │ 261 │
 276 │ 262 │ export default npcInventorySlice

Clone found (javascript):
 - /github/workspace/src/game/engine/GameEngine.js [188:2 - 211:23] (23 lines, 138 tokens)
   /github/workspace/src/game/engine/GameEngine.js [148:2 - 171:35]

 188 │ 148 │ );
 189 │ 149 │   }
 190 │ 150 │
 191 │ 151 │   // Get workers assigned to a specific building (now handled by ProductionService)
 192 │ 152 │   getAssignedWorkers(state, buildingId) {
 193 │ 153 │     return this.productionService.getAssignedWorkers(state, buildingId);
 194 │ 154 │   }
 195 │ 155 │
 196 │ 156 │   // Calculate production rate for a building (now handled by ProductionService)
 197 │ 157 │   calculateProductionRate(building, state) {
 198 │ 158 │     return this.productionService.calculateProductionRate(building, state);
 199 │ 159 │   }
 200 │ 160 │
 201 │ 161 │   // Validate that a building can produce (now handled by ProductionService)
 202 │ 162 │   canBuildingProduce(state, buildingId) {
 203 │ 163 │     return this.productionService.canBuildingProduce(state, buildingId);
 204 │ 164 │   }
 205 │ 165 │
 206 │ 166 │   // Get all production calculations for UI purposes (now handled by ProductionService)
 207 │ 167 │   getAllProductionCalculations(state) {
 208 │ 168 │     return this.productionService.getAllProductionCalculations(state);
 209 │ 169 │   }
 210 │ 170 │
 211 │ 171 │   // Start the game loop

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
 3  │ 22 │   player: {
 4  │ 23 │     id: "player",
 5  │ 24 │     type: "player",
 6  │ 25 │     playerId: "1",
 7  │ 26 │     maxSlots: 20,
 8  │ 27 │     maxWeight: 100,
 9  │ 28 │     items: [
 10 │ 29 │       {
 11 │ 30 │         id: 1,
 12 │ 31 │         name: "apple",
 13 │ 32 │         description: "A fresh apple",
 14 │ 33 │         type: "consumable",
 15 │ 34 │         quantity: 5,
 16 │ 35 │         weight: 0.5,
 17 │ 36 │         consumable: { heal: 10 },
 18 │ 37 │       },
 19 │ 38 │       {
 20 │ 39 │         id: "leather-hood",
 21 │ 40 │         name: "rusty armor",
 22 │ 41 │         description: "A sturdy piece of armor",
 23 │ 42 │         type: "equipment",
 24 │ 43 │         piece: "body",
 25 │ 44 │         quantity: 1,
 26 │ 45 │         stats: { defense: 10 },
 27 │ 46 │         weight: 15,
 28 │ 47 │       },
 29 │ 48 │       {
 30 │ 49 │         id: 2,
 31 │ 50 │         name: "banana",
 32 │ 51 │         description: "A ripe banana",
 33 │ 52 │         type: "consumable",
 34 │ 53 │         quantity: 3,
 35 │ 54 │         weight: 0.5,
 36 │ 55 │         consumable: { heal: 12 },
 37 │ 56 │       },
 38 │ 57 │     ],
 39 │ 58 │     equipment: {
 40 │ 59 │       head: null,
 41 │ 60 │       body: null,
 42 │ 61 │       pants: null,
 43 │ 62 │       "main-weapon": null,
 44 │ 63 │       "second-weapon": null,
 45 │ 64 │     },
 46 │ 65 │   },
 47 │ 66 │   village_center

Clone found (javascript):
 - /github/workspace/src/data/inventory.js [47:3 - 76:7] (29 lines, 184 tokens)
   /github/workspace/src/store/slices/placeInventorySlice.js [15:3 - 44:6]

 47 │ 15 │ village_center: {
 48 │ 16 │     id: "village_center",
 49 │ 17 │     placeId: "village_center",
 50 │ 18 │     type: "place",
 51 │ 19 │     maxSlots: 30,
 52 │ 20 │     items: [
 53 │ 21 │       {
 54 │ 22 │         id: 1,
 55 │ 23 │         name: "apple",
 56 │ 24 │         description: "A fresh apple",
 57 │ 25 │         type: "consumable",
 58 │ 26 │         quantity: 10,
 59 │ 27 │         weight: 0.5,
 60 │ 28 │         consumable: { heal: 10 },
 61 │ 29 │       },
 62 │ 30 │       {
 63 │ 31 │         id: "leather-hood",
 64 │ 32 │         name: "rusty armor",
 65 │ 33 │         description: "A sturdy piece of armor",
 66 │ 34 │         type: "equipment",
 67 │ 35 │         piece: "body",
 68 │ 36 │         quantity: 1,
 69 │ 37 │         stats: { defense: 12 },
 70 │ 38 │         weight: 18,
 71 │ 39 │       },
 72 │ 40 │     ],
 73 │ 41 │   },
 74 │ 42 │ };
 75 │ 43 │
 76 │ 44 │ export

Clone found (javascript):
 - /github/workspace/_test_/services/SpawnService.test.js [64:17 - 74:14] (10 lines, 94 tokens)
   /github/workspace/_test_/services/SpawnService.test.js [50:14 - 60:15]

 64 │ 50 │ ;
 65 │ 51 │       // Get the enterPlace handler and call it directly
 66 │ 52 │       const enterPlaceHandler = eventBusService.on.mock.calls.find(
 67 │ 53 │         (call) => call[0] === "enterPlace",
 68 │ 54 │       )?.[1];
 69 │ 55 │       if (enterPlaceHandler) {
 70 │ 56 │         enterPlaceHandler(placeId);
 71 │ 57 │       }
 72 │ 58 │
 73 │ 59 │       expect(spawnService.currentPlaceId).toBe(placeId);
 74 │ 60 │       expect(spawnService.getSpawner(placeId)).toBeUndefined

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [162:9 - 180:2] (18 lines, 120 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [139:9 - 158:3]

 162 │ 139 │ productionType: "wood",
 163 │ 140 │       };
 164 │ 141 │       const state = createStateWithWorkers([
 165 │ 142 │         { id: "worker1", assignedBuildingId: "sawmill" },
 166 │ 143 │       ]);
 167 │ 144 │       const deltaTime = 1000;
 168 │ 145 │
 169 │ 146 │       productionService.processBuildingProduction(
 170 │ 147 │         "sawmill",
 171 │ 148 │         building,
 172 │ 149 │         state,
 173 │ 150 │         deltaTime,
 174 │ 151 │       );
 175 │ 152 │
 176 │ 153 │       // Should not create items
 177 │ 154 │       expect(mockItemFactory.create).not.toHaveBeenCalled();
 178 │ 155 │       expect(mockInventoryService.addItemToInventory).not.toHaveBeenCalled();
 179 │ 156 │     });
 180 │ 157 │   }

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [336:12 - 351:66] (15 lines, 86 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [308:17 - 323:54]

 336 │ 308 │ ],
 337 │ 309 │           },
 338 │ 310 │         },
 339 │ 311 │         placeInventory: {
 340 │ 312 │           village_center: { items: [] },
 341 │ 313 │         },
 342 │ 314 │       };
 343 │ 315 │
 344 │ 316 │       const result = productionService.findClosestPlaceWithInventory(
 345 │ 317 │         "river_crossing",
 346 │ 318 │         state,
 347 │ 319 │       );
 348 │ 320 │       expect(result).toBe("village_center");
 349 │ 321 │     });
 350 │ 322 │
 351 │ 323 │     it("should fallback to village_center when no other inventory found"

Clone found (javascript):
 - /github/workspace/_test_/services/ProductionService.test.js [356:12 - 375:75] (19 lines, 112 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [304:17 - 323:54]

 356 │ 304 │ ],
 357 │ 305 │           },
 358 │ 306 │           farmlands: {
 359 │ 307 │             hasInventory: false,
 360 │ 308 │             connections: ["river_crossing"],
 361 │ 309 │           },
 362 │ 310 │         },
 363 │ 311 │         placeInventory: {
 364 │ 312 │           village_center: { items: [] },
 365 │ 313 │         },
 366 │ 314 │       };
 367 │ 315 │
 368 │ 316 │       const result = productionService.findClosestPlaceWithInventory(
 369 │ 317 │         "river_crossing",
 370 │ 318 │         state,
 371 │ 319 │       );
 372 │ 320 │       expect(result).toBe("village_center");
 373 │ 321 │     });
 374 │ 322 │
 375 │ 323 │     it("should return current place as fallback when no inventory found anywhere"

Clone found (javascript):
 - /github/workspace/_test_/mocks/itemFactory.mock.js [2:2 - 10:7] (8 lines, 93 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [18:2 - 26:2]

 2  │ 18 │ {
 3  │ 19 │   create: vi.fn((type, quantity) => ({
 4  │ 20 │     id: `${type}-${Date.now()}`,
 5  │ 21 │     name: type,
 6  │ 22 │     type: "material",
 7  │ 23 │     quantity: Math.max(1, Math.floor(quantity || 1)),
 8  │ 24 │     weight: 1,
 9  │ 25 │   })),
 10 │ 26 │   _reset

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [302:7 - 316:11] (14 lines, 109 tokens)
   /github/workspace/_test_/services/ProductionService.test.js [132:7 - 146:18]

 302 │ 132 │ , 8);
 303 │ 133 │       });
 304 │ 134 │
 305 │ 135 │       it("should handle zero production gracefully", () => {
 306 │ 136 │         const building = {
 307 │ 137 │           id: "sawmill",
 308 │ 138 │           calculateProduction: () => 0,
 309 │ 139 │           productionType: "wood",
 310 │ 140 │         };
 311 │ 141 │         const state = createStateWithWorkers([
 312 │ 142 │           { id: "worker1", assignedBuildingId: "sawmill" },
 313 │ 143 │         ]);
 314 │ 144 │         const deltaTime = 1000;
 315 │ 145 │
 316 │ 146 │         gameEngine

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [308:2 - 323:2] (15 lines, 97 tokens)
   /github/workspace/_test_/gameEngine/gameEngine.test.js [287:2 - 302:2]

 308 │ 287 │ ,
 309 │ 288 │           productionType: "wood",
 310 │ 289 │         };
 311 │ 290 │         const state = createStateWithWorkers([
 312 │ 291 │           { id: "worker1", assignedBuildingId: "sawmill" },
 313 │ 292 │         ]);
 314 │ 293 │         const deltaTime = 1000;
 315 │ 294 │
 316 │ 295 │         gameEngine.processBuildingProduction(
 317 │ 296 │           "sawmill",
 318 │ 297 │           building,
 319 │ 298 │           state,
 320 │ 299 │           deltaTime,
 321 │ 300 │         );
 322 │ 301 │
 323 │ 302 │         expect(mockItemFactory.create).toHaveBeenCalledWith("wood", 0

Clone found (javascript):
 - /github/workspace/_test_/gameEngine/gameEngine.test.js [514:56 - 529:28] (15 lines, 121 tokens)
   /github/workspace/_test_/gameEngine/gameEngine.test.js [479:68 - 495:2]

 514 │ 479 │ , () => {
 515 │ 480 │       const buildings = {
 516 │ 481 │         sawmill: {
 517 │ 482 │           id: "sawmill",
 518 │ 483 │           calculateProduction: () => 10,
 519 │ 484 │           productionType: "wood",
 520 │ 485 │         },
 521 │ 486 │         mine: {
 522 │ 487 │           id: "mine",
 523 │ 488 │           baseProductionRate: 5,
 524 │ 489 │           productionType: "stone",
 525 │ 490 │         },
 526 │ 491 │       };
 527 │ 492 │       const state = {
 528 │ 493 │         ...createStateWithWorkers([
 529 │ 494 │           { id: "worker1", assignedBuildingId: "sawmill" }, // Only assigned to sawmill

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
 - /github/workspace/_test_/inventoryThunks.test.js [95:9 - 114:5] (19 lines, 120 tokens)
   /github/workspace/_test_/fixtures/stateBuilders.js [7:3 - 26:8]

 95  │ 7  │ playerInventory: {
 96  │ 8  │           player: {
 97  │ 9  │             id: "player",
 98  │ 10 │             type: "player",
 99  │ 11 │             maxSlots: 20,
 100 │ 12 │             maxWeight: 100,
 101 │ 13 │             items: [],
 102 │ 14 │             equipment: {
 103 │ 15 │               head: null,
 104 │ 16 │               body: null,
 105 │ 17 │               pants: null,
 106 │ 18 │               "main-weapon": null,
 107 │ 19 │               "second-weapon": null,
 108 │ 20 │             },
 109 │ 21 │           },
 110 │ 22 │         },
 111 │ 23 │         placeInventory: {
 112 │ 24 │           village_center: {
 113 │ 25 │             id: "village_center",
 114 │ 26 │             type

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [101:2 - 117:2] (16 lines, 96 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [47:13 - 62:2]

 101 │ 47 │ ],
 102 │ 48 │             equipment: {
 103 │ 49 │               head: null,
 104 │ 50 │               body: null,
 105 │ 51 │               pants: null,
 106 │ 52 │               "main-weapon": null,
 107 │ 53 │               "second-weapon": null,
 108 │ 54 │             },
 109 │ 55 │           },
 110 │ 56 │         },
 111 │ 57 │         placeInventory: {
 112 │ 58 │           village_center: {
 113 │ 59 │             id: "village_center",
 114 │ 60 │             type: "place",
 115 │ 61 │             maxSlots: 30,
 116 │ 62 │             items: [
 117 │ 63 │               {

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [168:4 - 190:13] (22 lines, 126 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [45:4 - 67:12]

 168 │ 45 │ ,
 169 │ 46 │               },
 170 │ 47 │             ],
 171 │ 48 │             equipment: {
 172 │ 49 │               head: null,
 173 │ 50 │               body: null,
 174 │ 51 │               pants: null,
 175 │ 52 │               "main-weapon": null,
 176 │ 53 │               "second-weapon": null,
 177 │ 54 │             },
 178 │ 55 │           },
 179 │ 56 │         },
 180 │ 57 │         placeInventory: {
 181 │ 58 │           village_center: {
 182 │ 59 │             id: "village_center",
 183 │ 60 │             type: "place",
 184 │ 61 │             maxSlots: 30,
 185 │ 62 │             items: [],
 186 │ 63 │           },
 187 │ 64 │         },
 188 │ 65 │       };
 189 │ 66 │
 190 │ 67 │       const testStore = createTestStore(partialState

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [262:2 - 278:2] (16 lines, 93 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [45:4 - 61:3]

 262 │ 45 │ ,
 263 │ 46 │               },
 264 │ 47 │             ],
 265 │ 48 │             equipment: {
 266 │ 49 │               head: null,
 267 │ 50 │               body: null,
 268 │ 51 │               pants: null,
 269 │ 52 │               "main-weapon": null,
 270 │ 53 │               "second-weapon": null,
 271 │ 54 │             },
 272 │ 55 │           },
 273 │ 56 │         },
 274 │ 57 │         placeInventory: {
 275 │ 58 │           village_center: {
 276 │ 59 │             id: "village_center",
 277 │ 60 │             type: "place",
 278 │ 61 │             maxSlots: 1

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [310:13 - 327:8] (17 lines, 106 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [101:13 - 118:9]

 310 │ 101 │ items: [],
 311 │ 102 │             equipment: {
 312 │ 103 │               head: null,
 313 │ 104 │               body: null,
 314 │ 105 │               pants: null,
 315 │ 106 │               "main-weapon": null,
 316 │ 107 │               "second-weapon": null,
 317 │ 108 │             },
 318 │ 109 │           },
 319 │ 110 │         },
 320 │ 111 │         placeInventory: {
 321 │ 112 │           village_center: {
 322 │ 113 │             id: "village_center",
 323 │ 114 │             type: "place",
 324 │ 115 │             maxSlots: 30,
 325 │ 116 │             items: [
 326 │ 117 │               {
 327 │ 118 │                 id: "heavy"

Clone found (javascript):
 - /github/workspace/_test_/inventoryThunks.test.js [351:7 - 376:2] (25 lines, 158 tokens)
   /github/workspace/_test_/inventoryThunks.test.js [32:7 - 58:15]

 351 │ 32 │ const playerState = {
 352 │ 33 │         playerInventory: {
 353 │ 34 │           player: {
 354 │ 35 │             id: "player",
 355 │ 36 │             type: "player",
 356 │ 37 │             maxSlots: 20,
 357 │ 38 │             maxWeight: 100,
 358 │ 39 │             items: [
 359 │ 40 │               {
 360 │ 41 │                 id: "apple1",
 361 │ 42 │                 name: "apple",
 362 │ 43 │                 type: "consumable",
 363 │ 44 │                 quantity: 5,
 364 │ 45 │                 weight: 0.5,
 365 │ 46 │               },
 366 │ 47 │             ],
 367 │ 48 │             equipment: {
 368 │ 49 │               head: null,
 369 │ 50 │               body: null,
 370 │ 51 │               pants: null,
 371 │ 52 │               "main-weapon": null,
 372 │ 53 │               "second-weapon": null,
 373 │ 54 │             },
 374 │ 55 │           },
 375 │ 56 │         },
 376 │ 57 │         placeInventory: {}

Clone found (javascript):
 - /github/workspace/_test_/enemiesSlice.test.js [89:57 - 98:6] (9 lines, 110 tokens)
   /github/workspace/_test_/enemiesSlice.test.js [52:37 - 61:2]

 89 │ 52 │ , () => {
 90 │ 53 │     let s = enemiesReducer(
 91 │ 54 │       state,
 92 │ 55 │       addEnemy({ placeId: "p1", enemy: { id: "e1", health: 1 } }),
 93 │ 56 │     );
 94 │ 57 │     s = enemiesReducer(
 95 │ 58 │       s,
 96 │ 59 │       addEnemy({ placeId: "p2", enemy: { id: "e2", health: 1 } }),
 97 │ 60 │     );
 98 │ 61 │     const

Clone found (javascript):
 - /github/workspace/_test_/enemiesSlice.test.js [165:47 - 185:9] (20 lines, 135 tokens)
   /github/workspace/_test_/enemiesSlice.test.js [104:67 - 124:12]

 165 │ 104 │ , () => {
 166 │ 105 │       let s = enemiesReducer(
 167 │ 106 │         state,
 168 │ 107 │         addEnemy({
 169 │ 108 │           placeId: "test_place",
 170 │ 109 │           enemy: {
 171 │ 110 │             id: "enemy1",
 172 │ 111 │             health: 50,
 173 │ 112 │             attackPattern: "staggered",
 174 │ 113 │             attackDelayRange: [2000, 5000],
 175 │ 114 │           },
 176 │ 115 │         }),
 177 │ 116 │       );
 178 │ 117 │       s = enemiesReducer(
 179 │ 118 │         s,
 180 │ 119 │         addEnemy({
 181 │ 120 │           placeId: "test_place",
 182 │ 121 │           enemy: {
 183 │ 122 │             id: "enemy2",
 184 │ 123 │             health: 30,
 185 │ 124 │             attackPattern: "normal"

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [126:5 - 140:59] (14 lines, 79 tokens)
   /github/workspace/_test_/combatService.test.js [111:2 - 125:35]

 126 │ 111 │ ;
 127 │ 112 │
 128 │ 113 │     const enemy = {
 129 │ 114 │       id: "enemy1",
 130 │ 115 │       maxHealth: 10,
 131 │ 116 │     };
 132 │ 117 │
 133 │ 118 │     CombatService.handleEnemyDrops(enemy);
 134 │ 119 │
 135 │ 120 │     expect(mockStore.dispatch).not.toHaveBeenCalledWith(
 136 │ 121 │       addItem(expect.any(Object)),
 137 │ 122 │     );
 138 │ 123 │   });
 139 │ 124 │
 140 │ 125 │   it("should register combat system with correct configuration"

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [140:59 - 160:9] (20 lines, 113 tokens)
   /github/workspace/_test_/combatService.test.js [66:49 - 86:3]

 140 │ 66 │ , () => {
 141 │ 67 │     const wasInCombat = false;
 142 │ 68 │     const isInCombat = true;
 143 │ 69 │
 144 │ 70 │     CombatService.handleCombatStateChange(
 145 │ 71 │       wasInCombat,
 146 │ 72 │       isInCombat,
 147 │ 73 │       mockGameLoop,
 148 │ 74 │     );
 149 │ 75 │
 150 │ 76 │     expect(mockGameLoop.register).toHaveBeenCalledWith(
 151 │ 77 │       "combat",
 152 │ 78 │       expect.any(Function),
 153 │ 79 │       {
 154 │ 80 │         priority: 0, // Highest priority
 155 │ 81 │         interval: 100, // Every 100ms
 156 │ 82 │       },
 157 │ 83 │     );
 158 │ 84 │   });
 159 │ 85 │
 160 │ 86 │   describe

Clone found (javascript):
 - /github/workspace/_test_/combatService.test.js [162:2 - 182:7] (20 lines, 128 tokens)
   /github/workspace/_test_/combatService.test.js [14:2 - 34:2]

 162 │ 14 │ {
 163 │ 15 │         places: {
 164 │ 16 │           currentPlaceId: "village_center",
 165 │ 17 │           village_center: {
 166 │ 18 │             spawn: {
 167 │ 19 │               drops: [
 168 │ 20 │                 { itemId: "apple", dropRate: 0.5 },
 169 │ 21 │                 { itemId: "wood", dropRate: 0.3 },
 170 │ 22 │               ],
 171 │ 23 │             },
 172 │ 24 │           },
 173 │ 25 │         },
 174 │ 26 │         enemies: {
 175 │ 27 │           byId: {
 176 │ 28 │             enemy1: {
 177 │ 29 │               id: "enemy1",
 178 │ 30 │               placeId: "village_center",
 179 │ 31 │             },
 180 │ 32 │           },
 181 │ 33 │         },
 182 │ 34 │         player

Found 42 clones.
Error: ERROR: jscpd found too many duplicates (4.72%) over threshold (0%)
    at ThresholdReporter.report (/node_modules/@jscpd/finder/dist/index.js:615:13)
    at /node_modules/@jscpd/finder/dist/index.js:109:18
    at Array.forEach (<anonymous>)
    at /node_modules/@jscpd/finder/dist/index.js:108:22
    at async /node_modules/jscpd/dist/bin/jscpd.js:9:5ERROR: jscpd found too many duplicates (4.72%) over threshold (0%)
```

</details>

<details>

<summary>JSON</summary>

```text

/github/workspace/_test_/fixtures/gameStates/testStates.json
  49:32  error  Parsing error: Unexpected token '('

✖ 1 problem (1 error, 0 warnings)
```

</details>

<details>

<summary>JSON_PRETTIER</summary>

```text
.release-please-manifest.json 10ms
github_conf/branch_protection_rules.json 2ms
jsconfig.json 4ms
[90mpackage-lock.json[39m 79ms (unchanged)
package.json 2ms
release-please-config.json 4ms[[31merror[39m] _test_/fixtures/gameStates/testStates.json: SyntaxError: 'ArrowFunctionExpression' is not allowed in JSON. (49:32)
[[31merror[39m] [0m [90m 47 |[39m         [32m"id"[39m[33m:[39m [32m"sawmill"[39m[33m,[39m
[[31merror[39m]  [90m 48 |[39m         [32m"name"[39m[33m:[39m [32m"Sawmill"[39m[33m,[39m
[[31merror[39m] [31m[1m>[22m[39m[90m 49 |[39m         [32m"calculateProduction"[39m[33m:[39m () [33m=>[39m [35m10[39m[33m,[39m
[[31merror[39m]  [90m    |[39m                                [31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m[31m[1m^[22m[39m
[[31merror[39m]  [90m 50 |[39m         [32m"productionType"[39m[33m:[39m [32m"wood"[39m[33m,[39m
[[31merror[39m]  [90m 51 |[39m         [32m"baseProductionRate"[39m[33m:[39m [35m5[39m
[[31merror[39m]  [90m 52 |[39m       }[0m
```

</details>

<details>

<summary>JSX</summary>

```text

/github/workspace/_test_/notificationSystem.test.jsx
  32:4  error  'React' must be in scope when using JSX  react/react-in-jsx-scope
  33:5  error  'React' must be in scope when using JSX  react/react-in-jsx-scope
  50:4  error  'React' must be in scope when using JSX  react/react-in-jsx-scope
  51:5  error  'React' must be in scope when using JSX  react/react-in-jsx-scope
  71:4  error  'React' must be in scope when using JSX  react/react-in-jsx-scope
  72:5  error  'React' must be in scope when using JSX  react/react-in-jsx-scope
  94:4  error  'React' must be in scope when using JSX  react/react-in-jsx-scope
  95:5  error  'React' must be in scope when using JSX  react/react-in-jsx-scope

✖ 8 problems (8 errors, 0 warnings)Warning: React version not specified in eslint-plugin-react settings. See https://github.com/jsx-eslint/eslint-plugin-react#configuration .
```

</details>

<details>

<summary>JSX_PRETTIER</summary>

```text
Checking formatting...[[33mwarn[39m] _test_/notificationSystem.test.jsx
[[33mwarn[39m] Code style issues found in the above file. Run Prettier with --write to fix.
```

</details>

<details>

<summary>MARKDOWN</summary>

```text
/github/workspace/CHANGELOG.md:72 error MD024/no-duplicate-heading Multiple headings with the same content [Context: "Features"]
/github/workspace/CHANGELOG.md:78 error MD024/no-duplicate-heading Multiple headings with the same content [Context: "Bug Fixes"]
/github/workspace/README.md:9 error MD001/heading-increment Heading levels should only increment by one level at a time [Expected: h3; Actual: h4]
```

</details>

<details>

<summary>NATURAL_LANGUAGE</summary>

```text

/github/workspace/CHANGELOG.md
  28:5   ✓ error  Incorrect term: “Bug Fixes”, use “Bugfixes” instead  terminology
  56:37  ✓ error  Incorrect term: “json”, use “JSON” instead           terminology
  78:5   ✓ error  Incorrect term: “Bug Fixes”, use “Bugfixes” instead  terminology

✖ 3 problems (3 errors, 0 warnings, 0 infos)
✓ 3 fixable problems.
Try to run: $ textlint --fix [file]
```

</details>

<details>

<summary>YAML_PRETTIER</summary>

```text
Checking formatting...[[33mwarn[39m] .github/workflows/deploy-pages.yml
[[33mwarn[39m] Code style issues found in the above file. Run Prettier with --write to fix.
```

</details>
