// mfe-host/src/store/productSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const res = await fetch("https://dummyjson.com/products?limit=20");
  const data = await res.json();
  return data.products;
});

const productSlice = createSlice({
  name: "products",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => { state.status = "loading"; })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch products";
      });
  },
});

export default productSlice.reducer;
