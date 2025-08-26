import { configureStore } from "@reduxjs/toolkit";
import { contextSwitchScliceReducer } from "./feature/context-switching";
import { socketScliceReducer } from "./feature/sockjs-socket";

export const store = configureStore({
  reducer: {
    context_manager: contextSwitchScliceReducer,
    socket_manager: socketScliceReducer,
  },
});
