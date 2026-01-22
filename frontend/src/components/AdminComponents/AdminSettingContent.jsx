import { useEffect, useRef } from "react";
import { useAuth } from "../../context/AuthContext";
import AdminAvatar from "./AdminAvatar";

const AdminSettingContent = ({ activeTab }) => {
  const { user, refreshUser } = useAuth();
  const prevTab = useRef("");

  useEffect(() => {
    if (activeTab === "Profile" && prevTab.current !== "Profile") {
      refreshUser();
    }
    prevTab.current = activeTab;
  }, [activeTab, refreshUser]);

  return (
    <section className="flex-1 p-6 capitalize text-[var(--black-csf)]">
      {activeTab === "Profile" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <AdminAvatar name={user?.username} />

            <div className="flex flex-col justify-center">
              <p className="font-semibold text-base sm:text-lg md:text-xl">
                {user?.username}
              </p>

              <p className="text-xs uppercase sm:text-sm md:text-base text-[var(--text-color)]">
                {user?.role}
              </p>
            </div>
          </div>

          <div></div>

          <div className="p-3 border-b border-[var(--bg-color)]">{user?.firstName}</div>
          <div className="p-3 border-b border-[var(--bg-color)]">{user?.lastName}</div>
          <div className="p-3 border-b border-[var(--bg-color)]">{user?.position}</div>
        </div>
      )}
    </section>
  );
};

export default AdminSettingContent;
