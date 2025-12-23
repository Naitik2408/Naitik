import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import BlogPage from "../pages/BlogPage";
import BlogPostPage from "../pages/BlogPostPage";
import ProjectDetailPage from "../pages/ProjectDetailPage";
import DashboardPage from "../pages/DashboardPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import ProtectedRoute from "./ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/project/:id" element={<ProjectDetailPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requireAdmin={true}>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;