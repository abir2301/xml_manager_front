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
import Colors from "../utulies/colors";
import SchemasTreeView from "../components/schema_tree_view";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SchemaList from "../components/schema_list";
import { useState, useEffect } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FileSchema from "../entities/Schema";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import {
  postElement,
  getFilesSchema,
  deleteElement,
  updateElement,
  dowloadSchema,
  setSelectedSchema,
} from "../features/schemas/slice";
import { useDispatch, useSelector } from "react-redux";

const Schemas = (props) => {
  const dispatch = useDispatch();
  const fileReducer = useSelector((state) => state.file);
  const downloadSchema = () => {
    const id = fileReducer.selectedSchema._id;
    dispatch(dowloadSchema({ id: id })).then((content) => {
      content = content.payload;
      const fileName = "schema.xsd";
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  };
  const onChange = (data) => {
    dispatch(setSelectedSchema({ schema: data }));
  };
  useEffect(() => {}, []);
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
            bgcolor: Colors.white,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                sx={{
                  marginLeft: 0,
                  fontSize: 30,
                  color: Colors.purple,
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              >
                Xml_Manger
              </Typography>
              <NavigateNextIcon
                style={{ fontSize: "30px", color: Colors.purple }}
              />
            </Box>

            <DownloadForOfflineIcon
              onClick={downloadSchema}
              style={{ fontSize: "40px", color: Colors.purple }}
            />
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "100%",
            width: "100%",
            position: "sticky",
            backgroundColor: Colors.bg,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
                backgroundColor: Colors.bg,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: Colors.purple,
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#506ECF",
              },

              height: "82vh",
              backgroundColor: Colors.white,
              padding: 2,
              borderRadius: "15px",
              overflowY: "auto",
              margin: "10px",
            }}
          >
            <SchemaList onChange={onChange} />
          </Box>

          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
                backgroundColor: Colors.bg, // Set scrollbar track color
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: Colors.purple, // Set scrollbar thumb color
                borderRadius: "4px", // Set thumb border radius
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#506ECF", // Set thumb color on hover
              },
              display: "flex",
              flex: 1,
              marginLeft: "16px",
              backgroundColor: Colors.white,
              borderRadius: "15px",
              flexDirection: "column",
              padding: "10px",
              alignItems: "flex-start",
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
