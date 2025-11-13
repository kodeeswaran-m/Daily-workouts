import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";


export const fetchDepartments = createAsyncThunk(
  "departments/fetchAll",
  async ({ search = "", status = "" }, { rejectWithValue }) => {
    try {
      const res = await api.get("/departments", {
        params: { search, status },
      });
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// Fetch department by ID
export const fetchDepartmentById = createAsyncThunk(
  "departments/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      console.log("drom dept slice",id);
      const res = await api.get(`/departments/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);


// Fetch Active Departments
export const fetchActiveDepartments = createAsyncThunk(
  "departments/fetchActiveDepartments",
  async (_,{ rejectWithValue }) => {
    try {
      console.log("drom dept slice");
      const res = await api.get(`/departments/active`);
      console.log("res",res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Create new department
export const createDepartment = createAsyncThunk(
  "departments/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/departments", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Update department
export const updateDepartment = createAsyncThunk(
  "departments/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const res = await api.put(`/departments/${id}`, data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Delete department
export const deleteDepartment = createAsyncThunk(
  "departments/delete",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(`/departments/${id}`);
      return { id, ...res.data }; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Assign employee
export const assignEmployee = createAsyncThunk(
  "departments/assignEmployee",
  async ({ id, employeeId }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/departments/${id}/assign`, { employeeId });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Unassign employee
export const unassignEmployee = createAsyncThunk(
  "departments/unassignEmployee",
  async ({ id, employeeId }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/departments/${id}/unassign`, { employeeId });
      return res.data; 
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const departmentSlice = createSlice({
  name: "departments",
  initialState: {
    list: [],
    activeDepartments: [],
    selected: null,
    loading: false,
    error: null,
  },
  reducers: {
    clearSelected(state) {
      state.selected = null;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all
      .addCase(fetchDepartments.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchDepartments.fulfilled, (s, a) => {
        s.loading = false;
        s.list = a.payload;
      })
      .addCase(fetchDepartments.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // Fetch by ID
      .addCase(fetchDepartmentById.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchDepartmentById.fulfilled, (s, a) => {
        s.loading = false;
        s.selected = a.payload;
      })
      .addCase(fetchDepartmentById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      // Fetch active Departments
      .addCase(fetchActiveDepartments.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchActiveDepartments.fulfilled, (s, a) => {
        s.loading = false;
        s.activeDepartments = a.payload;
      })
      .addCase(fetchActiveDepartments.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      // Create
      .addCase(createDepartment.fulfilled, (s, a) => {
        s.list.push(a.payload);
      })

      // Update
      .addCase(updateDepartment.fulfilled, (s, a) => {
        const idx = s.list.findIndex((d) => d._id === a.payload._id);
        if (idx !== -1) s.list[idx] = a.payload;
        if (s.selected?._id === a.payload._id) s.selected = a.payload;
      })

      // Delete
      .addCase(deleteDepartment.fulfilled, (s, a) => {
        s.list = s.list.filter((d) => d._id !== a.payload.id);
        if (s.selected?._id === a.payload.id) s.selected = null;
      })

      // Assign Employee
      .addCase(assignEmployee.fulfilled, (s, a) => {
        const updated = a.payload.department;
        const idx = s.list.findIndex((d) => d._id === updated._id);
        if (idx !== -1) s.list[idx] = updated;
        if (s.selected?._id === updated._id) s.selected = updated;
      })

      // Unassign Employee
      .addCase(unassignEmployee.fulfilled, (s, a) => {
        const updated = a.payload.department;
        const idx = s.list.findIndex((d) => d._id === updated._id);
        if (idx !== -1) s.list[idx] = updated;
        if (s.selected?._id === updated._id) s.selected = updated;
      });
  },
});

export const { clearSelected, clearError } = departmentSlice.actions;
export default departmentSlice.reducer;
