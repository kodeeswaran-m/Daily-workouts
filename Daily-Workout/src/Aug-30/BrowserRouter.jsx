import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import BarchartComponent from "./BarChart";
import PiechartComponent from "./PieChart";
import Dashboard from "./Dashboard";
import { AppBar, Button, Container, Toolbar } from "@mui/material";

function BrowserRouterComponent() {
  return (
    <BrowserRouter>
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">DashBoard</Button>
        <Button color="inherit" component={Link} to="/barChart">Bar Chart</Button>
        <Button color="inherit" component={Link} to="/pieChart">Pie Chart</Button>
      </Toolbar>
    </AppBar>
      <Container>
        <Routes>
          <Route path="/barChart" element={<BarchartComponent />} />
          <Route path="/pieChart" element={<PiechartComponent />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default BrowserRouterComponent;
