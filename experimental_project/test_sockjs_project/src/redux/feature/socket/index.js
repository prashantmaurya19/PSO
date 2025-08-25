import { createSlice } from "@reduxjs/toolkit";
import { SocketHandler } from "../../../utils/sock-const";

const initialState = {
  socket: new SocketHandler(),
};

export const socket_slice = createSlice({
  name: "socket_slice",
  initialState,
  reducers: {
    test: (state) => {
      console.log(state);
    },
  },
});

export const {test} = socket_slice.actions;
export const socket_sliceReducer = socket_slice.reducer;
