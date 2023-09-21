import React from "react";
import {
  Typography,
  AppBar,
  Button,
  Toolbar,
  Container,
  colors,
  Drawer,
} from "@mui/material";
import { ToastContainer } from "react-toastify";

import { ThemeProvider } from "@mui/material/styles";
import { store } from "./store";

import theme from "./styles/theme";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Schemas from "./screens/schema";
import AuthScreen from "./screens/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector, Provider } from "react-redux";

function App(props) {
  const AppMain = () => {
    const dispatch = useDispatch();
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
        </Routes>
      </BrowserRouter>
    );
  };

  // console.log(authReducer.isLogedIn);
  // useEffect(() => {}, [authReducer.isLogedIn]);

  return (
    <Provider store={store}>
      <AppMain></AppMain>
    </Provider>
    // <>
    //
    //     <AuthScreen></AuthScreen>
    //   </Provider>
    // </>
  );
}

export default App;
