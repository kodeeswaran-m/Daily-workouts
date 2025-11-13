import React from "react";

export const Spinner = () => <div data-testid="mock-spinner">Loading...</div>;

export const FormControl = ({
  label,
  name,
  value,
  onChange,
  error,
  required,
}) => (
  <div data-testid={`form-control-${name}`}>
    <label>{label}</label>
    <input
      name={name}
      value={value}
      onChange={onChange}
      aria-label={label}
      required={required}
    />
    {error && <span role="alert">{error}</span>}
  </div>
);

// Mock validation functions
export const validateEmployeeId = jest.fn(() => "");
export const validateJobTitle = jest.fn(() => "");
export const validateFirstName = jest.fn(() => "");
export const validateLastName = jest.fn(() => "");
export const validateEmployeeEmail = jest.fn(() => "");
export const validatePhone = jest.fn(() => "");
export const validateDepartment = jest.fn(() => "");
export const validateHireDate = jest.fn(() => "");
export const validateEmploymentType = jest.fn(() => "");
