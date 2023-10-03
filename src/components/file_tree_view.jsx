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
} from "@mui/material";
import TreeItem, { treeItemClasses } from "@mui/lab/TreeItem";
import Collapse from "@mui/material/Collapse";
import { useSpring, animated } from "@react-spring/web";
import { PlusOneOutlined } from "@mui/icons-material";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AddIcon from "@mui/icons-material/Add";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import FnInstance from "../utulies/functions";
import Colors from "../utulies/colors";
import "../styles/style.css";
import { nodeType } from "../utulies/data";
import { ToastContainer, toast } from "react-toastify";

import {
  postElement,
  getFilesSchema,
  deleteElement,
  updateElement,
} from "../features/schemas/slice";
import Swal from "sweetalert2";
import SuccessAlert from "./sweet_alert/success";
import FailAlert from "./sweet_alert/fail";
import { useDispatch, useSelector } from "react-redux";
function TransitionComponent(props) {
  const style = useSpring({
    from: {
      opacity: 0,
      transform: "translate3d(20px,0,0)",
    },
    to: {
      opacity: props.in ? 1 : 0,
      transform: `translate3d(${props.in ? 0 : 20}px,0,0)`,
    },
  });

  return (
    <animated.div style={style}>
      <Collapse {...props} />
    </animated.div>
  );
}

export default function FileTreeView() {
  const [data, setData] = React.useState([]);
  const [isAttribute, setIsAttribute] = React.useState(false);
  const [attribute, setAttribute] = React.useState({});
  React.useEffect(() => {
    // Your logic here for setting the attribute
    // Example: setAttribute(yourValue);
    // Ensure that you update the attribute based on some condition
  }, [isAttribute, attribute]);
  const fileReducer = useSelector((state) => state.file);
  const xmlReducer = useSelector((state) => state.xml);
  const renderNode = (node) => {
    if (node.childrens && node.childrens.length > 0) {
      return (
        <List key={node._id}>
          <ListItem style={{ paddingLeft: "0px" }}>
            <ListItemText
              primary={
                <Typography>
                  {`<${node.name}`}
                  {isAttribute ? ` ${attribute.name}="${attribute.value}"` : ""}
                  {`>`}
                </Typography>
              }
            />
          </ListItem>
          <ListItem style={{ paddingTop: "0", paddingBottom: "0" }}>
            <List>
              {node.childrens.map((child) => {
                if (child.is_attribute) {
                  console.log("ff");
                }
                return !child.is_attribute ? renderNode(child) : "";
              })}
            </List>
          </ListItem>
          <ListItem style={{ paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText
              primary={<Typography>{`</${node.name}>`}</Typography>}
            />
          </ListItem>
        </List>
      );
    } else {
      return (
        <List key={node._id}>
          <ListItem style={{ paddingTop: "0", paddingBottom: "0" }}>
            <ListItemText
              primary={
                <Typography>
                  {`<${node.name}`}
                  {node.is_attribute ? ` ${node.name}="${node.value}"` : ""}
                  {`>${node.value || ""}</${node.name}>`}
                </Typography>
              }
            />
          </ListItem>
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
        {/* <Paper elevation={3} style={{ padding: "20px" }}>
          {xmlReducer.selectedfile.data.map((node) => (
            <div key={node._id} style={{ marginLeft: "20px" }}>
              {renderNode(node)}
            </div>
          ))}
        </Paper> */}
        {xmlReducer.selectedfile.data.map((node) => (
          <div key={node._id} style={{ marginLeft: "20px" }}>
            {renderNode(node)}
          </div>
        ))}
      </List>
    </Box>
  );
}
