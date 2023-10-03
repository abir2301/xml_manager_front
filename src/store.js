import { configureStore } from "@reduxjs/toolkit";
import fileReducer from "./features/schemas/slice";
import xmlReducer from "./features/xml_files/slice";
import authReducer from "./features/auth/slice";
import messageReducer from "./features/auth/message.slice";
export const store = configureStore({
  reducer: {
    file: fileReducer,
    auth: authReducer,
    message: messageReducer,
    xml: xmlReducer,
  },
});
