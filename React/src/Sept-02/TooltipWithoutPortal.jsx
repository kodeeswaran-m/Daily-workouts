import React, { useState } from "react";

function TooltipWithoutPortal({ children, text }) {
  const [show, setShow] = useState(false);

  return (
    <span
      style={{
        position: "relative",
        cursor: "pointer",
        color: "blue",
        textDecoration: "underline",
      }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <span
          style={{
            position: "absolute",
            bottom: "120%",
            left: "50%",
            transform: "translateX(-50%)",
            background: "black",
            color: "white",
            padding: "5px",
            borderRadius: "5px",
            fontSize: "14px",
            whiteSpace: "nowrap",
          }}
        >
          {text}
        </span>
      )}
    </span>
  );
}

export default TooltipWithoutPortal;
