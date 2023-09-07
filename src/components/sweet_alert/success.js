import React from "react";
import { Box } from "@mui/material";
import Swal from "sweetalert2";
import "../../styles/style.css";

const SuccessAlert = (props) => {
  return Swal.fire({
    position: "center",
    icon: "success",
    title: "Well Done",
    text: props.message,
    customClass: {
      title: "alert-title",
    },
  });
};
export default SuccessAlert;
