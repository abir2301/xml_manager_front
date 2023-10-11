import React from "react";
import { Typography, Box, Button, CircularProgress } from "@mui/material";
import "../styles/style.css";
import Colors from "../utulies/colors";
import withReactContent from "sweetalert2-react-content";

import { useState, useEffect, componentDidMount } from "react";

import {
  getFilesSchema,
  updateSchema,
  deleteSchema,
  postSchema,
} from "../features/schemas/slice";

import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loader from "./loader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import theme from "../styles/theme";

const SchemaList = ({ onChange }) => {
  const fileReducer = useSelector((state) => state.file);
  const MySwal = withReactContent(Swal);

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
        <Loader></Loader>
      ) : (
        <>
          {fileReducer?.fileSchemas?.length >= 0 ? (
            fileReducer.fileSchemas?.map((schema) => {
              const handleClick = (event) => {
                console.log(event.detail);
                switch (event.detail) {
                  case 2: {
                    console.log("update");
                    MySwal.fire({
                      title: (
                        <Typography style={theme.swalTitle}>
                          Update Schema
                        </Typography>
                      ),

                      input: "text",
                      inputValue: schema.title,
                      inputLabel: "New Schema Title",
                      showCancelButton: true,
                      confirmButtonText: "Update",
                      cancelButtonText: "Delete",
                      showCloseButton: true,
                      showLoaderOnConfirm: true,
                      preConfirm: (newTitle) => {
                        if (newTitle.length >= 1) {
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
                              MySwal.showValidationMessage(
                                `Request failed: ${error}`
                              );
                              return false;
                            });
                        } else {
                          MySwal.showValidationMessage(`Empty Value `);
                        }
                      },
                      allowOutsideClick: () => !MySwal.isLoading(),
                    }).then((result) => {
                      if (result.dismiss === MySwal.DismissReason.cancel) {
                        // Handle delete logic here, e.g., call an API to delete the schema
                        dispatch(deleteSchema(schema._id)).then(() => {
                          dispatch(getFilesSchema());
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
                  onClick={handleClick}
                  size="large"
                  key={schema._id}
                  variant="outlined"
                  sx={theme.schemaButton}
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
            <div>
              <Typography
                sx={{
                  fontSize: 16,
                  color: "#1E1E1E",
                  fontWeight: "normal",
                }}
              >
                Empty Schema List
              </Typography>
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
            MySwal.fire({
              title: (
                <Typography style={theme.swalTitle}>
                  Create New Schema
                </Typography>
              ),
              customClass: {
                title: {
                  color: Colors.purple,
                },
              },
              input: "text",

              inputLabel: "schema title",

              showCancelButton: true,
              confirmButtonText: "Create",
              cancelButtonText: "Cancel",
              showCloseButton: true,
              showLoaderOnConfirm: true,
              preConfirm: (newTitle) => {
                if (newTitle.length >= 1) {
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
                      MySwal.showValidationMessage(`Request failed: ${error}`);
                      return false;
                    });
                } else {
                  MySwal.showValidationMessage(`Empty Value`);
                }
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
              color: "white",
              fontWeight: "bold",
            }}
          >
            {"create Schema"}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};
export default SchemaList;
