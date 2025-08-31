import { HashRouter, Routes, Route, Link } from "react-router-dom";

import BarchartComponent from "./BarChart";
import PiechartComponent from "./PieChart";
import { AppBar, Button, Container, Toolbar } from "@mui/material";
import Dashboard from "./Dashboard";

function HashRouterComponent() {
  return (
    <HashRouter>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">Dashboard</Button>
          <Button color="inherit" component={Link} to="/barChart">Bar Chart</Button>
          <Button color="inherit" component={Link} to="/pieChart">Pie Chart</Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/" element={<Dashboard/>}/>
        <Route path="/barChart" element={<BarchartComponent />} />
        <Route path="/pieChart" element={<PiechartComponent />} />
      </Routes>
      </Container>
    </HashRouter>
  );
}

export default HashRouterComponent;
