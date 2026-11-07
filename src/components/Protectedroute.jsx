import { Navigate, Outlet } from "react-router";
import { useAuth } from "../context/Authcontext";

export default function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" replace />;
}
