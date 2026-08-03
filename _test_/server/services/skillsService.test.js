import { describe, it, expect, vi, beforeEach } from "vitest";
import { SkillsService } from "../../../server/services/SkillsService.js";

describe("SkillsService", () => {
  let playerState, inventoryState, broadcaster, ss;

  const physicalWeapon = { id: "w1", type: "main-weapon", icon: "sword1", name: "Rusty Shortblade", damageType: "physical" };
  const seedStaff = { id: "w2", type: "main-weapon", icon: "staff1", name: "Wooden Staff" }; // no damageType -> catalog magic

  beforeEach(() => {
    playerState = {
      loadSkills: vi.fn(),
      saveSkills: vi.fn(),
      load: vi.fn(),
      save: vi.fn(),
    };
    inventoryState = {
      load: vi.fn().mockResolvedValue({ equipment: { "main-weapon": { ...physicalWeapon } } }),
    };
    broadcaster = { broadcast: vi.fn() };
    ss = new SkillsService(null, playerState, inventoryState, broadcaster);
  });

  it("fresh player spends the first point successfully (empty skills)", async () => {
    playerState.loadSkills.mockResolvedValue(null);
    playerState.load.mockResolvedValue({ skillPoints: 1 });
    const result = await ss.spendSkillPoint("s1", "warCry");
    expect(result.success).toBe(true);
    expect(playerState.saveSkills).toHaveBeenCalledWith("s1", { warCry: 1 });
    expect(playerState.save).toHaveBeenCalledWith("s1", { skillPoints: 0 });
    expect(result.skillPoints).toBe(0);
  });

  it("returns error when no weapon is equipped", async () => {
    inventoryState.load.mockResolvedValue({ equipment: {} });
    const result = await ss.spendSkillPoint("s1", "warCry");
    expect(result.error).toBe("Equip a weapon to spend skill points");
  });

  it("returns error for an unknown skill", async () => {
    const result = await ss.spendSkillPoint("s1", "nonexistent");
    expect(result.error).toBe("Skill not found");
  });

  it("returns error when the skill is not in the equipped weapon's column", async () => {
    const result = await ss.spendSkillPoint("s1", "fireball"); // magic skill, physical weapon
    expect(result.error).toBe("Skill not available for equipped weapon");
  });

  it("resolves the column from the item catalog for seed weapons lacking damageType", async () => {
    inventoryState.load.mockResolvedValue({ equipment: { "main-weapon": { ...seedStaff } } });
    playerState.loadSkills.mockResolvedValue({});
    playerState.load.mockResolvedValue({ skillPoints: 1 });
    const result = await ss.spendSkillPoint("s1", "fireball"); // magic skill, staff -> magic column
    expect(result.success).toBe(true);
    expect(playerState.saveSkills).toHaveBeenCalledWith("s1", { fireball: 1 });
  });

  it("returns error when rank is already max (3)", async () => {
    playerState.loadSkills.mockResolvedValue({ warCry: 3 });
    const result = await ss.spendSkillPoint("s1", "warCry");
    expect(result.error).toBe("Skill already at max rank");
  });

  it("returns error when no skill points are available", async () => {
    playerState.loadSkills.mockResolvedValue({});
    playerState.load.mockResolvedValue({ skillPoints: 0 });
    const result = await ss.spendSkillPoint("s1", "warCry");
    expect(result.error).toBe("No skill points available");
  });

  it("persists the new rank, decrements points, and broadcasts", async () => {
    playerState.loadSkills.mockResolvedValue({ warCry: 1 });
    playerState.load.mockResolvedValue({ skillPoints: 2 });
    const result = await ss.spendSkillPoint("s1", "warCry");
    expect(result.success).toBe(true);
    expect(playerState.saveSkills).toHaveBeenCalledWith("s1", { warCry: 2 });
    expect(playerState.save).toHaveBeenCalledWith("s1", { skillPoints: 1 });
    expect(result.skillPoints).toBe(1);
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.skills", data: { warCry: 2 } });
    expect(broadcaster.broadcast).toHaveBeenCalledWith("s1", "DIFF", { path: "player.skillPoints", data: 1 });
  });
});
