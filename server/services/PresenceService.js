// server/services/PresenceService.js
export const POKE_MAX_POKES = 3;
export const POKE_WINDOW_MS = 15000;
export const MAX_VISIBLE_PLAYERS = 8;

export class PresenceService {
  constructor({ now = Date.now, pokeMax = POKE_MAX_POKES, pokeWindowMs = POKE_WINDOW_MS } = {}) {
    this.now = now;
    this.pokeMax = pokeMax;
    this.pokeWindowMs = pokeWindowMs;
    this.players = new Map(); // sessionId -> { nickname, placeId, enteredAt }
    this.byPlace = new Map(); // placeId -> Set<sessionId>
    this.pokeTimes = new Map(); // sessionId -> number[]
  }

  register(sessionId, nickname, placeId, opts = {}) {
    const existing = this.players.get(sessionId);
    const isNew = !existing || existing.placeId !== placeId;
    const enteredAt = opts.refresh && existing ? existing.enteredAt : this.now();
    this.players.set(sessionId, { nickname, placeId, enteredAt });
    if (!this.byPlace.has(placeId)) this.byPlace.set(placeId, new Set());
    this.byPlace.get(placeId).add(sessionId);
    return isNew;
  }

  unregister(sessionId) {
    const entry = this.players.get(sessionId);
    if (!entry) return null;
    this.players.delete(sessionId);
    const set = this.byPlace.get(entry.placeId);
    if (set) {
      set.delete(sessionId);
      if (set.size === 0) this.byPlace.delete(entry.placeId);
    }
    return entry.placeId;
  }

  move(sessionId, newPlaceId) {
    const entry = this.players.get(sessionId);
    if (!entry) return null;
    const from = entry.placeId;
    if (from === newPlaceId) return { from, to: newPlaceId };
    this.byPlace.get(from)?.delete(sessionId);
    if (this.byPlace.get(from)?.size === 0) this.byPlace.delete(from);
    entry.placeId = newPlaceId;
    entry.enteredAt = this.now();
    if (!this.byPlace.has(newPlaceId)) this.byPlace.set(newPlaceId, new Set());
    this.byPlace.get(newPlaceId).add(sessionId);
    return { from, to: newPlaceId };
  }

  getSessionIds(placeId) {
    const set = this.byPlace.get(placeId);
    return set ? [...set] : [];
  }

  get(sessionId) {
    return this.players.get(sessionId) || null;
  }

  getByNickname(nickname) {
    for (const [sessionId, entry] of this.players) {
      if (entry.nickname === nickname) return { sessionId, ...entry };
    }
    return null;
  }

  async listFor(placeId, playerState) {
    const sessionIds = this.getSessionIds(placeId);
    const out = [];
    for (const sessionId of sessionIds) {
      const entry = this.players.get(sessionId);
      const player = await playerState.load(sessionId);
      out.push({
        nickname: entry.nickname,
        level: player?.level ?? 1,
        avatar: player?.avatar ?? "",
        enteredAt: entry.enteredAt,
      });
    }
    out.sort((a, b) => b.enteredAt - a.enteredAt);
    return out;
  }

  async broadcastPlace(placeId, broadcaster, playerState) {
    const players = await this.listFor(placeId, playerState);
    for (const sessionId of this.getSessionIds(placeId)) {
      const nickname = this.players.get(sessionId)?.nickname;
      const others = players.filter((p) => p.nickname !== nickname).slice(0, MAX_VISIBLE_PLAYERS);
      broadcaster.broadcast(sessionId, "PRESENCE_UPDATE", { placeId, players: others });
    }
  }

  canPoke(sessionId) {
    const cutoff = this.now() - this.pokeWindowMs;
    const recent = (this.pokeTimes.get(sessionId) || []).filter((t) => t > cutoff);
    return recent.length < this.pokeMax;
  }

  recordPoke(sessionId) {
    const times = this.pokeTimes.get(sessionId) || [];
    times.push(this.now());
    this.pokeTimes.set(sessionId, times);
  }
}
