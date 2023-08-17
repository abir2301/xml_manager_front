import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./features/schemas/slice";
export const store = configureStore({
  reducer: {
    file: fileReducer,
  },
});
