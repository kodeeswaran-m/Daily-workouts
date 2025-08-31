import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchUsers=createAsyncThunk("users/fetchUsers", async ()=>{
    const response= await fetch("https://dummyjson.com/users?limit=10");
    return response.json();

})


const userSlice=createSlice(
    {
        name:"users",
        initialState:{
            list:[],
            status:"idle",
            error:null,
        },
        reducers:{},
        extraReducers:(builder)=>{
            builder.addCase(fetchUsers.pending,(state)=>{
                state.status="loading";
            })
            builder.addCase(fetchUsers.fulfilled,(state,action)=>{
                state.status="succeded";
                state.list=action.payload.users;
            })
            builder.addCase(fetchUsers.rejected,(state,action)=>{
                state.status="failed";
                state.error=action.error.message
            })
        },
    }
)

export default userSlice.reducer;