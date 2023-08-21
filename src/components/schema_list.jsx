import React from "react";
import {
  Container,
  Typography,
  Scrollbar,
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import { getFilesSchema } from "../features/schemas/slice";
import { useDispatch, useSelector } from "react-redux";

const SchemaList = () => {
  const dispatch = useDispatch();

  const fileReducer = useSelector((state) => state.file); // Get schemaList from the store

  useEffect(() => {
    dispatch(getFilesSchema());
  }, [dispatch]);

  return (
    <Box
      sx={{
        pt: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center", // Optional: If you also want to center vertically
      }}
    >
      {fileReducer.loading ? (
        <>loading</>
      ) : (
        <>
          {fileReducer?.fileSchemas?.length >= 0 ? (
            fileReducer.fileSchemas?.map((schema) => (
              <Button
                size="large"
                key={schema._id}
                variant="outlined"
                sx={{
                  margin: 1,
                  mb: 2,
                  borderRadius: 2,
                  paddingTop: 2,
                  pb: 2,
                  width: "100%", // Set the buttons' width to 100%
                  textAlign: "left",
                  borderColor: "#7085F4",
                  backgroundColor: "#F5F9FF",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    color: "#1E1E1E",
                    // fontFamily: "poppins",
                    fontWeight: "normal",
                  }}
                >
                  {schema.title} {`  V:${schema.version}`}
                </Typography>
              </Button>
            ))
          ) : (
            <div className="empty">
              <h2>no data yet </h2>
            </div>
          )}
        </>
      )}

      <Box
        sx={{
          width: "100%",
          alignItems: "center",

          display: "flex",
          flexDirection: "column",
        }}
      >
        <Button
          size="large"
          // key={schema._id}
          variant="outlined"
          sx={{
            margin: 1,
            mb: 2,
            borderRadius: 2,
            paddingTop: 2,
            pb: 2,
            width: "100%", // Set the buttons' width to 100%
            textAlign: "left",
            borderColor: "#7085F4",
            backgroundColor: "#7085F4",
          }}
        >
          <Typography
            sx={{
              fontSize: 16,
              color: "#1E1E1E",

              fontWeight: "normal",
            }}
          >
            {"New Schema"}
          </Typography>
        </Button>
        {/* <ListItem
              sx={{
                backgroundColor: "#9c27b0",
                borderRadius: "10px",
              }}
            >
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
              <ListItemText
                primaryTypographyProps={{
                  variant: "body1", // Set the desired variant
                  sx: {
                    fontSize: "15px", // Set the desired font size
                  },
                }}
                primary="new schema"
              />
            </ListItem> */}
      </Box>
    </Box>
  );
};
export default SchemaList;
