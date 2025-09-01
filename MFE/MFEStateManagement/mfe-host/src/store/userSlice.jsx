// mfe-host/src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const res = await fetch("https://dummyjson.com/users?limit=30");
  const data = await res.json();
  return data.users;
});

const userSlice = createSlice({
  name: "users",
  initialState: { data: [], status: "idle", error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => { state.status = "loading"; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error?.message || "Failed to fetch users";
      });
  },
});

export default userSlice.reducer;
