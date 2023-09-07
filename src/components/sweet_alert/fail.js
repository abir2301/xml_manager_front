import * as React from "react";
import { Box } from "@mui/material";
import Swal from "sweetalert2";

const FailAlert = ({ message }) => {
  return Swal.fire({
    position: "center",
    icon: "error",
    title: "Oops...",
    text: { message },
  });
};
export default FailAlert;
