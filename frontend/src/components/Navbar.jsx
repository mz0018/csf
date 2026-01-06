import React, { useState, useEffect } from "react";
import BtnChangeTheme from "../buttons/BtnChangeTheme";
import BtnGoToAdmin from "../buttons/BtnGoToAdmin";

import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  return (
    <>
      <nav
        className="relative w-full shadow-lg"
        style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}
      >
        <div className="flex items-center justify-between w-full p-3 sm:p-4 transition-all duration-300 ease-in-out">
          <a className="flex items-center space-x-2 sm:space-x-3 rtl:space-x-reverse">
            <img
              src="/img/logo.png"
              className="h-12 sm:h-16 lg:h-24"
              alt="logo"
              loading="lazy"
            />
            <div className="flex flex-col">
              <h2
                className="sm:block self-start text-lg sm:text-xl lg:text-2xl font-bold tracking-wider whitespace-nowrap uppercase"
                style={{ color: "var(--heading-color)" }}
              >
                Municipality of Solano
              </h2>
              <span
                className="sm:block text-xs sm:text-sm lg:text-base capitalize"
                style={{ color: "var(--text-color)" }}
              >
                Client's satisfaction and feedback form
              </span>
            </div>
          </a>

          <div className="hidden sm:flex items-center gap-3">
            <BtnGoToAdmin />
            <BtnChangeTheme />
          </div>

          <button
            className="sm:hidden p-2"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} style={{ color: "var(--text-color)" }} />
          </button>
        </div>
      </nav>

      <div
        className={`fixed top-0 right-0 h-full w-2/5 bg-[var(--bg-color)] shadow-xl z-40 transform
          ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
          transition-transform duration-300 ease-in-out sm:hidden
        `}
      >
        <div className="p-6 space-y-6 flex flex-col items-end text-right">
          <BtnChangeTheme />
          <div className="w-full flex justify-center">
            <BtnGoToAdmin />
          </div>
        </div>
      </div>

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 sm:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};

export default Navbar;
