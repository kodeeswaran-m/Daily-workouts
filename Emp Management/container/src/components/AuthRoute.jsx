import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const { accessToken, initialized } = useSelector(state => state.auth);

  if (!initialized) return <div>Loading...</div>;

  if (accessToken) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default AuthRoute;
 