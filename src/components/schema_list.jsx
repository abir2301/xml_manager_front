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
import "../styles/styles.css";
import Colors from "../utulies/colors";
import { useState, useEffect } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import { getFilesSchema } from "../features/schemas/slice";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
const SchemaList = ({ onChange }) => {
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
        alignItems: "center",
      }}
    >
      {fileReducer.loading ? (
        <>loading</>
      ) : (
        <>
          {fileReducer?.fileSchemas?.length >= 0 ? (
            fileReducer.fileSchemas?.map((schema) => (
              <Button
                className="schemaButton"
                onClick={() => onChange(schema)}
                onDoubleClick={() => {
                  Swal.fire({
                    title: "Manage Schema",
                    customClass: {
                      title: {
                        color: Colors.purple,
                      },
                    },
                    html: `
      <input id="swal-input1" class="swal2-input" placeholder="New Schema Title" value="${schema.title}">
    `,
                    showCancelButton: true,
                    confirmButtonText: "Update",
                    cancelButtonText: "Delete",
                    showCloseButton: true,
                    showLoaderOnConfirm: true,
                    preConfirm: (newTitle) => {
                      if (
                        Swal.getPopup().querySelector("#swal-input1").value ===
                        ""
                      ) {
                        Swal.showValidationMessage("Title is required");
                      }

                      // Handle the update logic here, e.g., call an API to update the schema title
                      return fetch("your-update-api-endpoint", {
                        method: "POST",
                        body: JSON.stringify({ newTitle }),
                        headers: {
                          "Content-Type": "application/json",
                        },
                      })
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(response.statusText);
                          }
                          return response.json();
                        })
                        .catch((error) => {
                          Swal.showValidationMessage(
                            `Request failed: ${error}`
                          );
                        });
                    },
                    allowOutsideClick: () => !Swal.isLoading(),
                  }).then((result) => {
                    if (result.dismiss === Swal.DismissReason.cancel) {
                      // Handle delete logic here, e.g., call an API to delete the schema
                      fetch("your-delete-api-endpoint")
                        .then((response) => {
                          if (!response.ok) {
                            throw new Error(response.statusText);
                          }
                          return response.json();
                        })
                        .then((data) => {
                          Swal.fire({
                            title: "Deleted",
                            icon: "success",
                          });
                        })
                        .catch((error) => {
                          Swal.fire({
                            title: "Error",
                            text: `Failed to delete: ${error}`,
                            icon: "error",
                          });
                        });
                    }
                  });
                }}
                size="large"
                key={schema._id}
                variant="outlined"
                sx={{
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
                  // flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 16,
                    color: "#1E1E1E",
                    fontWeight: "normal",
                  }}
                >
                  {schema.title}
                </Typography>

                <span> V :{schema.version}</span>
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
          variant="outlined"
          sx={{
            margin: 1,
            mb: 2,
            borderRadius: 2,
            paddingTop: 2,
            pb: 2,
            width: "100%", // Set the buttons' width to 100%
            textAlign: "left",
            borderColor: Colors.purple,
            backgroundColor: Colors.purple,
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
      </Box>
    </Box>
  );
};
export default SchemaList;
