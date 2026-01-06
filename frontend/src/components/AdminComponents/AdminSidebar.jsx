import { X } from "lucide-react";
import BtnLogout from "../../buttons/BtnLogout";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const sidebarLinksByRole = {
  "office-admin": [
    { label: "Generate Queue Number", path: "queueing" },
    { label: "Settings", path: "settings" },
  ],
  "hr-admin": [
    { label: "Feedback Form", path: "feedback" },
    { label: "Generate Queue Number", path: "queueing" },
    { label: "Analytics Report", path: "analytics" },
    { label: "Settings", path: "settings" },
  ],
};

const AdminSidebar = ({ open, onClose, setActiveSection }) => {
  const { user } = useAuth();

  return (
    <>
      <aside className="hidden sm:block row-span-2 bg-white shadow-lg p-4">
        <SidebarContent role={user?.role} onClose={onClose} />
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform sm:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full min-h-0">
          <div className="flex justify-end p-4 shrink-0">
            <button onClick={onClose}>
              <X />
            </button>
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto px-4">
            <SidebarContent role={user?.role} onClose={onClose} />
          </div>
        </div>
      </aside>
    </>
  );
};

const SidebarContent = ({ role, onClose }) => {
  const links = sidebarLinksByRole[role] || [];

  return (
    <nav className="flex flex-col h-full min-h-0 text-gray-900">
      <div className="space-y-4">
        {links.map((item, index) => (
          <NavLink
            key={index}
            to={item.path}
            onClick={onClose}
            className={({ isActive }) =>
              `block p-2 rounded ${
                isActive ? "bg-gray-200 font-bold" : ""
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="mt-auto p-4">
        <BtnLogout />
      </div>
    </nav>
  );
};

export default AdminSidebar;
