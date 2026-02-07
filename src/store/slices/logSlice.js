import { createSlice } from "@reduxjs/toolkit";

const logSlice = createSlice({
  name: "logs",
  initialState: [],
  reducers: {
    addLog: (state, action) => {
      const now = Date.now();
      const { message, category = "default" } =
        typeof action.payload === "string"
          ? { message: action.payload, category: "default" }
          : action.payload;

      state.push({
        id: `${now}-${Math.random().toString(36)}`,
        message,
        category,
        ts: now,
      });
      if (state.length > 100) state.shift();
    },
    clearLogs: () => [],
  },
});

export const { addLog, clearLogs } = logSlice.actions;
export default logSlice.reducer;
