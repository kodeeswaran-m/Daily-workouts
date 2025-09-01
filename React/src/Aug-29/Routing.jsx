import * as React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";
import { Task } from "@mui/icons-material";
import MUIButtons from "./MUIButtons";
import DayOneTaskWithMUI from "./Task";
import TextFields from "./TextFields";
import BasicTable from "./BasicTable";
import ListItems from "./ListItems";

export default function Routing() {
  return (
    <Router>
      {/* Top Navbar */}
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            Task
          </Button>
          <Button color="inherit" component={Link} to="/buttons">
            Button
          </Button>
          <Button color="inherit" component={Link} to="/inputs">
            Input Box
          </Button>
          <Button color="inherit" component={Link} to="/table">
            Table
          </Button>
          <Button color="inherit" component={Link} to="/axios">
            List Axios 
          </Button>
        </Toolbar>
      </AppBar>

      <Container sx={{ mt: 3 }}>
        <Routes>
          <Route path="/" element={<DayOneTaskWithMUI />} />
          <Route path="/buttons" element={<MUIButtons />} />
          <Route path="/table" element={<TextFields />} />
          <Route path="/inputs" element={<BasicTable />} />
          <Route path="/axios" element={<ListItems />} />
          <Route path="*" element={<h2>Page Not Found</h2>} />
        </Routes>
      </Container>
    </Router>
  );
}
