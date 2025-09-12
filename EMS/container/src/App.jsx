import React from "react";
import { Suspense } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
const LoginForm = React.lazy(() => import("mfe_auth/LoginForm"));
const StatsCard = React.lazy(() => import("mfe_dashboard/StatsCard"));
const DepartmentTable = React.lazy(() => import("mfe_departments/DepartmentTable"));
const EmployeeTable = React.lazy(() => import("mfe_employees/EmployeeTable"));
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <nav>
          <Link to="/">Login</Link>
          <Link to="/stats">StatsCard</Link>
          <Link to="/deptTable">Department Table</Link>
          <Link to="/empTable">Employee Table</Link>
        </nav>
        <Suspense fallback={<p>loading...</p>}>
          <Routes>
            <Route path="/" element={<LoginForm />} />
            <Route path="/stats" element={<StatsCard />} />
            <Route path="/deptTable" element={<DepartmentTable />} />
            <Route path="/empTable" element={<EmployeeTable />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </div>
  );
};

export default App;
