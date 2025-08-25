import { configureStore } from "@reduxjs/toolkit";
import { socket_sliceReducer } from "./feature/socket";

export const store = configureStore({
  reducer: {
    socket: socket_sliceReducer,
  },
});
