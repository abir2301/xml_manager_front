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
import MailIcon from "@mui/icons-material/Mail";
import ProfileModal from "../components/profile_modal";
import Colors from "../utulies/colors";
import SchemasTreeView from "../components/schema_tree_view";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import SchemaList from "../components/schema_list";
import FileList from "../components/files_list";
import { useEffect } from "react";
import FileTreeView from "../components/file_tree_view";
import { downloadSchema, setSelectedSchema } from "../features/schemas/slice";
import { setSelectedFile, downloadFile } from "../features/xml_files/slice";

import { logout } from "../features/auth/slice";
import { getProfile } from "../features/auth/slice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import theme from "../styles/theme";
const FilesScreen = (props) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [profileOpen, setProfileOpen] = React.useState(false);

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const dispatch = useDispatch();
  const fileReducer = useSelector((state) => state.file);
  const authReducer = useSelector((state) => state.auth);
  const xmlReducer = useSelector((state) => state.xml);
  const navigate = useNavigate();
  const exportFile = () => {
    const id = xmlReducer.selectedfile._id;
    dispatch(downloadFile({ id: id })).then((content) => {
      content = content.payload;
      const fileName = "file.xml";
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
    dispatch(setSelectedFile({ schema: data }));
  };
  useEffect(() => {
    dispatch(getProfile());
  }, []);
  const renderNode = (node) => {
    if (node.childrens && node.childrens.length > 0) {
      return (
        <div key={node._id}>
          <div>{`<${node.name}>`}</div>
          <div style={{ marginLeft: "20px" }}>
            {node.childrens.map((child) => renderNode(child))}
          </div>
          <div>{`</${node.name}>`}</div>
        </div>
      );
    } else {
      return (
        <div key={node._id}>
          {`<${node.name}>${node.value || ""}</${node.name}>`}
        </div>
      );
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#F5F9FF",
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
            margin: "15px",
            position: "sticky",
            padding: "10px",
            //  zIndex: theme.zIndex.drawer + 2,
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
                Xml_Manager
              </Typography>
              <NavigateNextIcon
                style={{ fontSize: "30px", color: Colors.purple }}
              />
              <Typography
                sx={{
                  marginLeft: 0,
                  fontSize: 20,
                  color: "black",
                  paddingRight: "20px",
                  paddingLeft: "20px",
                }}
              >
                Xml_files
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
                  navigate("/");
                }}
              >
                <FileCopyIcon sx={theme.iconsStyle}></FileCopyIcon>
                schemas
              </MenuItem>
              <MenuItem onClick={() => setProfileOpen(true)}>
                <AccountCircleIcon sx={theme.iconsStyle}></AccountCircleIcon>
                My account
              </MenuItem>
              <MenuItem onClick={logOut}>
                <MeetingRoomIcon sx={theme.iconsStyle}></MeetingRoomIcon>
                Logout
              </MenuItem>

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
            height: "100%",
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

              height: "82vh",
              backgroundColor: Colors.white,
              padding: 2,
              borderRadius: "15px",
              overflowY: "auto",
              margin: "10px",
            }}
          >
            <FileList onChange={onChange} />
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
              marginLeft: "16px",
              backgroundColor: Colors.white,
              justifyContent: "space-between",
              borderRadius: "15px",
              flexDirection: "row",
              padding: "10px",
              alignItems: "flex-start",
              height: "82vh", // Set a fixed height
              overflowY: "auto", // Enable vertical scrolling when content exceeds the height
            }}
          >
            <Box>
              <FileTreeView></FileTreeView>
            </Box>

            <Button variant="outlined" onClick={exportFile}>
              <Typography
                sx={{
                  fontSize: 15,
                  color: Colors.purple,
                  fontWeight: "bold",
                }}
              >
                Export File
              </Typography>
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default FilesScreen;
