import { createSlice } from "@reduxjs/toolkit";

const inventorySlice = createSlice({
  name: "inventory",
  initialState: {},
  reducers: {
    setInventory(state, action) {
      return action.payload;
    },
    updateInventory(state, action) {
      state[action.payload.id] = action.payload.data;
    },
    addItem(state, action) {
      const { inventoryId, item } = action.payload;
      if (!state[inventoryId]) return;
      state[inventoryId].items.push(item);
    },
    removeItem(state, action) {
      const { inventoryId, itemId, quantity = 1 } = action.payload;
      const inv = state[inventoryId];
      if (!inv) return;
      const idx = inv.items.findIndex((i) => i.id === itemId);
      if (idx === -1) return;
      const item = inv.items[idx];
      if (item.quantity > quantity) {
        item.quantity -= quantity;
      } else {
        inv.items.splice(idx, 1);
      }
    },
    unequipItem(state, action) {
      const slot = action.payload;
      const playerInv = Object.values(state).find((inv) => inv.type === "player");
      if (!playerInv) return;
      const equipped = playerInv.equipped || {};
      if (!equipped[slot]) return;
      playerInv.items.push(equipped[slot]);
      delete equipped[slot];
    },
  },
});

export const {
  setInventory, updateInventory, addItem, removeItem, unequipItem,
} = inventorySlice.actions;
export default inventorySlice.reducer;

export const selectInventoryById = (state, id) => state.inventory[id] || null;
export const selectInventoryByPlaceId = (state, placeId) =>
  Object.values(state.inventory).find((inv) => inv.placeId === placeId) || null;
export const selectInventoryByNpcId = (state, npcId) =>
  Object.values(state.inventory).find((inv) => inv.npcId === npcId) || null;
