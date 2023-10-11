import React from "react";
import {
  Typography,
  AppBar,
  Button,
  Toolbar,
  Box,
  Grid,
  MenuItem,
  Menu,
  Modal,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";

import ProfileModal from "../components/profile_modal";
import Colors from "../utulies/colors";
import SchemasTreeView from "../components/schema_tree_view";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SchemaList from "../components/schema_list";
import { useEffect } from "react";

import { dowloadSchema, setSelectedSchema } from "../features/schemas/slice";
import { authSlice, logout } from "../features/auth/slice";
import { getProfile } from "../features/auth/slice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import theme from "../styles/theme";
const Schemas = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const navigate = useNavigate();
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const fileReducer = useSelector((state) => state.file);

  const downloadSchema = () => {
    const id = fileReducer.selectedSchema._id;
    dispatch(dowloadSchema({ id: id })).then((content) => {
      content = content.payload;
      const fileName = "schema1.xsd";
      const blob = new Blob([content], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    });
  };
  const logOut = () => {
    dispatch(logout()).then(() => {
      navigate("/");
    });
  };
  const onChange = (data) => {
    dispatch(setSelectedSchema({ schema: data }));
  };
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  return (
    <Box
      sx={{
        backgroundColor: "#F5F9FF",
        paddingTop: "15px",
      }}
    >
      <ToastContainer />
      <Box
        sx={{
          pr: 2,
          pl: 2,
        }}
      >
        <AppBar
          sx={{
            borderRadius: "25px",
            position: "sticky",
            padding: "10px",
            bgcolor: Colors.white,
          }}
        >
          <Toolbar
            sx={{
              justifyContent: "space-between",
              flexDirection: "row",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "flex-start",
              }}
            >
              <Typography
                sx={{
                  marginLeft: 0,
                  fontSize: 30,
                  color: Colors.purple,
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              >
                XMLCraft
              </Typography>
              <NavigateNextIcon
                style={{ fontSize: "30px", color: Colors.purple }}
              />
              <Typography
                sx={{
                  marginLeft: 0,
                  fontSize: 30,
                  color: "black",
                  fontWeight: "bold",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              >
                schemas
              </Typography>
            </Box>

            <MenuIcon
              onClick={handleClick}
              style={{ fontSize: "25px", color: Colors.purple }}
            />
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem
                onClick={() => {
                  navigate("/files");
                }}
              >
                <FileCopyIcon sx={theme.iconsStyle}></FileCopyIcon>
                xml_file
              </MenuItem>
              <MenuItem onClick={() => setProfileOpen(true)}>
                <AccountCircleIcon sx={theme.iconsStyle}></AccountCircleIcon>
                My account
              </MenuItem>
              <MenuItem onClick={logOut}>
                <MeetingRoomIcon sx={theme.iconsStyle}></MeetingRoomIcon>
                Logout
              </MenuItem>
              {/* <Modal
                open={profileOpen}
                onClose={() => setProfileOpen(false)}
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
                      fontSize: "50px",
                      color: Colors.purple,
                      margin: 10,
                    }}
                  ></AccountCircleIcon>
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    User Profile
                  </Typography>
                  <Box>
                    <FormField
                      label="email"
                      defaultValue={authReducer.loading ? " " : user.email}
                      // onFocus={() => handleError(null, "email")}
                      id="email"
                      // value={email}
                      //onChange={(e) => setEmail(e.target.value)}
                      icon={<MailIcon></MailIcon>}
                      // error={errors.email}
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
                          defaultValue={
                            authReducer.loading
                              ? " "
                              : user.user_name.split("_")[1]
                          }
                          id="last_name"
                          //   error={errors.username}
                          //  value={lastName}
                          // onChange={(e) => setLastName(e.target.value)}
                          //  icon={<PersonIcon></PersonIcon>}
                        ></FormField>
                      </Grid>
                      <Grid item>
                        <FormField
                          label="first_name"
                          id="first_name"
                          defaultValue={
                            authReducer.loading
                              ? " "
                              : user.user_name.split("_")[0]
                          }
                          //    error={errors.username}
                          //    value={firstName}
                          //   onChange={(e) => setFirstName(e.target.value)}
                          // icon={<PersonIcon></PersonIcon>}
                        ></FormField>
                      </Grid>
                    </Grid>
                  </Box>

                  <Box
                    style={{
                      marginTop: "20px",
                      alignItems: "center",
                      justifyContent: "center",
                      display: "flex",
                    }}
                  >
                    <Button
                      sx={theme.buttonStyle}
                      onClick={() => setProfileOpen(false)}
                    >
                      Close
                    </Button>
                    <Button sx={theme.buttonStyle}>Update</Button>
                  </Box>
                </Box>
              </Modal> */}
              <ProfileModal
                isOpen={profileOpen}
                onClose={() => setProfileOpen(false)}
              />
            </Menu>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: "flex",
            flex: 1,
            height: "110%",
            width: "100%",
            position: "sticky",
            backgroundColor: Colors.bg,
            flexDirection: "row",
            flexWrap: "wrap",
          }}
        >
          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
                backgroundColor: Colors.bg,
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: Colors.purple,
                borderRadius: "4px",
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#506ECF",
              },

              height: "86vh",
              backgroundColor: Colors.white,
              padding: 2,
              borderRadius: "15px",
              margin: "10px",
              overflowY: "auto",
            }}
          >
            <SchemaList onChange={onChange} />
          </Box>

          <Box
            sx={{
              "&::-webkit-scrollbar": {
                width: "5px",
                backgroundColor: Colors.bg, // Set scrollbar track color
              },
              "&::-webkit-scrollbar-thumb": {
                backgroundColor: Colors.purple, // Set scrollbar thumb color
                borderRadius: "4px", // Set thumb border radius
              },
              "&::-webkit-scrollbar-thumb:hover": {
                backgroundColor: "#506ECF", // Set thumb color on hover
              },
              display: "flex",
              flex: 1,
              margin: "10px",
              marginLeft: "16px",
              backgroundColor: Colors.white,
              justifyContent: "space-between",
              borderRadius: "15px",
              flexDirection: "row",
              padding: "10px",
              alignItems: "flex-start",
              height: "86vh", // Set a fixed height
              overflowY: "auto", // Enable vertical scrolling when content exceeds the height
            }}
          >
            <SchemasTreeView></SchemasTreeView>
            <Button variant="outlined" onClick={downloadSchema}>
              <Typography
                sx={{
                  fontSize: 15,
                  color: Colors.purple,
                  fontWeight: "bold",
                }}
              >
                Export schema
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default Schemas;
