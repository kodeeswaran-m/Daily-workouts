import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";

const tooltipRoot = document.getElementById("tooltip-root");

function TooltipWithPortal({ children, text }) {
  const [coords, setCoords] = useState(null);
  const targetRef = useRef(null);

  const showTooltip = () => {
    const rect = targetRef.current.getBoundingClientRect();
    setCoords({
      top: rect.top + window.scrollY - 40,
      left: rect.left + window.scrollX + rect.width / 2,
    });
  };

  const hideTooltip = () => setCoords(null);

  return (
    <>
      <span
        ref={targetRef}
        onMouseEnter={showTooltip}
        onMouseLeave={hideTooltip}
        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}
      >
        {children}
      </span>

      {coords &&
        ReactDOM.createPortal(
          <div
            style={{
              position: "absolute",
              top: coords.top,
              left: coords.left,
              transform: "translateX(-50%)",
              background: "black",
              color: "white",
              padding: "5px 10px",
              borderRadius: "5px",
              fontSize: "14px",
              whiteSpace: "nowrap",
              zIndex: 1000,
            }}
          >
            {text}
          </div>,
          tooltipRoot
        )}
    </>
  );
}

export default TooltipWithPortal;
