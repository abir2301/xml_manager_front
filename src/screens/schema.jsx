import React from "react";
import {
  Typography,
  AppBar,
  Button,
  Toolbar,
  Container,
  colors,
  Drawer,
  useMediaQuery,
  Box,
} from "@mui/material";
import SchemasTreeView from "../components/schema_tree_view";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SchemaList from "../components/schema_list";

const Schemas = (props) => {
  return (
    <Box
      sx={{
        backgroundColor: "#F5F9FF",
      }}
    >
      <Box
        sx={{
          pr: 2,
          pl: 2,
        }}
      >
        <AppBar
          sx={{
            borderRadius: "25px",
            margin: "15px",
            position: "sticky",
            padding: "10px",
            //  zIndex: theme.zIndex.drawer + 2,
            bgcolor: "#FFFFFF",
          }}
        >
          <Toolbar sx={{ justifyContent: "flex-start" }}>
            <Typography
              sx={{
                marginLeft: 0,
                fontSize: 30,
                color: "#7085F4",
                paddingRight: "20px",
                paddingLeft: "20px",
              }}
            >
              Xml_Manger
            </Typography>
            <NavigateNextIcon style={{ fontSize: "30px", color: "#7085F4" }} />
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "100%",
            width: "100%",
            position: "sticky",
            backgroundColor: "#F5F9FF",
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
                backgroundColor: "#F5F9FF",
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7085F4",
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#506ECF",
              },

              height: "82vh",
              backgroundColor: "#FFFFFF",
              padding: 2,
              borderRadius: "15px",
              overflowY: "auto",
              margin: "10px",
            }}
          >
            <SchemaList />
          </Box>

          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
                backgroundColor: "#F5F9FF", // Set scrollbar track color
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: "#7085F4", // Set scrollbar thumb color
                borderRadius: "4px", // Set thumb border radius
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#506ECF", // Set thumb color on hover
              },
              display: "flex",
              flex: 1,
              marginLeft: "16px",
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              flexDirection: "column",
              padding: "10px",
              alignItems: "center",
              height: "82vh", // Set a fixed height
              overflowY: "auto", // Enable vertical scrolling when content exceeds the height
            }}
          >
            <SchemasTreeView></SchemasTreeView>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Schemas;
