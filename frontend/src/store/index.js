import { configureStore } from "@reduxjs/toolkit";
import { contextSwitchScliceReducer } from "./feature/context-switching";
import { socketScliceReducer } from "./feature/sockjs-socket";
import { settingSliceReducer } from "./feature/settings";
import { chessBoardSliceReducer } from "./feature/chess-data";

export const store = configureStore({
  reducer: {
    context_manager: contextSwitchScliceReducer,
    socket_manager: socketScliceReducer,
    settings: settingSliceReducer,
    chess: chessBoardSliceReducer,
  },
});
