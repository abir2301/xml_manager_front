import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./features/schemas/slice";
import authReducer from "./features/auth/slice";
import messageReducer from "./features/auth/message.slice";
export const store = configureStore({
  reducer: {
    file: fileReducer,
    auth: authReducer,
    message: messageReducer,
  },
});
