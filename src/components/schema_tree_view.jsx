import * as React from "react";
import PropTypes from "prop-types";
import SvgIcon from "@mui/material/SvgIcon";
import { alpha, styled } from "@mui/material/styles";
import TreeView from "@mui/lab/TreeView";
import {
  Box,
  IconButton,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
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
import DeleteIcon from "@mui/icons-material/Delete";
import FnInstance from "../utulies/functions";
import { dataStatic } from "../utulies/data";

function MinusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14 }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14 }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

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

TransitionComponent.propTypes = {
  /**
   * Show the component; triggers the enter or exit states
   */
  in: PropTypes.bool,
};

const StyledTreeItem = styled((props) => (
  <TreeItem {...props} TransitionComponent={TransitionComponent} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
  },
}));

const TreeItemComponent = (prop) => {
  const length = prop.item.childrens.length;
  return (
    <Box>
      <Typography variant="h7">
        name : {prop.item.name} {}{" "}
      </Typography>
      {prop.item.parent_id != null && (
        <Typography variant="h8">
          type: {length >= 1 ? "[]" : prop.item.type}
        </Typography>
      )}
    </Box>
  );
};
const RecursiveTreeItem = ({ item }) => (
  <StyledTreeItem nodeId={item._id} label=<TreeItemComponent item={item} />>
    {item.childrens.map((child) => (
      <RecursiveTreeItem key={child._id} item={child} />
    ))}
  </StyledTreeItem>
);

const ListItemComponent = ({ item, index }) => {
  const [openIndexes, setOpenIndexes] = React.useState([]);
  const [open, setOpen] = React.useState(true);
  const [data, setData] = React.useState(dataStatic);
  const [showAddForm, setShowAddForm] = React.useState(false); // State to show/hide the add form
  const [newNodeName, setNewNodeName] = React.useState(""); // State to manage the new node name
  const [newNodeType, setNewNodeType] = React.useState("");
  const [isAtribbute, setIsAtribbute] = React.useState(false);
  // State to manage the new node type

  const handleClick = () => {
    console.log(index);
    // Removed index parameter, as it's not used here
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index));
    } else {
      setOpenIndexes([...openIndexes, index]);
    }
  };
  const handleAddClick = () => {
    setShowAddForm(true);
  };
  const handleDeleteClick = () => {
    setShowAddForm(false);
    setNewNodeName("");
    setNewNodeType("");
    setIsAtribbute(false);
  };
  const addNodeToParent = (parentId, newNodeName, newNodeType, isAttribute) => {
    setData((prevData) => {
      const newData = [...prevData];
      const parentNode = FnInstance.getParent(newData, parentId);
      if (parentNode) {
        const newNode = {
          _id: FnInstance.generateUniqueId(),
          name: newNodeName,
          type: newNodeType,
          parent_id: parentId,
          is_attribute: isAttribute,
          childrens: [],
        };
        parentNode.childrens.push(newNode);
        console.log(newNode);
      }

      return newData;
    });
  };
  const handleAddNode = () => {
    addNodeToParent(item._id, newNodeName, newNodeType, isAtribbute);

    console.log(
      "Adding new node:",
      newNodeName,
      newNodeType,
      isAtribbute,
      item._id
    );

    // Reset form and hide it
    setShowAddForm(false);
    setNewNodeName("");
    setNewNodeType("");
  };
  return (
    <>
      <ListItemButton disableRipple>
        {item.childrens.length >= 1 ? (
          <ListItemIcon onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
        ) : (
          ""
        )}
        <ListItemText primary={item.name} onClick={handleClick} />
        {item.is_attribute ? (
          ""
        ) : (
          <AddCircleOutlineIcon onClick={handleAddClick} />
        )}
      </ListItemButton>
      {showAddForm && (
        <Box
          sx={{
            flexDirection: "row",
            margin: "10px",
            display: "flex",
            rowGap: "20px",
            columnGap: "20px",
          }}
        >
          <input
            type="text"
            height={"20px"}
            placeholder="Node Name"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
          />
          <input
            type="text"
            height={"20px"}
            placeholder="Node Type"
            value={newNodeType}
            onChange={(e) => setNewNodeType(e.target.value)}
          />
          <FormControl variant="filled" sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              is_attribute
            </InputLabel>
            <Select
              sx={{ color: "black" }}
              id="demo-simple-select-standard"
              value={isAtribbute}
              onChange={(e) => {
                setIsAtribbute(e.target.value);
              }}
            >
              <MenuItem value={true}>true</MenuItem>
              <MenuItem value={false}>false</MenuItem>
            </Select>
          </FormControl>
          <button onClick={handleAddNode}>Add Node</button>
          <button onClick={handleDeleteClick}>
            <DeleteIcon></DeleteIcon>
          </button>
        </Box>
      )}
      <Collapse in={openIndexes.includes(index)} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.childrens.map((nestedItem, nestedIndex) => (
            <Box sx={{ margin: "20px" }}>
              <ListItemComponent
                key={nestedItem._id}
                item={nestedItem}
                index={nestedIndex}
              />
            </Box>
          ))}
        </List>
      </Collapse>
    </>
  );
};

export default function SchemasTreeView() {
  const [open, setOpen] = React.useState(true);
  const [openIndexes, setOpenIndexes] = React.useState([0]);

  const handleClick = () => {
    if (openIndexes.includes(0)) {
      setOpenIndexes(openIndexes.filter((i) => i !== 0));
    } else {
      setOpenIndexes([...openIndexes, 0]);
    }
  };

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          <ListSubheader component="div" id="nested-list-subheader">
            Nested List Items
          </ListSubheader>
        }
      >
        <Collapse
          in={openIndexes.includes(0)}
          timeout="auto"
          unmountOnExit
          sx={{ marginLeft: "20px" }}
        >
          <List component="div" disablePadding>
            {dataStatic.map((item, index) => (
              <>
                <ListItemComponent
                  key={item._id}
                  item={item}
                  index={index}
                ></ListItemComponent>
              </>
            ))}
          </List>
        </Collapse>

        {/* <ListItemButton disableRipple>
          <ListItemIcon onClick={handleClick}>
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemIcon>
          <ListItemText primary="Main" onClick={handleClick} />
          <AddCircleOutlineIcon onClick={() => console.log("plus clicked")} />
        </ListItemButton> */}
        {/*  */}
      </List>
    </>
  );
}
