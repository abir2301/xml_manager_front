import React from "react";

import { store } from "./store";

import Schemas from "./screens/schema";
import AuthScreen from "./screens/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector, Provider } from "react-redux";
import FilesScreen from "./screens/files";
import { Box } from "@mui/material";
function App(props) {
  const AppMain = () => {
    const authReducer = useSelector((state) => state.auth);
    console.log(authReducer.isLogedIn);
    const token = localStorage.getItem("token");
    console.log(token);
    return (
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              token || authReducer.isLogedIn ? <Schemas /> : <AuthScreen />
            }
          />
          <Route path="/files" element={<FilesScreen />} />
        </Routes>
      </BrowserRouter>
    );
  };

  return (
    <Provider store={store}>
      <AppMain></AppMain>
    </Provider>
  );
}

export default App;
