import { describe, it, expect, vi, beforeEach } from "vitest";
import { BuildingService } from "../../../server/services/BuildingService.js";

describe("BuildingService", () => {
  let buildingsState, broadcaster, bs;

  beforeEach(() => {
    buildingsState = { save: vi.fn() };
    broadcaster = { broadcast: vi.fn() };
    bs = new BuildingService(null, buildingsState, broadcaster);
  });

  it("build saves building and broadcasts", async () => {
    const result = await bs.build("s1", "forest", 0, "woodcutter");
    expect(result.success).toBe(true);
    expect(buildingsState.save).toHaveBeenCalledWith("s1", "forest:0", { id: "woodcutter", level: 1, placeId: "forest", socketIndex: 0 });
    expect(broadcaster.broadcast).toHaveBeenCalled();
  });
});
