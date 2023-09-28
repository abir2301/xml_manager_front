import React from "react";
import {
  Typography,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Modal,
  Button,
} from "@mui/material";
import Paper from "@mui/material/Paper";

import profile from "../assets/profile.png";

import MailIcon from "@mui/icons-material/Mail";
import Colors from "../utulies/colors";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { useDispatch, useSelector } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import theme from "../styles/theme";
import { useEffect, useState } from "react";
import Fn from "../utulies/functions";
import { authSlice, updateProfile } from "../features/auth/slice";

import FormField from "./formField";
const ProfileModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({});
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const authReducer = useSelector((state) => state.auth);
  const [user, setUser] = React.useState(authReducer.user);
  const [email, setEmail] = useState(user.email);
  const [firstName, setFirstName] = useState(user.user_name.split("_")[1]);
  const [lastName, setLastName] = useState(user.user_name.split("_")[0]);
  const handleUpdate = (e) => {
    const fn = new Fn();

    e.preventDefault();
    const data = {
      user_name: firstName + "_" + lastName,
      email: email,
    };
    console.log(data);
    let newErrors = {}; // Create a new error object

    if (!firstName || !lastName) {
      newErrors.username = "user name could not be empty ";
    }
    if (!email || !fn.email(email)) {
      newErrors.email = "invalid email";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update the errors state
    } else {
      dispatch(updateProfile(data))
        .then((response) => {
          // console.log(message);
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          flexDirection: "column",
          border: "1px",
          borderRadius: 5,
          boxShadow: 24,
          p: 5,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <AccountCircleIcon
          style={{
            color: Colors.purple,
            fontSize: "70px",
            marginTop: 20,
            marginBottom: 10,
          }}
        />
        <Typography
          sx={{
            fontWeight: "bold",
            color: Colors.blue,

            marginBottom: 5,
            fontSize: "25px",
          }}
          component="h2"
        >
          User Profile
        </Typography>
        <Box>
          <FormField
            label="email"
            //  defaultValue={user?.email || ""}
            id="email"
            onFocus={() => handleError(null, "email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            icon={<MailIcon></MailIcon>}
            error={errors.email}
          ></FormField>
          <Grid
            container
            alignItems="center"
            justifyContent="space-around"
            gap="10px"
          >
            <Grid item>
              <FormField
                label="last_name"
                error={errors.username}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                // defaultValue={
                //   user?.user_name ? user.user_name.split("_")[1] : ""
                // }
                id="last_name"
              ></FormField>
            </Grid>
            <Grid item>
              <FormField
                label="first_name"
                id="first_name"
                error={errors.username}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                // defaultValue={
                //   user?.user_name ? user.user_name.split("_")[0] : ""
                // }
              ></FormField>
            </Grid>
          </Grid>
        </Box>

        <Box
          style={{
            marginTop: "20px",
            marginBottom: "10px",

            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button sx={theme.buttonStyle} onClick={onClose}>
            Close
          </Button>
          <Button onClick={handleUpdate} sx={theme.buttonStyle}>
            Update
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
export default ProfileModal;
