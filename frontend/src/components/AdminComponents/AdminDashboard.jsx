import React, { lazy, Suspense, useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import PageLoader from "../../fallbacks/PageLoader";

const AdminNavbar = lazy(() => import("../AdminComponents/AdminNavbar"));
const AdminSidebar = lazy(() => import("../AdminComponents/AdminSidebar"));

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Suspense fallback={<PageLoader />}>
      <div className="h-screen grid grid-cols-1 sm:grid-cols-[16rem_1fr] grid-rows-[auto_1fr]">
        
          <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

          <AdminNavbar onMenuClick={() => setSidebarOpen(true)} />

        <main className="bg-gray-100 p-6 overflow-auto text-gray-900">
            <Outlet />
        </main>
      </div>
    </Suspense>
  );
};

export default AdminDashboard;
