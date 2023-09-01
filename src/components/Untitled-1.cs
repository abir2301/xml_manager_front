      // <Box
      //   sx={{
      //     display: "flex",
      //     justifyContent: "center",
      //     alignItems: "center",
      //     flexDirection: "column",
      //     width: "80%",
      //   }}
      // >
      //   {/* orange boule  */}
      //   <Box
      //     sx={{
      //       borderRadius: 180,
      //       height: 15,
      //       width: 15,
      //       backgroundColor: "#E55707",
      //       //position: "fixed",
      //     }}
      //   ></Box>

      //   {/* item box */}
      //   <Box
      //     sx={{
      //       width: "100%",
      //       alignItems: "center",
      //       borderColor: "#E4E7EC",
      //       borderStyle: "groove",
      //       borderRadius: 2,
      //       borderWidth: 1,
      //     }}
      //   >
      //     <ListItemButton
      //       disableRipple
      //       sx={{
      //         width: "100%",
      //         alignItems: "center",
      //         backgroundColor: "#F5F9FF",
      //         borderColor: "black",
      //         borderRadius: 2,
      //         borderWidth: 1,
      //       }}
      //     >
      //       {item.childrens.length >= 1 ? (
      //         <ListItemIcon onClick={handleClick}>
      //           {open ? <ExpandLess /> : <ExpandMore />}
      //         </ListItemIcon>
      //       ) : (
      //         ""
      //       )}
      //       <ListItemText primary={item.name} onClick={handleClick} />
      //       {item.is_attribute ? (
      //         ""
      //       ) : (
      //         <AddCircleOutlineIcon
      //           sx={{ color: "#877C7C", fontSize: 25 }}
      //           onClick={handleAddClick}
      //         />
      //       )}
      //     </ListItemButton>
      //   </Box>
      // </Box>

      // <Box sx={{ width: "100%" }}>
      //   <Box
      //     sx={{
      //       flexDirection: "row",
      //       display: "flex",

      //       justifyContent: "center",
      //       marginX: 20,
      //     }}
      //   >
      //     <Box
      //       sx={{
              
      //         margin: 2,
      //         alignItems: "center",
      //         borderColor: "#E4E7EC",
      //         borderStyle: "groove",
      //         borderRadius: 2,
      //         alignContent: "center",
      //         justifyContent: "center",
      //         height: "100%",

      //         borderWidth: 1,
      //       }}
      //     >
      //       {" "}
      //       <DeleteForeverIcon
      //         sx={{ color: "#877C7C", fontSize: 30, paddingX: 1 }}
      //         onClick={handleAddClick}
      //       />
      //     </Box>
      //     <Box
      //       sx={{
      //         margin: 2,
      //         marginLeft: 0,
      //         height: "100%",
      //         alignItems: "center",
      //         borderColor: "#E4E7EC",
      //         borderStyle: "groove",
      //         borderRadius: 2,
      //         borderWidth: 1,
      //       }}
      //     >
      //       <EditIcon
      //         sx={{ color: "#877C7C", fontSize: 30, paddingX: 1 }}
      //         onClick={handleAddClick}
      //       />
      //     </Box>
      //   </Box>
      // </Box>
     
      // {showAddForm && (
      //   <Box sx={{}}>
      //     <Box
      //       sx={{
      //         flexDirection: "row",
      //         margin: "10px",
      //         display: "flex",
      //         rowGap: "20px",
      //         columnGap: "20px",
      //       }}
      //     >
      //       <input
      //         type="text"
      //         height={"20px"}
      //         placeholder="Node Name"
      //         value={newNodeName}
      //         onChange={(e) => setNewNodeName(e.target.value)}
      //       />
      //       <input
      //         type="text"
      //         height={"20px"}
      //         placeholder="Node Type"
      //         value={newNodeType}
      //         onChange={(e) => setNewNodeType(e.target.value)}
      //       />
      //       <FormControl variant="filled" sx={{ minWidth: 120 }}>
      //         <InputLabel id="demo-simple-select-standard-label">
      //           is_attribute
      //         </InputLabel>
      //         <Select
      //           sx={{ color: "black" }}
      //           id="demo-simple-select-standard"
      //           value={isAtribbute}
      //           onChange={(e) => {
      //             setIsAtribbute(e.target.value);
      //           }}
      //         >
      //           <MenuItem value={true}>true</MenuItem>
      //           <MenuItem value={false}>false</MenuItem>
      //         </Select>
      //       </FormControl>
      //       <button onClick={handleAddNode}>Add Node</button>
      //       <button onClick={handleDeleteClick}>
      //         <DeleteIcon></DeleteIcon>
      //       </button>
      //     </Box>
      //   </Box>
      // )}
      // <Collapse
      //   in={openIndexes.includes(index)}
      //   timeout="auto"
      //   unmountOnExit
      //   sx={{
      //     flexDirection: "row",
      //     display: "flex",
      //     width: "100%",
      //     alignItems: "center",
      //     justifyContent: "space-between",
      //     flex: 1,
      //   }}
      // >
      //   <Box
      //     sx={{
      //       flexDirection: "row",
      //       display: "flex",
      //       alignItems: "flex-start",
      //       justifyContent: "space-between",
      //       margin: 2,
      //     }}
      //   >
      //     <Box
      //       sx={{
      //         margin: 1,
      //         borderWidth: 1,
      //         width: 2,
      //         // height: length * 75,
      //         borderColor: "#E4E7EC",
      //         backgroundColor: "#E4E7EC",
      //       }}
      //     ></Box>

      //     <List component="div" disablePadding>
      //       {item.childrens.map((nestedItem, nestedIndex) => (
      //         <Box sx={{ margin: "20px" }}>
      //           <ListItemComponent
      //             key={nestedItem._id}
      //             item={nestedItem}
      //             index={nestedIndex}
      //           />
      //         </Box>
      //       ))}
      //     </List>
      //   </Box>
      // </Collapse>