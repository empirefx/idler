// server/services/QuestService.js
export class QuestService {
  constructor(redis, playerState, questState, broadcaster) {
    this.redis = redis;
    this.playerState = playerState;
    this.questState = questState;
    this.broadcaster = broadcaster;
  }

  async accept(sessionId, questId) {
    const progress = { questId, startedAt: Date.now(), objectives: {} };
    await this.questState.saveActive(sessionId, questId, progress);
    this.broadcaster.broadcast("QUEST_UPDATE", { questId, progress });
    return { success: true };
  }

  async complete(sessionId, questId) {
    const progress = await this.questState.loadActive(sessionId, questId);
    if (!progress) return { error: "Quest not active" };
    await this.questState.deleteActive(sessionId, questId);
    await this.questState.saveCompleted(sessionId, questId, { completedAt: Date.now() });
    this.broadcaster.broadcast("QUEST_UPDATE", { questId, completed: true });
    return { success: true };
  }
}
