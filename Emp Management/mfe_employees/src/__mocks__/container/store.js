export const fetchEmployeeById = (id) => ({
  type: "FETCH_EMP_BY_ID",
  payload: id,
});

export const clearSelected = () => ({
  type: "CLEAR_SELECTED",
});

// export const updateEmployee = jest.fn((payload) => ({
//   type: "UPDATE_EMPLOYEE",
//   payload,
// }));

export const fetchEmployeeByEmployeeId = jest.fn((empId) => ({
  type: "FETCH_EMPLOYEE_BY_EMPLOYEE_ID",
  payload: empId,
}));


export const fetchEmployees = jest.fn(() => ({ type: "FETCH_EMPLOYEES" }));
export const createEmployee = jest.fn(() => ({ type: "CREATE_EMPLOYEE" }));
// export const updateEmployee = jest.fn(() => ({ type: "UPDATE_EMPLOYEE" }));
export const deleteEmployee = jest.fn(() => ({ type: "DELETE_EMPLOYEE" }));
export const deleteManyEmployees = jest.fn(() => ({ type: "DELETE_MANY" }));
export const fetchActiveDepartments = jest.fn(() => ({ type: "FETCH_DEPARTMENTS" }));
export const downloadEmployeesExcel = jest.fn(() => ({
  type: "DOWNLOAD_EMPLOYEES_EXCEL",
  fulfilled: { match: jest.fn(() => true) },
}));



// export const fetchEmployeeById = jest.fn((id) => ({
//   type: "FETCH_EMP_BY_ID",
//   payload: id,
// }));

// export const updateEmployee = jest.fn((data) => ({
//   type: "UPDATE_EMP",
//   payload: data,
// }));

// export const fetchEmployeeByEmployeeId = jest.fn((id) => ({
//   type: "FETCH_EMP_BY_EMPLOYEE_ID",
//   payload: id,
// }));
