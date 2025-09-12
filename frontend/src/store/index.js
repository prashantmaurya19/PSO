import { configureStore } from "@reduxjs/toolkit";
import { settingSliceReducer } from "./feature/settings";
import { chessBoardSliceReducer } from "./feature/chess-data";

export const store = configureStore({
  reducer: {
    settings: settingSliceReducer,
    chess: chessBoardSliceReducer,
  },
});
