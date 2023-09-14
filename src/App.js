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
import { ThemeProvider } from "@mui/material/styles";
import { store } from "./store";
import { Provider } from "react-redux";

import theme from "./styles/theme";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import Schemas from "./screens/schema";
import AuthScreen from "./screens/auth";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App(props) {
  const token = localStorage.getItem("token");
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AuthScreen />}></Route>

          <Route
            path="/schemas"
            element={token !== null ? <Schemas /> : <AuthScreen />}
          />
        </Routes>
      </BrowserRouter>
    </Provider>
    // <>
    //
    //     <AuthScreen></AuthScreen>
    //   </Provider>
    // </>
  );
}

export default App;
