import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAdmin = localStorage.getItem("administratorEmail");

  return isAdmin ? <Outlet /> : <Navigate to="auth/login" replace />;
};

export default ProtectedRoute;
