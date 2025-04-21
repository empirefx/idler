import { createSlice } from '@reduxjs/toolkit';

const logSlice = createSlice({
  name: 'logs',
  initialState: [],
  reducers: {
    addLog: (state, action) => {
      const now = Date.now();
      state.push({
        id: `${now}-${Math.random().toString(36)}`,
        message: action.payload,
        ts: now
      });
      if (state.length > 100) state.shift();
    },
    clearLogs: () => []
  }
});

export const { addLog, clearLogs } = logSlice.actions;
export default logSlice.reducer;
