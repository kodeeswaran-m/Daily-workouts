// import React, { useState } from "react";
// import Modal from "./Modal";

// function Portals() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>React Portal Example - Modal</h1>
//       <button onClick={() => setIsOpen(true)}>Open Modal</button>
//       <h1>React Portal Example - Modal</h1>
//       <h1>React Portal Example - Modal</h1>
//       <h1>React Portal Example - Modal</h1>
//       <h1>React Portal Example - Modal</h1>
//       <h1>React Portal Example - Modal</h1>
//       <h1>React Portal Example - Modal</h1>

//       {isOpen && (
//         <Modal onClose={() => setIsOpen(false)}>
//           <h2>Hello from the Portal!</h2>
//           <p>This modal is rendered outside the main DOM tree.</p>
//         </Modal>
//       )}
//     </div>
//   );
// }

// export default Portals;


import React from "react";
import TooltipWithoutPortal from "./TooltipWithoutPortal";
import TooltipWithPortal from "./TooltipWithPortal";

function Portals() {
  return (
    <div style={{ padding: "50px" }}>
      <h1>React Portals Demo</h1>

      <h2>Without Portal (gets clipped)</h2>
      <div
        style={{
          width: "150px",
          height: "80px",
          border: "1px solid black",
          overflow: "hidden", // causes clipping
          padding: "20px",
        }}
      >
        Hover over <TooltipWithoutPortal text="Oops, I may get cut off!">this</TooltipWithoutPortal>
      </div>

      <h2 style={{ marginTop: "50px" }}>With Portal (escapes clipping)</h2>
      <div
        style={{
          width: "150px",
          height: "80px",
          border: "1px solid black",
          overflow: "hidden",
          padding: "20px",
        }}
      >
        Hover over <TooltipWithPortal text="I escape overflow hidden!">this</TooltipWithPortal>
      </div>
    </div>
  );
}

export default Portals;
