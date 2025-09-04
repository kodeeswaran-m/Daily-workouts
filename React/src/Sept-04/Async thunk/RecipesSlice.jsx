import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




export const fetchRecipes=createAsyncThunk("recipes/fetchRecipes", async()=>{

    const response= await axios.get("https://dummyjson.com/recipes?limit=30");
    return response.data.recipes;
})

const recipesSlice=createSlice({
    name:"recipes",
    initialState:{
        recipes:[],
        error:null,
        loading:false
    },
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchRecipes.pending,(state)=>{
            state.error=null;
            state.loading=true;
        })
        .addCase(fetchRecipes.fulfilled,(state,action)=>{
            state.loading=false;
            state.recipes=action.payload;
        })
        .addCase(fetchRecipes.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.error.message;
        })
    }
})

export default recipesSlice.reducer;