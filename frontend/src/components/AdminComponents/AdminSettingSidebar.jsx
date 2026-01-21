import { User, Lock } from "lucide-react";

const AdminSettingSidebar = ({ activeTab, onChange }) => {
  const navlinks = [
    { label: "Profile", icon: User },
    { label: "Security", icon: Lock },
  ];

  return (
    <aside className="w-16 md:w-64 border-r border-gray-200 p-2 md:p-4 transition-all duration-200">

      <nav className="space-y-1">
        {navlinks.map(({ label, icon: Icon }) => {
          const isActive = activeTab === label;

          return (
            <button
              key={label}
              onClick={() => onChange(label)}
              className={`w-full flex items-center rounded-md transition cursor-pointer relative overflow-hidden
                justify-center md:justify-start
                px-2 md:px-3 py-2
                ${isActive
                  ? "bg-[var(--hover-color)] text-[var(--black-csf)] font-medium"
                  : "text-[var(--text-color)] hover:bg-[var(--hover-color)]"
                }
              `}
            >
              {isActive && (
                <div className="absolute left-0 top-0 h-full w-1 bg-[var(--button-color)]" />
              )}

              <Icon size={18} className="md:hidden" />

              <span className="hidden md:inline">{label}</span>
            </button>
          );
        })}
      </nav>

    </aside>
  );
};

export default AdminSettingSidebar;
