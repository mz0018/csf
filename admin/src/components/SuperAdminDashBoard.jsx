import React, { lazy, Suspense } from "react";

const Navbar = lazy(() => import("./Navbar"));
const Content = lazy(() => import("./Content"));

const SuperAdminDashboard = () => {
  return (
    <>
      <Suspense fallback={null}>
        <Navbar />
      </Suspense>

      <main>
        <Suspense fallback={null}>
          <Content />
        </Suspense>
      </main>
    </>
  );
};

export default SuperAdminDashboard;
