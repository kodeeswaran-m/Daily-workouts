import React from "react";
import "../styles/Button.css";

const Button = ({
  children,
  onClick,
  type = "button", // default is "button"
  bgColor = "# 8347ad",
  textColor = "#fff",
  borderColor = "transparent",
  size = "md", // "sm" | "md" | "lg"
  variant = "solid", // "solid" | "outline" | "ghost"
  disabled = false,
  ...rest
}) => {
  const styles = {
    backgroundColor: variant === "solid" ? bgColor : "transparent",
    color: variant === "solid" ? textColor : bgColor,
    border:
      variant === "outline" ? `2px solid ${borderColor || bgColor}` : "none",
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
