import { configureStore } from "@reduxjs/toolkit";
import { contextSwitchScliceReducer } from "./feature/context-switching";
import { socketScliceReducer } from "./feature/sockjs-socket";
import { appDataSliceReducer } from "./feature/app-data";
import { settingSliceReducer } from "./feature/settings";

export const store = configureStore({
  reducer: {
    context_manager: contextSwitchScliceReducer,
    socket_manager: socketScliceReducer,
    app_session: appDataSliceReducer,
    settings: settingSliceReducer,
  },
});
