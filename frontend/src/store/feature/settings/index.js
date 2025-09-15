import { createSlice } from "@reduxjs/toolkit";
import { acache } from "@pso/util/cache";

const initialState = {
  premove: false,
};

export const settingSlice = createSlice({
  name: "setting-data",
  initialState,
  reducers: {
    premoveOn: (state, action) => {
      state.premove = true;
    },
    premoveOff: (state, action) => {
      state.premove = true;
    },
  },
});

export const { premoveOff, premoveOn } = settingSlice.actions;
export const settingSliceReducer = settingSlice.reducer;
