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
  useNavigate,
  NavLink,
} from "react-router-dom";
import DashBoard from "./components/DashBoard";
import { logoutUser, refreshAccessToken } from "./store/authSlice";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import "./setupInterceptors";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import Employee from "./components/Employee";
import Department from "./components/Department";

const LoginForm = React.lazy(() => import("mfe_auth/LoginForm"));

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, accessToken, initialized } = useSelector((s) => s.auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const resultAction = await dispatch(logoutUser());
      if (logoutUser.fulfilled.match(resultAction)) {
        navigate("/login");
      }
    } catch (err) {
      console.error("Login error:", err);
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
        {/* Left: EMS */}
        <h1 className="header-title">EMS</h1>

        {/* Desktop nav (hidden on mobile) */}
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

        {/* Right: Hamburger (mobile only) */}
        {user && accessToken && (
          <button
            className="menu-toggle"
            onClick={() => setIsMenuOpen((prev) => !prev)}
          >
            ☰
          </button>
        )}

        {/* Desktop logout/login */}
        {user && accessToken ? (
          <button onClick={handleLogout} className="logoutBtn">
            Logout
          </button>
        ) : (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}
      </header>

      {/* Overlay */}
      {isMenuOpen && (
        <div
          className="menu-overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      {/* Side Menu (mobile) */}
      {user && accessToken && (
        <div className={`side-menu ${isMenuOpen ? "open" : ""}`}>
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

          {/* Logout at bottom */}
          <button onClick={handleLogout} className="logoutBtn">
            Logout
          </button>
        </div>
      )}

      <main className="main-content">
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route
              path="/login"
              element={
                <AuthRoute>
                  <LoginForm onLoginSuccess={() => navigate("/dashboard")} />
                </AuthRoute>
              }
            />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/employees" element={<Employee />} />
              <Route path="/departments" element={<Department />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

// import ReactDOM from "react-dom/client";
// import React, { useEffect } from "react";
// import { Suspense } from "react";
// import "./App.css";
// import {
//   BrowserRouter,
//   Link,
//   Navigate,
//   Route,
//   Routes,
//   useNavigate,
//   NavLink
// } from "react-router-dom";
// import DashBoard from "./components/DashBoard";
// import { logoutUser, refreshAccessToken } from "./store/authSlice";
// import { Provider, useDispatch, useSelector } from "react-redux";
// import store from "./store";
// import "./setupInterceptors";
// import ProtectedRoute from "./components/ProtectedRoute";
// import AuthRoute from "./components/AuthRoute";
// import Employee from "./components/Employee";
// import Department from "./components/Department";

// const LoginForm = React.lazy(() => import("mfe_auth/LoginForm"));

// const App = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   // const initialized = useSelector((s) => s.auth.initialized);
//   const { user, accessToken, initialized } = useSelector((s) => s.auth);
//   // console.log("user, accessToken from app.jsx", user, accessToken);

//   const handleLogout = async () => {
//     try {
//       const resultAction = await dispatch(logoutUser());
//       console.log("from handleLogout :", resultAction);
//       if (logoutUser.fulfilled.match(resultAction)) {
//         navigate("/login");
//       }
//     } catch (err) {
//       console.error("Login error:", err);
//     }
//   };
//   useEffect(() => {
//     if (!initialized) {
//       dispatch(refreshAccessToken());
//     }
//   }, [dispatch, initialized]);

//   if (!initialized) return <div>Loading...</div>; // wait for refresh attempt
//   return (
//     <>

//       <header className="header">
//         <h1 className="header-title">EMS</h1>

//         {user && accessToken && (
//           <nav className="nav-menu">
//             <NavLink
//               to="/dashboard"
//               className={({ isActive }) =>
//                 isActive ? "nav-link active" : "nav-link"
//               }
//             >
//               Dashboard
//             </NavLink>
//             <NavLink
//               to="/employees"
//               className={({ isActive }) =>
//                 isActive ? "nav-link active" : "nav-link"
//               }
//             >
//               Employees
//             </NavLink>
//             <NavLink
//               to="/departments"
//               className={({ isActive }) =>
//                 isActive ? "nav-link active" : "nav-link"
//               }
//             >
//               Departments
//             </NavLink>
//           </nav>
//         )}

//         {user && accessToken ? (
//           <button onClick={handleLogout} className="logoutBtn">
//             Logout
//           </button>
//         ) : (
//           <Link to="/login">
//             <button className="login-btn">Login</button>
//           </Link>
//         )}
//       </header>

//       <main className="main-content">
//         <Suspense fallback={<p>Loading...</p>}>
//           <Routes>
//             <Route
//               path="/login"
//               element={
//                 <AuthRoute>
//                   <LoginForm onLoginSuccess={() => navigate("/dashboard")} />
//                 </AuthRoute>
//               }
//             />
//             <Route element={<ProtectedRoute />}>
//               <Route path="/dashboard" element={<DashBoard />} />
//               <Route path="/employees" element={<Employee />} />
//               <Route path="/departments" element={<Department />} />
//             </Route>
//             <Route path="*" element={<Navigate to="/dashboard" replace />} />
//           </Routes>
//         </Suspense>
//       </main>
//     </>
//   );
// };

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
