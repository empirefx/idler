import { describe, it, expect, vi } from "vitest";
import { createBroadcaster } from "../../server/broadcast.js";
import { decode } from "../../shared/protocol.js";

describe("createBroadcaster", () => {
  it("sends the sessionId and an encoded frame to the matching session via sendFn", () => {
    const sendFn = vi.fn();
    const bc = createBroadcaster();
    bc.setSendFn(sendFn);
    bc.broadcast("sess-1", "DIFF", { path: "player.gold", data: 150 });
    const [sessionId, frame] = sendFn.mock.calls[0];
    expect(sessionId).toBe("sess-1");
    const decoded = decode(new Uint8Array(frame));
    expect(decoded).toEqual({ type: "DIFF", data: { path: "player.gold", data: 150 } });
  });
});
