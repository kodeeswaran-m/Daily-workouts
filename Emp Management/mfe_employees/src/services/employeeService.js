import axios from "axios";

const API_URL = "http://localhost:5000/employees"; // replace with your API

export const getEmployees = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const createEmployee = async (employee) => {
  const { data } = await axios.post(API_URL, employee);
  return data;
};

export const updateEmployeeById = async (id, employee) => {
  const { data } = await axios.put(`${API_URL}/${id}`, employee);
  return data;
};

export const deleteEmployeeById = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
