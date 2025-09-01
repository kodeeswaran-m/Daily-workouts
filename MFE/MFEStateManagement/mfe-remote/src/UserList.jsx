// mfe-remote2/src/UserList.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Pull thunks from host store (re-exported)
import { fetchUsers } from "mfe_host/store";

export default function UserList() {
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((s) => s.users);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchUsers());
    }
  }, [dispatch, status]);

  if (status === "loading") return <p>Loading users...</p>;
  if (status === "failed") return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div>
      <h2>User Lists</h2>
      <ul>
        {data.map((u, index) => (
          <li key={u.id}>
            {index+1} - {u.firstName} {u.lastName} — {u.age} — {u.gender}
          </li>
        ))}
      </ul>
    </div>
  );
}
