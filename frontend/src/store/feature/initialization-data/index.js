import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  completed_task: 0,
  failed: false,
  task: {
    /** @type {import("@pso/pages/dashboard/dmain/DashboardInitializationPage/initializer").TaskStatus} */
    status: "processing",
  },
};

export const initializationSlice = createSlice({
  name: "initialization-data",
  initialState,
  reducers: {
    initializeInitData(state) {
      state.completed_task = 0;
      state.failed = false;
      state.task.status = "processing";
    },
    taskCompleted(state, _) {
      state.completed_task++;
    },
    taskFailed(state, _) {
      state.failed = true;
    },
    taskUpdateTaskStatus(state, action) {
      state.task.status = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  taskCompleted,
  taskFailed,
  taskUpdateTaskStatus,
  initializeInitData,
} = initializationSlice.actions;

export const initializationSliceReducer = initializationSlice.reducer;
