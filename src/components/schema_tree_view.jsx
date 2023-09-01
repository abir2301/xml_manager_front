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
  TextField,
  colors,
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
import { dataStatic } from "../utulies/data";

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
  const length = prop.item.childrens?.length;
  return (
    <Box
      sx={{
        borderColor: "#0024DF",
        borderWidth: 5,
        backgroundColor: "#7085F4",
      }}
    >
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
    {item.childrens?.map((child) => (
      <RecursiveTreeItem key={child._id} item={child} />
    ))}
  </StyledTreeItem>
);

const ListItemComponent = ({ item, index }) => {
  const [openIndexes, setOpenIndexes] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const [openStates, setOpenStates] = React.useState({});

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
  // const length = item.childrens.length;

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
    <Box>
      <Box
        sx={{
          flexDirection: "row",
          // bgcolor: "pink",
          backgroundColor: "#F5F9FF",
          border: "2px solid #E4E7EC",

          height: "minHeight",
          display: "flex",
          gap: 2,
          //  flex: 1,
          justifyContent: "space-around",
          alignItems: "center",
          // padding: 3,
          // border: "1px dashed #0024df",
          borderRadius: 4,
        }}
      >
        <Box
          sx={{
            borderWidth: 5,
            borderColor: "black",
            padding: 1,
            flex: "auto",
            display: "flex",
            // backgroundColor: "red",

            justifyContent: "flex-start",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              backgroundColor: "#F5F9FF",
              borderRadius: 4,
              width: "100%",
            }}
          >
            <ListItemButton
              disableRipple
              sx={{
                width: "100%",
                alignItems: "center",
              }}
            >
              {console.log("childrens length:", item.childrens?.length)}

              {item.childrens?.length >= 1 ? (
                <ListItemIcon onClick={handleClick}>
                  {openIndexes[item._id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
              ) : (
                ""
              )}

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <ListItemText
                  sx={{ marginRight: 3 }}
                  secondary={"name : "}
                  onClick={handleClick}
                />
                <ListItemText
                  sx={{}}
                  primary={item.name}
                  onClick={handleClick}
                />
                {item.childrens?.length >= 1 ? (
                  <></>
                ) : (
                  <>
                    <ListItemText
                      sx={{
                        marginLeft: 3,
                        marginRight: 3,
                      }}
                      secondary={"type : "}
                    />
                    <ListItemText primary={item.type} />
                  </>
                )}
              </Box>
            </ListItemButton>
          </Box>
          {/* end expand button container */}
        </Box>
        <Box
          sx={{
            borderColor: "black",
            // bgcolor: "yellow",
            flexDirection: "row",
            gap: 1,
            display: "flex",
            alignItems: "center",
            padding: 1,
            //  flex: 1,
          }}
        >
          {item.is_attribute ? (
            ""
          ) : (
            <AddIcon
              sx={{ color: "#877C7C", fontSize: 28 }}
              onClick={handleAddClick}
            />
          )}
          <EditIcon
            sx={{ color: "green", fontSize: 28, paddingX: 1, marginY: 2 }}
            // onClick={handleAddClick}
          />
          <DeleteForeverIcon
            sx={{ color: "tomato", fontSize: 28, paddingX: 1, marginY: 2 }}
            // onClick={handleAddClick}
          />
        </Box>
      </Box>
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
          <TextField
            sx={{}}
            variant="outlined"
            type="text"
            height={"20px"}
            placeholder="Node_name"
            value={newNodeName}
            onChange={(e) => setNewNodeName(e.target.value)}
          />
          <TextField
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
      <Collapse
        in={openIndexes.includes(index)}
        timeout="auto"
        unmountOnExit
        sx={{
          flexDirection: "row",
          display: "flex",
          width: "100%",
          alignItems: "flex-start",
          justifyContent: "space-between",
          // flex: 1,
        }}
      >
        <List component="div" disablePadding>
          {item.childrens
            ?.filter((nestedItem) => nestedItem !== null)
            .map((nestedItem, nestedIndex) => (
              <Box key={nestedItem._id} sx={{ margin: "12px 0 0 20px" }}>
                <ListItemComponent
                  key={nestedItem._id}
                  item={nestedItem}
                  index={nestedIndex}
                  open={openStates[nestedItem._id]}
                />
              </Box>
            ))}
          {/* {item.attribute !== null ? (
            <Box sx={{ margin: "12px 0 0 20px", colors: "red" }}>
              <ListItemComponent
                key={item.attribute?._id}
                item={item.attribute}
                index={item.childrens?.length}
              />
            </Box>
          ) : (
            <></>
          )} */}
        </List>
      </Collapse>
    </Box>
  );
};

export default function SchemasTreeView({ schema }) {
  const [open, setOpen] = React.useState(true);
  const [openIndexes, setOpenIndexes] = React.useState([0]);
  const [data, setData] = React.useState([]);
  React.useEffect(() => {
    setData(schema);
  }, [schema]);

  return (
    <>
      <List
        sx={{ bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
        // subheader={
        //   <ListSubheader component="div" id="nested-list-subheader">
        //     Nested List Items
        //   </ListSubheader>
        // }
      >
        <Collapse
          in={openIndexes.includes(0)}
          timeout="auto"
          unmountOnExit
          sx={{
            marginLeft: "20px",
          }}
        >
          <List component="div" disablePadding>
            {schema.map((item, index) => (
              <>
                {item != null ? (
                  <ListItemComponent
                    key={item._id}
                    item={item}
                    index={index}
                  ></ListItemComponent>
                ) : (
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      textAlign: "center",
                      marginTop: 5,
                      color: "black",
                    }}
                    variant="h5"
                    gutterBottom
                  >
                    {" "}
                    empty Schema{" "}
                  </Typography>
                )}
              </>
            ))}
          </List>
        </Collapse>
      </List>
    </>
  );
}
