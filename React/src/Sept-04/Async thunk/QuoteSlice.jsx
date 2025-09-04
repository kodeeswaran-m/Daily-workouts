import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchQuotes=createAsyncThunk("quotes/fetchQuotes", async ()=>{
    const response = await axios.get("https://dummyjson.com/quotes");
    return response.data.quotes;
})

const quotesSlice=createSlice({
    name:"quotes",
    initialState:{
        quotes:[],
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchQuotes.pending,(state,action)=>{
                state.error=null;
                state.loading=true
        })
        .addCase(fetchQuotes.fulfilled,(state,action)=>{
            state.loading=false;
            state.quotes=action.payload;
        })
        .addCase(fetchQuotes.rejected,(state,action)=>{

            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export default quotesSlice.reducer;