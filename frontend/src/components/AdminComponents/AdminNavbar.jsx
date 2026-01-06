import React from "react";
import { Menu } from "lucide-react";

const AdminNavbar = ({ onMenuClick }) => {
    return (
        <nav className="col-span-full sm:col-start-2 bg-gray-800 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src="/img/logo.png" className="h-10" alt="logo" />
                <div>
                    <h2 className="font-bold">Municipality of Solano</h2>
                    <span className="text-sm">Client feedback system</span>
                </div>
            </div>

            <button
                onClick={onMenuClick}
                className="sm:hidden"
                aria-label="Open sidebar"
            >
                <Menu size={24} />
            </button>
        </nav>
    );
};

export default AdminNavbar;
