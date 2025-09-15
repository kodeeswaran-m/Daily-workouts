import React from "react";
import "../styles/FormControl.css";

const FormControl = ({
  label,
  type = "text",         // used for input types (text, email, password, number etc.)
  as = "input",           // "input" | "textarea" | "select"
  value,
  onChange,
  options = [],           // only for select
  placeholder,
  error,
  size = "md",            // "sm" | "md" | "lg"
  ...rest
}) => {
  const renderControl = () => {
    switch (as) {
      case "textarea":
        return (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`form-control-element form-${size} ${error ? "form-error" : ""}`}
            {...rest}
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={onChange}
            className={`form-control-element form-${size} ${error ? "form-error" : ""}`}
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
      default: // input
        return (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`form-control-element form-${size} ${error ? "form-error" : ""}`}
            {...rest}
          />
        );
    }
  };

  return (
    <div className={`form-control-group`}>
      {label && <label className="form-control-label">{label}</label>}
      {renderControl()}
      {error && <p className="form-control-error">{error}</p>}
    </div>
  );
};

export default FormControl;
