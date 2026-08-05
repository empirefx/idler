import { describe, it, expect, vi, beforeEach } from "vitest";
import { QuestService } from "../../../server/services/QuestService.js";

describe("QuestService", () => {
  let playerState, questState, broadcaster, qs;

  beforeEach(() => {
    playerState = {};
    questState = { saveActive: vi.fn(), loadActive: vi.fn().mockResolvedValue({}), deleteActive: vi.fn(), saveCompleted: vi.fn(), loadCompleted: vi.fn().mockResolvedValue({}) };
    broadcaster = { broadcast: vi.fn() };
    qs = new QuestService(null, playerState, questState, broadcaster);
  });

  it("accept saves active quest and broadcasts", async () => {
    const result = await qs.accept("s1", "quest_1");
    expect(result.success).toBe(true);
    expect(questState.saveActive).toHaveBeenCalledWith("s1", "quest_1", expect.objectContaining({ questId: "quest_1" }));
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "QUEST_UPDATE", expect.any(Object));
  });

  it("accept returns error if quest already active", async () => {
    questState.loadActive.mockResolvedValue({ quest_1: { questId: "quest_1", startedAt: Date.now(), objectives: {} } });
    questState.loadCompleted.mockResolvedValue({});
    const result = await qs.accept("s1", "quest_1");
    expect(result.error).toBe("Quest already active");
    expect(questState.saveActive).not.toHaveBeenCalled();
  });

  it("accept returns error if quest already completed", async () => {
    questState.loadActive.mockResolvedValue({});
    questState.loadCompleted.mockResolvedValue({ quest_1: { completedAt: Date.now() } });
    const result = await qs.accept("s1", "quest_1");
    expect(result.error).toBe("Quest already completed");
    expect(questState.saveActive).not.toHaveBeenCalled();
  });

  it("complete returns error if quest not active", async () => {
    questState.loadActive.mockResolvedValue({});
    const result = await qs.complete("s1", "quest_1");
    expect(result.error).toBe("Quest not active");
  });

  it("complete deletes active and saves completed", async () => {
    questState.loadActive.mockResolvedValue({ quest_1: { questId: "quest_1", startedAt: Date.now(), objectives: {} } });
    const result = await qs.complete("s1", "quest_1");
    expect(result.success).toBe(true);
    expect(questState.deleteActive).toHaveBeenCalledWith("s1", "quest_1");
    expect(questState.saveCompleted).toHaveBeenCalled();
  });
});
