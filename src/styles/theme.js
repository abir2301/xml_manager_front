// import { color } from "@mui/system";
// import { green, purple, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    background: {
      default: "#E55707", // Set the default background color
      paper: "#E55707", // Set the background color for paper elements (e.g., cards, dialogs)
      // You can define other background colors for specific components here
    },
    primary: {
      main: "#E55707",
    },
  },
});

export default theme;
