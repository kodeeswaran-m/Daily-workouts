import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import employeesReducer from "./employeesSlice";
import departmentsReducer from "./departmentsSlice";
export { loginUser, registerUser, logoutUser, refreshAccessToken, updateProfile } from "./authSlice";
export {
  fetchEmployees,
  fetchEmployeeById,
  fetchEmployeeByEmployeeId,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  downloadEmployeesExcel,
  toggleEmployeeStatus,
} from "./employeesSlice";
export {
  fetchDepartments,
  fetchDepartmentById,
  deleteDepartment,
  createDepartment,
  updateDepartment,
  assignEmployee,
  unassignEmployee,
  fetchActiveDepartments,
  clearSelected
} from "./departmentsSlice";
import tokenMiddleware from "./tokenMiddleware";

const store = configureStore({
  reducer: {
    auth: authReducer,
    employees: employeesReducer,
    departments: departmentsReducer,
  },
  middleware: (getDefault) => getDefault().concat(tokenMiddleware),
});

export default store;
