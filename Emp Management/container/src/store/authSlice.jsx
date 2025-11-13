import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (creds, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/login", creds);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (creds, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", creds);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const refreshAccessToken = createAsyncThunk(
  "auth/refresh",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/refresh-token");
      console.log("data from refresh ", res.data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await api.post("/auth/logout");
      return;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async (data, { rejectWithValue }) => {
    try {
      console.log("data",data);
      const res = await api.put("/auth/update-profile", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    loading: false,
    initialized: false,
    error: null,
  },
  reducers: {
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(loginUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.accessToken = a.payload.accessToken;
      })
      .addCase(loginUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(registerUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(registerUser.fulfilled, (s, a) => {
        s.loading = false;
        s.user = a.payload.user;
        s.accessToken = a.payload.accessToken;
        // s.user = a.payload.user;
      })
      .addCase(registerUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(refreshAccessToken.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(refreshAccessToken.fulfilled, (s, a) => {
        console.log(
          " Refresh success, setting initialized=true",
          a.payload
        );
        s.loading = false;
        s.user = a.payload.user;
        s.accessToken = a.payload.accessToken;
        s.initialized = true;
      })
      .addCase(refreshAccessToken.rejected, (s) => {
        console.log("Refresh failed, setting initialized=true");
        s.loading = false;
        s.user = null;
        s.accessToken = null;
        s.initialized = true;
      })

      .addCase(logoutUser.fulfilled, (s) => {
        s.user = null;
        s.accessToken = null;
        s.initialized = true;
      })
      .addCase(updateProfile.pending, (s) => {
      s.loading = true;
      s.error = null;
    })
    .addCase(updateProfile.fulfilled, (s, a) => {
      s.loading = false;
      // update user state with new info
      s.user = a.payload.user;
    })
    .addCase(updateProfile.rejected, (s, a) => {
      s.loading = false;
      s.error = a.payload;
    });
  },
});

export const { clearAuth } = slice.actions;
export default slice.reducer;
