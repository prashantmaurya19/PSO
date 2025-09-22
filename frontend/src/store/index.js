import { configureStore } from "@reduxjs/toolkit";
import { settingSliceReducer } from "@pso/store/feature/settings";
import { chessBoardSliceReducer } from "@pso/store/feature/chess-data";
import { componentDataSliceReducer } from "@pso/store/feature/component-data";
import { initializationSliceReducer } from "./feature/initialization-data";

export const store = configureStore({
  reducer: {
    settings: settingSliceReducer,
    chess: chessBoardSliceReducer,
    component_data: componentDataSliceReducer,
    initial: initializationSliceReducer,
  },
});
