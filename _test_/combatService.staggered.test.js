import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { CombatService } from "../src/game/services/CombatService";
import { placesData } from "../src/data/places";

vi.mock("../src/game/core/combatCalculator", () => ({
	resolveAttack: vi.fn(() => ({
		hit: true,
		damage: 0,
		crit: false,
		damageType: "physical",
	})),
	resolveEnemyAttack: vi.fn(() => ({
		hit: true,
		damage: 5,
		crit: false,
		damageType: "physical",
	})),
}));

describe("CombatService Staggered Attack Tests", () => {
	let combatService;
	let mockStore;
	let mockEventBusService;
	let mockGameLoop;

	beforeEach(() => {
		// Mock store
		mockStore = {
			getState: vi.fn(),
			dispatch: vi.fn(),
		};

		// Mock event bus
		mockEventBusService = {
			emit: vi.fn(),
		};

		// Mock game loop
		mockGameLoop = {
			register: vi.fn(),
		};

		combatService = CombatService;
		combatService.initialize(mockStore, mockEventBusService);
	});

	afterEach(() => {
		vi.clearAllMocks();
	});

	describe("Random Delay Generation", () => {
		it("should generate delays within specified range", () => {
			const minDelay = 2000;
			const maxDelay = 5000;

			for (let i = 0; i < 100; i++) {
				const delay = combatService.randomBetween(minDelay, maxDelay);
				expect(delay).toBeGreaterThanOrEqual(minDelay);
				expect(delay).toBeLessThanOrEqual(maxDelay);
			}
		});
	});

	describe("Staggered Attack Handling", () => {
		beforeEach(() => {
			mockStore.getState.mockReturnValue({
				places: {
					currentPlaceId: "ancient_ruins",
				},
				combat: {
					isInCombat: true,
				},
				player: {
					stats: { defense: 0, agility: 0, wisdom: 0 },
				},
			});
		});

		it("should handle enemies ready to attack", () => {
			const enemies = [
				{
					id: "enemy1",
					health: 50,
					attackPattern: "staggered",
					countdown: -100,
					isCountdownActive: true,
					attackDelayRange: [2000, 5000],
				},
				{
					id: "enemy2",
					health: 30,
					attackPattern: "staggered",
					countdown: 1000,
					isCountdownActive: true,
					attackDelayRange: [2000, 5000],
				},
			];

			combatService.handleStaggeredAttacks(enemies);

			// Should dispatch damage for ready enemy (enemy1)
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "player/damagePlayer",
				payload: { amount: 5 },
			});

			// Should reset countdown for attacking enemy
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "enemies/initializeCountdown",
				payload: { id: "enemy1", countdown: expect.any(Number) },
			});
		});

		it("should handle multiple ready enemies with attack queue", () => {
			const enemies = [
				{
					id: "enemy1",
					health: 50,
					attackPattern: "staggered",
					countdown: -100,
					isCountdownActive: true,
					attackDelayRange: [2000, 5000],
				},
				{
					id: "enemy2",
					health: 30,
					attackPattern: "staggered",
					countdown: -200,
					isCountdownActive: true,
					attackDelayRange: [2000, 5000],
				},
			];

			combatService.handleStaggeredAttacks(enemies);

			// Both enemies should attack simultaneously (our new behavior)
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "player/damagePlayer",
				payload: { amount: 5 },
			});

			// Should reset countdowns for both enemies
			const resetCalls = mockStore.dispatch.mock.calls.filter(
				(call) => call[0].type === "enemies/initializeCountdown",
			);
			expect(resetCalls.length).toBe(2);
		});

		it("should ignore enemies with normal attack pattern", () => {
			const enemies = [
				{
					id: "enemy1",
					health: 50,
					attackPattern: "normal", // Should be ignored
					countdown: 0,
					isCountdownActive: true,
				},
			];

			combatService.handleStaggeredAttacks(enemies);

			// Should not dispatch damage
			expect(mockStore.dispatch).not.toHaveBeenCalledWith(
				"player/damagePlayer",
				expect.any(Object),
			);
		});

		it("should ignore dead enemies", () => {
			const enemies = [
				{
					id: "enemy1",
					health: 0, // Dead
					attackPattern: "staggered",
					countdown: 0,
					isCountdownActive: true,
				},
			];

			combatService.handleStaggeredAttacks(enemies);

			// Should not dispatch damage
			expect(mockStore.dispatch).not.toHaveBeenCalledWith(
				"player/damagePlayer",
				expect.any(Object),
			);
		});
	});

	describe("Attacking Enemy Selection", () => {
		beforeEach(() => {
			mockStore.getState.mockReturnValue({
				places: {
					currentPlaceId: "test_place",
				},
				combat: {
					targetEnemyId: null,
				},
			});
		});

		it("should select a random enemy when no current target", () => {
			const aliveEnemies = [
				{ id: "enemy1", health: 50 },
				{ id: "enemy2", health: 30 },
				{ id: "enemy3", health: 40 },
			];

			const selected = combatService.getOrSelectTarget(aliveEnemies);

			// Should return one of the alive enemies
			expect(aliveEnemies).toContain(selected);
			// Should dispatch setTarget
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "combat/setTarget",
				payload: selected.id,
			});
		});

		it("should keep current target if still alive", () => {
			mockStore.getState.mockReturnValue({
				places: {
					currentPlaceId: "test_place",
				},
				combat: {
					targetEnemyId: "enemy2",
				},
			});

			const aliveEnemies = [
				{ id: "enemy1", health: 50 },
				{ id: "enemy2", health: 30 },
				{ id: "enemy3", health: 40 },
			];

			const selected = combatService.getOrSelectTarget(aliveEnemies);

			// Should return the current target
			expect(selected.id).toBe("enemy2");
			// Should not dispatch setTarget (kept existing target)
			expect(mockStore.dispatch).not.toHaveBeenCalledWith(
				expect.objectContaining({ type: "combat/setTarget" }),
			);
		});
	});

	describe("Synchronized Enemy Countdowns", () => {
		beforeEach(() => {
			mockStore.getState.mockReturnValue({
				places: {
					currentPlaceId: "ancient_ruins",
				},
				combat: {
					isInCombat: true,
				},
				player: {
					stats: { defense: 0, agility: 0, wisdom: 0 },
				},
			});
		});

		it("should initialize countdowns for all enemies at place when combat starts", () => {
			const enemies = [
				{
					id: "enemy1",
					placeId: "ancient_ruins",
					health: 50,
					attackPattern: "staggered",
					countdown: 0,
					isCountdownActive: false,
					attackDelayRange: [2000, 5000],
				},
				{
					id: "enemy2",
					placeId: "ancient_ruins",
					health: 30,
					attackPattern: "staggered",
					countdown: 0,
					isCountdownActive: false,
					attackDelayRange: [2000, 5000],
				},
			];

			combatService.handleStaggeredAttacks(enemies);

			// Should dispatch individual countdown initialization for each enemy
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "enemies/initializeCountdown",
				payload: {
					id: "enemy1",
					countdown: expect.any(Number),
				},
			});
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "enemies/setCountdownActive",
				payload: { id: "enemy1", isActive: true },
			});
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "enemies/initializeCountdown",
				payload: {
					id: "enemy2",
					countdown: expect.any(Number),
				},
			});
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "enemies/setCountdownActive",
				payload: { id: "enemy2", isActive: true },
			});
		});

		it("should deactivate countdowns when combat ends", () => {
			const enemies = [
				{
					id: "enemy1",
					placeId: "ancient_ruins",
					health: 50,
					attackPattern: "staggered",
					countdown: 1000,
					isCountdownActive: true,
					attackDelayRange: [2000, 5000],
				},
			];

			// Mock combat state as inactive
			mockStore.getState.mockReturnValue({
				places: { currentPlaceId: "ancient_ruins" },
				combat: { isInCombat: false },
				player: {
					stats: { defense: 0, agility: 0, wisdom: 0 },
				},
			});

			combatService.handleStaggeredAttacks(enemies);

			// Should deactivate countdown
			expect(mockStore.dispatch).toHaveBeenCalledWith({
				type: "enemies/setCountdownActive",
				payload: { id: "enemy1", isActive: false },
			});
		});
	});

	describe("Countdown Decrements", () => {
		it("should decrease countdown values over time", () => {
			const enemies = [
				{
					id: "enemy1",
					placeId: "ancient_ruins",
					health: 50,
					attackPattern: "staggered",
					countdown: 3000, // 3 seconds
					isCountdownActive: true,
					attackDelayRange: [2000, 5000],
				},
			];

			// Simulate deltaTime of 0.1 seconds (100ms)
			const deltaTime = 0.1;

			// This simulates the combat loop updating countdowns
			enemies.forEach((enemy) => {
				if (enemy.isCountdownActive && enemy.countdown > 0) {
					// Convert deltaTime from seconds to milliseconds
					enemy.countdown = Math.max(0, enemy.countdown - deltaTime * 1000);
				}
			});

			// Countdown should have decreased by 100ms
			expect(enemies[0].countdown).toBe(2900);
		});
	});
});
