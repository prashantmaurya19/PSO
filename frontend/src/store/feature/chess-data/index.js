import { createSlice } from "@reduxjs/toolkit";
import { ChessData } from "./game-data";

const initialState = {
  data: new ChessData(),
  refreshCount: 0,
};

export const appDataSlice = createSlice({
  name: "chess-data",
  initialState,
  reducers: {
    refresh: (state, _) => {
      state.refreshCount++;
    },
  },
});

export const { refresh } = appDataSlice.actions;
export const appDataSliceReducer = appDataSlice.reducer;
