import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
export default function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
