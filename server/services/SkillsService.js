// server/services/SkillsService.js
import { getSkillById, getMaxSkillRank, SKILL_COLUMNS } from "../../shared/data/skillsData.js";
import { getWeaponDamageType } from "../../shared/combat/skillResolver.js";

export class SkillsService {
  constructor(redis, playerState, inventoryState, broadcaster) {
    this.redis = redis;
    this.playerState = playerState;
    this.inventoryState = inventoryState;
    this.broadcaster = broadcaster;
  }

  async spendSkillPoint(sessionId, skillId) {
    if (!getSkillById(skillId)) return { error: "Skill not found" };

    const inventory = await this.inventoryState.load(sessionId, "player");
    const weapon = inventory?.equipment?.["main-weapon"] || null;
    if (!weapon) return { error: "Equip a weapon to spend skill points" };

    const damageType = getWeaponDamageType(weapon);
    const columnSkills = SKILL_COLUMNS[damageType] || [];
    if (!columnSkills.includes(skillId)) {
      return { error: "Skill not available for equipped weapon" };
    }

    const skills = (await this.playerState.loadSkills(sessionId)) || {};
    const currentRank = skills[skillId] || 0;
    if (currentRank >= getMaxSkillRank(skillId)) return { error: "Skill already at max rank" };

    const player = await this.playerState.load(sessionId);
    if (!player || (player.skillPoints || 0) <= 0) return { error: "No skill points available" };

    skills[skillId] = currentRank + 1;
    await this.playerState.saveSkills(sessionId, skills);
    await this.playerState.save(sessionId, { skillPoints: (player.skillPoints || 0) - 1 });

    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.skills", data: skills });
    this.broadcaster.broadcast(sessionId, "DIFF", { path: "player.skillPoints", data: (player.skillPoints || 0) - 1 });

    return { success: true, skills, skillPoints: (player.skillPoints || 0) - 1 };
  }
}
