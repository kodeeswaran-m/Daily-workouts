import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUsers } from "./slices/userSlice";
import { List, ListItem, ListItemText } from "@mui/material";

function User() {
  const { list, status, error } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === "idle") dispatch(fetchUsers());
  }, [dispatch, status]);
  console.log("user", list);
  return (
    <>
      {status === "loading" && <p>loading...</p>}
      {status === "failed" && <p>Error : {error}</p>}
      {status === "succeded" && (
        <List>
          {list.map((user) => (
            <ListItem key={user.id}>
              <ListItemText primary={user.firstName} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      )}
    </>
  );
}

export default User;
