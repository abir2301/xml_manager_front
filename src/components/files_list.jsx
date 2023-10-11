import React from "react";
import { Typography, Box, Button } from "@mui/material";
import "../styles/style.css";
import Colors from "../utulies/colors";
import { useState, useEffect, componentDidMount } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import withReactContent from "sweetalert2-react-content";

import {
  getFilesSchema,
  updateSchema,
  deleteSchema,
  postSchema,
} from "../features/schemas/slice";
import {
  getFiles,
  updateFile,
  deleteFile,
  postFile,
} from "../features/xml_files/slice";
import theme from "../styles/theme";
import SuccessAlert from "./sweet_alert/success";
import FailAlert from "./sweet_alert/fail";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "./loader";
const FileList = ({ onChange }) => {
  const MySwal = withReactContent(Swal);

  const xmlReducer = useSelector((state) => state.xml);
  const FileReducer = useSelector((state) => state.file);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getFiles());
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
      <ToastContainer />

      {xmlReducer.loading ? (
        <Loader></Loader>
      ) : (
        <>
          {xmlReducer?.files?.length >= 0 ? (
            xmlReducer.files?.map((schema) => {
              const handleClick = (event) => {
                console.log(event.detail);
                switch (event.detail) {
                  case 2: {
                    MySwal.fire({
                      title: (
                        <Typography style={theme.swalTitle}>
                          Manage File
                        </Typography>
                      ),
                      customClass: {
                        title: {
                          color: Colors.purple,
                        },
                      },
                      input: "text",
                      inputValue: schema.title,
                      inputLabel: "file New Title",

                      showCancelButton: true,
                      confirmButtonText: "Update",
                      cancelButtonText: "Delete",
                      showCloseButton: true,
                      showLoaderOnConfirm: true,
                      preConfirm: (newTitle) => {
                        console.log(newTitle);
                        console.log(schema._id);

                        // Handle the update logic here, e.g., call an API to update the schema title
                        return dispatch(
                          updateFile({
                            data: { title: newTitle },
                            id: schema._id,
                          })
                        )
                          .then((response) => {
                            dispatch(getFiles());
                          })
                          .catch((error) => {
                            console.error("Error:", error);
                            // Swal.showValidationMessage(
                            //   `Request failed: ${error}`
                            // );
                            return false;
                          });
                      },
                      allowOutsideClick: () => !Swal.isLoading(),
                    }).then((result) => {
                      if (result.dismiss === Swal.DismissReason.cancel) {
                        // Handle delete logic here, e.g., call an API to delete the schema
                        dispatch(deleteFile(schema._id)).then(() => {
                          dispatch(getFiles());
                        });
                      }
                    });

                    break;
                  }
                  case 1: {
                    onChange(schema);
                  }
                  default: {
                    break;
                  }
                }
              };

              return (
                <Button
                  className="schemaButton"
                  onClick={handleClick}
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
                      fontWeight: "bold",
                    }}
                  >
                    {schema.title}
                  </Typography>

                  <span> V :{schema.version}</span>
                </Button>
              );
            })
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
          onClick={() => {
            dispatch(getFilesSchema()).then(() => {
              console.log(FileReducer.fileSchemas);
              const swalContent = document.createElement("div");
              swalContent.innerHTML = `
    <div>
      <label for="schemaSelect">Select a Schema:</label>
      <select id="schemaSelect" class="swal2-select">
        ${FileReducer?.fileSchemas
          .map(
            (schema) => `<option value="${schema._id}">${schema.title}</option>`
          )
          .join("")}
      </select>
    </div>
    <div>
      <label for="fileTitle">File Title:</label>
      <input id="fileTitle" class="swal2-input" placeholder="Enter File Title">
    </div>
  `;
              MySwal.fire({
                title: (
                  <Typography style={theme.swalTitle}>
                    Create new File{" "}
                  </Typography>
                ),
                customClass: {
                  title: {
                    color: Colors.purple,
                  },
                },

                html: swalContent,
                showCancelButton: true,
                confirmButtonText: "Create",
                cancelButtonText: "Cancel",
                showCloseButton: true,
                showLoaderOnConfirm: true,
                preConfirm: () => {
                  const selectedSchemaName =
                    document.getElementById("schemaSelect").value;
                  const fileTitle = document.getElementById("fileTitle").value;
                  console.log(fileTitle, selectedSchemaName);
                  if (fileTitle && selectedSchemaName) {
                    return dispatch(
                      postFile({
                        data: { title: fileTitle },
                        id: selectedSchemaName,
                      })
                    )
                      .then((response) => {
                        dispatch(getFiles());
                        console.log(response);
                      })
                      .catch((error) => {
                        console.error("Error:", error);
                        Swal.showValidationMessage(`Request failed: ${error}`);
                        return false;
                      });
                  } else {
                    Swal.showValidationMessage(
                      "Please select a schema and enter a file title"
                    );
                    return false;
                  }
                },
              });
            });
          }}
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
              color: "white",

              fontWeight: "bold",
            }}
          >
            {"Create File"}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default FileList;
