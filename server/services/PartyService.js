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
  constructor({ partyState, broadcaster, presenceService }) {
    this.partyState = partyState;
    this.broadcaster = broadcaster;
    this.presenceService = presenceService;
  }

  _error(sessionId, code, message) {
    this.broadcaster.broadcast(sessionId, "PARTY_ERROR", { code, message });
  }

  _sendPartyState(party) {
    for (const member of party.members) {
      this.broadcaster.broadcast(member.sessionId, "PARTY_STATE", {
        id: party.id,
        name: party.name,
        leaderId: party.leaderId,
        members: party.members,
        memberCount: party.memberCount,
        maxPlayers: party.maxPlayers,
      });
    }
  }

  async broadcastPartyList() {
    const parties = await this.partyState.listAll();
    // Broadcast to ALL connected clients
    const allSessionIds = this._getAllSessionIds();
    for (const sessionId of allSessionIds) {
      this.broadcaster.broadcast(sessionId, "PARTY_LIST_UPDATE", { parties });
    }
  }

  _getAllSessionIds() {
    // Gather all session IDs from presence service
    const ids = new Set();
    for (const [sessionId] of this.presenceService.players) {
      ids.add(sessionId);
    }
    return ids;
  }

  async createParty(sessionId, name, nickname) {
    if (!name || !name.trim()) {
      this._error(sessionId, PARTY_ERRORS.NAME_EMPTY, "Party name cannot be empty.");
      return;
    }
    if (name.length > 30) {
      this._error(sessionId, PARTY_ERRORS.NAME_TOO_LONG, "Party name must be 30 characters or less.");
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
    if (!updated || updated.alreadyMember) return;

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

      // Notify the leaving player
      this.broadcaster.broadcast(sessionId, "PARTY_DISSOLVED", {
        partyId: party.id,
        reason: "You left the party.",
      });

      // Send updated state to remaining members
      this._sendPartyState(updated);
      await this.broadcastPartyList();
    }
  }

  async dissolveParty(party) {
    // Notify all members
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
    // Auto-leave party on disconnect
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
