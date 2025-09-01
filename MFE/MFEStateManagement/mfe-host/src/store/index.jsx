// mfe-host/src/store/index.js
import { configureStore } from "@reduxjs/toolkit";
import products from "./productSlice.jsx";
import users from "./userSlice.jsx";

// Re-export thunks so remotes can import them from "mfe_host/store"
export { fetchProducts } from "./productSlice";
export { fetchUsers } from "./userSlice";

const store = configureStore({
  reducer: {
    products,
    users,
  },
});

export default store;
