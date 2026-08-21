// server/services/PartyService.js
export const PARTY_ERRORS = {
  ALREADY_IN_PARTY: "ALREADY_IN_PARTY",
  NOT_IN_PARTY: "NOT_IN_PARTY",
  PARTY_FULL: "PARTY_FULL",
  PARTY_NOT_FOUND: "PARTY_NOT_FOUND",
  NAME_TOO_LONG: "NAME_TOO_LONG",
  NAME_EMPTY: "NAME_EMPTY",
};

export class PartyService {
  constructor({ partyState, broadcaster, presenceService, playerState }) {
    this.partyState = partyState;
    this.broadcaster = broadcaster;
    this.presenceService = presenceService;
    this.playerState = playerState;
  }

  _error(sessionId, code, message) {
    this.broadcaster.broadcast(sessionId, "PARTY_ERROR", { code, message });
  }

  _enrichLeader(party) {
    const entry = this.presenceService.get(party.leaderId);
    return entry?.nickname || "Unknown";
  }

  async _sendPartyState(party) {
    const leaderName = this._enrichLeader(party);
    const enrichedMembers = await Promise.all(party.members.map(async (m) => {
      const entry = this.presenceService.get(m.sessionId);
      const player = await this.playerState.load(m.sessionId);
      return {
        ...m,
        location: entry?.placeId || "",
        avatar: player?.avatar || "1",
        hp: player?.hp ?? 0,
        maxHp: player?.maxHp ?? 0,
      };
    }));
    for (const member of enrichedMembers) {
      this.broadcaster.broadcast(member.sessionId, "PARTY_STATE", {
        id: party.id,
        name: party.name,
        leaderId: party.leaderId,
        leaderName,
        location: party.location,
        members: enrichedMembers,
        memberCount: party.memberCount,
        maxPlayers: party.maxPlayers,
      });
    }
  }

  async broadcastPartyList() {
    const parties = await this.partyState.listAll();
    const enriched = parties.map((p) => ({
      id: p.id,
      name: p.name,
      leaderName: this._enrichLeader(p),
      location: p.location,
      memberCount: p.memberCount,
      maxPlayers: p.maxPlayers,
    }));
    const allSessionIds = this._getAllSessionIds();
    for (const sessionId of allSessionIds) {
      this.broadcaster.broadcast(sessionId, "PARTY_LIST_UPDATE", { parties: enriched });
    }
  }

  _getAllSessionIds() {
    const ids = new Set();
    for (const [sessionId] of this.presenceService.players) {
      ids.add(sessionId);
    }
    return ids;
  }

  async refreshMemberState(sessionId) {
    const party = await this.partyState.findByMember(sessionId);
    if (!party) return;
    this._sendPartyState(party);
  }

  async createParty(sessionId, name, nickname, location) {
    if (!name || !name.trim()) {
      this._error(sessionId, PARTY_ERRORS.NAME_EMPTY, "Party name cannot be empty.");
      return;
    }
    if (name.trim().length > 50) {
      this._error(sessionId, PARTY_ERRORS.NAME_TOO_LONG, "Party name must be 50 characters or less.");
      return;
    }
    const existing = await this.partyState.isMemberOfAny(sessionId);
    if (existing) {
      this._error(sessionId, PARTY_ERRORS.ALREADY_IN_PARTY, "You are already in a party.");
      return;
    }

    const party = await this.partyState.create({
      name: name.trim(),
      leaderId: sessionId,
      leaderNickname: nickname,
      location: location || "",
    });

    this._sendPartyState(party);
    await this.broadcastPartyList();
  }

  async joinParty(sessionId, partyId, nickname) {
    const existing = await this.partyState.isMemberOfAny(sessionId);
    if (existing) {
      this._error(sessionId, PARTY_ERRORS.ALREADY_IN_PARTY, "You are already in a party.");
      return;
    }

    const party = await this.partyState.load(partyId);
    if (!party) {
      this._error(sessionId, PARTY_ERRORS.PARTY_NOT_FOUND, "Party not found.");
      return;
    }
    if (party.memberCount >= party.maxPlayers) {
      this._error(sessionId, PARTY_ERRORS.PARTY_FULL, "Party is full.");
      return;
    }

    const updated = await this.partyState.addMember(partyId, sessionId, nickname);
    if (!updated || updated.alreadyMember) {
      if (!updated) {
        this._error(sessionId, PARTY_ERRORS.PARTY_NOT_FOUND, "Party no longer exists.");
      }
      return;
    }

    this._sendPartyState(updated);
    await this.broadcastPartyList();
  }

  async leaveParty(sessionId) {
    const party = await this.partyState.findByMember(sessionId);
    if (!party) {
      this._error(sessionId, PARTY_ERRORS.NOT_IN_PARTY, "You are not in a party.");
      return;
    }

    const isLeader = party.leaderId === sessionId;

    if (isLeader) {
      await this.dissolveParty(party);
    } else {
      const updated = await this.partyState.removeMember(party.id, sessionId);
      if (!updated) return;

      this.broadcaster.broadcast(sessionId, "PARTY_DISSOLVED", {
        partyId: party.id,
        reason: "You left the party.",
      });

      this._sendPartyState(updated);
      await this.broadcastPartyList();
    }
  }

  async dissolveParty(party) {
    for (const member of party.members) {
      this.broadcaster.broadcast(member.sessionId, "PARTY_DISSOLVED", {
        partyId: party.id,
        reason: "Party leader left. Party dissolved.",
      });
    }

    await this.partyState.delete(party.id);
    await this.broadcastPartyList();
  }

  async handleDisconnect(sessionId) {
    const party = await this.partyState.findByMember(sessionId);
    if (!party) return;

    const isLeader = party.leaderId === sessionId;

    if (isLeader) {
      await this.dissolveParty(party);
    } else {
      const updated = await this.partyState.removeMember(party.id, sessionId);
      if (updated) {
        this._sendPartyState(updated);
        await this.broadcastPartyList();
      }
    }
  }
}
