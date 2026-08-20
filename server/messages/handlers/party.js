// server/messages/handlers/party.js
export const partyHandlers = [
  {
    type: "CREATE_PARTY",
    async handler(ctx, msg) {
      const { sessionId, partyService, presenceService } = ctx;
      const entry = presenceService.get(sessionId);
      const nickname = entry?.nickname || "Unknown";
      await partyService.createParty(sessionId, msg.name, nickname);
    },
  },
  {
    type: "JOIN_PARTY",
    async handler(ctx, msg) {
      const { sessionId, partyService, presenceService } = ctx;
      const entry = presenceService.get(sessionId);
      const nickname = entry?.nickname || "Unknown";
      await partyService.joinParty(sessionId, msg.partyId, nickname);
    },
  },
  {
    type: "LEAVE_PARTY",
    async handler(ctx, msg) {
      const { sessionId, partyService } = ctx;
      await partyService.leaveParty(sessionId);
    },
  },
];
