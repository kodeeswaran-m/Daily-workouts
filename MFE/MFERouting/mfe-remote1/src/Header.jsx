import React from "react";
import Button from '@mui/material/Button';

const Header = () => {
  return (
    <header style={{ background: "lightblue", padding: "20px" }}>
      <h1>Remote 1 - Header</h1>
      <Button variant="contained">Apple from remote1</Button>
    </header>
  );
};

export default Header;
