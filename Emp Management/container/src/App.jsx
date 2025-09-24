import ReactDOM from "react-dom/client";
import "./App.css";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import {
  BrowserRouter,
  Link,
  Navigate,
  Route,
  Routes,
  NavLink,
  useNavigate,
} from "react-router-dom";
import { Menu, UserCircle2, X, HeartHandshake } from "lucide-react";
import { logoutUser, refreshAccessToken } from "./store/authSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import "./setupInterceptors";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";

const LoginForm = React.lazy(() => import("mfe_auth/LoginForm"));
const RegisterForm = React.lazy(() => import("mfe_auth/RegisterForm"));
const WelcomePage = React.lazy(() => import("mfe_auth/WelcomePage"));
const EmployeesPage = React.lazy(() => import("mfe_employees/EmployeesPage"));
const EmployeeDetailsPage = React.lazy(() =>
  import("mfe_employees/EmployeeDetailsPage")
);
const EmployeeFormPage = React.lazy(() =>
  import("mfe_employees/EmployeeFormPage")
);
const DashboardPage = React.lazy(() => import("mfe_dashboard/DashboardPage"));
const DepartmentsPage = React.lazy(() =>
  import("mfe_departments/DepartmentsPage")
);
const DepartmentFormPage = React.lazy(() =>
  import("mfe_departments/DepartmentFormPage")
);
const DepartmentDetailsPage = React.lazy(() =>
  import("mfe_departments/DepartmentDetailsPage")
);

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, accessToken, initialized } = useSelector((s) => s.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(resultAction)) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  useEffect(() => {
    if (!initialized) {
      dispatch(refreshAccessToken());
    }
  }, [dispatch, initialized]);

  if (!initialized) return <div>Loading...</div>;

  return (
    <>
      <header className="header">
        <h1 className="header-title main-title">Employee Management </h1>

        {user && accessToken && (
          <nav className="nav-menu">
            <NavLink to="/dashboard" className="nav-link">
              Dashboard
            </NavLink>
            <NavLink to="/employees" className="nav-link">
              Employees
            </NavLink>
            <NavLink to="/departments" className="nav-link">
              Departments
            </NavLink>
          </nav>
        )}

        {user && accessToken && (
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        )}

        {user && accessToken ? (
          <div className="avatar-container desktop-only">
            <button
              className="avatar-btn"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <UserCircle2 size={36} />
            </button>

            {isProfileOpen && (
              <div className="profile-dropdown">
                {/* <p className="profile-username">👤 {user?.name}</p> */}
                <p className="profile-name">{user?.name}</p>
                <p className="profile-email">{user?.email}</p>
                <button onClick={handleLogout} className="logoutBtn">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          // <Link to="/login">
          //   <button className="login-btn">Login</button>
          // </Link>
          <HeartHandshake />
        )}
      </header>

      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {user && accessToken && (
        <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
          <h3 className="header-title header-mble">EMS</h3>
          <NavLink
            to="/dashboard"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/employees"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Employees
          </NavLink>
          <NavLink
            to="/departments"
            className="nav-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Departments
          </NavLink>

          {/* <div className="avatar-container mobile-only">
            <button
              className="avatar-btn"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <UserCircle2 size={36} />
            </button>

            {isProfileOpen && (
              <div className="sidebar-dropdown">
                <p className="profile-name">
                  {user?.name} 
                </p>
                <p className="profile-email">{user?.email}</p>
                <button onClick={handleLogout} className="logoutBtn">
                  Logout
                </button>
              </div>
              // <p style={{color:"yellow"}}>sdfghj</p>
            )}
          </div> */}
          <div className="avatar-container mobile-only">
            <button
              className="avatar-btn"
              onClick={() => setIsProfileOpen((prev) => !prev)}
            >
              <UserCircle2 size={36} />
            </button>

            <div className={`sidebar-dropdown ${isProfileOpen ? "open" : ""}`}>
              <p className="profile-name">{user?.name}</p>
              <p className="profile-email">{user?.email}</p>
              <button onClick={handleLogout} className="logoutBtn">
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="main-content">
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              path="/"
              element={
                <AuthRoute>
                  <WelcomePage />
                </AuthRoute>
              }
            />
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <LoginForm onLoginSuccess={() => navigate("/dashboard")} />
                </AuthRoute>
              }
            />
            <Route
              path="/register"
              element={
                <AuthRoute>
                  <RegisterForm onRegisterSuccess={() => navigate("/login")} />
                </AuthRoute>
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/employees" element={<EmployeesPage />} />
              <Route
                path="/employeeDetail/:id"
                element={<EmployeeDetailsPage />}
              />
              <Route
                path="/updateEmployee/:id"
                element={<EmployeeFormPage />}
              />
              <Route path="/departments" element={<DepartmentsPage />} />
              <Route path="/addDepartment" element={<DepartmentFormPage />} />
              <Route
                path="/departmentDetails/:id"
                element={<DepartmentDetailsPage />}
              />
              <Route
                path="/editDepartment/:id"
                element={<DepartmentFormPage />}
              />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

const rootElement = document.getElementById("app");
if (!rootElement) throw new Error("Failed to find the root element");

const root = ReactDOM.createRoot(rootElement);

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

export default App;
