import { configureStore } from "@reduxjs/toolkit"
import counterReducer from "./counterSlice";
import userReducer from "./userSlice";

export  const store=configureStore(
   { reducer:{
        users: userReducer,
        counter: counterReducer
    }}
)