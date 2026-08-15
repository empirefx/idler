// server/messages/handlers/presence.js
export const presenceHandlers = [
  {
    type: "POKE",
    async handler(ctx, msg) {
      const { sessionId, broadcaster, presenceService, playerState } = ctx;
      const sender = presenceService.get(sessionId);
      if (!sender) {
        broadcaster.broadcast(sessionId, "POKE_ACK", { ok: false, reason: "TARGET_GONE" });
        return;
      }
      if (!presenceService.canPoke(sessionId)) {
        broadcaster.broadcast(sessionId, "POKE_ACK", { ok: false, reason: "RATE_LIMITED" });
        return;
      }
      const target = presenceService.getByNickname(msg.targetNickname);
      if (!target || target.sessionId === sessionId || target.placeId !== sender.placeId) {
        broadcaster.broadcast(sessionId, "POKE_ACK", { ok: false, reason: "NOT_IN_PLACE" });
        return;
      }
      presenceService.recordPoke(sessionId);
      const senderPlayer = await playerState.load(sessionId);
      broadcaster.broadcast(target.sessionId, "POKED", {
        fromNickname: sender.nickname,
        fromAvatar: senderPlayer?.avatar ?? "",
      });
      broadcaster.broadcast(sessionId, "POKE_ACK", { ok: true, targetNickname: target.nickname });
    },
  },
];
