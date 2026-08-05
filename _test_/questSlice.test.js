import { describe, it, expect } from "vitest";
import questReducer, {
	setQuests,
	questAccepted,
	questCompleted,
	updateQuest,
} from "../src/store/slices/questSlice";

describe("questSlice", () => {
	it("setQuests normalizes { active, completed } into activeById/completedQuests", () => {
		const state = questReducer(
			undefined,
			setQuests({
				active: { q1: { questId: "q1", startedAt: 1, objectives: {} } },
				completed: { q2: { completedAt: 2 } },
			}),
		);
		expect(state.activeById).toEqual({ q1: { questId: "q1", startedAt: 1, objectives: {} } });
		expect(state.completedQuests).toEqual({ q2: { completedAt: 2 } });
		expect(state.active).toBeUndefined();
		expect(state.completed).toBeUndefined();
	});

	it("setQuests accepts the direct activeById/completedQuests shape as well", () => {
		const state = questReducer(
			undefined,
			setQuests({ activeById: { q1: { questId: "q1" } }, completedQuests: { q2: {} } }),
		);
		expect(state.activeById).toEqual({ q1: { questId: "q1" } });
		expect(state.completedQuests).toEqual({ q2: {} });
	});

	it("questAccepted adds to activeById without overwriting existing progress", () => {
		let state = questReducer(undefined, { type: "" });
		state = questReducer(state, questAccepted({ questId: "q1", progress: { questId: "q1" } }));
		state = questReducer(
			state,
			questAccepted({ questId: "q1", progress: { questId: "q1", startedAt: 99 } }),
		);
		expect(state.activeById.q1.startedAt).toBeUndefined();
	});

	it("questCompleted moves a quest from activeById to completedQuests", () => {
		let state = questReducer(undefined, { type: "" });
		state = questReducer(state, questAccepted({ questId: "q1", progress: { questId: "q1" } }));
		state = questReducer(state, questCompleted({ questId: "q1" }));
		expect(state.activeById).toEqual({});
		expect(state.completedQuests.q1.completedAt).toBeTypeOf("number");
	});

	it("updateQuest merges progress into an active quest entry", () => {
		let state = questReducer(undefined, { type: "" });
		state = questReducer(
			state,
			questAccepted({ questId: "q1", progress: { questId: "q1", progress: {} } }),
		);
		state = questReducer(
			state,
			updateQuest({ questId: "q1", data: { progress: { monstersKilled: 3 } } }),
		);
		expect(state.activeById.q1.progress).toEqual({ monstersKilled: 3 });
	});
});
