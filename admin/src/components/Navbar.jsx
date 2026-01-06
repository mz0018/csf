import React, { lazy, Suspense, useState } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";

const Sidebar = lazy(() => import("./Sidebar"));
const BtnLogout = lazy(() => import("../buttons/BtnLogout"));

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur border-b border-gray-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
          
          <div className="text-xl font-semibold tracking-tight text-gray-900">
            MMO-IT
          </div>

          <div className="hidden md:block">
            <Suspense fallback={null}>
              <BtnLogout />
            </Suspense>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="md:hidden rounded-lg p-2 text-gray-700 hover:bg-gray-100"
            aria-label="Open menu"
          >
            <HiOutlineMenuAlt3 size={26} />
          </button>
        </div>
      </nav>

      {open && (
        <Suspense fallback={null}>
          <Sidebar onClose={() => setOpen(false)} />
        </Suspense>
      )}
    </>
  );
};

export default Navbar;
