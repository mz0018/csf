import { Menu } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const AdminNavbar = ({ onMenuClick }) => {

    const { user, loading } = useAuth();

    if (loading) return <p>Loading...</p>;
    if (!user) return <p>No user data available</p>;

  return (
    <nav className="col-span-full sm:col-start-2 bg-[var(--table-color)] text-white p-4 flex items-center justify-between">
      
      <div className="flex items-center gap-3">
        <img src="/img/logo.png" className="h-10" alt="logo" />
        <div>
          <h2 className="font-bold text-[var(--heading-color)]">
            Municipality of Solano
          </h2>
          <span className="text-sm text-[var(--text-color)]">
            Client feedback system
          </span>
        </div>
      </div>

      <div className="hidden sm:flex items-center gap-2 text-right">
        <span className="font-medium text-[var(--heading-color)] capitalize">
            {user?.username}
        </span>
        <span className="text-[var(--text-color)]">|</span>
        <span className="text-xs text-[var(--text-color)] uppercase">
            {user?.role}
        </span>
      </div>

      <button
        onClick={onMenuClick}
        className="sm:hidden text-[var(--text-color)] focus:outline-none"
        aria-label="Open sidebar"
      >
        <Menu size={24} />
      </button>
    </nav>
  );
};

export default AdminNavbar;
