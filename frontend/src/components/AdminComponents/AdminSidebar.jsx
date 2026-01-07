import {
  X,
  ListPlus,
  MessageSquare,
  BarChart3,
  Settings,
} from "lucide-react";
import BtnLogout from "../../buttons/BtnLogout";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const sidebarLinksByRole = {
  "office-admin": [
    {
      label: "Generate Queue",
      path: "queueing",
      icon: ListPlus,
    },
    {
      label: "Settings",
      path: "settings",
      icon: Settings,
    },
  ],
  "hr-admin": [
    {
      label: "Feedback Form",
      path: "feedback",
      icon: MessageSquare,
    },
    {
      label: "Generate Queue",
      path: "queueing",
      icon: ListPlus,
    },
    {
      label: "Analytics Report",
      path: "analytics",
      icon: BarChart3,
    },
    {
      label: "Settings",
      path: "settings",
      icon: Settings,
    },
  ],
};

const AdminSidebar = ({ open, onClose }) => {
  const { user } = useAuth();

  return (
    <>
      <aside className="hidden sm:block row-span-2 bg-[var(--sidebar-color)] shadow-lg p-4">
        <SidebarContent role={user?.role} onClose={onClose} />
      </aside>

      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 sm:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-[var(--sidebar-color)] shadow-lg z-50 transform transition-transform sm:hidden ${
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
    <nav className="flex flex-col h-full min-h-0 text-white tracking-wider">
      <div className="space-y-2">
        {links.map((item, index) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={index}
              to={item.path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 p-2 rounded transition-colors ${
                  isActive
                    ? "bg-[var(--hover-color)] font-semibold"
                    : "text-white/80 hover:bg-white/10"
                }`
              }
            >
              <Icon size={18} className="shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </div>

      <div className="mt-auto p-4">
        <BtnLogout />
      </div>
    </nav>
  );
};

export default AdminSidebar;
