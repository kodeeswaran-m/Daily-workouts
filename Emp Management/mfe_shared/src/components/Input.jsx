import React from "react";
import "../styles/Input.css";
import { INPUT_DEFAULTS, INPUT_SIZES } from "../constants/inputConstants";

const Input = ({
  label,
  type = INPUT_DEFAULTS.TYPE,
  value,
  onChange,
  size = INPUT_DEFAULTS.SIZE,
  error,
  ...rest
}) => {
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




// import React from "react";
// import "../styles/Input.css"; 

// const Input = ({ label, type = "text", value, onChange, size = "md", error, ...rest }) => {
//   return (
//     <div className={`input-group input-${size}`}>
//       {label && <label className="input-label">{label}</label>}
//       <input
//         type={type}
//         value={value}
//         onChange={onChange}
//         className={`input-field ${error ? "input-error" : ""}`}
//         {...rest}
//       />
//       {error && <p className="input-error-msg">{error}</p>}
//     </div>
//   );
// };

// export default Input;
