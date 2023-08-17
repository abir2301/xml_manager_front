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
        alignItems: "center", // Optional: If you also want to center vertically
      }}
    >
      {fileReducer.loading ? (
        <>loading</>
      ) : (
        <>
          <Typography
            component="div"
            variant="subtitle1"
            sx={{
              mb: "20px",
            }}
          >
            Xml_schemas{" "}
          </Typography>

          {fileReducer?.fileSchemas?.length >= 0 ? (
            fileReducer.fileSchemas?.map((schema) => (
              <Button
                size="medium"
                key={schema._id}
                variant="contained"
                startIcon={<FolderIcon sx={{ color: "white" }} />}
                sx={{ mb: 2 }}
              >
                {schema.title}{" "}
                <span
                  style={{ fontSize: 11, color: "white", paddingLeft: 5 }}
                >{`V:${schema.version}`}</span>
              </Button>
            ))
          ) : (
            <div className="empty">
              <h2>no data yet </h2>
            </div>
          )}
          <Box sx={{ padding: "10px" }}>
            <ListItem
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
            </ListItem>
          </Box>
        </>
      )}
    </Box>
  );
};
export default SchemaList;
