import { createSlice } from "@reduxjs/toolkit";
import { acache, CacheName } from "../../../util/cache";

const initialState = acache(CacheName.APPLICATION_USER_SETTINGS)
  .localstorage()
  .getOrDefault({
    premove: false,
  });

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
    save: (state, action) => {
      acache(CacheName.APPLICATION_USER_SETTINGS)
        .localstorage()
        .set(JSON.stringify(state));
    },
  },
});

export const { refresh } = settingSlice.actions;
export const settingSliceReducer = settingSlice.reducer;
