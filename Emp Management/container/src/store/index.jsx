import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';

export { loginUser, logoutUser, refreshAccessToken } from "./authSlice";


const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export default store;
