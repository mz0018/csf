import { UserLock } from "lucide-react";
import { Link } from "react-router-dom";

const BtnGoToAdmin = () => {
  return (
    <Link to="/admin">
      <button
        className="bg-[var(--bg-color)] p-4 rounded-sm text-xs uppercase tracking-wider cursor-pointer flex items-center gap-2 font-semibold"
        style={{ color: "var(--text-color)" }}
      >
        <UserLock size={16} style={{ color: "var(--text-color)" }} />
        Admin
      </button>
    </Link>
  );
};

export default BtnGoToAdmin;
