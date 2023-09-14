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
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import GoogleIcon from "@mui/icons-material/Google";
import GitHubIcon from "@mui/icons-material/GitHub";
import { Facebook, Google, Twitter, GitHub } from "@mui/icons-material";
import Colors from "../utulies/colors";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, register } from "../features/auth/slice";
const AuthScreen = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Log the input field values
    console.log("Email or Username:", email);
    console.log("Password:", password);
    console.log("Remember Me:", rememberMe);
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const data = {
      email: email,
      password: password,
    };
    dispatch(login(data)).then((response) => {
      console.log(response);
    });
  };
  const handleRegsiter = (e) => {
    e.preventDefault();
  };
  return (
    <Box
      sx={{
        alignItems: "center",
        justifyContent: "center",
        display: "flex",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: "20px",
          maxWidth: "700px",

          margin: "auto",
          marginTop: "5%",
          backgroundColor: Colors.purple,
          gap: 10,
        }}
      >
        <Box
          sx={{
            alignItems: "center",
            width: "100%",
            justifyContent: "space-evenly",
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
            sx={{
              margin: 5,
              borderRadius: 1,
              textAlign: "center",
              fontSize: 15,
              padding: 1,
              fontWeight: "bold",
              paddingX: 8,
              borderWidth: 1,
              border: "black",
              bgcolor: Colors.white,
            }}
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
            sx={{
              borderRadius: 1,
              margin: 5,
              textAlign: "center",
              fontSize: 15,
              fontWeight: "bold",
              padding: 1,

              paddingX: 8,
              borderWidth: 1,
              border: "black",
              bgcolor: Colors.white,
            }}
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
          <Typography sx={{ fontSize: 25, fontWeight: "bold", margin: 3 }}>
            {isLogin ? "Login with" : "SignUp with"}
          </Typography>
          <Box
            sx={{
              justifyContent: "space-around",
            }}
          >
            <GitHubIcon
              sx={{ fontSize: 30, marginX: 3, color: Colors.white }}
            ></GitHubIcon>
            <FacebookOutlinedIcon
              sx={{ fontSize: 30, marginX: 3, color: Colors.white }}
            ></FacebookOutlinedIcon>
            <GoogleIcon
              sx={{ fontSize: 30, marginX: 3, color: Colors.white }}
            ></GoogleIcon>
          </Box>
          <Typography sx={{ fontSize: 25, fontWeight: "bold", margin: 3 }}>
            Or
          </Typography>
        </Box>
        <Box>
          {isLogin ? (
            <form>
              <TextField
                fullWidth
                id="loginName"
                label="Email"
                variant="outlined"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                id="loginPassword"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
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
                  <TextField
                    fullWidth
                    id="last_name"
                    label="last_name"
                    variant="outlined"
                    margin="normal"
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    fullWidth
                    id="first_name"
                    label="first_name"
                    margin="normal"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                id="email"
                label="Email "
                variant="outlined"
                margin="normal"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                id="loginPassword"
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <Button
                onClick={handleSubmit}
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
          <Typography variant="body2" sx={{ textAlign: "center", mt: 2 }}>
            {isLogin ? `dont have an acount ` : "already have an acount"}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};
export default AuthScreen;
