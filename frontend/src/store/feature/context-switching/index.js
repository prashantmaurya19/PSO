import { createSlice } from "@reduxjs/toolkit";
import { ContextManager } from "./context-manager";

const initialState = {
  contexts: new ContextManager(),
};

export const contextSwitchSclice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    show: (state, action) => {
      state.contexts.show(...action.payload);
    },
  },
});

export const {show} = contextSwitchSclice.actions;
export const contextSwitchScliceReducer = contextSwitchSclice.reducer;
