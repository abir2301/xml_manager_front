import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import MailIcon from "@mui/icons-material/Mail";
import PasswordIcon from "@mui/icons-material/Password";
import PersonIcon from "@mui/icons-material/Person";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Facebook, Google, Twitter, GitHub } from "@mui/icons-material";
import Colors from "../utulies/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import theme from "../styles/theme";
import { login, register } from "../features/auth/slice";
import FormField from "../components/formField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Fn from "../utulies/functions";
const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const [errors, setErrors] = React.useState({});
  const message = useSelector((state) => state.message);
  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };
  const handleLogin = (e) => {
    const fn = new Fn();

    let newErrors = {}; // Create a new error object

    if (!email || !fn.email(email)) {
      newErrors.email = "Please input email";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update the errors state
    } else {
      e.preventDefault();
      const data = {
        email: email,
        password: password,
      };
      dispatch(login(data))
        .then((response) => {
          console.log(message.message);
          console.log(response);
        })
        .catch((error) => {
          console.log(message.message);
        });
    }
  };
  const handleRegsiter = (e) => {
    const fn = new Fn();

    e.preventDefault();
    const data = {
      user_name: firstName + "_" + lastName,
      email: email,
      password: password,
    };
    let newErrors = {}; // Create a new error object

    if (!firstName || !lastName) {
      newErrors.username = "user name could not be empty ";
    }
    if (!email || !fn.email(email)) {
      newErrors.email = "invalid email";
    }
    if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Check if there are any errors
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors); // Update the errors state
    } else {
      dispatch(register(data))
        .then((response) => {
          // console.log(message);
          console.log(response);
        })
        .catch((error) => {
          console.log(message);
        });
    }
  };

  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <ToastContainer />
      <Paper
        elevation={20}
        sx={{
          padding: "20px",
          maxWidth: "700px",

          margin: "auto",
          marginTop: "5%",
          backgroundColor: Colors.bg,
          gap: 10,
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          <Button
            onClick={() => {
              setIsLogin(true);
              setEmail("");
              setPassword("");
              setFirstName("");
              setLastName("");
            }}
            sx={theme.buttonStyle}
          >
            LogIn
          </Button>
          <Button
            onClick={() => {
              setIsLogin(false);
              setEmail("");
              setPassword("");
              setFirstName("");
              setLastName("");
            }}
            sx={theme.buttonStyle}
          >
            SignUp
          </Button>
        </Box>
        <Box
          sx={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: "bold",
              margin: 3,
              color: "#877C7C",
            }}
          >
            {isLogin ? "Login with" : "SignUp with"}
          </Typography>
          <Box
            sx={{
              justifyContent: "space-around",
            }}
          >
            <GitHubIcon sx={theme.LoginWithIcon}></GitHubIcon>
            <FacebookOutlinedIcon
              sx={theme.LoginWithIcon}
            ></FacebookOutlinedIcon>
            <GoogleIcon sx={theme.LoginWithIcon}></GoogleIcon>
          </Box>
          <Typography
            sx={{
              fontSize: 25,
              fontWeight: "bold",
              margin: 1.5,
              color: "#877C7C",
            }}
          >
            Or
          </Typography>
        </Box>
        <Box>
          {isLogin ? (
            <form>
              <FormField
                label="email"
                onFocus={() => handleError(null, "email")}
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<MailIcon></MailIcon>}
                error={errors.email}
              ></FormField>

              <FormField
                label="password"
                id="password"
                error={errors.password}
                value={password}
                isPassword={true}
                onChange={(e) => setPassword(e.target.value)}
                icon={<PasswordIcon></PasswordIcon>}
              ></FormField>

              <Grid
                container
                alignItems="center"
                justifyContent="space-between"
              >
                <Grid item>
                  <FormControlLabel
                    control={<Checkbox defaultChecked />}
                    label="Remember me"
                  />
                </Grid>
                <Grid item>
                  <a href="#!">Forgot password?</a>
                </Grid>
              </Grid>
              <Button
                onClick={handleLogin}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                login in
              </Button>
            </form>
          ) : (
            <form>
              <Grid container alignItems="center" justifyContent="space-around">
                <Grid item>
                  <FormField
                    label="last_name"
                    id="last_name"
                    error={errors.username}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    //  icon={<PersonIcon></PersonIcon>}
                  ></FormField>
                </Grid>
                <Grid item>
                  <FormField
                    label="first_name"
                    id="first_name"
                    error={errors.username}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    // icon={<PersonIcon></PersonIcon>}
                  ></FormField>
                </Grid>
              </Grid>
              <FormField
                label="email"
                id="email"
                error={errors.email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<MailIcon></MailIcon>}
              ></FormField>

              <FormField
                label="password"
                error={errors.password}
                id="password"
                isPassword={true}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                icon={<PasswordIcon></PasswordIcon>}
              ></FormField>

              <Button
                onClick={handleRegsiter}
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Sign Up
              </Button>
            </form>
          )}
        </Box>
      </Paper>
    </Box>
  );
};
export default AuthScreen;
