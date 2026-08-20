// server/state/PartyState.js
import { randomUUID } from "node:crypto";

const MAX_PLAYERS = 5;
const ALL_PARTIES_KEY = "parties:all";

export class PartyState {
  constructor(redis) {
    this.redis = redis;
  }

  _partyKey(partyId) {
    return `party:${partyId}`;
  }

  async create({ name, leaderId, leaderNickname }) {
    const trimmed = name.trim();
    if (!trimmed || trimmed.length > 30) {
      throw new Error("INVALID_PARTY_NAME");
    }

    const partyId = randomUUID();
    const memberIds = JSON.stringify([leaderId]);
    const members = JSON.stringify([
      { sessionId: leaderId, nickname: leaderNickname, isLeader: true },
    ]);

    await this.redis.hset(this._partyKey(partyId), "id", partyId);
    await this.redis.hset(this._partyKey(partyId), "name", trimmed);
    await this.redis.hset(this._partyKey(partyId), "leaderId", leaderId);
    await this.redis.hset(this._partyKey(partyId), "memberIds", memberIds);
    await this.redis.hset(this._partyKey(partyId), "members", members);
    await this.redis.hset(this._partyKey(partyId), "createdAt", String(Date.now()));
    await this.redis.sadd(ALL_PARTIES_KEY, partyId);

    return {
      id: partyId,
      name: trimmed,
      leaderId,
      members: [{ sessionId: leaderId, nickname: leaderNickname, isLeader: true }],
      memberCount: 1,
      maxPlayers: MAX_PLAYERS,
    };
  }

  async load(partyId) {
    const raw = await this.redis.hgetall(this._partyKey(partyId));
    if (!raw || !raw.id) return null;
    return {
      id: raw.id,
      name: raw.name,
      leaderId: raw.leaderId,
      members: JSON.parse(raw.members || "[]"),
      memberCount: JSON.parse(raw.memberIds || "[]").length,
      maxPlayers: MAX_PLAYERS,
    };
  }

  async addMember(partyId, sessionId, nickname) {
    const raw = await this.redis.hgetall(this._partyKey(partyId));
    if (!raw || !raw.id) return null;

    const memberIds = JSON.parse(raw.memberIds || "[]");
    const members = JSON.parse(raw.members || "[]");

    if (memberIds.includes(sessionId)) return { alreadyMember: true };
    if (memberIds.length >= MAX_PLAYERS) return { full: true };

    memberIds.push(sessionId);
    members.push({ sessionId, nickname, isLeader: false });

    await this.redis.hset(this._partyKey(partyId), "memberIds", JSON.stringify(memberIds));
    await this.redis.hset(this._partyKey(partyId), "members", JSON.stringify(members));

    return {
      id: raw.id,
      name: raw.name,
      leaderId: raw.leaderId,
      members,
      memberCount: memberIds.length,
      maxPlayers: MAX_PLAYERS,
    };
  }

  async removeMember(partyId, sessionId) {
    const raw = await this.redis.hgetall(this._partyKey(partyId));
    if (!raw || !raw.id) return null;

    const memberIds = JSON.parse(raw.memberIds || "[]");
    const members = JSON.parse(raw.members || "[]");

    const idx = memberIds.indexOf(sessionId);
    if (idx === -1) return null;

    memberIds.splice(idx, 1);
    members.splice(idx, 1);

    await this.redis.hset(this._partyKey(partyId), "memberIds", JSON.stringify(memberIds));
    await this.redis.hset(this._partyKey(partyId), "members", JSON.stringify(members));

    return {
      id: raw.id,
      name: raw.name,
      leaderId: raw.leaderId,
      members,
      memberCount: memberIds.length,
      maxPlayers: MAX_PLAYERS,
    };
  }

  async delete(partyId) {
    await this.redis.srem(ALL_PARTIES_KEY, partyId);
    await this.redis.del(this._partyKey(partyId));
  }

  async listAll() {
    const ids = await this.redis.smembers(ALL_PARTIES_KEY);
    const parties = [];
    for (const id of ids) {
      const party = await this.load(id);
      if (party) {
        parties.push({
          id: party.id,
          name: party.name,
          leaderId: party.leaderId,
          memberCount: party.memberCount,
          maxPlayers: party.maxPlayers,
        });
      } else {
        // stale reference, clean up
        await this.redis.srem(ALL_PARTIES_KEY, id);
      }
    }
    return parties;
  }

  async isMemberOfAny(sessionId) {
    const ids = await this.redis.smembers(ALL_PARTIES_KEY);
    for (const id of ids) {
      const raw = await this.redis.hget(this._partyKey(id), "memberIds");
      if (raw) {
        const memberIds = JSON.parse(raw);
        if (memberIds.includes(sessionId)) return id;
      }
    }
    return null;
  }

  async findByMember(sessionId) {
    const ids = await this.redis.smembers(ALL_PARTIES_KEY);
    for (const id of ids) {
      const party = await this.load(id);
      if (party && party.members.some((m) => m.sessionId === sessionId)) {
        return party;
      }
    }
    return null;
  }
}
