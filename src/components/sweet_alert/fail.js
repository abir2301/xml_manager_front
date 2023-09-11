import * as React from "react";
import { Box } from "@mui/material";
import Swal from "sweetalert2";

const FailAlert = (props) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: "Oops...",
    text: props.message,
    customClass: {
      title: "alert-title",
      confirmButton: "confirm-button",
    },
  });
};
export default FailAlert;
