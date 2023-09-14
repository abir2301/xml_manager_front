import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./features/schemas/slice";
import authReducer from "./features/auth/slice";
export const store = configureStore({
  reducer: {
    file: fileReducer,
    auth: authReducer,
  },
});
