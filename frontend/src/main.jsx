import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminIndexRedirect from "./components/routing/AdminIndexRedirect";

const Admin = lazy(() => import("./forms/Admin.jsx"));
const AdminDashboard = lazy(() => import("./components/AdminComponents/AdminDashboard.jsx"));

const QueueingSection = lazy(() => import("./sections/AdminSection/QueueingSection.jsx"));
const AnalyticsSection = lazy(() => import("./sections/AdminSection/AnalyticsSection.jsx"));
const FeedBackSection = lazy(() => import("./sections/AdminSection/FeedbackSection.jsx"));
const SettingSection = lazy(() => import("./sections/AdminSection/SettingSection"));

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/admin", element: <Admin /> },
  { 
    path: "/admindashboard", 
    element: (
      <ProtectedRoute>
        <AdminDashboard />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <AdminIndexRedirect /> }, //control where to navigate after success logged in
      { path: "feedback", element: <FeedBackSection /> },
      { path: "queueing", element: <QueueingSection /> },
      { path: "analytics", element: <AnalyticsSection /> },
      { path: "settings", element: <SettingSection /> },
    ]
  }
]);

createRoot(document.getElementById("root")).render(
    <StrictMode>
      <AuthProvider>
          <RouterProvider router={router} />
      </AuthProvider>
    </StrictMode>
);
