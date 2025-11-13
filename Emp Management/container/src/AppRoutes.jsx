import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRoute from "./components/AuthRoute";
import "./App.css";

import { ROUTES } from "./constants/appRoutes";
import { APP_LABELS } from "./constants/appLabels";

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
const ProfilePage = React.lazy(() => import("mfe_dashboard/ProfilePage"));
const DepartmentsPage = React.lazy(() =>
  import("mfe_departments/DepartmentsPage")
);
const DepartmentFormPage = React.lazy(() =>
  import("mfe_departments/DepartmentFormPage")
);
const DepartmentDetailsPage = React.lazy(() =>
  import("mfe_departments/DepartmentDetailsPage")
);

const AppRoutes = ({ navigate }) => {
  return (
    <Suspense fallback={<p>{APP_LABELS.LOADING}</p>}>
      <Routes>
        {/* Public (Auth) Routes */}
        <Route
          path={ROUTES.ROOT}
          element={
            <AuthRoute>
              <WelcomePage />
            </AuthRoute>
          }
        />
        <Route
          path={ROUTES.LOGIN}
          element={
            <AuthRoute>
              <LoginForm onLoginSuccess={() => navigate(ROUTES.DASHBOARD)} />
            </AuthRoute>
          }
        />
        <Route
          path={ROUTES.REGISTER}
          element={
            <AuthRoute>
              <RegisterForm
                onRegisterSuccess={() => navigate(ROUTES.DASHBOARD)}
              />
            </AuthRoute>
          }
        />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path={ROUTES.USER_PROFILE} element={<ProfilePage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.EMPLOYEES} element={<EmployeesPage />} />
          <Route path={ROUTES.EMPLOYEE_DETAIL} element={<EmployeeDetailsPage />} />
          <Route path={ROUTES.UPDATE_EMPLOYEE} element={<EmployeeFormPage />} />
          <Route path={ROUTES.DEPARTMENTS} element={<DepartmentsPage />} />
          <Route path={ROUTES.ADD_DEPARTMENT} element={<DepartmentFormPage />} />
          <Route
            path={ROUTES.DEPARTMENT_DETAIL}
            element={<DepartmentDetailsPage />}
          />
          <Route path={ROUTES.EDIT_DEPARTMENT} element={<DepartmentFormPage />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to={ROUTES.DASHBOARD} replace />} />
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;


