import React from "react";
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Modal,
  Button,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
const ProfileModal = () => {
  return (
    <Box
      sx={{
        backgroundColor: "red",
        width: "300px",
        margin: "auto",
        marginTop: "100px",
        padding: "20px",
      }}
    >
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Text in a modal
      </Typography>
      <Typography id="modal-modal-description" sx={{ mt: 2 }}>
        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
      </Typography>
    </Box>
  );
};
export default ProfileModal;
