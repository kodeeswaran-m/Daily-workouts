import { combineReducers, createStore } from "redux";
import { authReducer } from "./authReducer";


const rootReducer= combineReducers({
    auth:authReducer
});

export type RootState=ReturnType<typeof rootReducer>;

export const store=createStore(rootReducer);