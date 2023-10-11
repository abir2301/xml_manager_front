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
    color: "white",
  },
  LoginWithIcon: {
    fontSize: 30,
    marginX: 3,

    color: Colors.blue,
    borderWidth: 1,
    borderRadius: 2,
  },
  iconsStyle: { fontSize: 25, marginX: 3, color: Colors.purple },
  schemaButton: {
    margin: 1,
    mb: 2,
    borderRadius: 2,
    paddingTop: 2,
    pb: 2,
    gap: 2,
    width: "100%", // Set the buttons' width to 100%
    textAlign: "left",
    borderColor: Colors.purple,
    backgroundColor: Colors.bg,
  },
  swalTitle: { fontSize: 25, fontWeight: "bold", color: Colors.purple },
  nodeStyle: {
    paddingTop: "0",
    paddingBottom: "0",
    backgroundColor: "#F5F9FF",
    border: "2px solid #6c757d",
    height: "minHeight",
    display: "flex",
    alignItems: "center",
    borderRadius: 2,
  },
  nodeNameStyle: {
    // fontWeight: "bold",
    fontSize: "18px",
  },
  formButtons: {
    backgroundColor: "#F5F9FF",
    height: 60,
  },
  formIcons: {
    fontSize: 45,
    paddingX: 1,
    marginY: 2,
  },
};

export default theme;
