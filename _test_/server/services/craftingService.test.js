import { describe, it, expect, vi, beforeEach } from "vitest";
import { CraftingService } from "../../../server/services/CraftingService.js";

describe("CraftingService", () => {
  let playerState, inventoryState, broadcaster, cs;

  beforeEach(() => {
    playerState = { loadRecipes: vi.fn(), loadSkills: vi.fn(), saveSkills: vi.fn() };
    inventoryState = { load: vi.fn(), save: vi.fn() };
    broadcaster = { broadcast: vi.fn() };
    cs = new CraftingService(null, playerState, inventoryState, broadcaster);
  });

  it("craft returns error for unknown recipe", async () => {
    playerState.loadRecipes.mockResolvedValue([]);
    const result = await cs.craft("s1", "wood_sword");
    expect(result.error).toBe("Recipe not known");
  });

  it("craft broadcasts diff on success", async () => {
    playerState.loadRecipes.mockResolvedValue(["wood_sword"]);
    inventoryState.load.mockResolvedValue({ id: "player", items: [] });
    const result = await cs.craft("s1", "wood_sword");
    expect(result.success).toBe(true);
    expect(broadcaster.broadcast).toHaveBeenCalled();
  });
});
