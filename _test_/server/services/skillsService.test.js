import { describe, it, expect, vi, beforeEach } from "vitest";
import { SkillsService } from "../../../server/services/SkillsService.js";

describe("SkillsService", () => {
  let playerState, broadcaster, ss;

  beforeEach(() => {
    playerState = { loadSkills: vi.fn(), saveSkills: vi.fn() };
    broadcaster = { broadcast: vi.fn() };
    ss = new SkillsService(null, playerState, broadcaster);
  });

  it("activateSkill returns error if skill not learned", async () => {
    playerState.loadSkills.mockResolvedValue({});
    const result = await ss.activateSkill("s1", "mining");
    expect(result.error).toBe("Skill not learned");
  });

  it("activateSkill activates skill and broadcasts", async () => {
    playerState.loadSkills.mockResolvedValue({ mining: { level: 1, cooldown: 0 } });
    const result = await ss.activateSkill("s1", "mining");
    expect(result.success).toBe(true);
    expect(playerState.saveSkills).toHaveBeenCalled();
    expect(broadcaster.broadcast).toHaveBeenCalled();
  });
});
