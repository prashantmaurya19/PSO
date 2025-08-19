import { configureStore } from "@reduxjs/toolkit";
import { contextSwitchScliceReducer } from "./feature/context-switching";

export const store = configureStore({
  reducer: {
    contextSwitchSclice: contextSwitchScliceReducer,
  },
});
