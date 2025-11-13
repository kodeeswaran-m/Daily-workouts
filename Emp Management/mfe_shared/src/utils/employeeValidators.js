// employeeValidators.js

// Employee ID → must start with ACE followed by numbers
export const validateEmployeeId = (id) => {
  if (!id) return "Employee ID is required";
  if (!/^ACE\d+$/.test(id))
    return "Employee ID must start with 'ACE' followed by numbers (e.g., ACE0001)";
  return "";
};

// Job Title → must contain at least 2 letters
export const validateJobTitle = (title) => {
  if (!title) return "Job Title is required";
  if (!/^[A-Za-z\s]{2,}$/.test(title))
    return "Job Title must contain at least 2 letters";
  return "";
};

// First Name → at least 2 letters
export const validateFirstName = (name) => {
  if (!name) return "First Name is required";
  if (!/^[A-Za-z\s]{2,}$/.test(name))
    return "First Name must contain only letters and at least 2 characters";
  return "";
};

// Last Name → at least 2 letters
export const validateLastName = (name) => {
  if (!name) return "Last Name is required";
  if (!/^[A-Za-z\s]{2,}$/.test(name))
    return "Last Name must contain only letters and at least 2 characters";
  return "";
};

// Email → must match firstname.lastname@gmail.com
export const validateEmployeeEmail = (email) => {
  if (!email) return "Email is required";
  // if (!/^[a-zA-Z]+\.[a-zA-Z]+@gmail\.com$/.test(email))
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Email must be in the format firstname.lastname@gmail.com";
  return "";
};

// Phone → 10-digit Indian number starting from 6–9
export const validatePhone = (phone) => {
  if (!phone) return "Phone number is required";
  if (!/^[6-9]\d{9}$/.test(phone))
    return "Phone number must be a valid 10-digit Indian number";
  return "";
};

// Department → required selection
export const validateDepartment = (dept) => {
  if (!dept) return "Please select a Department";
  return "";
};

// Hire Date → required
export const validateHireDate = (date) => {
  if (!date) return "Please select a Hire Date";
  return "";
};

// Employment Type → required
export const validateEmploymentType = (type) => {
  if (!type) return "Please select Employment Type";
  return "";
};
