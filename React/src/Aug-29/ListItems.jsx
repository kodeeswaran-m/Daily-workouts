// import {
//   Divider,
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   Typography
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import axios from "axios";

// function ListItems() {
//   const [users, setUsers] = useState([]);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [open, setOpen] = useState(false);

//   useEffect(() => {
//     axios
//       .get("https://dummyjson.com/users?limit=10")
//       .then((data) => setUsers(data.data.users))
//       .catch((err) => {
//         console.log("Error", err);
//       });
//   }, []);

//   const handleClickOpen = (user) => {
//     setSelectedUser(user);
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//     setSelectedUser(null);
//   };

//   return (
//     <>
//       <List>
//         {users.map((user) => (
//           <div key={user.id}>
//             <ListItem button onClick={() => handleClickOpen(user)}>
//               <ListItemText
//                 primary={`${user.firstName} ${user.lastName}`}
//                 secondary={user.email}
//               />
//             </ListItem>
//             <Divider />
//           </div>
//         ))}
//       </List>

//       <Dialog open={open} onClose={handleClose}>
//         <DialogTitle>User Details</DialogTitle>
//         <DialogContent>
//           {selectedUser && (
//             <DialogContentText component="div">
//               <Typography><strong>Name:</strong> {selectedUser.firstName} {selectedUser.lastName}</Typography>
//               <Typography><strong>Email:</strong> {selectedUser.email}</Typography>
//               <Typography><strong>Phone:</strong> {selectedUser.phone}</Typography>
//               <Typography><strong>Age:</strong> {selectedUser.age}</Typography>
//               <Typography><strong>Company:</strong> {selectedUser.company?.name}</Typography>
//             </DialogContentText>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose} variant="contained">Close</Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
// }

// export default ListItems;

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import api from "./api";
import Divider from "@mui/material/Divider";

function ListItems() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    api
      .get("/users?limit=15")
      .then((data) => setUsers(data.data.users))
      .catch((error) => console.log("Error : ", error));
  });
  return (
    <>
      <List>
        {users.map((user) => (
          <div key={user.id}>
            <ListItem>
              <ListItemText
                primary={`${user.firstName} - ${user.lastName}`}
                secondary={user.email}
              />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </>
  );
}

export default ListItems;
