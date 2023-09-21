import React from "react";
import { Typography, Box, Button } from "@mui/material";
import "../styles/style.css";
import Colors from "../utulies/colors";
import { useState, useEffect, componentDidMount } from "react";
import FolderIcon from "@mui/icons-material/Folder";
import AddIcon from "@mui/icons-material/Add";
import {
  getFilesSchema,
  updateSchema,
  deleteSchema,
  postSchema,
} from "../features/schemas/slice";
import SuccessAlert from "./sweet_alert/success";
import FailAlert from "./sweet_alert/fail";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SchemaList = ({ onChange }) => {
  const fileReducer = useSelector((state) => state.file);

  const dispatch = useDispatch();

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
      <ToastContainer />

      {fileReducer.loading ? (
        <>loading</>
      ) : (
        <>
          {fileReducer?.fileSchemas?.length >= 0 ? (
            fileReducer.fileSchemas?.map((schema) => {
              const handleClick = (event) => {
                console.log(event.detail);
                switch (event.detail) {
                  case 1: {
                    onChange(schema);
                    break;
                  }
                  case 2: {
                    Swal.fire({
                      title: "Manage Schema",
                      customClass: {
                        title: {
                          color: Colors.purple,
                        },
                      },
                      input: "text",
                      inputValue: schema.title,
                      inputLabel: "Schema New Title",

                      //                 html: `
                      //   <input id="swal-input1" class="swal2-input" placeholder="New Schema Title" value="${schema.title}">
                      // `,
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
                          updateSchema({
                            data: { title: newTitle },
                            id: schema._id,
                          })
                        )
                          .then((response) => {
                            dispatch(getFilesSchema());
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
                        dispatch(deleteSchema(schema._id)).then(() => {
                          dispatch(getFilesSchema());
                        });
                      }
                    });

                    break;
                  }

                  default: {
                    break;
                  }
                }
              };
              const handleDoubleClick = () => {
                console.log("update");
                // Rest of your double-click logic here
              };
              return (
                <Button
                  className="schemaButton"
                  onClick={handleClick}
                  //onDoubleClick={handleClick}
                  // onClick={() => onChange(schema)}
                  //  onDoubleClick={handleDoubleClick}
                  // onDoubleClick={
                  //   handleDoubleClick
                  //   //   () => {
                  //   //   console.log("update");

                  // }
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
            Swal.fire({
              title: "Manage Schema",
              customClass: {
                title: {
                  color: Colors.purple,
                },
              },
              input: "text",

              inputLabel: " New Schema  Title",

              //                 html: `
              //   <input id="swal-input1" class="swal2-input" placeholder="New Schema Title" value="${schema.title}">
              // `,
              showCancelButton: true,
              confirmButtonText: "Create",
              cancelButtonText: "Cancel",
              showCloseButton: true,
              showLoaderOnConfirm: true,
              preConfirm: (newTitle) => {
                return dispatch(
                  postSchema({
                    data: { title: newTitle },
                  })
                )
                  .then((response) => {
                    dispatch(getFilesSchema());
                    console.log(response.payload);
                  })
                  .catch((error) => {
                    console.error("Error:", error);
                    Swal.showValidationMessage(`Request failed: ${error}`);
                    return false;
                  });
              },
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
