// tokenMiddleware.js
import api from "../api";
import { loginUser, refreshAccessToken, logoutUser } from "./authSlice";

const tokenMiddleware = (store) => (next) => (action) => {
  if (
    loginUser.fulfilled.match(action) ||
    refreshAccessToken.fulfilled.match(action)
  ) {
    console.log("Setting token", action.payload.accessToken);
    api.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${action.payload.accessToken}`;
  }

  if (logoutUser.fulfilled.match(action)) {
    delete api.defaults.headers.common["Authorization"];
  }

  return next(action);
};

export default tokenMiddleware;
