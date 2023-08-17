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
function App(props) {
  const drawerWidth = 200;

  return (
    <>
      <Provider store={store}>
        <Schemas></Schemas>
      </Provider>
    </>
  );
}

export default App;
