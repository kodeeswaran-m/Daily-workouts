import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api";

// export const fetchEmployees = createAsyncThunk(
//   "employees/fetchAll",
//   async (_, { rejectWithValue }) => {
//     try {
//       const res = await api.get("/employees");
//       console.log("fetchEmpployees", res?.data?.employees);
//       return res?.data?.employees;
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );

// export const fetchEmployees = createAsyncThunk(
//   "employees/fetchAll",
//   async (
//     { page = 1, limit = 10, search = "", department = "", status = "" },
//     { rejectWithValue }
//   ) => {
//     try {
//       const res = await api.get("/employees", {
//         params: { page, limit, search, department, status },
//       });
//       return res.data; // now returns { employees, total, page, pages }
//     } catch (err) {
//       return rejectWithValue(err.response?.data?.message || err.message);
//     }
//   }
// );
export const fetchEmployees = createAsyncThunk(
  "employees/fetchAll",
  async (
    { after = null, limit = 50, search = "", department = "", status = "" },
    { rejectWithValue }
  ) => {
    try {
      const res = await api.get("/employees", {
        params: { after, limit, search, department, status },
      });
      return res.data; // { employees, nextCursor, hasMore }
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchEmployeeById = createAsyncThunk(
  "employees/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.get(`/employees/${id}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);
export const fetchEmployeeByEmployeeId = createAsyncThunk(
  "employees/fetchByEmployeeId",
  async (empId, { rejectWithValue }) => {
    try {
      const res = await api.get(`/employees/by-empid/${empId}`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employees/create",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/employees", data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employees/update",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      console.log(" id, data", id, data);
      const res = await api.put(`/employees/${id}`, data);
      console.log("from slice(formdata) :", res);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteEmployee = createAsyncThunk(
  "employees/delete",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/employees/${id}`);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// ✅ Bulk Delete
export const deleteManyEmployees = createAsyncThunk(
  "employees/deleteMany",
  async (ids, { rejectWithValue }) => {
    try {
      const response = await api.delete("/employees", { data: { ids } }); // backend expects { ids: [] }
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const downloadEmployeesExcel = createAsyncThunk(
  "employees/downloadExcel",
  async ({ department, status }, { rejectWithValue }) => {
    try {
      // Build query string only for department and status
      const queryParams = new URLSearchParams();
      if (department) queryParams.append("department", department);
      if (status) queryParams.append("status", status);

      const res = await fetch(
        `http://localhost:5000/api/employees/download/excel?${queryParams.toString()}`
      );

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);

      // Build dynamic filename
      const activeFilters = [];
      if (department) activeFilters.push(department);
      if (status) activeFilters.push(status);

      let fileName = "employees.xlsx"; // default
      if (activeFilters.length > 0) {
        fileName = `employees_filtered(${activeFilters.join("+")}).xlsx`;
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();

      return true;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);


export const toggleEmployeeStatus = createAsyncThunk(
  "employees/toggleStatus",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/employees/${id}/status`);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const employeeSlice = createSlice({
  name: "employees",

  // initialState: {
  //   list: [],
  //   selected: null,
  //   loading: false,
  //   error: null,

  //   total: 0,
  //   page: 1,
  //   pages: 1,
  //   searchedEmployee:null,

  // },
  initialState: {
    list: [],
    nextCursor: null,
    hasMore: true,
    loading: false,
    error: null,
    employeeCount: 0,
    selected: null,
    searchedEmployee: null,
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
      .addCase(fetchEmployees.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (s, a) => {
        s.loading = false;
        if (a.meta.arg.after) {
          s.list = [...s.list, ...a.payload.employees];
        } else {
          s.list = a.payload.employees;
        }
        s.employeeCount = a.payload.employeeCount;
        s.nextCursor = a.payload.nextCursor;
        s.hasMore = a.payload.hasMore;
      })
      .addCase(fetchEmployees.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      // .addCase(fetchEmployees.pending, (s) => {
      //   s.loading = true;
      //   s.error = null;
      // })
      // // .addCase(fetchEmployees.fulfilled, (s, a) => {
      // //   s.loading = false;
      // //   s.list = a.payload;
      // // })
      // .addCase(fetchEmployees.fulfilled, (s, a) => {
      //   s.loading = false;
      //   s.list = a.payload.employees;
      //   s.total = a.payload.total;
      //   s.page = a.payload.page;
      //   s.pages = a.payload.pages;
      // })
      // .addCase(fetchEmployees.rejected, (s, a) => {
      //   s.loading = false;
      //   s.error = a.payload;
      // })

      .addCase(fetchEmployeeById.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchEmployeeById.fulfilled, (s, a) => {
        s.loading = false;
        s.selected = a.payload;
      })
      .addCase(fetchEmployeeById.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(fetchEmployeeByEmployeeId.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchEmployeeByEmployeeId.fulfilled, (s, a) => {
        s.loading = false;
        s.searchedEmployee = a.payload;
      })
      .addCase(fetchEmployeeByEmployeeId.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(createEmployee.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(createEmployee.fulfilled, (s, a) => {
        s.loading = false;
        s.list.push(a.payload);
      })
      .addCase(createEmployee.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(updateEmployee.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(updateEmployee.fulfilled, (s, a) => {
        s.loading = false;
        const idx = s.list.findIndex((emp) => emp._id === a.payload._id);
        if (idx !== -1) s.list[idx] = a.payload;
        if (s.selected?.id === a.payload._id) {
          s.selected = a.payload;
        }
      })
      .addCase(updateEmployee.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })

      .addCase(deleteEmployee.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(deleteEmployee.fulfilled, (s, a) => {
        s.loading = false;
        console.log("payload", a);
        s.list = s.list.filter((emp) => emp._id !== a.payload.id);
        // console.log("sas", s.list);
        if (s.selected?.id === a.payload.id) {
          s.selected = null;
        }
      })

      .addCase(deleteEmployee.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(deleteManyEmployees.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(deleteManyEmployees.fulfilled, (s, a) => {
        s.loading = false;
        s.list = s.list.filter((emp) => !a.payload.ids.includes(emp._id));
        if (s.selected && a.payload.ids.includes(s.selected._id)) {
          s.selected = null;
        }
      })
      .addCase(deleteManyEmployees.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(downloadEmployeesExcel.pending, (s) => {
        s.loading = true;
      })
      .addCase(downloadEmployeesExcel.fulfilled, (s) => {
        s.loading = false;
      })
      .addCase(downloadEmployeesExcel.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(toggleEmployeeStatus.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(toggleEmployeeStatus.fulfilled, (s, a) => {
        s.loading = false;
        const idx = s.list.findIndex((emp) => emp.id === a.payload.id);
        if (idx !== -1) s.list[idx] = a.payload;
        if (s.selected?.id === a.payload.id) {
          s.selected = a.payload;
        }
      })
      .addCase(toggleEmployeeStatus.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export const { clearSelected, clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
