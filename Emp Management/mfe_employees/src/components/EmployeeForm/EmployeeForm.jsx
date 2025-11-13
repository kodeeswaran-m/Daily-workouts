import React, { useState } from "react";
import { useSelector } from "react-redux";
import { FormControl } from "mfe_shared/shared";
import { employeeFields } from "../../config/employeeFields";
import "../../styles/EmployeesPage.css";

import {
  validateEmployeeId,
  validateJobTitle,
  validateFirstName,
  validateLastName,
  validateEmployeeEmail,
  validatePhone,
  validateDepartment,
  validateHireDate,
  validateEmploymentType,
} from "mfe_shared/shared";

const EmployeeForm = ({ onSubmit, onCancel }) => {
  const { activeDepartments } = useSelector((state) => state.departments);

  const [formData, setFormData] = useState({
    employeeId: "",
    jobTitle: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    hireDate: "",
    employmentType: "",
    status: "active",
  });

  const [errors, setErrors] = useState({});

  const validators = {
    employeeId: validateEmployeeId,
    jobTitle: validateJobTitle,
    firstName: validateFirstName,
    lastName: validateLastName,
    email: validateEmployeeEmail,
    phone: validatePhone,
    department: validateDepartment,
    hireDate: validateHireDate,
    employmentType: validateEmploymentType,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      if (!/^\d*$/.test(value)) return;
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validators[name]) {
      const error = validators[name](value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const validateAll = () => {
    const newErrors = {};
    for (const key in validators) {
      const error = validators[key](formData[key]);
      if (error) newErrors[key] = error;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const isFormValid = () => {
    // Check for empty required fields
    const hasEmptyRequired = Object.entries(formData).some(([key, value]) => {
      const field = employeeFields(activeDepartments).find(
        (f) => f.name === key
      );
      return field?.required && !value;
    });

    // Check for any validation errors
    const hasErrors = Object.values(errors).some(Boolean);

    return !hasEmptyRequired && !hasErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateAll()) onSubmit(formData);
  };

  return (
    <div>
      <h3>Add-Employee</h3>
      <form className="employee-form" onSubmit={handleSubmit}>
        <div className="form-grid">
          {employeeFields(activeDepartments).map((field) => (
            <FormControl
              key={field.name}
              label={field.label}
              name={field.name}
              type={field.type || "text"}
              as={field.as}
              options={field.options}
              value={formData[field.name]}
              onChange={handleChange}
              error={errors[field.name]}
              pattern={field.pattern}
              required={field.required}
            />
          ))}
        </div>

        <div className="form-actions">
          <button
            type="submit"
            className="primary-btn"
            disabled={!isFormValid()}
          >
            Add Employee
          </button>

          {onCancel && (
            <button type="button" className="secondary-btn" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
