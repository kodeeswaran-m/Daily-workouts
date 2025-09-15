import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { accessToken, initialized } = useSelector((state) => state.auth);

  if (!initialized) return <div>Loading...</div>;

  if (!accessToken) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default ProtectedRoute;







// import React from 'react';
// import { useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';

// const ProtectedRoute = ({ children }) => {
//   const { accessToken, initialized } = useSelector(state => state.auth);

//   // if you haven't yet checked refresh-token, show loader (App handles this too)
//   if (!initialized) return <div>Loading...</div>;

//   if (!accessToken) return <Navigate to="/login" replace />;

//   return children;
// };

// export default ProtectedRoute;
