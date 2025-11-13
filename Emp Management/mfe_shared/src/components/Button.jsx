import React from "react";
import "../styles/Button.css";
import {
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  BUTTON_DEFAULTS,
} from "../constants/buttonConstants";

const Button = ({
  children,
  onClick,
  type = BUTTON_DEFAULTS.TYPE,
  bgColor = BUTTON_DEFAULTS.BG_COLOR,
  textColor = BUTTON_DEFAULTS.TEXT_COLOR,
  borderColor = BUTTON_DEFAULTS.BORDER_COLOR,
  size = BUTTON_DEFAULTS.SIZE,
  variant = BUTTON_DEFAULTS.VARIANT,
  disabled = false,
  ...rest
}) => {
  const styles = {
    backgroundColor: variant === BUTTON_VARIANTS.SOLID ? bgColor : "transparent",
    color: variant === BUTTON_VARIANTS.SOLID ? textColor : bgColor,
    border:
      variant === BUTTON_VARIANTS.OUTLINE
        ? `2px solid ${borderColor || bgColor}`
        : "none",
  };

  return (
    <button
      className={`btn btn-${size} ${variant}`}
      type={type}
      style={styles}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;




// import React from "react";
// import "../styles/Button.css";

// const Button = ({
//   children,
//   onClick,
//   type = "button",
//   bgColor = "# 8347ad",
//   textColor = "#fff",
//   borderColor = "transparent",
//   size = "md", // "sm" | "md" | "lg"
//   variant = "solid", // "solid" | "outline" | "ghost"
//   disabled = false,
//   ...rest
// }) => {
//   const styles = {
//     backgroundColor: variant === "solid" ? bgColor : "transparent",
//     color: variant === "solid" ? textColor : bgColor,
//     border:
//       variant === "outline" ? `2px solid ${borderColor || bgColor}` : "none",
//   };

//   return (
//     <button
//       className={`btn btn-${size} ${variant}`}
//       type={type} 
//       style={styles}
//       onClick={onClick}
//       disabled={disabled}
//       {...rest}
//     >
//       {children}
//     </button>
//   );
// };

// export default Button;
