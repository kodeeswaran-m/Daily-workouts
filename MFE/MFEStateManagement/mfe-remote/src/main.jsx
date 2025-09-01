import React from "react";
import { createRoot } from "react-dom/client";
// import { Provider } from "react-redux";
// import store from "mfe_host/store"; // default import
import UserList from "./UserList.jsx";

createRoot(document.getElementById("root")).render(
  // <Provider store={store}>
    <UserList />
  // </Provider>
);
