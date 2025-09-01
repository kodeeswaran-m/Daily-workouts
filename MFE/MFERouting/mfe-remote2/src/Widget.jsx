import React from "react";
import Button from '@mui/material/Button';

const Widget = () => {
  return (
    <div style={{ background: "lightgreen", padding: "20px" }}>
      <h2>Remote 2 - Widget Component</h2>
      <p>This is a widget exposed from Remote 2.</p>
      <Button variant="contained">Apple from remote 2</Button>
    </div>
  );
};

export default Widget;
