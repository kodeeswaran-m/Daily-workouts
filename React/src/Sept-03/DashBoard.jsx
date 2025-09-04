
import { Tabs, Tab, Box } from "@mui/material";
import Counter from "./Counter";
import User from "./User";
import { useState } from "react";

export default function DashBoard() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Users" />
        <Tab label="Products" />
      </Tabs>

      {value === 0 && (
        <Box sx={{ p: 2 }}>
      <Counter />
        </Box>
      )}
      {value === 1 && (
        <Box sx={{ p: 2 }}>
      <User />
        </Box>
      )}
    </Box>
  );
}

