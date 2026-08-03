import { describe, it, expect } from "vitest";
import playerReducer, {
	setPlayerState,
	selectAutoCombat,
	selectIsDead,
	selectDerivedStats,
	selectActiveCooldowns,
	selectPausedCooldowns,
} from "../src/store/slices/playerSlice";

describe("playerSlice", () => {
	it("starts with combat fields at defaults", () => {
		const state = playerReducer(undefined, { type: "" });
		expect(state.autoCombat).toBe(false);
		expect(state.isDead).toBe(false);
		expect(state.activeBuffs).toEqual([]);
		expect(state.activeCooldowns).toEqual({});
		expect(state.pausedCooldowns).toEqual({});
		expect(state.derivedStats).toBeNull();
	});

	it("setPlayerState merges server fields", () => {
		const state = playerReducer(undefined, setPlayerState({
			autoCombat: true,
			isDead: true,
			derivedStats: { damageType: "physical" },
			activeCooldowns: { shieldBash: 12345 },
		}));
		expect(selectAutoCombat({ player: state })).toBe(true);
		expect(selectIsDead({ player: state })).toBe(true);
		expect(selectDerivedStats({ player: state })).toEqual({ damageType: "physical" });
		expect(selectActiveCooldowns({ player: state })).toEqual({ shieldBash: 12345 });
	});

	it("selectPausedCooldowns returns stored paused cooldowns or empty object", () => {
		const withPaused = playerReducer(undefined, setPlayerState({ pausedCooldowns: { shieldBash: 5000 } }));
		expect(selectPausedCooldowns({ player: withPaused })).toEqual({ shieldBash: 5000 });
		expect(selectPausedCooldowns({ player: {} })).toEqual({});
	});
});
