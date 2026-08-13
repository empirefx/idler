// server/messages/handlers/combat.js
export const combatHandlers = [
  {
    type: "TOGGLE_AUTO_COMBAT",
    async handler(ctx, msg) {
      const { ws, sessionId, send, playerState, combatService } = ctx;
      const player = await playerState.load(sessionId);
      const result = player?.autoCombat
        ? await combatService.stopAutoCombat(sessionId)
        : await combatService.startAutoCombat(sessionId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      }
    },
  },
  {
    type: "REVIVE",
    async handler(ctx, msg) {
      const { ws, sessionId, send, combatService } = ctx;
      const result = await combatService.revive(sessionId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      }
    },
  },
  {
    type: "SPEND_SKILL_POINT",
    async handler(ctx, msg) {
      const { ws, sessionId, send, skillsService, combatService } = ctx;
      const result = await skillsService.spendSkillPoint(sessionId, msg.skillId);
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      } else {
        await combatService.computeAndBroadcastDerivedStats(sessionId);
      }
    },
  },
  {
    type: "LEVEL_UP",
    async handler(ctx, msg) {
      const { ws, sessionId, send, combatService } = ctx;
      const result = await combatService.levelUp(sessionId, msg.bonuses || {});
      if (result.error) {
        send(ws, "ERROR", { message: result.error });
      }
    },
  },
  {
    type: "NAVIGATE",
    async handler(ctx, msg) {
      const { ws, sessionId, send, playerState, combatService, navigationService, spawnService } = ctx;
      const player = await playerState.load(sessionId);
      if (player?.autoCombat) {
        await combatService.stopAutoCombat(sessionId);
      }
      const result = await navigationService.navigate(sessionId, msg.placeId);
      await spawnService.cleanupPlace(sessionId, result.previousPlaceId);
      send(ws, "DIFF", { path: "player.currentPlaceId", value: msg.placeId });
      await spawnService.triggerSpawn(sessionId, msg.placeId);
    },
  },
  {
    type: "SET_TARGET",
    async handler(ctx, msg) {
      const { ws, sessionId, send, playerState, enemyState, broadcaster, combatService } = ctx;
      const player = await playerState.load(sessionId);
      if (!player) { send(ws, "ERROR", { message: "Player not found" }); return; }
      if (player.isDead) { send(ws, "ERROR", { message: "Player is dead" }); return; }
      const enemy = await enemyState.load(sessionId, msg.enemyId);
      if (!enemy || enemy.hp <= 0 || enemy.placeId !== player.currentPlaceId) {
        send(ws, "ERROR", { message: "Enemy not found" });
        return;
      }
      await playerState.save(sessionId, { targetEnemyId: msg.enemyId });
      broadcaster.broadcast(sessionId, "DIFF", { path: "player.targetEnemyId", data: msg.enemyId });
      if (!player.autoCombat) {
        const result = await combatService.startAutoCombat(sessionId);
        if (result.error) send(ws, "ERROR", { message: result.error });
      }
    },
  },
];
