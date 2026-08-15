import playersReducer, {
  setPresent,
  setPokedBy,
  selectPresentPlayers,
  selectPokedBy,
} from "../src/store/slices/playersSlice";

describe("playersSlice", () => {
  it("starts with an empty presence list and no poke sender", () => {
    const state = playersReducer(undefined, { type: "" });
    expect(state.present).toEqual([]);
    expect(state.pokedBy).toEqual({ nickname: null, key: 0 });
  });

  it("setPresent replaces the presence list", () => {
    let state = playersReducer(undefined, setPresent([
      { nickname: "Beta", level: 1, avatar: "1.png", enteredAt: 2000 },
      { nickname: "Alpha", level: 3, avatar: "1.png", enteredAt: 1000 },
    ]));
    expect(selectPresentPlayers({ players: state })).toHaveLength(2);

    state = playersReducer(state, setPresent([]));
    expect(selectPresentPlayers({ players: state })).toEqual([]);
  });

  it("setPokedBy records the sender and increments the animation key on repeat pokes", () => {
    let state = playersReducer(undefined, setPokedBy("Hero"));
    expect(selectPokedBy({ players: state })).toEqual({ nickname: "Hero", key: 1 });

    state = playersReducer(state, setPokedBy("Hero"));
    expect(selectPokedBy({ players: state })).toEqual({ nickname: "Hero", key: 2 });

    state = playersReducer(state, setPokedBy("Other"));
    expect(selectPokedBy({ players: state })).toEqual({ nickname: "Other", key: 3 });
  });
});
