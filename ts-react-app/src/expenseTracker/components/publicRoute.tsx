import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { Navigate } from "react-router-dom";

interface PublicRouteProps {
  children: React.ReactNode;
}

const PublicRoute = ({ children }: PublicRouteProps) => {
  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  if (isAuthenticated && user) {
    if (user && user.role === "user") return <Navigate to={"/dashboard"} replace/>;
    if (user && user.role === "admin") return <Navigate to={"/admin"} replace/>;
  }

  return <>{children}</>;
};

export default PublicRoute;
