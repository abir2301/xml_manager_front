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
import {
  postElement,
  getFilesSchema,
  deleteElement,
  updateElement,
} from "../features/schemas/slice";
import { useDispatch, useSelector } from "react-redux";

const Schemas = (props) => {
  const dispatch = useDispatch();
  const fileReducer = useSelector((state) => state.file);
  const list = fileReducer?.fileSchemas[0];
  console.log(list);
  const [schema, setSchema] = useState([
    {
      _id: "64f8879f8292e07246923739",
      title: "wsdgk",
      version: 4,
      data: [
        {
          _id: "64f8879f8292e0724692373b",
          name: "root11.1",
          type: "string",
          parent_id: null,
          schema_id: "64f8879f8292e07246923739",
          is_attribute: false,
          lavelH: 0,
          __v: 0,
          childrens: [
            {
              _id: "64f8e84282585526b3884063",
              name: "item",
              type: "string",
              parent_id: "64f8879f8292e0724692373b",
              schema_id: "64f8879f8292e07246923739",
              is_attribute: false,
              lavelH: 0,
              __v: 0,
              childrens: [
                {
                  _id: "64f8e85a82585526b3884075",
                  name: "attribute",
                  type: "number",
                  parent_id: "64f8e84282585526b3884063",
                  schema_id: "64f8879f8292e07246923739",
                  is_attribute: true,
                  lavelH: 0,
                  __v: 0,
                  childrens: [],
                },
                {
                  _id: "64f98b034ca0f7c605e10951",
                  name: "itemm.1.1",
                  type: "string",
                  parent_id: "64f8e84282585526b3884063",
                  schema_id: "64f8879f8292e07246923739",
                  is_attribute: false,
                  lavelH: 1,
                  __v: 0,
                  childrens: [],
                },
              ],
            },
            {
              _id: "64f98d841d37d887b3f6c911",
              name: "fd",
              type: "string",
              parent_id: "64f8879f8292e0724692373b",
              schema_id: "64f8879f8292e07246923739",
              is_attribute: false,
              lavelH: 1,
              __v: 0,
              childrens: [],
            },
            {
              _id: "64f98dd35dbc498abf617daf",
              name: "new string",
              type: "string",
              parent_id: "64f8879f8292e0724692373b",
              schema_id: "64f8879f8292e07246923739",
              is_attribute: true,
              lavelH: 1,
              __v: 0,
              childrens: [],
            },
            {
              _id: "64f98e117df6517d84f988a1",
              name: "name",
              type: "string",
              parent_id: "64f8879f8292e0724692373b",
              schema_id: "64f8879f8292e07246923739",
              is_attribute: false,
              lavelH: 1,
              __v: 0,
              childrens: [],
            },
            {
              _id: "64f98e41bc417d1238ec2a38",
              name: "string",
              type: "string",
              parent_id: "64f8879f8292e0724692373b",
              schema_id: "64f8879f8292e07246923739",
              is_attribute: false,
              lavelH: 1,
              __v: 0,
              childrens: [],
            },
          ],
        },
      ],
    },
  ]);
  const onChange = (data = list) => {
    console.log(data);
    setSchema(data.data);
    console.log("scheema");
    console.log(data.data);
  };
  useEffect(() => {
    // console.log("useEllefetc schema ");
  }, [schema]);
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
          <Toolbar sx={{ justifyContent: "flex-start" }}>
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
            <SchemasTreeView schema={schema}></SchemasTreeView>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Schemas;
