
import React from "react";
import DatePicker from "react-datepicker";
import { FaCalendarAlt } from "react-icons/fa";
import "react-datepicker/dist/react-datepicker.css";
import "../../styles/FormControl.css";

import {
  FORM_CONTROL_TYPES,
  FORM_CONTROL_SIZES,
  FORM_CONTROL_DEFAULTS,
} from "../../constants/formControlConstants";

const FormControl = ({
  label,
  type = FORM_CONTROL_DEFAULTS.TYPE,
  as = FORM_CONTROL_DEFAULTS.AS,
  value,
  onChange,
  options = [],
  placeholder = FORM_CONTROL_DEFAULTS.PLACEHOLDER,
  error,
  size = FORM_CONTROL_SIZES.MEDIUM,
  required = FORM_CONTROL_DEFAULTS.REQUIRED,
  ...rest
}) => {
  const handleDateChange = (date) => {
    onChange({
      target: {
        value: date,
        name: rest.name,
      },
    });
  };

  const renderControl = () => {
    if (type === "date") {
      return (
        <div className={`datepicker-wrapper form-${size}`}>
          <DatePicker
            selected={value ? new Date(value) : null}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            placeholderText={placeholder || "dd/mm/yyyy"}
            className={`form-control-element ${
              error ? "form-error" : ""
            } datepicker-input`}
            showPopperArrow={false}
            isClearable
            autoComplete="off"
            {...rest}
          />
          <FaCalendarAlt className="calendar-icon" />
        </div>
      );
    }

    switch (as) {
      case FORM_CONTROL_TYPES.TEXTAREA:
        return (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`form-control-element form-${size} ${
              error ? "form-error" : ""
            }`}
            {...rest}
          />
        );

      case FORM_CONTROL_TYPES.SELECT:
        return (
          <select
            value={value}
            onChange={onChange}
            className={`form-control-element form-${size} ${
              error ? "form-error" : ""
            }`}
            {...rest}
          >
            <option value="">Select an option</option>
            {options.map((opt, i) => (
              <option key={i} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        );

      default:
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`form-control-element form-${size} ${
              error ? "form-error" : ""
            }`}
            {...rest}
          />
        );
    }
  };

  return (
    <div className="form-control-group">
      {label && (
        <label className="form-control-label">
          {label} {required && <span className="required-asterisk">*</span>}
        </label>
      )}
      {renderControl()}
      {error && <p className="form-control-error">{error}</p>}
    </div>
  );
};

export default FormControl;


