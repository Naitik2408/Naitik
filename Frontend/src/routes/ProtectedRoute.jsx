import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../Redux/hooks";
import { selectAuth } from "../Redux/authSlice";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, loading } = useAppSelector(selectAuth);
  const location = useLocation();

  if (loading) {
    // Show loading spinner while checking authentication
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Not authenticated - redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If admin access is required but user is not admin
  if (requireAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  // Authenticated and has required permissions
  return <>{children}</>;
};

export default ProtectedRoute;