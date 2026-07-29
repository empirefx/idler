// server/services/SkillsService.js
export class SkillsService {
  constructor(redis, playerState, broadcaster) {
    this.redis = redis;
    this.playerState = playerState;
    this.broadcaster = broadcaster;
  }

  async activateSkill(sessionId, skillId) {
    const skills = await this.playerState.loadSkills(sessionId);
    if (!skills || !skills[skillId]) return { error: "Skill not learned" };
    const skill = skills[skillId];
    if (skill.cooldown > 0) return { error: "Skill on cooldown" };
    skill.lastActivated = Date.now();
    await this.playerState.saveSkills(sessionId, skills);
    this.broadcaster.broadcast("DIFF", { path: `skills.${skillId}`, data: skill });
    return { success: true };
  }
}
