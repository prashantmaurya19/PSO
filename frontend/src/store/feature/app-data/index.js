import { createSlice } from "@reduxjs/toolkit";
import { DataGoverner } from "./app-data";

const initialState = {
  data: new DataGoverner(),
  refreshCount: 0,
};

export const appDataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    refresh: (state, action) => {
      state.refreshCount++;
    },
  },
});

export const {refresh} = appDataSlice.actions;
export const appDataSliceReducer = appDataSlice.reducer;
