import { configureStore } from "@reduxjs/toolkit";
import recipesReducer from "./RecipesSlice"
import quotesReducer from "./QuoteSlice"

const store=configureStore({
    reducer:{
        recipes:recipesReducer,
        quotes:quotesReducer
    }
})

export  default store;

