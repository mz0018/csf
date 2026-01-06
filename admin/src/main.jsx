import { StrictMode, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";

const SuperAdminDashboard = lazy(() =>
  import("./components/SuperAdminDashBoard.jsx")
);

const router = createBrowserRouter(
  [
    { path: "/", element: <App /> },
    {
      path: "/superadmin",
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <SuperAdminDashboard />
        </Suspense>
      ),
    },
  ],
  {
    basename: "/auth",
  }
);

const container = document.getElementById("root");

let root = container._reactRoot;

if (!root) {
  root = createRoot(container);
  container._reactRoot = root;
}

root.render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
