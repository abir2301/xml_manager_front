// import { color } from "@mui/system";
// import { green, purple, orange } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";
import Colors from "../utulies/colors";

const theme = {
  buttonStyle: {
    width: "40%",
    borderRadius: 1,
    textAlign: "center",
    fontSize: 20,
    marginX: 1.3,
    padding: 1,
    fontWeight: "bold",
    paddingX: 8,
    borderWidth: 1,
    border: "black",
    bgcolor: Colors.purple,
  },
  LoginWithIcon: {
    fontSize: 30,
    marginX: 3,
    //padding: 3,

    //paddingX: 5,
    color: "black",
    borderWidth: 1,
    borderRadius: 2,
  },
};

export default theme;
