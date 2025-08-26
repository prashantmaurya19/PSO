import { createSlice } from "@reduxjs/toolkit";
import { SocketHandler } from "./socket";

const initialState = {
  connection: new SocketHandler(),
};

export const selfSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    show: (state, action) => {
      console.log(state);
    },
  },
});

export const { show } = selfSlice.actions;
export const socketScliceReducer = selfSlice.reducer;
