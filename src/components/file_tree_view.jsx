import * as React from "react";
import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import {
  Box,
  Button,
  FormHelperText,
  IconButton,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
  Paper,
  colors,
  ListItem,
  Modal,
} from "@mui/material";
import {
  postNodeValue,
  getFiles,
  getSubNode,
} from "../features/xml_files/slice";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import { AddAlarm, AddCircle, PlusOneOutlined } from "@mui/icons-material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import DeleteIcon from "@mui/icons-material/Delete";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import { ToastContainer, toast } from "react-toastify";
import CheckIcon from "@mui/icons-material/Check";
import Swal from "sweetalert2";
import SuccessAlert from "./sweet_alert/success";
import FailAlert from "./sweet_alert/fail";
import { useDispatch, useSelector } from "react-redux";
import theme from "../styles/theme";

export default function FileTreeView() {
  const [data, setData] = React.useState([]);
  const [open, setOpen] = React.useState({});
  const [value, setValue] = React.useState(""); // State to manage the new node name
  const [valueError, setValueError] = React.useState("");
  const dispatch = useDispatch();
  const fileReducer = useSelector((state) => state.file);
  const xmlReducer = useSelector((state) => state.xml);
  React.useEffect(() => {}, [open, xmlReducer.selectedfile, xmlReducer.files]);
  function testDataType(type, inputString) {
    console.log(type);
    const typePatterns = {
      text: /.*/,
      url: /.*/,
      number: /^[-+]?\d+$/,
      boolean: /^(true|false)$/i,
      // float: /^[-+]?\d+\.\d+(?:[eE][-+]?\d+)?$/, // Handles scientific notation
      // double: /^[-+]?\d+\.\d+(?:[eE][-+]?\d+)?$/, // Handles scientific notation
      dateTime:
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/,
      date: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/,
    };

    if (typePatterns[type].test(inputString)) {
      return true;
    } else {
      return false;
    }
  }

  // Example usage:

  const handleOpen = (nodeId) => {
    setOpen((open) => ({
      ...open,
      [nodeId]: true,
    }));
  };
  const handleClose = (nodeId) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [nodeId]: false,
    }));
    console.log(open[nodeId]);
  };
  const handlePostValue = (node) => {
    console.log(node);
    console.log(testDataType(node.type, value));

    setValueError("");
    if (value.trim === "") {
      setValueError("value is required ");
      console.log(valueError);

      if (testDataType(node.type, value))
        console.log(testDataType(node.type, value));
      return;
    } else {
      dispatch(
        postNodeValue({
          data: { value: value },
          id: node._id,
        })
      );
      // dispatch(getFiles());
      setValue("");
      setOpen(false);
    }
  };
  const OpenForm = ({ node }) => {
    return (
      <Box
        sx={{
          flexDirection: "row",
          marginY: 3,
          marginX: 3,
          display: "flex",
          borderRadius: "8px",
          rowGap: "20px",
          columnGap: "20px",
        }}
      >
        <Button
          sx={{ backgroundColor: "#F5F9FF" }}
          onClick={() => {}}
          variant="contained"
        >
          <Typography sx={{ color: "black" }}>type: {node.type}</Typography>
        </Button>
        <TextField
          sx={{
            "& .MuiOutlinedInput-root": {
              height: "60px",
              borderRadius: 2, // Adjust the border radius as needed
              border: "2px #8E8E8E", // Add a thicker border and adjust the color
              "& fieldset": {
                borderColor: "#6c757d", // Border color when not focused
              },
              "&:hover fieldset": {
                borderColor: "#6c757d", // Border color on hover
              },
              "&.Mui-focused fieldset": {
                borderColor: "#6c757d", // Border color when focused
              },
            },
          }}
          variant="outlined"
          required
          type={node.type ? node.type : "text"}
          height={"20px"}
          placeholder="input value "
          value={value}
          onChange={(e) => setValue(e.target.value)}
          error={Boolean(valueError)}
          helperText={valueError}
        />

        <Button
          sx={theme.formButtons}
          onClick={() => handleClose(node._id)}
          variant="contained"
        >
          <DeleteIcon sx={[{ color: "tomato" }, theme.formIcons]}></DeleteIcon>
        </Button>
        <Button
          sx={theme.formButtons}
          onClick={() => {
            handlePostValue(node);
          }}
          variant="contained"
        >
          <CheckIcon sx={[theme.formIcons, { color: "green" }]}></CheckIcon>
        </Button>
      </Box>
    );
  };
  const renderNode = (node) => {
    if (node.childrens && node.childrens.length > 0) {
      return (
        <List key={node._id} style={{ paddingLeft: "0px" }}>
          <ListItem
            sx={[theme.nodeStyle, { flexDirection: "row", display: "flex" }]}
            onClick={() => {
              handleOpen(node.attribute._id);
            }}
          >
            <ListItemText
              primary={
                <Typography sx={theme.nodeNameStyle}>
                  {`<${node.name}   `}
                  {node.attribute._id
                    ? ` ${node.attribute.name}=${node.attribute.value}`
                    : ""}
                  {`>`}
                </Typography>
              }
            />
            {node.type === "list" ? (
              <AddIcon
                sx={{ fontSize: "35px", color: "green" }}
                onClick={() => {
                  console.log(xmlReducer.selectedfile);
                  dispatch(
                    getSubNode({
                      id: node._id,
                      data: {
                        file: xmlReducer.selectedfile._id,
                      },
                    })
                  ).then((response) => {
                    dispatch(getFiles());
                    //  renderNode(xmlReducer?.subNode?.childrens[0]);
                  });
                }}
              ></AddIcon>
            ) : (
              <></>
            )}
          </ListItem>
          {open[node.attribute._id] && node.attribute._id && (
            <OpenForm node={node.attribute}></OpenForm>
          )}

          <ListItem
            style={{
              paddingTop: "0",
              marginLeft: "20px",
              paddingBottom: "0",
            }}
          >
            <List>
              {node.childrens.map((child) => {
                return !child.is_attribute ? renderNode(child) : "";
              })}
            </List>
          </ListItem>
          <ListItem sx={[theme.nodeStyle]}>
            <ListItemText
              primary={
                <Typography
                  sx={theme.nodeNameStyle}
                >{`</${node.name}>`}</Typography>
              }
            />
          </ListItem>
        </List>
      );
    } else {
      return (
        <List key={node._id}>
          <ListItem
            sx={[theme.nodeStyle]}
            onClick={() => {
              handleOpen(node._id);
            }}
          >
            <ListItemText
              primary={
                <Typography sx={theme.nodeNameStyle}>
                  {`<${node.name}`}
                  {node.is_attribute ? ` ${node.name}="${node.value}"` : ""}
                  {`>${node.value || ""}</${node.name}>`}
                </Typography>
              }
            />
          </ListItem>
          {open[node._id] && <OpenForm node={node}></OpenForm>}
        </List>
      );
    }
  };
  React.useEffect(() => {
    console.log("sellected ");
    console.log(xmlReducer.selectedfile);
    setData(xmlReducer.selectedfile);
  }, [xmlReducer.selectedfile]);

  return (
    <Box sx={{ backgroundColor: "red" }}>
      <List
        sx={{ bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {xmlReducer.selectedfile.data.map((node) => (
          <div key={node._id} style={{ marginLeft: "20px" }}>
            {renderNode(node)}
          </div>
        ))}
      </List>
    </Box>
  );
}
