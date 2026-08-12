// server/messages/handlers/quests.js
export const questHandlers = [
  {
    type: "ACCEPT_QUEST",
    async handler(ctx, msg) {
      const { ws, sessionId, send, questService } = ctx;
      const result = await questService.accept(sessionId, msg.questId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        send(ws, "QUEST_UPDATE", result);
      }
    },
  },
  {
    type: "COMPLETE_QUEST",
    async handler(ctx, msg) {
      const { ws, sessionId, send, questService } = ctx;
      const result = await questService.complete(sessionId, msg.questId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        send(ws, "QUEST_UPDATE", result);
      }
    },
  },
];
