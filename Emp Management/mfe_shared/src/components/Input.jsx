import React from "react";
import "../styles/Input.css"; // your base styles

const Input = ({ label, type = "text", value, onChange, size = "md", error, ...rest }) => {
  return (
    <div className={`input-group input-${size}`}>
      {label && <label className="input-label">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        className={`input-field ${error ? "input-error" : ""}`}
        {...rest}
      />
      {error && <p className="input-error-msg">{error}</p>}
    </div>
  );
};

export default Input;
