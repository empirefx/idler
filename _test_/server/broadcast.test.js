import { describe, it, expect, vi } from "vitest";
import { createBroadcaster } from "../../server/broadcast.js";

describe("createBroadcaster", () => {
  it("sends the sessionId and JSON-stringified event to the matching session via sendFn", () => {
    const sendFn = vi.fn();
    const bc = createBroadcaster();
    bc.setSendFn(sendFn);
    bc.broadcast("sess-1", "DIFF", { path: "player.gold", data: 150 });
    expect(sendFn).toHaveBeenCalledWith("sess-1", JSON.stringify({ type: "DIFF", data: { path: "player.gold", data: 150 } }));
  });
});
