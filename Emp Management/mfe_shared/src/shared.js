export { default as FormControl } from "./components/FormControl/FormControl";
export { default as Button } from "./components/Button";
export { default as Input } from "./components/Input";
export { default as Spinner } from "./components/Spinner";

export {
  getPasswordError,
  validateEmail,
  validateName,
  validateConfirmPassword,
} from "./utils/validation.js";

export {
  validateEmployeeId,
  validateJobTitle,
  validateFirstName,
  validateLastName,
  validateEmployeeEmail,
  validatePhone,
  validateDepartment,
  validateHireDate,
  validateEmploymentType,
} from "./utils/employeeValidators.js";

import {
  validateDepartmentName,
  validateDepartmentCode,
  validateDepartmentDescription,
  validateManagerId,
  validateAssistantManagerId,
  validateBudget,
} from "./utils/departmentValidators.js";
