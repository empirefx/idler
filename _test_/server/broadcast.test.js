import { describe, it, expect, vi } from "vitest";
import { createBroadcaster } from "../../server/broadcast.js";

describe("createBroadcaster", () => {
  it("sends JSON-stringified event via sendFn", () => {
    const sendFn = vi.fn();
    const bc = createBroadcaster();
    bc.setSendFn(sendFn);
    bc.broadcast("DIFF", { path: "player.gold", data: 150 });
    expect(sendFn).toHaveBeenCalledWith(JSON.stringify({ type: "DIFF", data: { path: "player.gold", data: 150 } }));
  });
});
