// server/messages/handlers/crafting.js
export const craftingHandlers = [
  {
    type: "CRAFT",
    async handler(ctx, msg) {
      const { ws, sessionId, send, craftingService } = ctx;
      const result = await craftingService.craft(sessionId, msg.recipeId);
      send(ws, "DIFF", result);
    },
  },
];
