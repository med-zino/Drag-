import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";

interface PrivateRouteProps {
  redirectTo?: string; 
}

/**
 * PrivateRoute component to protect routes based on authentication.
 * @param redirectTo - Path to redirect if the user is not authenticated (default: '/login').
 */
const PrivateRoute: React.FC<PrivateRouteProps> = ({ redirectTo = "/login" }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to={redirectTo} />;
};

export default PrivateRoute;
